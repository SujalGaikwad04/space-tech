import { useEffect, useState } from "react";
import "./Quiz.css";
import Question from "./question";
import Result from "./result";
import { useAuth } from "../../context/AuthContext";

function Detailquiz() {



  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { updateUserStats } = useAuth();

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
          question: "What does HTML stand for?",
          answerOptions: [
            { text: "Hyper Text Markup Language", isCorrect: true },
            { text: "High Text Machine Language", isCorrect: false },
            { text: "Hyperlinks Text Mark Language", isCorrect: false },
            { text: "Home Tool Markup Language", isCorrect: false }
          ]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleNextQuestion = (isCorrect) => {
    setUserAnswers([...userAnswers, isCorrect]);
    if (isCorrect) {
      updateUserStats(2); // Award 2 points for correct answer
    }
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
      <h1>World Quiz</h1>

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



    </div>
  );
}

export default Detailquiz;
