import { useEffect, useRef } from "react";
import "./SolarActivity.css";

const SolarActivity = ({ solarFlares }) => {
  const flareStatus = solarFlares.length > 0 ? "Detected" : "None";
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Generate wave-like activity data
    ctx.strokeStyle = '#4cff9a';
    ctx.lineWidth = 2;
    ctx.beginPath();

    const points = 50;
    for (let i = 0; i < points; i++) {
      const x = (i / points) * width;
      const baseY = height / 2;
      const wave = Math.sin(i * 0.3) * 15 + Math.random() * 10;
      const y = baseY + wave;

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.stroke();

    // Add gradient fill
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(76, 255, 154, 0.3)');
    gradient.addColorStop(1, 'rgba(76, 255, 154, 0)');
    ctx.fillStyle = gradient;
    ctx.fill();
  }, []);

  return (
    <div className="weather-card solar-card">
      <h2 className="card-title">SOLAR ACTIVITY</h2>
      
      <div className="sun-visual">
        <div className="sun-core"></div>
      </div>

      <div className="solar-info">
        <p className="info-line"><span className="label">Sun Now:</span></p>
        <p className="info-value">No sunspots detected</p>
        
        <p className="info-line"><span className="label">SOLAR FLARES:</span> <span className="value">{flareStatus}</span></p>
        <p className="info-line"><span className="label">RADIATION:</span> <span className="value">Normal</span></p>
        
        <div className="graph-section">
          <p className="graph-label">24h History Graph</p>
          <canvas ref={canvasRef} width="300" height="80" className="activity-graph"></canvas>
        </div>
      </div>
    </div>
  );
};

export default SolarActivity;
