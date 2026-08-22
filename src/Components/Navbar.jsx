import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
    const [activeTab, setActiveTab] = useState('Inicio');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { label: 'Inicio', id: 'inicio' },
        { label: 'Escuelas', id: 'escuelas' },
        { label: 'Acerca de', id: 'acerca' },
        { label: 'Soporte', id: 'soporte' },
    ];

    const handleNavClick = (e, label) => {
        e.preventDefault();
        setActiveTab(label);
        setMobileMenuOpen(false);
    };

    return (
        <header className="navbar-header">
            <div className="navbar-container">
                <a
                    href="#"
                    className="navbar-brand"
                    onClick={(e) => handleNavClick(e, 'Inicio')}
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
                            const isActive = activeTab === item.label;
                            return (
                                <li key={item.id} className="navbar-item">
                                    <a
                                        href={`#${item.id}`}
                                        className={`navbar-link ${isActive ? 'active' : ''}`}
                                        onClick={(e) => handleNavClick(e, item.label)}
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
