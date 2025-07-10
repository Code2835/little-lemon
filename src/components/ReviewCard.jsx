import './ReviewCard.css';

function ReviewCard({ rating, photo, name, review }) {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        className={`star ${index < rating ? 'filled' : ''}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="review-card">
      <div className="rating">
        {renderStars(rating)}
      </div>
      <div className="reviewer-info">
        <div className="reviewer-photo">
          <img src={photo} alt={name} />
        </div>
        <h3 className="reviewer-name">{name}</h3>
      </div>
      <div className="review-text">
        <p>{review}</p>
      </div>
    </div>
  );
}

export default ReviewCard;