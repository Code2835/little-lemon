import './Footer.css';
import {Link} from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-section" role="contentinfo">
      <div className="footer-content">
        <img
          src="/assets/logo_big.webp"
          alt="Little Lemon Restaurant Logo"
          className="logo"
        />

        <div aria-labelledby="footer-nav-heading">
          <h2 id="footer-nav-heading">Site Navigation</h2>
          <ul>
            <li><Link to="/" aria-label="Go to Home page">Home</Link></li>
            <li><Link to="/about" aria-label="Go to About page">About</Link></li>
            <li><Link to="/menu" aria-label="Go to Menu page">Menu</Link></li>
            <li><Link to="/reservations" aria-label="Go to Reservations page">Reservations</Link></li>
            <li><Link to="/order" aria-label="Go to Order page">Order</Link></li>
            <li><Link to="/login" aria-label="Go to Login page">Login</Link></li>
          </ul>
        </div>

        <div aria-labelledby="contact-heading">
          <h2 id="contact-heading">Contact Information</h2>
          <ul>
            <li>
              <address>
                123 Main Street<br />
                Chicago, IL 60601
              </address>
            </li>
            <li>
              <a href="tel:+1-555-123-4567" aria-label="Call us at 555-123-4567">
                Phone: (555) 123-4567
              </a>
            </li>
            <li>
              <a href="mailto:info@littlelemon.com" aria-label="Email us at info@littlelemon.com">
                Email: info@littlelemon.com
              </a>
            </li>
          </ul>
        </div>

        <div aria-labelledby="social-heading">
          <h2 id="social-heading">Follow Us</h2>
          <ul>
            <li>
              <a
                href="https://facebook.com/littlelemon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Facebook page (opens in new tab)"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/littlelemon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Instagram page (opens in new tab)"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://tiktok.com/@littlelemon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our TikTok page (opens in new tab)"
              >
                TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;