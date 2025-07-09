import './Header.css';
import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";

function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const navItems = [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
        { to: '/menu', label: 'Menu' },
        { to: '/reservations', label: 'Reservations' },
        { to: '/order', label: 'Order' },
        { to: '/login', label: 'Login' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Показываем header если:
            // 1. Скроллим вверх
            // 2. Находимся в самом верху страницы
            if (currentScrollY < lastScrollY || currentScrollY < 100) {
                setIsVisible(true);
            } else {
                // Скрываем header при скролле вниз
                setIsVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
    <header className={`header-section ${isVisible ? 'visible' : 'hidden'}`}>
      <img src="/assets/logo.svg" alt="Little Lemon Logo" className="logo" />
      <nav>
        <ul>
            {navItems.map((item) => (
                <li key={item.to}>
                    <NavLink
                        to={item.to}
                        className={({isActive}) => isActive ? 'active' : ''}
                    >
                        {item.label}
                    </NavLink>
                </li>
            ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;