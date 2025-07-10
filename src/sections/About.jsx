import './About.css';

function About() {
  return (
    <section className="about-section">
      <div className="about-content">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim aeque doleamus animo, cum corpore dolemus, fieri tamen permagna accessio potest, si aliquod aeternum et infinitum impendere malum nobis opinemur.</p>
      </div>
      <div className="about-images">
        <img src="/assets/about_2.webp" alt="Restaurant interior view" className="about-image" />
        <img src="/assets/about_1.webp" alt="Chefs speaking" className="about-image" />
      </div>
    </section>
  );
}

export default About;
