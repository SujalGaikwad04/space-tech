import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CommunityEventDetails.css";

const CommunityEventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    // Interaction State
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [userVote, setUserVote] = useState(null); // 'like' | 'dislike' | null

    // Comments State
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        // Fetch event data
        const loadEvent = () => {
            const allEvents = JSON.parse(localStorage.getItem('userEvents') || '[]');
            const foundEvent = allEvents.find(e => e.id.toString() === id);

            if (foundEvent) {
                setEvent(foundEvent);

                // Load persisted interactions
                const savedLikes = parseInt(localStorage.getItem(`event_likes_${id}`) || '0');
                const savedDislikes = parseInt(localStorage.getItem(`event_dislikes_${id}`) || '0');
                const savedVote = localStorage.getItem(`event_vote_${id}`);
                const savedComments = JSON.parse(localStorage.getItem(`event_comments_${id}`) || '[]');

                setLikes(savedLikes);
                setDislikes(savedDislikes);
                setUserVote(savedVote);
                setComments(savedComments);
            }
            setLoading(false);
        };

        loadEvent();
    }, [id]);

    const handleVote = (type) => { // type: 'like' or 'dislike'
        let newLikes = likes;
        let newDislikes = dislikes;
        let newVote = type;

        if (userVote === type) {
            // Toggle off
            if (type === 'like') newLikes--;
            if (type === 'dislike') newDislikes--;
            newVote = null;
        } else {
            // Switch vote or fresh vote
            if (userVote === 'like') newLikes--;
            if (userVote === 'dislike') newDislikes--;

            if (type === 'like') newLikes++;
            if (type === 'dislike') newDislikes++;
        }

        // Update State
        setLikes(newLikes);
        setDislikes(newDislikes);
        setUserVote(newVote);

        // Persist
        localStorage.setItem(`event_likes_${id}`, newLikes);
        localStorage.setItem(`event_dislikes_${id}`, newDislikes);
        if (newVote) {
            localStorage.setItem(`event_vote_${id}`, newVote);
        } else {
            localStorage.removeItem(`event_vote_${id}`);
        }
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const commentObj = {
            id: Date.now(),
            author: "You", // In real app, get from AuthContext
            text: newComment,
            date: new Date().toLocaleDateString()
        };

        const updatedComments = [commentObj, ...comments];
        setComments(updatedComments);
        setNewComment("");

        // Persist
        localStorage.setItem(`event_comments_${id}`, JSON.stringify(updatedComments));
    };

    if (loading) return <div className="loading-screen">Loading Event...</div>;

    if (!event) return (
        <div className="event-details-page">
            <div className="error-message">
                <h2>Event not found</h2>
                <button onClick={() => navigate('/community-events')}>Back to Community</button>
            </div>
        </div>
    );

    return (
        <div className="event-details-page">
            {/* 🌍 GLOBAL BACKGROUND */}
            <img
                src="/backgrounds/abstract-horizon.png"
                alt="Abstract planet horizon"
                className="home-bg"
            />

            <div className="event-details-container">
                <img src={event.image} alt={event.title} className="event-header-image" />

                <div className="event-content-wrapper">

                    <div className="event-meta-header">
                        <div className="event-badges">
                            <span className="event-category-badge">{event.tag || "COMMUNITY"}</span>
                            {event.isUserCreated && <span className="event-category-badge" style={{ borderColor: '#8a2be2', color: '#e0b0ff' }}>User Hosted</span>}
                        </div>
                        <h1 className="event-title">{event.title}</h1>
                    </div>

                    <div className="event-info-grid">
                        <div className="info-item">
                            <div className="info-icon">📅</div>
                            <div className="info-text">
                                <label>Date</label>
                                <span>{new Date().getFullYear()}-{new Date().getMonth() + 1}-{event.day}</span>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon">⏱️</div>
                            <div className="info-text">
                                <label>Time</label>
                                <span>{event.time}</span>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon">📍</div>
                            <div className="info-text">
                                <label>Location</label>
                                <span>{event.location}</span>
                            </div>
                        </div>
                    </div>

                    <div className="event-body">
                        {event.description}
                    </div>

                    {/* Interactions Section */}
                    <div className="event-interactions">
                        <div className="vote-buttons">
                            <button
                                onClick={() => handleVote('like')}
                                className={`vote-btn like-btn ${userVote === 'like' ? 'active' : ''}`}
                            >
                                <span className="icon">👍</span> {likes}
                            </button>
                            <button
                                onClick={() => handleVote('dislike')}
                                className={`vote-btn dislike-btn ${userVote === 'dislike' ? 'active' : ''}`}
                            >
                                <span className="icon">👎</span> {dislikes}
                            </button>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="comments-section">
                        <h3>Comments ({comments.length})</h3>

                        {/* Comment Input */}
                        <form onSubmit={handleCommentSubmit} className="comment-form">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Share your thoughts about this event..."
                                rows="3"
                            />
                            <button type="submit" disabled={!newComment.trim()}>
                                Post Comment
                            </button>
                        </form>

                        {/* Comment List */}
                        <div className="comments-list">
                            {comments.length === 0 ? (
                                <p className="no-comments">No comments yet. Be the first to discuss!</p>
                            ) : (
                                comments.map((comment) => (
                                    <div key={comment.id} className="comment-card">
                                        <div className="comment-header">
                                            <span className="comment-author">{comment.author}</span>
                                            <span className="comment-date">{comment.date}</span>
                                        </div>
                                        <p className="comment-text">{comment.text}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div style={{ marginTop: '40px' }}>
                        <button
                            className="premium-btn"
                            onClick={() => navigate('/community-events')}
                            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}
                        >
                            ← Back to Events
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CommunityEventDetails;
