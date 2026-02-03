/* eslint-disable react/prop-types */
import { useState } from "react";
import OptionCard from "./OptionCard";

function Scenario({ scenario, onResult }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="scenario-card">
      <h2 className="scenario-question">
        {scenario.question}
      </h2>

      <div className="whatif-options-list">
        {scenario.options.map((opt, i) => (
          <OptionCard
            key={i}
            data={opt}
            active={selected === i}
            disabled={selected !== null}
            onClick={() => {
              setSelected(i);
              if (onResult) {
                onResult(opt.correct);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Scenario;
