import "./MissionHero.css";

const MissionHero = () => {
  return (
    <>
      {/* 🌍 FIXED BACKGROUND (SAME AS HOME PAGE) */}
      <img
        src="/earth.jpg"
        alt="Space background"
        className="home-bg"
      />

      <section className="mission-hero">
        <h1 className="mission-title">SPACE MISSIONS</h1>
        <p className="mission-subtitle">
          Explore humanity’s journey beyond Earth
        </p>
      </section>
    </>
  );
};

export default MissionHero;
