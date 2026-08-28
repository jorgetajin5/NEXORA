import './UnderConstruction.css';

const PAGE_TITLES = {
    escuelas: 'Escuelas',
    acerca: 'Acerca de Nexora',
    soporte: 'Centro de Soporte',
    comenzar: 'Registro y Acceso',
    'conoce-mas': 'Conoce más sobre Nexora'
};

export default function UnderConstruction({ pageId = 'escuelas', onNavigate }) {
    const pageName = PAGE_TITLES[pageId] || (pageId ? pageId.charAt(0).toUpperCase() + pageId.slice(1) : 'Esta sección');

    return (
        <main className="construction-main">
            <div className="construction-container">
                <div className="construction-header">
                    <div className="construction-badge">
                        <span className="badge-dot"></span>
                        <span className="badge-text">Próximamente disponible</span>
                    </div>

                    <h1 className="construction-title">
                        Estamos trabajando en <span className="highlight-gold">esta pantalla</span>
                    </h1>

                    <p className="construction-desc">
                        Actualmente el módulo de <strong className="module-name">"{pageName}"</strong> se encuentra en fase de desarrollo activo. Muy pronto podrás acceder a todas sus funcionalidades.
                    </p>
                </div>

                <div className="construction-image-wrapper">
                    <div className="image-card">
                        <img
                            src="/image.png"
                            alt={`Pantalla ${pageName} en construcción`}
                            className="construction-image"
                        />
                    </div>
                </div>

                <div className="construction-actions">
                    <button
                        type="button"
                        className="btn-construction-primary"
                        onClick={() => onNavigate && onNavigate('inicio')}
                    >
                        <svg
                            className="action-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M19 12H5" />
                            <path d="M12 19l-7-7 7-7" />
                        </svg>
                        <span>Volver al Inicio</span>
                    </button>
                </div>
            </div>
        </main>
    );
}
