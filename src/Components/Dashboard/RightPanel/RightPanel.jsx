import React from 'react';
import './RightPanel.css';

export default function RightPanel({ activeView }) {

    // Función para renderizar el contenido dependiendo de la vista actual
    const renderPanelContent = () => {
        switch (activeView) {
            case 'inicio':
                return (
                    <>
                        {/* 1. Acciones Rápidas */}
                        <div className="rp-widget">
                            <h4 className="rp-widget-title">
                                <span className="rp-icon-bolt"></span>Acciones rápidas
                            </h4>
                            <ul className="rp-action-list">
                                <li>
                                    <button className="rp-action-btn">
                                        <div className="rp-action-icon bg-blue">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                <circle cx="8.5" cy="7" r="4" />
                                                <line x1="20" y1="8" x2="20" y2="14" />
                                                <line x1="23" y1="11" x2="17" y2="11" />
                                            </svg></div>
                                        <span>Crear una clase</span>

                                    </button>
                                </li>
                                <li>
                                    <button className="rp-action-btn">
                                        <div className="rp-action-icon bg-green">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                <line x1="16" y1="2" x2="16" y2="6" />
                                                <line x1="8" y1="2" x2="8" y2="6" />
                                                <line x1="3" y1="10" x2="21" y2="10" />
                                            </svg>
                                        </div>
                                        <span>Ver calendario</span>

                                    </button>
                                </li>
                                <li>
                                    <button className="rp-action-btn">
                                        <div className="rp-action-icon bg-purple">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                            </svg>
                                        </div>
                                        <span>Enviar mensaje</span>

                                    </button>
                                </li>
                                <li>
                                    <button className="rp-action-btn">
                                        <div className="rp-action-icon bg-orange">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                                                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                                            </svg>
                                        </div>
                                        <span>Subir archivo</span>

                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* 2. Resumen */}
                        <div className="rp-widget">
                            <h4 className="rp-widget-title">
                                <span className="rp-icon-chart"></span>Resumen
                            </h4>
                            <ul className="rp-summary-list">
                                <li>
                                    <div className="rp-summary-item">
                                        <span className="rp-summary-icon">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                                                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                                <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                            </svg>
                                        </span>
                                        <span>Clases activas</span>
                                    </div>
                                    <span className="rp-summary-value">0</span>
                                </li>
                                <li>
                                    <div className="rp-summary-item">
                                        <span className="rp-summary-icon">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                <circle cx="9" cy="7" r="4" />
                                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                            </svg>
                                        </span>
                                        <span>Estudiantes</span>
                                    </div>
                                    <span className="rp-summary-value">0</span>
                                </li>
                                <li>
                                    <div className="rp-summary-item">
                                        <span className="rp-summary-icon">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                <line x1="16" y1="2" x2="16" y2="6" />
                                                <line x1="8" y1="2" x2="8" y2="6" />
                                                <line x1="3" y1="10" x2="21" y2="10" />
                                            </svg>
                                        </span>
                                        <span>Próximos eventos</span>
                                    </div>
                                    <span className="rp-summary-value">0</span>
                                </li>
                            </ul>
                        </div>

                        {/* 3. Tarjeta Decorativa */}
                        <div className="rp-quote-card">
                            <h4 className="rp-quote-title">La educación nos conecta</h4>
                            <p className="rp-quote-text">Cada clase es una oportunidad para construir un mejor futuro.</p>
                            <div className="rp-quote-icon">🚀</div>
                        </div>
                    </>
                );
            case 'clases':
                return (
                    <div className="rp-widget">
                        <p className="rp-placeholder">Panel de herramientas para clases (próximamente)</p>
                    </div>
                );
            default:
                return (
                    <div className="rp-widget">
                        <p className="rp-placeholder">Selecciona una opción para ver sus herramientas.</p>
                    </div>
                );
        }
    };

    return (
        <aside className="right-panel-container">
            {renderPanelContent()}
        </aside>
    );
}