import { useEffect, useState } from "react";
import "./Quiz.css";
import Question from "./question";
import Result from "./result";
import { useNavigate } from "react-router-dom";

function Quiz() {

    const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const API_KEY = "ddc-a4f-a96a0d74b82a4ecba97a03f910015439";
    const BASE_URL = "https://api.a4f.co/v1/chat/completions";
    const MODEL_ID = "provider-6/gpt-oss-20b";

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: MODEL_ID,
          temperature: 0.6,
          messages: [
            {
              role: "user",
              content: `
Here is an example MCQ format:

[
  {
    "question": "Which planet is known as the Red Planet?",
    "answerOptions": [
      { "text": "Mars", "isCorrect": true },
      { "text": "Venus", "isCorrect": false },
      { "text": "Jupiter", "isCorrect": false },
      { "text": "Mercury", "isCorrect": false }
    ]
  }
]

Now generate EXACTLY 5 NEW MCQs in the SAME FORMAT.
Rules:
- Topic: SPACE (astronomy, planets, satellites, rockets)
- Do NOT repeat the example question
- Keep answerOptions exactly the same structure
- Return ONLY the JSON array
`
            }
          ]
        })
      });

      const data = await response.json();
      let raw = data?.choices?.[0]?.message?.content;

      if (!raw) throw new Error("No content");

      raw = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(raw);

      if (
        !Array.isArray(parsed) ||
        !parsed.every(
          q =>
            q.question &&
            Array.isArray(q.answerOptions) &&
            q.answerOptions.length === 4
        )
      ) {
        throw new Error("Invalid MCQ structure");
      }

      setQuestions(parsed);
    } catch (error) {
      console.error("Using fallback:", error);

      setQuestions([
  {
    "question": "What is the largest planet in our solar system?",
    "answerOptions": [
      {"text": "Saturn", "isCorrect": false},
      {"text": "Mars", "isCorrect": false},
      {"text": "Earth", "isCorrect": false},
      {"text": "Jupiter", "isCorrect": true}
    ]
  },
  {
    "question": "What is the tallest mountain in the world?",
    "answerOptions": [
      {"text": "Mount Everest", "isCorrect": true},
      {"text": "K2", "isCorrect": false},
      {"text": "Kangchenjunga", "isCorrect": false},
      {"text": "Lhotse", "isCorrect": false}
    ]
  },
  {
    "question": "Which country is home to the Great Wall of China?",
    "answerOptions": [
      {"text": "China", "isCorrect": true},
      {"text": "Japan", "isCorrect": false},
      {"text": "Korea", "isCorrect": false},
      {"text": "India", "isCorrect": false}
    ]
  },
  {
    "question": "What is the capital of France?",
    "answerOptions": [
      {"text": "London", "isCorrect": false},
      {"text": "Berlin", "isCorrect": false},
      {"text": "Paris", "isCorrect": true},
      {"text": "Rome", "isCorrect": false}
    ]
  },
  {
    "question": "What is the chemical formula for water?",
    "answerOptions": [
      {"text": "H2O", "isCorrect": true},
      {"text": "CO2", "isCorrect": false},
      {"text": "NaCl", "isCorrect": false},
      {"text": "NH3", "isCorrect": false}
    ]
  },
  {
    "question": "What is the largest ocean on Earth?",
    "answerOptions": [
      {"text": "Atlantic Ocean", "isCorrect": false},
      {"text": "Pacific Ocean", "isCorrect": true},
      {"text": "Indian Ocean", "isCorrect": false},
      {"text": "Arctic Ocean", "isCorrect": false}
    ]
  },
  {
    "question": "What is the most popular social media platform?",
    "answerOptions": [
      {"text": "Instagram", "isCorrect": true},
      {"text": "Facebook", "isCorrect": false},
      {"text": "Twitter", "isCorrect": false},
      {"text": "YouTube", "isCorrect": false}
    ]
  },
  {
    "question": "What is the currency of Japan?",
    "answerOptions": [
      {"text": "Euro", "isCorrect": false},
      {"text": "US Dollar", "isCorrect": false},
      {"text": "Japanese Yen", "isCorrect": true},
      {"text": "Chinese Yuan", "isCorrect": false}
    ]
  },
  {
    "question": "What is the world's largest search engine?",
    "answerOptions": [
      {"text": "Google", "isCorrect": true},
      {"text": "Bing", "isCorrect": false},
      {"text": "Yahoo", "isCorrect": false},
      {"text": "DuckDuckGo", "isCorrect": false}
    ]
  },
  {
    "question": "Who painted the Mona Lisa?",
    "answerOptions": [
      {"text": "Michelangelo", "isCorrect": false},
      {"text": "Leonardo da Vinci", "isCorrect": true},
      {"text": "Sandro Botticelli", "isCorrect": false},
      {"text": "Raphael", "isCorrect": false}
    ]
  }
]);
    } finally {
      setLoading(false);
    }
  };

  const handleNextQuestion = (isCorrect) => {
    setUserAnswers([...userAnswers, isCorrect]);
    setCurrentQuestion(currentQuestion + 1);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setLoading(true);
    fetchQuestions();
  };

  if (loading) return <h2>Loading questions...</h2>;

  return (
    <div className="App">
      <h1>Quick Quiz</h1>

      {currentQuestion < questions.length && (
        <Question
          question={questions[currentQuestion]}
          onAnswerClick={handleNextQuestion}
        />
      )}

      {currentQuestion === questions.length && (
        <Result
          userAnswers={userAnswers}
          questions={questions}
          resetQuiz={resetQuiz}
        />
      )}

    <button className="challenge-btn"
            onClick={() => navigate("/quiz")}> Challenge yourself </button>

    </div>
  );
}

export default Quiz;
