import { useEffect, useState } from "react";
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScenario();
  }, []);

  return (
    <div className="whatif-root">
      <div className="whatif-card">
        {loading && <div className="loader">Generating scenario...</div>}

        {!loading && scenario && (
          <>
            <Scenario scenario={scenario} onResult={handleScenarioResult} />
            <button className="whatif-next-btn" onClick={fetchScenario}>
              Try Another Scenario
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default WhatIf;
