import './Hero.css';

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
        <button>Reserve a Table</button>
      </div>
      <div className="hero-image">
        <img src="/assets/restauranfood.jpg" alt="Delicious food" />
      </div>
    </section>
  );
}

export default Hero;
