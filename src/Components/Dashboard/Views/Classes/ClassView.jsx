import React, { useState } from 'react';
import './ClassView.css';

export default function ClassView({ userProfile }) {
    // asignamos un rol por defecto si aún no carga
    const role = userProfile?.rol || 'docente';

    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    // Semillas ejemplificacion
    const mockClasses = [
        {
            id: 1,
            category: 'Matemáticas',
            title: 'Matemáticas - 1º Básico',
            code: 'MAT-1B-2025',
            students: 24,
            events: 12,
            bgColor: '#f0f9ff',
            textColor: '#0284c7',
            illustration: '/class.png'
        },
        {
            id: 2,
            category: 'Ciencias',
            title: 'Ciencias Naturales - 2º Básico',
            code: 'CN-2B-2025',
            students: 22,
            events: 8,
            bgColor: '#f0f9ff',
            textColor: '#0284c7',
            illustration: '/class.png'
        },
        {
            id: 3,
            category: 'Lenguaje',
            title: 'Lengua y Literatura - 3º Básico',
            code: 'LY-3B-2025',
            students: 22,
            events: 6,
            bgColor: '#f0f9ff',
            textColor: '#0284c7',
            illustration: '/class.png'
        }
    ];

    return (
        <div className="cv-container">
            {/* Cabecera */}
            {/* <div className="cv-header-section">
                <h2 className="cv-title">
                    <svg className="cv-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                    Tus clases
                </h2>
                <p className="cv-subtitle">Gestiona tu entorno de aprendizaje y materiales.</p>
            </div> */}

            {/* Renderizado específico para Docentes */}
            {role === 'docente' && (
                <div className="cv-banner-create">
                    <div className="cv-banner-illustration">
                        <img src="/escritorio.png" alt="Escritorio" className="hv-illustration-img" />
                    </div>
                    <div className="cv-banner-content">
                        <h3>Crea una nueva clase</h3>
                        <p>Organiza tus contenidos, invita a tus estudiantes y comienza a compartir el conocimiento.</p>
                        <button className="cv-btn-create" onClick={() => setCreateModalOpen(true)}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            Crear clase
                        </button>
                    </div>
                </div>
            )}

            {/* Renderizado específico para Alumnos */}
            {role === 'alumno' && (
                <div style={{ padding: '1.5rem', backgroundColor: '#f0f4f8', borderRadius: '12px', border: '1px solid #cbd5e1', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1rem', color: '#334155', marginBottom: '0.5rem' }}>Materias Inscritas</h3>
                    <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>Ingresa el código proporcionado por tu profesor para unirte a una nueva clase.</p>
                    <button style={{ padding: '0.6rem 1.2rem', backgroundColor: 'white', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Unirse con código
                    </button>
                </div>
            )}

            {/* Renderizado específico para Padres */}
            {role === 'padre' && (
                <div style={{ padding: '1.5rem', backgroundColor: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1rem', color: '#166534', marginBottom: '0.5rem' }}>Supervisión de Clases</h3>
                    <p style={{ fontSize: '0.8rem', color: '#15803d' }}>Visualiza las aulas a las que están inscritos tus hijos y contacta a los docentes.</p>
                </div>
            )}





            {/* Controles de Lista de Clases */}
            <div className="cv-list-header">
                <div className="cv-list-title-group">
                    <h3>Mis clases</h3>
                    <span className="cv-badge-count">{mockClasses.length}</span>
                    <p>Aquí encontrarás todas las clases que has creado.</p>
                </div>
                <div className="cv-list-actions">
                    <div className="cv-search-box">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input type="text" placeholder="Buscar clases..." />
                    </div>
                    <button className="cv-btn-filter">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                            <line x1="4" y1="21" x2="4" y2="14"></line>
                            <line x1="4" y1="10" x2="4" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12" y2="3"></line>
                            <line x1="20" y1="21" x2="20" y2="16"></line>
                            <line x1="20" y1="12" x2="20" y2="3"></line>
                            <line x1="1" y1="14" x2="7" y2="14"></line>
                            <line x1="9" y1="8" x2="15" y2="8"></line>
                            <line x1="17" y1="16" x2="23" y2="16"></line>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Cuadrícula de Clases, condicional si esta vacío */}

            {mockClasses.length > 0 ? (
                <div className="cv-classes-grid">
                    {mockClasses.map((cls) => (
                        <div className="cv-class-card" key={cls.id}>
                            <div className="cv-card-header">
                                <span
                                    className="cv-tag"
                                    style={{
                                        backgroundColor: cls.bgColor,
                                        color: cls.textColor
                                    }}
                                >
                                    {cls.category}
                                </span>
                                <button className="cv-btn-options">⋮</button>
                            </div>

                            <div
                                className="cv-card-illustration"
                                style={{
                                    backgroundColor: cls.bgColor,
                                    overflow: 'hidden',
                                    padding: '1.5rem'
                                }}
                            >
                                <img 
                                src={cls.illustration} 
                                alt={`Portada de ${cls.title}`} 
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain', 
                                    objectPosition: 'center'
                                }}
                            />
                            </div>

                            <div className="cv-card-info">
                                <h4>{cls.title}</h4>
                                <span className="cv-code">Código: {cls.code}</span>
                            </div>

                            <div className="cv-card-stats">
                                <div className="cv-stat">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                    <div>
                                        <strong>{cls.students}</strong>
                                        <span>Estudiantes</span>
                                    </div>
                                </div>
                                <div className="cv-stat">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    <div>
                                        <strong>{cls.events}</strong>
                                        <span>Próximos eventos</span>
                                    </div>
                                </div>
                            </div>

                            <div className="cv-card-footer">
                                <button className="cv-btn-view">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                    Ver clase
                                </button>
                                <button className="cv-btn-more">•••</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '3.5rem',
                    textAlign: 'center',
                    backgroundColor: '#ffffff'
                }}>
                    <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Aún no hay clases registradas...</p>
                </div>
            )}


            {/* MODAL para crear clase */}
            {isCreateModalOpen && (
                <div
                    className="modal-overlay"
                    onClick={() => setCreateModalOpen(false)}
                    style={{
                        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                        backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center',
                        alignItems: 'center', zIndex: 1000
                    }}
                >
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: 'white', padding: '2.5rem', borderRadius: '16px',
                            width: '90%', maxWidth: '500px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                            position: 'relative'
                        }}
                    >
                        <button
                            onClick={() => setCreateModalOpen(false)}
                            style={{
                                position: 'absolute', top: '15px', right: '15px', background: 'none',
                                border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#94a3b8'
                            }}
                        >
                            &times;
                        </button>

                        <h3 style={{ fontSize: '1.25rem', color: '#1a1a1a', marginBottom: '1.5rem' }}>Nueva Clase</h3>

                        <div style={{ padding: '2rem', border: '2px dashed #e2e8f0', borderRadius: '8px', textAlign: 'center', color: '#94a3b8' }}>
                            {/* --- INICIO DEL FORMULARIO --- */}
                            <form onSubmit={(e) => { e.preventDefault(); console.log('Clase creada'); setCreateModalOpen(false); }}>
                                {/* 1. Nombre de la clase */}
                                <div style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
                                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#475569', marginBottom: '0.4rem', fontWeight: '600' }}>Nombre de la clase *</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ej. Matemáticas"
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box', outlineColor: '#d49a1c' }}
                                    />
                                </div>

                                {/* Fila para Grado y Sección */}
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', textAlign: 'left' }}>
                                    {/* 2. Grado (Listbox) */}
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#475569', marginBottom: '0.4rem', fontWeight: '600' }}>Grado *</label>
                                        <select
                                            required
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', backgroundColor: 'white', boxSizing: 'border-box', outlineColor: '#d49a1c' }}
                                        >
                                            <option value="">Selecciona...</option>
                                            <option value="1ro Primaria">1ro Primaria</option>
                                            <option value="2do Primaria">2do Primaria</option>
                                            <option value="3ro Primaria">3ro Primaria</option>
                                            <option value="1ro Básico">1ro Básico</option>
                                            <option value="2do Básico">2do Básico</option>
                                            <option value="3ro Básico">3ro Básico</option>
                                        </select>
                                    </div>

                                    {/* 3. Sección */}
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#475569', marginBottom: '0.4rem', fontWeight: '600' }}>Sección *</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Ej. A, B, Única"
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box', outlineColor: '#d49a1c' }}
                                        />
                                    </div>
                                </div>

                                {/* 4. Año de la clase (Listbox) */}
                                <div style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
                                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#475569', marginBottom: '0.4rem', fontWeight: '600' }}>Año lectivo *</label>
                                    <select
                                        required
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', backgroundColor: 'white', boxSizing: 'border-box', outlineColor: '#d49a1c' }}
                                    >
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                        <option value="2028">2028</option>
                                    </select>
                                </div>

                                {/* 5. Descripción */}
                                <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#475569', marginBottom: '0.4rem', fontWeight: '600' }}>Descripción</label>
                                    <textarea
                                        placeholder="Breve descripción o presentación del curso..."
                                        rows="3"
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', resize: 'vertical', boxSizing: 'border-box', outlineColor: '#d49a1c', fontFamily: 'inherit' }}
                                    ></textarea>
                                </div>

                                {/* Acciones (Botones inferiores) */}
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                                    <button
                                        type="button"
                                        onClick={() => setCreateModalOpen(false)}
                                        style={{ padding: '0.6rem 1.2rem', backgroundColor: 'white', color: '#64748b', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        style={{ padding: '0.6rem 1.5rem', backgroundColor: '#d49a1c', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}
                                    >
                                        Crear Clase
                                    </button>
                                </div>
                            </form>
                            {/* --- FIN DEL FORMULARIO --- */}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}