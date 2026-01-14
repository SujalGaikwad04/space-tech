import React from "react";
import "./Footer.css";

const Footer = () => {
  const footerLinks = [
    {
      title: "PRODUCT",
      links: ["Features", "Pricing", "API", "Roadmap"],
    },
    {
      title: "RESOURCES",
      links: ["Blog", "Help Center", "Documentation", "Status"],
    },
    {
      title: "PARTNERS",
      links: ["NASA", "ESA", "ISRO", "SpaceX"],
    },
    {
      title: "CONNECT",
      links: ["Twitter", "Instagram", "Newsletter", "Contact"],
    },
  ];

  return (
    <footer className="footer">
      {/* Background overlay */}
      <div className="footer-bg" />

      <div className="footer-container">
        {/* Logo */}
        <div className="footer-header">
          <h2 className="footer-logo">SpaceScope 🚀</h2>
          <p className="footer-tagline">
            Explore, Learn & Stay Connected with the Universe
          </p>
        </div>

        {/* Links */}
        <div className="footer-links-grid">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="footer-title">{section.title}</h3>
              <ul className="footer-links">
                {section.links.map((link) => (
                  <li key={link} className="footer-link">
                    <span className="star">✦</span>
                    <span>{link}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Subscription */}
        <div className="subscribe-wrapper">
          <div className="subscribe-box">
            <div className="subscribe-content">
              <h4 className="subscribe-title">[@] Subscribe to space alerts</h4>
              <div className="subscribe-form">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="subscribe-input"
                />
                <button className="subscribe-btn">[Subscribe]</button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="footer-bottom">
          <div>
            <p>© 2024 SpaceScope. All rights reserved.</p>
            <p className="footer-source">
              Data sources: NASA, ESA, NOAA, SpaceWeather.com
            </p>
          </div>

          <div className="footer-policy">
            <a href="#">Privacy Policy</a>
            <span>|</span>
            <a href="#">Terms of Service</a>
            <span>|</span>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
