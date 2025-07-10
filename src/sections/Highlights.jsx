import DishCard from "../components/DishCard";
import './Highlights.css';
import useHorizontalScroll from "../hooks/useHorizontalScroll";
import {Link} from "react-router-dom";

function Highlights() {
    const scrollContainerRef = useHorizontalScroll(2);

    const dishes = [
        {
            image: "/assets/dishes/fish.webp",
            title: "Mediterranean Grilled Salmon",
            price: "$24.99",
            description: "Fresh Atlantic salmon grilled to perfection with Mediterranean herbs, served with roasted vegetables and lemon butter sauce.",
            orderLink: "/order/mediterranean-grilled-salmon"
        },
        {
            image: "/assets/dishes/bruschetta.webp",
            title: "Truffle Mushroom Risotto",
            price: "$19.99",
            description: "Creamy Arborio rice cooked with wild mushrooms and finished with truffle oil, parmesan cheese, and fresh herbs.",
            orderLink: "/order/truffle-mushroom-risotto"
        },
        {
            image: "/assets/dishes/greek_salad.webp",
            title: "Lamb Mediterranean Wrap",
            price: "$16.99",
            description: "Tender marinated lamb with fresh vegetables, tzatziki sauce, and feta cheese wrapped in warm pita bread.",
            orderLink: "/order/lamb-mediterranean-wrap"
        },
        {
            image: "/assets/dishes/lemon_dessert.webp",
            title: "Seafood Paella",
            price: "$28.99",
            description: "Traditional Spanish paella with fresh shrimp, mussels, calamari, and saffron rice, cooked in authentic paella pan.",
            orderLink: "/order/seafood-paella"
        },
        {
            image: "/assets/dishes/greek_salad.webp",
            title: "Chocolate Baklava",
            price: "$8.99",
            description: "Traditional Greek pastry with layers of phyllo dough, nuts, and honey, enhanced with rich dark chocolate.",
            orderLink: "/order/chocolate-baklava"
        }
    ];

    return (
    <section className="highlights-section">
        <div className="highlights-content">
            <h1>Specials</h1>
            <Link to="/order" className="order-button">
                <button>Order Menu</button>
            </Link>
        </div>
        <div className="dish-cards" ref={scrollContainerRef}>
            {dishes.map((dish, index) => (
                <DishCard
                    key={index}
                    image={dish.image}
                    title={dish.title}
                    price={dish.price}
                    description={dish.description}
                    orderLink={dish.orderLink}
                />
            ))}
        </div>
    </section>
  );
}

export default Highlights;
