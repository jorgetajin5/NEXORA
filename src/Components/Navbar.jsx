import { useState } from 'react';
import './Navbar.css';

export default function Navbar({ activePage = 'inicio', onNavigate }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { label: 'Inicio', id: 'inicio', href: '/' },
        { label: 'Escuelas', id: 'escuelas', href: '#escuelas' },
        { label: 'Acerca de', id: 'acerca', href: '#acerca' },
        { label: 'Soporte', id: 'soporte', href: '#soporte' },
    ];

    const handleNavClick = (e, pageId) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        if (onNavigate) {
            onNavigate(pageId);
        }
    };

    return (
        <header className="navbar-header">
            <div className="navbar-container">
                <a
                    href="/"
                    className="navbar-brand"
                    onClick={(e) => handleNavClick(e, 'inicio')}
                    aria-label="Nexora - Inicio"
                >
                    <img
                        src="/logoNexora.png"
                        alt="Nexora Logo"
                        className="navbar-logo-img"
                    />
                </a>

                <button
                    className={`navbar-hamburger ${mobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Alternar menú de navegación"
                    aria-expanded={mobileMenuOpen}
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>

                <nav className={`navbar-nav ${mobileMenuOpen ? 'open' : ''}`}>
                    <ul className="navbar-links">
                        {navItems.map((item) => {
                            const isActive = activePage === item.id;
                            return (
                                <li key={item.id} className="navbar-item">
                                    <a
                                        href={item.href}
                                        className={`navbar-link ${isActive ? 'active' : ''}`}
                                        onClick={(e) => handleNavClick(e, item.id)}
                                    >
                                        {item.label}
                                        {isActive && <span className="nav-indicator" />}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
