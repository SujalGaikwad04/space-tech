function OptionCard({ data, active, disabled, onClick }) {
  let className = "whatif-option";

  if (active && data.correct) className += " correct";
  if (active && !data.correct) className += " wrong";
  if (disabled && !active) className += " faded";

  return (
    <div
      className={className}
      onClick={!disabled ? onClick : null}
    >
      <div className="whatif-option-text">
        {data.text}
      </div>

      {active && (
        <div className="whatif-explanation">
          {data.explanation}
        </div>
      )}
    </div>
  );
}

export default OptionCard;
