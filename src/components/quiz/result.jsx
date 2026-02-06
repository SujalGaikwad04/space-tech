/* eslint-disable react/prop-types */

const Result = ({ userAnswers, questions, resetQuiz = () => { }, isUpdating = false }) => {
  const correctAnswers = userAnswers.filter((answer) => answer).length;

  return (
    <div className="results-card">
      <h2>Mission Report</h2>
      <p className="stu-lower">
        You answered {correctAnswers} out of {questions.length} questions correctly.
      </p>

      <div className="xp-badge">
        {isUpdating ? "📡 Syncing stats with Star Command..." : `🚀 +${correctAnswers * 2} XP Gained`}
      </div>

      <ul className="results-list">
        {questions.map((question, index) => {
          const isCorrect = userAnswers[index];
          return (
            <li
              key={index}
              className={`result-item ${isCorrect ? 'correct' : 'wrong'}`}
            >
              <div style={{ fontWeight: '700', marginBottom: '5px' }}>
                Q{index + 1}. {question.question}
              </div>
              <div style={{ opacity: 0.8, fontSize: '0.9em' }}>
                {isCorrect
                  ? "✓ Correct Mission Data"
                  : `✗ Error: Correct answer was "${question.answerOptions.find((ans) => ans.isCorrect).text}"`}
              </div>
            </li>
          );
        })}
      </ul>

      <button className="retry-btn" onClick={resetQuiz}>
        Launch Another Mission
      </button>
    </div>
  );
};

export default Result;