import React, { useState } from 'react';
import './HomeView.css';
import JoinSchoolModal from './JoinSchoolModal';

export default function HomeView({ userProfile }) {
    // Extraemos el rol, por defecto 'alumno' por seguridad
    //const role = userProfile?.rol || 'alumno';
    const firstName = userProfile?.firstname || userProfile?.firstName || 'Docente';

    const [isJoinModalOpen, setJoinModalOpen] = useState(false);

    return (
        <div className="hv-container">

            {/* Encabezado de bienvenida */}
            <div className="hv-header">
                <div>
                    <h2 className="hv-title">
                        ¡Hola, {firstName}!
                    </h2>
                    <p className="hv-subtitle">
                        Tu aula, tus estudiantes y todas las herramientas para hacer la educación una gran experiencia.
                    </p>
                </div>
                {/* Ilustración encabezado, derecha */}
                <div className="hv-illustration">
                    <img src="/escritorio.png" alt="Escritorio" className="hv-illustration-img" />
                </div>
            </div>

            {/* Unirse a un colegio */}
            <div className="hv-join-card">
                <div className="hv-join-content">
                    {/* Imagen colegio */}
                    <div className="hv-join-icon">
                        <img src="/school.png" alt="Escritorio" className="hv-illustration-img" />
                    </div>

                    {/* Contenido texto */}
                    <div>
                        <span className="hv-step-badge">
                            Primer paso
                        </span>
                        <h3 className="hv-step-title">
                            Unirse a un colegio
                        </h3>
                        <p className="hv-step-desc">
                            Conéctate con tu colegio para acceder a tus clases, estudiantes y recursos.
                        </p>

                        {/* Checks */}
                        <div className="hv-checks-container">
                            <span className="hv-check-item">
                                <span className="hv-check-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                </span> Accede a tus clases
                            </span>
                            <span className="hv-check-item">
                                <span className="hv-check-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                </span> Gestiona tus estudiantes
                            </span>
                            <span className="hv-check-item">
                                <span className="hv-check-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                </span> Utiliza los recursos del colegio
                            </span>
                        </div>
                    </div>
                </div>

                {/* Botón "unirse a un colegio" */}
                <button className="hv-btn-primary" onClick={() => setJoinModalOpen(true)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Unirse a un colegio <span></span>
                </button>
            </div>

            {/* 3. Sección "Mis Clases" */}
            <div className="hv-classes-card">
                {/* Encabezado tarjeta */}
                <div className="hv-classes-header">
                    <div>
                        <h3 className="hv-classes-title">
                            Mis clases
                        </h3>
                        <p className="hv-classes-subtitle">
                            Las clases a las que te has unido aparecerán aquí.
                        </p>
                    </div>
                    <button className="hv-btn-view-all">
                        Ver todas
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>

                {/* Estado vacío "Aún no estas en ninguna clase") */}
                <div className="hv-empty-state">

                    <div className="hv-folder-wrapper">
                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="58" height="58">
                                                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                                            </svg>
                        <div className="hv-plus-badge">+</div>
                    </div>

                    <h4 className="hv-empty-title">
                        Aún no estás en ninguna clase
                    </h4>
                    <p className="hv-empty-desc">
                        Únete a un colegio para comenzar a ver tus clases.
                    </p>

                    {/* Botón secundario "Unirse a clase" */}
                    <button className="hv-btn-secondary">
                        Unirse a un colegio
                    </button>
                </div>
            </div>


            <JoinSchoolModal
                isOpen={isJoinModalOpen}
                onClose={() => setJoinModalOpen(false)}
            />

        </div>
    );
}