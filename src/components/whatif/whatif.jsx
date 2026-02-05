import { useEffect, useState } from "react";
import ParticleBackground from "../Home/ParticleBackground";
import Scenario from "./Scenario";
import "./whatif.css";
import { useAuth } from "../../context/AuthContext";

const API_KEY = "ddc-a4f-a96a0d74b82a4ecba97a03f910015439";
const BASE_URL = "https://api.a4f.co/v1/chat/completions";
const MODEL_ID = "provider-6/gpt-oss-20b";

function WhatIf() {
  const [scenario, setScenario] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUserStats } = useAuth();

  const handleScenarioResult = (isCorrect) => {
    if (isCorrect) {
      updateUserStats(2); // Award 2 points for correct answer
    }
  };

  const fetchScenario = async () => {
    setLoading(true);
    setScenario(null);

    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL_ID,
          messages: [
            {
              role: "system",
              content:
                "You are a science quiz generator. Generate ONE unique 'what if' scenario every time.",
            },
            {
              role: "user",
              content: `
Return ONLY valid JSON in this exact format:
{
  "title": "Test Your Knowledge",
  "question": "What would happen if ...?",
  "options": [
    {
      "text": "Option text",
      "correct": true,
      "explanation": "Explanation"
    },
    {
      "text": "Option text",
      "correct": false,
      "explanation": "Explanation"
    },
    {
      "text": "Option text",
      "correct": false,
      "explanation": "Explanation"
    }
  ]
}

Rules:
- Exactly 3 options
- Only ONE option correct
- Science / space / physics themed
- Never repeat previous scenarios
              `,
            },
          ],
          temperature: 0.9,
        }),
      });

      const data = await res.json();
      const parsed = JSON.parse(data.choices[0].message.content);

      setScenario(parsed);
    } catch (error) {
      console.error("WhatIf fetch error:", error);
      // Fallback scenario
      setScenario({
        question: "What would happen if Earth stopped rotating suddenly?",
        options: [
          { text: "Atmosphere would continue moving at 1000mph", correct: true, explanation: "The earth's rotation keeps the atmosphere in motion; a sudden stop would send everything flying east." },
          { text: "Gravity would disappear", correct: false, explanation: "Gravity is caused by mass, not rotation." },
          { text: "The moon would crash into us", correct: false, explanation: "The moon's orbit is independent of Earth's rotation speed." }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchQuestions = () => {
    fetchScenario();
  };

  return (
    <div className="whatif-wrapper">
      <ParticleBackground />

      <div className="whatif-container">
        <h1 className="whatif-main-title">Cosmic What-If?</h1>

        {loading ? (
          <div className="whatif-loader">
            <div className="spinner" style={{ margin: '0 auto' }}></div>
            <div className="loader-text">Simulating Universe...</div>
          </div>
        ) : (
          <>
            {scenario && (
              <>
                <Scenario scenario={scenario} onResult={handleScenarioResult} />
                <button className="whatif-btn" onClick={fetchScenario}>
                  Explore New Scenario
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default WhatIf;
