import "./WeatherActions.css";

const WeatherActions = () => {
  return (
    <div className="actions">
      <button>View Detailed Report</button>
      <button>Get Alerts</button>
      <button className="secondary">Historical Data</button>
    </div>
  );
};

export default WeatherActions;
