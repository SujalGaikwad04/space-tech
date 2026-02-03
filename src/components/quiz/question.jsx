/* eslint-disable react/prop-types */

const Question = ({ question, onAnswerClick = () => { } }) => {
  return (
    <div className="question-card">
      <h2 className="question-text">{question.question}</h2>
      <ul className="options-grid">
        {question.answerOptions.map((option, index) => {
          const letter = String.fromCharCode(65 + index); // A, B, C, D
          return (
            <li key={option.text}>
              <button
                className="option-btn"
                onClick={() => onAnswerClick(option.isCorrect)}
              >
                <span>{letter}</span>
                {option.text}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Question;