import {useEffect, useState} from "react";

function useHideMenu() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

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

    return isVisible;
}

export default useHideMenu;