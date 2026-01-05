import "./EraSelection.css";

const EraSelection = ({ selectedEra }) => {
  const erasData = {
    "2020s": {
      past: ["Mars 2020", "Parker Solar Probe"],
      present: ["James Webb", "ISS", "DART"],
      future: ["Artemis III", "Mars Sample Return"]
    }
  };

  const currentEra = erasData[selectedEra] || erasData["2020s"];

  return (
    <div className="era-selection">
      <div className="era-label">SELECTED ERA: {selectedEra}</div>
      <div className="era-categories">
        <div className="era-category">
          <div className="era-icon">🚀</div>
          <h4>PAST</h4>
          <ul>
            {currentEra.past.map((mission, idx) => (
              <li key={idx}>• {mission}</li>
            ))}
          </ul>
        </div>
        
        <div className="era-category">
          <div className="era-icon">🛸</div>
          <h4>PRESENT</h4>
          <ul>
            {currentEra.present.map((mission, idx) => (
              <li key={idx}>• {mission}</li>
            ))}
          </ul>
        </div>
        
        <div className="era-category">
          <div className="era-icon">🚀</div>
          <h4>FUTURE</h4>
          <ul>
            {currentEra.future.map((mission, idx) => (
              <li key={idx}>• {mission}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EraSelection;
