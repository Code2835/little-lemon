import './Header.css';
import {NavLink} from "react-router-dom";
import useHideMenu from "../hooks/useHideMenu";

function Header() {
    const isVisible = useHideMenu();

    const navItems = [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
        { to: '/menu', label: 'Menu' },
        { to: '/reservations', label: 'Reservations' },
        { to: '/order', label: 'Order' },
        { to: '/login', label: 'Login' },
    ];

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