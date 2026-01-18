import { useState } from "react";
import OptionCard from "./OptionCard";

function Scenario({ scenario }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      {/* Header */}
      <div className="whatif-header">
        <div className="icon-circle">🌙</div>
        <h1 className="whatif-title">
          <span>Test</span> Your Knowledge
        </h1>
      </div>

      {/* Question */}
      <div className="whatif-question-box">
        {scenario.question}
      </div>

      {/* Options */}
      <div className="whatif-options">
        {scenario.options.map((opt, i) => (
          <OptionCard
            key={i}
            data={opt}
            active={selected === i}
            disabled={selected !== null}
            onClick={() => setSelected(i)}
          />
        ))}
      </div>
    </>
  );
}

export default Scenario;
