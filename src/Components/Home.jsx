import './Home.css';

export default function Home() {
    const handleCtaClick = (e, action) => {
        e.preventDefault();
        console.log(`Action clicked: ${action}`);
    };

    const handleScrollDown = (e) => {
        e.preventDefault();
        window.scrollTo({
            top: window.innerHeight * 0.8,
            behavior: 'smooth'
        });
    };

    return (
        <main className="home-main">
            <div className="home-container">
                <section className="hero-content">
                    <div className="hero-badge" role="status">
                        <svg
                            className="badge-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
                            <path d="M22 10v6" />
                            <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
                        </svg>
                        <span className="badge-text">Plataforma educativa integrada</span>
                    </div>

                    <h1 className="hero-title">
                        Unete a la evolución <br />
                        del <span className="highlight-gold">aula digital</span>
                    </h1>

                    <p className="hero-description">
                        Una red social educativa, diseñado para conectar a docentes, alumnos y padres en un entorno centralizado.
                    </p>


                    <div className="hero-actions">
                        <a
                            href="#comenzar"
                            className="btn btn-primary"
                            onClick={(e) => handleCtaClick(e, 'comenzar')}
                        >
                            <svg
                                className="btn-icon"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                {/* Users / Social icon */}
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            <span>Comenzar ahora</span>
                        </a>

                        <a
                            href="#conoce-mas"
                            className="btn btn-secondary"
                            onClick={(e) => handleCtaClick(e, 'conoce-mas')}
                        >
                            <svg
                                className="btn-icon play-icon"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                {/* Play triangle */}
                                <polygon points="6 4 20 12 6 20 6 4" />
                            </svg>
                            <span>Conoce más</span>
                        </a>
                    </div>

                    <div className="hero-features">
                        <div className="feature-card">
                            <div className="feature-icon-wrapper">
                                <svg
                                    className="feature-icon"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    <path d="m9 12 2 2 4-4" />
                                </svg>
                            </div>
                            <div className="feature-text">
                                <h3 className="feature-title">Entorno seguro</h3>
                                <p className="feature-desc">Protegemos tus datos y tu privacidad</p>
                            </div>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon-wrapper">
                                <svg
                                    className="feature-icon"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <div className="feature-text">
                                <h3 className="feature-title">Conexión real</h3>
                                <p className="feature-desc">Comunicación efectiva entre todos</p>
                            </div>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon-wrapper">
                                <svg
                                    className="feature-icon"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M18 20V10" />
                                    <path d="M12 20V4" />
                                    <path d="M6 20v-6" />
                                </svg>
                            </div>
                            <div className="feature-text">
                                <h3 className="feature-title">Mejores resultados</h3>
                                <p className="feature-desc">Herramientas que impulsan el aprendizaje</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="hero-visual">
                    <div className="visual-frame">
                        <img
                            src="/aula.png"
                            alt="Aula de clases moderna y equipada"
                            className="classroom-image"
                            loading="eager"
                        />
                    </div>
                </section>
            </div>

            <div className="bottom-scroll-bar">
                <a
                    href="#scroll"
                    className="scroll-indicator"
                    onClick={handleScrollDown}
                    aria-label="Desplazarse hacia abajo"
                >
                    <svg
                        className="chevron-down-icon"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M12 16.5l-8.5-8.5 1.4-1.4 7.1 7.1 7.1-7.1 1.4 1.4z" />
                    </svg>
                </a>
            </div>
        </main>
    );
}
