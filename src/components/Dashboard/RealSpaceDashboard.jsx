import "./RealSpaceDashboard.css";

const RealSpaceDashboard = () => {
  return (

    
    <div className="rs-dashboard">

      
{/* fixed background  */}

<img src="earth.jpg" className="bg-video"/>

{/* fix background ended */}



      <div className="rs-topbar">
        <h2>MY SPACESCOPE DASHBOARD</h2>
        <button className="edit-profile">Edit Profile</button>
      </div>

      <p className="rs-welcome">
        Welcome back, <span>User Name</span><br />
        Location: Navi Mumbai, Maharashtra, India | Timezone: IST (UTC+5:30)
      </p>

      <div className="rs-main">
        <div className="rs-left">
          <div className="rs-card">
            <h3>MY EVENTS</h3>
            <p>Saved (5)</p>
            <p>📅 Oct 27</p>
            <p>📅 Oct 28</p>
          </div>

          <div className="rs-card">
            <h3>MY REMINDERS</h3>
            <p className="highlight">ISS Pass</p>
            <p>8:42 PM</p>
            <button className="small-btn">Manage</button>
          </div>

          <div className="rs-card">
            <h3>SETTINGS</h3>
            <p>Alerts: On</p>
            <p>Email: Monthly</p>
            <button className="small-btn">Edit</button>
          </div>
        </div>

        <div className="rs-right">
          <div className="rs-card wide">
            <h3>RECOMMENDED FOR YOU</h3>
            <ul>
              <li>📘 Astrophotography Basics</li>
              <li>🚀 Artemis II Updates</li>
              <li>🛰 Satellite Applications</li>
            </ul>
          </div>

          <div className="rs-card wide">
            <h3>ACHIEVEMENTS</h3>
            <p>⭐ Stargazer (Level 2)</p>
            <div className="badges">
              <span>🔭</span>
              <span>🚀</span>
              <span>🪐</span>
            </div>
          </div>

          <div className="rs-card wide">
            <h3>QUICK ACTIONS</h3>
            <div className="actions">
              <button>Customize Dashboard</button>
              <button>Download Calendar</button>
              <button>Invite Friends</button>
              <button>Feedback</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealSpaceDashboard;
