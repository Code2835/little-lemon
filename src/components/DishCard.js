import './DishCard.css';

function DishCard({ image, title, price, description, orderLink }) {
  return (
    <div className="dish-card">
      <div className="dish-image">
        <img src={image} alt={title} />
      </div>
      <div className="dish-content">
        <div className="dish-header">
          <h3 className="dish-title">{title}</h3>
          <span className="dish-price">{price}</span>
        </div>
        <p className="dish-description">{description}</p>
        <a href={orderLink} className="order-link">Order</a>
      </div>
    </div>
  );
}

export default DishCard;