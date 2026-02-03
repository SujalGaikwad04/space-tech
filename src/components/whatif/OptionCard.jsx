/* eslint-disable react/prop-types */

function OptionCard({ data, active, disabled, onClick }) {
  let className = "whatif-option-card";

  if (active && data.correct) className += " correct";
  if (active && !data.correct) className += " wrong";
  if (disabled && !active) className += " faded";

  return (
    <div
      className={className}
      onClick={!disabled ? onClick : null}
      style={{ cursor: disabled ? 'default' : 'pointer' }}
    >
      <div className="option-main-text">
        {data.text}
      </div>

      {active && (
        <div className="option-explanation">
          {data.explanation}
        </div>
      )}
    </div>
  );
}

export default OptionCard;
