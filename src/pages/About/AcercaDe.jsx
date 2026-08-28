
import React from 'react';
import './AcercaDe.css';
/* Si compartes estilos globales de Home.css para botones e imágenes, 
   asegúrate de que estén disponibles (ej. import './Home.css' o variables globales) */

export default function AcercaDe() {
    return (
        <main className="about-main">
            <div className="about-container">
                <section className="about-content">
                    <div className="hero-badge" role="status">
                        <svg
                            className="badge-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        <span className="badge-text">Nuestra Historia</span>
                    </div>

                    <h1 className="about-title">
                        De un proyecto universitario <br />
                        a la <span className="highlight-gold">evolución digital</span>
                    </h1>

                    <p className="about-description">
                        Lo que comenzó como un reto académico en las aulas, se ha convertido en nuestra misión. NEXORA es el resultado de la visión compartida de un equipo comprometido con transformar y conectar el ecosistema educativo mediante tecnología de punta.
                    </p>

                    <div className="hero-actions">
                        {/* Redirección temporal en broma al proyecto Fedora */}
                        <a
                            href="https://fedoraproject.org/es/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                        >
                            <svg
                                className="btn-icon"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                            <span>Conoce el código (Repo Oficial)</span>
                        </a>

                        {/* Redirección temporal en broma al Kernel de Linux */}
                        <a
                            href="https://kernel.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                        >
                            <svg
                                className="btn-icon play-icon"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                            <span>Proyectos secretos</span>
                        </a>
                    </div>

                    {/* Sección del equipo (Grid 2x2) */}
                    <div className="team-features">
                        {/* Integrante 1 */}
                        <div className="team-card">
                            <div className="team-icon-wrapper">
                                <span style={{ fontWeight: 'bold' }}>JT</span>
                            </div>
                            <div className="team-text">
                                <h3 className="team-title">Ing. Jorge Armando Tajin</h3>
                                <p className="team-role">Cofundador</p>
                            </div>
                        </div>

                        {/* Integrante 2 */}
                        <div className="team-card">
                            <div className="team-icon-wrapper">
                                <span style={{ fontWeight: 'bold' }}>MC</span>
                            </div>
                            <div className="team-text">
                                <h3 className="team-title">Ing. Minor Curruchiche</h3>
                                <p className="team-role">Cofundador</p>
                            </div>
                        </div>

                        {/* Integrante 3 */}
                        <div className="team-card">
                            <div className="team-icon-wrapper">
                                <span style={{ fontWeight: 'bold' }}>AL</span>
                            </div>
                            <div className="team-text">
                                <h3 className="team-title">Ing. Andersson Lopez</h3>
                                <p className="team-role">Cofundador</p>
                            </div>
                        </div>

                        {/* Integrante 4 */}
                        <div className="team-card">
                            <div className="team-icon-wrapper">
                                <span style={{ fontWeight: 'bold' }}>SC</span>
                            </div>
                            <div className="team-text">
                                <h3 className="team-title">Bachiller Samuel Chitamul</h3>
                                <p className="team-role">Cofundador</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="hero-visual">
                    <div className="visual-frame">
                        {/* Puedes cambiar esta imagen después por una del equipo real */}
                        <img
                            src="/aula.png"
                            alt="Equipo de Nexora"
                            className="classroom-image"
                            loading="eager"
                        />
                    </div>
                </section>
            </div>
        </main>
    );
}