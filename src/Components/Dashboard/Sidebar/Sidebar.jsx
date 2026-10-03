import React from 'react';
import './Sidebar.css';

export default function Sidebar({ isMobileOpen, onCloseMobile, activeView, onNavigate }) {

    const handleNavigation = (e, viewId) => {
        e.preventDefault();
        if(onNavigate) onNavigate(viewId);
        if(onCloseMobile) onCloseMobile();
    };

    return (
        <>
            {/* Overlay oscuro para movil */}
            {isMobileOpen && <div className="sidebar-overlay" onClick={onCloseMobile}></div>}

            <aside className={`sidebar-container ${isMobileOpen ? 'open' : ''}`}>

                {/* header - logo */}
                <div className="sidebar-brand">
                    <div className="brand-icon-wrapper">
                        <img
                            src="/logo.png"
                            alt="Nexora Logo"
                            className="navbar-logo-img"
                        />
                    </div>
                    <div className="brand-text">
                        <h2>Aula conecta</h2>
                        <p>Aprender juntos</p>
                    </div>
                </div>

                {/* boton principal de accion */}
                <button className="btn-join-class">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="join-icon" width="20" height="20">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    ÚNETE A UNA CLASE
                </button>

                {/* Navegación principal */}
                <nav className="sidebar-nav">
                    <ul>
                        
                        <li className={activeView === 'inicio' ? 'active' : ''}>
                            <a href="#inicio" onClick={(e) => handleNavigation(e, 'inicio')}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon" width="20" height="20">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                                Inicio
                            </a>
                        </li>

                        <li className={activeView === 'clases' ? 'active' : ''}>
                            <a href="#clases" onClick={(e) => handleNavigation(e, 'clases')}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon" width="20" height="20">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                </svg>
                                Tus clases
                            </a>
                        </li>

                        <li className={activeView === 'calendario' ? 'active' : ''}>
                            <a href="#calendario" onClick={(e) => handleNavigation(e, 'calendario')}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon" width="20" height="20">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                Calendario
                            </a>
                        </li>

                        <li className={activeView === 'mensajes' ? 'active' : ''}>
                            <a href="#mensajes" onClick={(e) => handleNavigation(e, 'mensajes')}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon" width="20" height="20">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                </svg>
                                Mensajes
                            </a>
                        </li>

                        <li className={activeView === 'archivos' ? 'active' : ''}>
                            <a href="#archivos" onClick={(e) => handleNavigation(e, 'archivos')}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon" width="20" height="20">
                                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                                </svg>
                                Archivos
                            </a>
                        </li>

                        <li className={activeView === 'calificaciones' ? 'active' : ''}>
                            <a href="#calificaciones" onClick={(e) => handleNavigation(e, 'calificaciones')}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon" width="20" height="20">
                                    <circle cx="12" cy="8" r="7" />
                                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                                </svg>
                                Calificaciones
                            </a>
                        </li>

                        <li className={activeView === 'notificaciones' ? 'active' : ''}>
                            <a href="#notificaciones" onClick={(e) => handleNavigation(e, 'notificaciones')}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon" width="20" height="20">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                </svg>
                                Notificaciones
                            </a>
                        </li>

                        <li className={activeView === 'configuracion' ? 'active' : ''}>
                            <a href="#configuracion" onClick={(e) => handleNavigation(e, 'configuracion')}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon" width="20" height="20">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                </svg>
                                Configuración
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Tarjeta inferior de invitacion */}
                <div className="sidebar-invite-card">
                    {/* ruta de imagen */}
                    <div className="invite-illustration-placeholder">

                    </div>  {/* insertar iconos */}
                    <p>Comparte conocimientos, inspira futuros.</p>
                    <button className="btn-invite">
                        <span className="invite-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="invite-icon">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>

                        </span> Invitar estudiantes
                    </button>
                </div>
            </aside>
        </>
    );
}