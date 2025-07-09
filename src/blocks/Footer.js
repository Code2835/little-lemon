import './Footer.css';
import {Link} from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <img src="/assets/logo_big.png" alt="Little Lemon Logo" className="logo" />

        <div>
          <h2>Nav</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/reservations">Reservations</Link></li>
            <li><Link to="/order">Order</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>

        <div>
          <h2>Contact</h2>
          <ul>
            <li>Address</li>
            <li>Phone Number</li>
            <li>Email</li>
          </ul>
        </div>

        <div>
          <h2>Social</h2>
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>TikTok</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
