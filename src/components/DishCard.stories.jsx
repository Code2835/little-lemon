import DishCard from './DishCard';

// Это обязательный экспорт по умолчанию, который описывает компонент
export default {
    title: 'Components/DishCard',
    component: DishCard,
    parameters: {
        // Центрирует компонент в canvas
        layout: 'centered',
    },
    // Определяет типы аргументов для автоматической генерации контролов
    argTypes: {
        image: { control: 'text' },
        title: { control: 'text' },
        price: { control: 'text' },
        description: { control: 'text' },
        orderLink: { control: 'text' },
    },
};

// Это ваши "истории" - различные состояния компонента
export const Default = {
    args: {
        image: "/assets/dishes/fish.webp",
        title: "Mediterranean Grilled Salmon",
        price: "$24.99",
        description: "Fresh Atlantic salmon grilled to perfection with Mediterranean herbs, served with roasted vegetables and lemon butter sauce.",
        orderLink: "/order/mediterranean-grilled-salmon"
    },
};

export const TruffleMushroom = {
    args: {
        image: "/assets/dishes/bruschetta.webp",
        title: "Truffle Mushroom Risotto",
        price: "$19.99",
        description: "Creamy Arborio rice cooked with wild mushrooms and finished with truffle oil, parmesan cheese, and fresh herbs.",
        orderLink: "/order/truffle-mushroom-risotto"
    },
};

export const LambWrap = {
    args: {
        image: "/assets/dishes/greek_salad.webp",
        title: "Lamb Mediterranean Wrap",
        price: "$16.99",
        description: "Tender marinated lamb with fresh vegetables, tzatziki sauce, and feta cheese wrapped in warm pita bread.",
        orderLink: "/order/lamb-mediterranean-wrap"
    },
};

export const LongDescription = {
    args: {
        image: "/assets/dishes/lemon_dessert.webp",
        title: "Chocolate Baklava Supreme",
        price: "$12.99",
        description: "Traditional Greek pastry with layers of phyllo dough, nuts, and honey, enhanced with rich dark chocolate and topped with pistachios. This is a very long description to test how the component handles lengthy text content.",
        orderLink: "/order/chocolate-baklava-supreme"
    },
};

export const ExpensiveDish = {
    args: {
        image: "/assets/dishes/fish.webp",
        title: "Premium Wagyu Steak",
        price: "$89.99",
        description: "The finest Japanese A5 Wagyu beef, grilled to perfection.",
        orderLink: "/order/premium-wagyu-steak"
    },
};

// Story без изображения (для тестирования обработки ошибок)
export const NoImage = {
    args: {
        image: "",
        title: "Mystery Dish",
        price: "$15.99",
        description: "A delicious mystery dish that will surprise you.",
        orderLink: "/order/mystery-dish"
    },
};