import "./EventsPageContainer.css";

const EventsPageContainer = ({ children }) => {
  return (
    <div className="events-page">
      <div className="events-container">
        <div className="events-page-header">EVENTS / CALENDAR</div>
        {children}
      </div>
    </div>
  );
};

export default EventsPageContainer;
