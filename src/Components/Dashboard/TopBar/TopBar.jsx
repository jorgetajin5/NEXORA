import React from 'react';
import './TopBar.css';

export default function TopBar({ userProfile, onLogout, onOpenMobileMenu }) {
    // Formatea el rol y el nombre completo asegurando que existan
    const role = userProfile?.rol ? userProfile.rol.charAt(0).toUpperCase() + userProfile.rol.slice(1) : 'Usuario';
    const fullName = `${userProfile?.firstname || userProfile?.firstName || ''} ${userProfile?.lastname || userProfile?.lastName || ''}`.trim();

    return (
        <header className="topbar-container">
            {/* Perfil e iconos*/}
            <div className="topbar-main">

                {/* boton para abrir menu en dispositivos moviles */}
                <button className="menu-mobile-btn" onClick={onOpenMobileMenu}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>

                {/* Perfil izquierdo */}
                <div className="topbar-user-info">
                    <div className="avatar-large">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="topbar-icon">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>
                    <span className="user-text">
                        <strong>{role}:</strong> {fullName || 'Cargando nombre...'}
                    </span>
                </div>


                {/* Acciones derecha */}
                <div className="topbar-actions">
                    <button className="icon-btn" aria-label="Buscar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button>

                    <button className="icon-btn btn-notification" aria-label="Notificaciones">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                        <span className="notification-badge">3</span>
                    </button>

                    <div className="profile-menu">
                        <div className="avatar-small">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="topbar-icon">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </div>
                        <svg className="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>

                    <button className='btn-logout-small' onClick={onLogout}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="topbar-icon" >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                    </button>
                </div>

                
            </div>
            

            {/* Fila inferior, pestañas*/}
            <nav className="topbar-tabs">
                <button className="tab active">Publicaciones</button>
                <button className="tab">Clase</button>
                <button className="tab">Mensajes</button>
                <button className="tab">Calendario</button>
            </nav>
        </header>
    );
}