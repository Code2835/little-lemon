import ReviewCard from "../components/ReviewCard";
import './Testimonials.css';
import useHorizontalScroll from "../hooks/useHorizontalScroll";

function Testimonials() {
  const scrollContainerRef = useHorizontalScroll();

  const reviews = [
    {
      rating: 5,
      photo: "/assets/avatars/002.jpeg",
      name: "Maria Rodriguez",
      review: "Really enjoyed the atmosphere. The Greek salad was absolutely delicious and the service was exceptional. Will definitely be coming back soon!"
    },
    {
      rating: 4,
      photo: "/assets/avatars/001.jpeg",
      name: "John Smith",
      review: "Great food and excellent service! The bruschetta was amazing and the pasta was cooked to perfection. Highly recommend this place."
    },
    {
      rating: 5,
      photo: "/assets/avatars/003.jpeg",
      name: "Sarah Johnson",
      review: "Best dining experience I've had in a long time. The lemon dessert was incredible and the staff was very friendly and attentive."
    },
    {
      rating: 4,
      photo: "/assets/avatars/004.jpeg",
      name: "Michael Brown",
      review: "Wonderful restaurant with authentic flavors. The ambiance is perfect for a romantic dinner. The food quality is consistently excellent."
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-content">
        <h1>Testimonials</h1>
      </div>
      <div className="review-cards" ref={scrollContainerRef}>
        {reviews.map((review, index) => (
            <ReviewCard
                key={index}
                rating={review.rating}
                photo={review.photo}
                name={review.name}
                review={review.review}
            />
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
