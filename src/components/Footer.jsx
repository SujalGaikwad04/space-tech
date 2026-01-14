import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <h2 className="footer-logo">
            SpaceScope <span className="rocket">🚀</span>
          </h2>
          <p className="footer-tagline">Explore, Learn & Stay Connected with the Universe</p>
        </div>

        {/* Links Section */}
        <div className="footer-links">
          <div className="footer-column">
            <h4>PRODUCT</h4>
            <ul>
              <li><span>+</span> Features</li>
              <li><span>+</span> Pricing</li>
              <li><span>+</span> API</li>
              <li><span>+</span> Roadmap</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>RESOURCES</h4>
            <ul>
              <li><span>+</span> Blog</li>
              <li><span>+</span> Help Center</li>
              <li><span>+</span> Documentation</li>
              <li><span>+</span> Status</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>PARTNERS</h4>
            <ul>
              <li><span>+</span> NASA</li>
              <li><span>+</span> ESA</li>
              <li><span>+</span> ISRO</li>
              <li><span>+</span> SpaceX</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>CONNECT</h4>
            <ul>
              <li><span>+</span> Twitter</li>
              <li><span>+</span> Instagram</li>
              <li><span>+</span> Newsletter</li>
              <li><span>+</span> Contact</li>
            </ul>
          </div>
        </div>

        {/* Subscribe Section */}
        <div className="footer-subscribe">
          <div className="subscribe-input-wrapper">
            <input 
              type="email" 
              placeholder="[ @ Subscribe to space alerts] Enter email [Subscribe]" 
              className="subscribe-input"
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p className="copyright">© 2024 SpaceScope. All rights reserved.</p>
          <p className="data-sources">Data sources: NASA, ESA, NOAA, SpaceWeather.com</p>
          <p className="footer-policy">
            Privacy Policy | Terms of Service | Cookie Policy
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
