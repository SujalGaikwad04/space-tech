import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  /* 
    Updated Footer Links Configuration 
    - Internal routes use react-router-dom Link
    - External partners use specific URLs
    - Connect section remains non-functional
  */
  const footerLinks = [
    {
      title: "PRODUCT",
      links: [
        { name: "Home", path: "/", isExternal: false },
        { name: "Solar System", path: "/solar-system", isExternal: false },
        { name: "Live Map", path: "/live-map", isExternal: false },
        { name: "Missions", path: "/mission", isExternal: false },
      ],
    },
    {
      title: "RESOURCES",
      links: [
        { name: "Events", path: "/events", isExternal: false },
        { name: "Weather", path: "/weather", isExternal: false },
        { name: "Learn", path: "/learn", isExternal: false },
        { name: "Quiz", path: "/quiz", isExternal: false },
      ],
    },
    {
      title: "PARTNERS",
      links: [
        { name: "NASA", path: "https://www.nasa.gov/", isExternal: true },
        { name: "ESA", path: "https://www.esa.int/", isExternal: true },
        { name: "ISRO", path: "https://www.isro.gov.in/", isExternal: true },
        { name: "SpaceX", path: "https://www.spacex.com/", isExternal: true },
      ],
    },

  ];

  return (
    <footer className="footer">
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
            <div key={section.title} className="footer-section">
              <h3 className="footer-title">{section.title}</h3>
              <ul className="footer-links">
                {section.links.map((link) => (
                  <li key={link.name} className="footer-link">
                    <span className="link-icon">✦</span>
                    {/* Render logic: External -> <a>, Internal -> <Link>, Null -> <span> */}
                    {link.path ? (
                      link.isExternal ? (
                        <a
                          href={link.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="footer-nav-link"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link to={link.path} className="footer-nav-link">
                          {link.name}
                        </Link>
                      )
                    ) : (
                      <span className="footer-nav-text">{link.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>



        {/* Footer bottom */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>SpaceScope. All rights reserved.</p>
            <p className="footer-source">
              Data sources: NASA, ESA, NOAA, SpaceWeather.com
            </p>
          </div>

          <div className="footer-policy">
            <a href="#">Privacy Policy</a>
            <span> | </span>
            <a href="#">Terms of Service</a>
            <span> | </span>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
