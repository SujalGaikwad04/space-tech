import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AiChat.css';
import chatbotIcon from '../../assets/chatbot_icon.png';

const API_KEY = "ddc-a4f-a96a0d74b82a4ecba97a03f910015439";
const BASE_URL = "https://api.a4f.co/v1/chat/completions";
const MODEL_ID = "provider-6/gpt-oss-20b";

const AiChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hello! I'm your Space Tech assistant. Ask me anything about space or our website! 🚀" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleNavigation = (path) => {
        navigate(path);
        // Optional: Add a system message saying we navigated
        setMessages(prev => [...prev, {
            role: 'assistant',
            content: `Navigating to ${path.replace('/', '') || 'Home'} page... 🛸`
        }]);
    };

    const sendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage = { role: 'user', content: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);
        const startTime = Date.now();

        // Check for navigation commands in text
        const lowerInput = inputValue.toLowerCase();
        if (lowerInput.includes('home')) handleNavigation('/');
        else if (lowerInput.includes('event')) handleNavigation('/events');
        else if (lowerInput.includes('mission')) handleNavigation('/mission');
        else if (lowerInput.includes('weather')) handleNavigation('/weather');
        else if (lowerInput.includes('dashboard')) handleNavigation('/dashboard');
        else if (lowerInput.includes('learn')) handleNavigation('/learn');

        // Check if it was ONLY a navigation command, maybe skip API call? 
        // For now, let's always call API for chatty response unless it's strictly a command. 
        // But to be safe and responsive, we'll just call the API too so the bot can say "Sure, here is the page".

        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: MODEL_ID,
                    messages: [
                        { role: 'system', content: "You are a helpful assistant for a Space Tech website. You can help users navigate to pages: Home, Events, Mission, Weather, Learn, Dashboard. If a user asks to go to a page, casually mention you are taking them there. Answer questions about space enthusiastically. IMPORTANT: You must answer strictly in a single paragraph. Do not use Markdown headers, lists, or bullet points." },
                        ...messages,
                        userMessage
                    ]
                })
            });

            const data = await response.json();

            // Ensure minimum 15 seconds delay
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < 15000) {
                await new Promise(resolve => setTimeout(resolve, 15000 - elapsedTime));
            }

            if (data.choices && data.choices[0]) {
                const botMessage = { role: 'assistant', content: data.choices[0].message.content };
                setMessages(prev => [...prev, botMessage]);
            } else {
                throw new Error('Invalid response from API');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting to mission control right now. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };



    return (
        <>
            <div className={`ai-chat-button ${isOpen ? 'active' : ''}`} onClick={toggleChat}>
                <img src={chatbotIcon} alt="Chat" style={{ width: '100%', height: '100%', padding: '12px' }} />
            </div>

            {isOpen && (
                <div className={`ai-chat-container ${!isOpen ? 'closing' : ''}`}>
                    <div className="ai-chat-header">
                        <h3>Space Assistant</h3>
                        <button className="ai-chat-close" onClick={toggleChat}>&times;</button>
                    </div>

                    <div className="ai-chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={msg.role === 'user' ? 'user-message' : 'ai-message'}>
                                {msg.content}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="ai-typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />

                    </div>

                    <div className="ai-chat-input-container">
                        <input
                            type="text"
                            className="ai-chat-input"
                            placeholder="Ask about space or navigate..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isLoading}
                        />
                        <button className="ai-chat-send" onClick={sendMessage} disabled={isLoading || !inputValue.trim()}>
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AiChat;
