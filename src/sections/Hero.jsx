import './Hero.css';
import {Link} from "react-router-dom";

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
        <Link to="/reservations" className="reservations-button">
            <button>Reserve a Table</button>
        </Link>
      </div>
      <div className="hero-image">
        <img src="/assets/restauranfood.webp" alt="Delicious food" />
      </div>
    </section>
  );
}

export default Hero;
