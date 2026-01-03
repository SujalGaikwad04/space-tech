import "./EventsCalendar.css";

const EventsCalendar = ({ events = [], selectedDate, onSelectDate, currentMonth, currentYear }) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Use current date or default to current month
  const now = new Date();
  const month = currentMonth !== undefined ? currentMonth : now.getMonth();
  const year = currentYear !== undefined ? currentYear : now.getFullYear();
  
  const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", 
                      "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  
  const monthName = `${monthNames[month]} ${year}`;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const startDay = firstDay; // 0=Sun, 1=Mon, etc.
  
  // Create calendar grid
  const calendarDays = [];
  
  // Add empty cells for days before month starts
  for (let i = 0; i < startDay; i++) {
    calendarDays.push({ day: null, events: [] });
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayEvents = events.filter(e => e.day === day);
    calendarDays.push({ day, events: dayEvents });
  }
  
  const handleDayClick = (day) => {
    if (day && onSelectDate) {
      onSelectDate(day);
    }
  };
  
  return (
    <div className="calendar-section">
      <h2 className="month-title">{monthName}</h2>
      <div className="calendar">
        <div className="calendar-header">
          {daysOfWeek.map(day => (
            <div key={day} className="day-name">{day}</div>
          ))}
        </div>
        <div className="calendar-grid">
          {calendarDays.map((dayData, index) => (
            <div
              key={index}
              className={`calendar-day ${
                dayData.day === selectedDate ? 'selected' : ''
              } ${dayData.day ? 'has-day' : 'empty'}`}
              onClick={() => handleDayClick(dayData.day)}
            >
              {dayData.day && (
                <>
                  <span className="day-number">{dayData.day}</span>
                  {dayData.events.length > 0 && (
                    <div className="event-indicators">
                      {dayData.events.map((event, i) => (
                        <span key={i} className="event-icon">{event.icon}</span>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsCalendar;
