import React, { useState } from 'react';
import {
    ArrowRight,
    BookOpen,
    Plus,
    School,
    Lightbulb
} from 'lucide-react';
import './HomeView.css';
import JoinSchoolModal from './JoinSchoolModal';

/**
 * Rediseño visual de la vista Inicio existente.
 * Mantiene el modal de unión a colegios y recibe userProfile como antes.
 * onGoToClasses es opcional y permite enlazar con la navegación existente.
 */
export default function HomeView({ userProfile, onGoToClasses }) {
    const firstName =
        userProfile?.firstname || userProfile?.firstName || 'Docente';

    const [isJoinModalOpen, setJoinModalOpen] = useState(false);

    return (
        <div className="hv-container">
            {/* Bienvenida compacta */}
            <header className="hv-header">
                <div className="hv-header-text">
                    {/* <span className="hv-eyebrow">BIENVENIDO A AULA CONECTA</span> */}
                    <h1 className="hv-title">¡Hola, {firstName}!</h1>
                    <p className="hv-subtitle">
                        Organiza tus clases, comparte conocimientos y acompaña
                        el aprendizaje de tus estudiantes.
                    </p>
                </div>
                <div className="hv-illustration" aria-hidden="true">
                    <img src="/escritorio.png" alt="" className="hv-illustration-img" />
                </div>
            </header>

            {/* Accesos principales: reutiliza la navegación actual del Dashboard */}
            <section className="hv-workspace" aria-labelledby="hv-workspace-title">
                {/* <div className="hv-section-heading">
                    <h2 id="hv-workspace-title">Tu espacio de trabajo</h2>
                    <p>Accede a las herramientas que utilizas cada día.</p>
                </div> */}

                <div className="hv-action-grid">
                    <article className="hv-classes-card">
                        <span className="hv-card-icon hv-card-icon--blue" aria-hidden="true">
                            <BookOpen size={22} strokeWidth={1.9} />
                        </span>
                        <div className="hv-card-content">
                            <h3>Tus clases</h3>
                            <p>
                                Consulta publicaciones, administra estudiantes
                                y configura tus aulas.
                            </p>
                        </div>

                        {typeof onGoToClasses === 'function' ? (
                            <button
                                type="button"
                                className="hv-card-link"
                                onClick={onGoToClasses}
                            >
                                Ver mis clases
                                <ArrowRight size={16} aria-hidden="true" />
                            </button>
                        ) : (
                            <span className="hv-card-note">
                                Accede desde «Tus clases» en el menú lateral.
                            </span>
                        )}
                    </article>

                    <article className="hv-join-card">
                        <div className="hv-card-top">
                            <span className="hv-card-icon hv-card-icon--gold" aria-hidden="true">
                                <School size={22} strokeWidth={1.9} />
                            </span>
                            <span className="hv-step-badge">OPCIONAL</span>
                        </div>

                        <div className="hv-card-content">
                            <h3>Unirse a un colegio</h3>
                            <p>
                                Vincula tu perfil con una institución para
                                participar en su comunidad educativa.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="hv-btn-primary"
                            onClick={() => setJoinModalOpen(true)}
                        >
                            <Plus size={16} aria-hidden="true" />
                            Unirse a un colegio
                        </button>
                    </article>
                </div>
            </section>

            {/* <section className="hv-tip" aria-label="Información sobre clases independientes">
                <span className="hv-tip-icon" aria-hidden="true">
                    <Lightbulb size={20} strokeWidth={1.9} />
                </span>
                <div>
                    <h2>Tu aula, a tu manera</h2>
                    <p>
                        Puedes crear y gestionar clases independientes sin
                        vincularte obligatoriamente a un colegio.
                    </p>
                </div>
            </section> */}

            {/* Mantener la funcionalidad existente del modal */}
            <JoinSchoolModal
                isOpen={isJoinModalOpen}
                onClose={() => setJoinModalOpen(false)}
            />
        </div>
    );
}
