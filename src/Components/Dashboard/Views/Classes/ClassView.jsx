import React, { useState, useEffect } from 'react';
import './ClassView.css';
import ClassDetail from './ClassDetail';
import { createPortal } from 'react-dom';
import ClassStudents from './ClassStudents';
import ClassJoinRequests from './ClassJoinRequests';


export default function ClassView({ userProfile, firebaseUser, onOpenClass }) {
    // asignamos un rol por defecto si aún no carga
    const role = userProfile?.rol || 'docente';

    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [creatingClass, setCreatingClass] = useState(false);
    const [createClassError, setCreateClassError] = useState('');

    // Consulta las clases del usuario autenticado

    const [classes, setClasses] = useState([]);
    const [loadingClasses, setLoadingClasses] = useState(true);
    const [classesError, setClassesError] = useState('');

    // Detalles clase
    const [modalSection, setModalSection] = useState('details');

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    useEffect(() => {
        if (!firebaseUser) {
            setClasses([]);
            setLoadingClasses(false);
            return;
        }

        const controller = new AbortController();

        const fetchClasses = async () => {
            setLoadingClasses(true);
            setClassesError('');

            try {
                const token = await firebaseUser.getIdToken();

                const response = await fetch(
                    `${API_URL}/api/classrooms/mine`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        signal: controller.signal
                    }
                );

                const data = await response.json();

                if (!response.ok || !data.ok) {
                    throw new Error(
                        data.message || 'Error al cargar las clases'
                    );
                }

                if (!controller.signal.aborted) {
                    setClasses(data.classes);
                }

            } catch (error) {
                if (!controller.signal.aborted) {
                    setClassesError(error.message);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoadingClasses(false);
                }
            }
        };

        fetchClasses();

        return () => controller.abort();

    }, [firebaseUser, API_URL]);



    const handleCreateClass = async (event) => {
        event.preventDefault();

        if (creatingClass) return;

        setCreatingClass(true);
        setCreateClassError('');

        try {
            const formData = new FormData(event.currentTarget);

            const name = String(formData.get('name') || '').trim();
            const gradeLevel = String(formData.get('gradeLevel') || '');
            const section = String(formData.get('section') || '');
            const academicYear = String(formData.get('academicYear') || '');
            const description = String(formData.get('description') || '').trim();
            const joinMode = String(formData.get('joinMode') || 'approval');

            if (!name || !gradeLevel || !section || !academicYear) {
                throw new Error('Completa todos los campos obligatorios.');
            }

            if (name.length > 120) {
                throw new Error('El nombre no puede superar 120 caracteres.');
            }

            if (description.length > 500) {
                throw new Error('La descripción no puede superar 500 caracteres.');
            }

            const token = await firebaseUser.getIdToken();

            const response = await fetch(`${API_URL}/api/classrooms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    gradeLevel,
                    section,
                    academicYear,
                    description,
                    joinMode,
                    schoolId: null
                })
            });

            const data = await response.json();

            if (!response.ok || !data.ok) {
                throw new Error(
                    data.message || 'No se pudo crear la clase.'
                );
            }

            const newClass = data.classroom;

            // Agregar la clase a las tarjetas existentes
            setClasses((previousClasses) => [
                {
                    id: newClass.id,
                    title: newClass.name,
                    category: newClass.gradeLevel || 'Clase',
                    code: newClass.classCode,
                    joinMode: newClass.joinMode,
                    schoolId: newClass.schoolId,
                    status: newClass.status,
                    students: 0
                },
                ...previousClasses
            ]);

            setCreateModalOpen(false);
            console.log('Clase creada correctamente');

        } catch (error) {
            setCreateClassError(error.message);
            console.error('Error creando clase:', error);
        } finally {
            setCreatingClass(false);
        }
    };

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
                            {creatingClass ? 'Creando clase...' : 'Crear clase'}
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
                    <span className="cv-badge-count">{classes.length}</span>
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

            {loadingClasses ? (
                <p>Cargando tus clases...</p>
            ) : classesError ? (
                <p role="alert" style={{ color: '#dc2626' }}>
                    {classesError}
                </p>
            ) : classes.length > 0 ? (
                <div className="cv-classes-grid">

                    {classes.map((cls) => (
                        <div
                            className="cv-class-card"
                            key={cls.id}
                            onClick={() => onOpenClass?.(cls)}
                            onKeyDown={(event) => {
                                if (
                                    event.target === event.currentTarget &&
                                    (event.key === 'Enter' || event.key === ' ')
                                ) {
                                    event.preventDefault();
                                    onOpenClass?.(cls);
                                }
                            }}
                            tabIndex={0}
                            aria-label={`Entrar a la clase ${cls.title}`}
                        >

                            <div className="cv-card-header">
                                <span
                                    className="cv-tag"
                                    style={{
                                        backgroundColor: '#f0f9ff',
                                        color: '#0284c7'
                                    }}
                                >
                                    {cls.category}
                                </span>
                                <button className="cv-btn-options">⋮</button>
                            </div>

                            <div
                                className="cv-card-illustration"
                                style={{
                                    backgroundColor: '#f0f9ff',
                                    overflow: 'hidden',
                                    padding: '1.5rem'
                                }}
                            >
                                <img
                                    src={'/class.png'}
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
                                        <strong>
                                            {cls.joinMode === 'automatic' ? 'Rápido' : 'Aprobación'}
                                        </strong>
                                        <span>Modo de ingreso</span>
                                    </div>
                                </div>
                            </div>

                            <div className="cv-card-footer">
                                <button type="button" className="cv-btn-view" onClick={(event) => { event.stopPropagation(); onOpenClass?.(cls); }} >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                    Entrar a clase
                                </button>
                                <button
                                    type="button"
                                    className="cv-btn-more"
                                    title="Ver detalles de la clase"
                                    aria-label={`Ver detalles de ${cls.title}`}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        setSelectedClassId(cls.id);
                                        setModalSection('details');
                                    }}
                                >
                                    •••
                                </button>
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
                            backgroundColor: 'white', padding: '2.5rem', borderRadius: '20px',
                            width: '90%', maxWidth: '580px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                            position: 'relative'
                        }}
                    >
                        <button
                            onClick={() => setCreateModalOpen(false)}
                            style={{
                                position: 'absolute', top: '20px', right: '20px', background: 'none',
                                border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#94a3b8'
                            }}
                        >
                            &times;
                        </button>

                        {/* Cabecera del Modal */}
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center' }}>
                            <div style={{ backgroundColor: '#fef3c7', padding: '0.8rem', borderRadius: '50%', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.3rem', color: '#1e293b', margin: '0 0 0.25rem 0', fontWeight: '800' }}>Crear una nueva clase</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Completa la información para organizar tu clase.</p>
                            </div>
                        </div>

                        {/* --- INICIO DEL FORMULARIO --- */}
                        <form onSubmit={handleCreateClass}>

                            {/* 1. Nombre de la clase */}
                            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569', marginBottom: '0.5rem', fontWeight: '600' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                                    Nombre de la clase *
                                </label>
                                <input

                                    name="name"
                                    type="text"
                                    required
                                    placeholder="Ej. Matemáticas - 1° Básico"
                                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.95rem', boxSizing: 'border-box', outlineColor: '#d97706', color: '#334155' }}
                                />
                            </div>

                            {/* Fila para Grado y Sección */}
                            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', textAlign: 'left' }}>

                                {/* 2. Grado (Listbox) */}
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569', marginBottom: '0.5rem', fontWeight: '600' }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                                        Grado *
                                    </label>
                                    <select
                                        name="gradeLevel"
                                        required
                                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.95rem', backgroundColor: 'white', boxSizing: 'border-box', outlineColor: '#d97706', color: '#64748b' }}
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Selecciona un grado</option>
                                        <option value="1ro Primaria">1ro Primaria</option>
                                        <option value="2do Primaria">2do Primaria</option>
                                        <option value="3ro Primaria">3ro Primaria</option>
                                        <option value="1ro Básico">1ro Básico</option>
                                    </select>
                                </div>

                                {/* 3. Sección */}
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569', marginBottom: '0.5rem', fontWeight: '600' }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                        Sección *
                                    </label>
                                    <select
                                        required
                                        name="section"
                                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.95rem', backgroundColor: 'white', boxSizing: 'border-box', outlineColor: '#d97706', color: '#64748b' }}
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Selecciona una sección</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="Unica">Única</option>
                                    </select>
                                </div>
                            </div>

                            {/* 4. Año de la clase (Listbox) */}
                            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569', marginBottom: '0.5rem', fontWeight: '600' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    Año escolar*
                                </label>
                                <select
                                    required
                                    name="academicYear"
                                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.95rem', backgroundColor: 'white', boxSizing: 'border-box', outlineColor: '#d97706', color: '#334155' }}
                                    defaultValue="2026"
                                >
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                </select>
                            </div>

                            {/* approval */}
                            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                                <label
                                    htmlFor="classJoinMode"
                                    style={{
                                        display: 'block',
                                        fontSize: '0.85rem',
                                        color: '#475569',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600'
                                    }}
                                >
                                    Modo de ingreso a la clase
                                </label>

                                <select
                                    id="classJoinMode"
                                    name="joinMode"
                                    defaultValue="approval"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '10px',
                                        border: '1px solid #cbd5e1',
                                        fontSize: '0.95rem',
                                        backgroundColor: 'white',
                                        color: '#334155'
                                    }}
                                >
                                    <option value="approval">
                                        Requiere aprobación del docente
                                    </option>

                                    <option value="automatic">
                                        Ingreso automático con código
                                    </option>
                                </select>

                                <p style={{
                                    fontSize: '0.75rem',
                                    color: '#64748b',
                                    marginTop: '0.5rem'
                                }}>
                                    Podrás cambiar esta configuración después.
                                </p>
                            </div>


                            {/* 5. Descripción */}
                            <div style={{ marginBottom: '1.5rem', textAlign: 'left', position: 'relative' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569', marginBottom: '0.5rem', fontWeight: '600' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                    Descripción (opcional)
                                </label>
                                <textarea
                                    name="description"
                                    maxLength={500}
                                    placeholder="Agrega una breve descripción de la clase, temas o información relevante..."
                                    rows="3"
                                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.95rem', resize: 'none', boxSizing: 'border-box', outlineColor: '#d97706', fontFamily: 'inherit', color: '#334155' }}
                                ></textarea>
                                <span style={{ position: 'absolute', bottom: '10px', right: '15px', fontSize: '0.75rem', color: '#94a3b8' }}>
                                    0/500
                                </span>
                            </div>

                            {createClassError && (
                                <p
                                    role="alert"
                                    style={{
                                        color: '#dc2626',
                                        fontSize: '0.85rem',
                                        marginBottom: '1rem'
                                    }}
                                >
                                    {createClassError}
                                </p>
                            )}

                            {/* Acciones (Botones inferiores) */}
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setCreateModalOpen(false)}
                                    style={{ padding: '0.75rem 1.5rem', backgroundColor: 'white', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '30px', cursor: 'pointer', fontWeight: '700', fontSize: '0.95rem', minWidth: '120px' }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={creatingClass}
                                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.5rem', backgroundColor: '#d97706', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: '700', fontSize: '0.95rem', minWidth: '150px' }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                    Crear clase
                                </button>
                            </div>
                        </form>
                        {/* --- FIN DEL FORMULARIO - CREAR CLASE --- */}

                    </div>
                </div>
            )}

            {/* MODAL INDEPENDIENTE - DETALLES DE CLASE */}

            {selectedClassId && createPortal(
                <div
                    className="class-detail-overlay"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) {
                            setSelectedClassId(null);
                        }
                    }}
                >
                    <div
                        className="class-detail-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Detalles de la clase"
                    >
                        <button
                            type="button"
                            className="class-detail-close"
                            onClick={() => setSelectedClassId(null)}
                            aria-label="Cerrar detalles"
                            autoFocus
                        >
                            &times;
                        </button>



                        {modalSection === 'details' ? (
                            <ClassDetail
                                classroomId={selectedClassId}
                                firebaseUser={firebaseUser}
                                onBack={() => setSelectedClassId(null)}
                                onManageStudents={() =>
                                    setModalSection('students')
                                }
                                onManageRequests={() =>
                                    setModalSection('requests')
                                }
                                onSettingsUpdated={(settings) => {
                                    setClasses((previous) =>
                                        previous.map((cls) =>
                                            cls.id === settings.id
                                                ? {
                                                    ...cls,
                                                    joinMode: settings.joinMode
                                                }
                                                : cls
                                        )
                                    );
                                }}
                            />
                        ) : modalSection === 'students' ? (
                            <ClassStudents
                                classroomId={selectedClassId}
                                firebaseUser={firebaseUser}
                                onBack={() =>
                                    setModalSection('details')
                                }
                                onStudentsChanged={(count) => {
                                    setClasses((previous) =>
                                        previous.map((cls) =>
                                            cls.id === selectedClassId
                                                ? { ...cls, students: count }
                                                : cls
                                        )
                                    );
                                }}
                            />
                        ) : (
                            <ClassJoinRequests
                                classroomId={selectedClassId}
                                firebaseUser={firebaseUser}
                                onBack={() =>
                                    setModalSection('details')
                                }
                                onApproved={async () => {
                                    try {
                                        const token = await firebaseUser.getIdToken();

                                        const response = await fetch(
                                            `${API_URL}/api/classrooms/mine`,
                                            {
                                                headers: {
                                                    Authorization: `Bearer ${token}`
                                                }
                                            }
                                        );

                                        if (!response.ok) return;

                                        const data = await response.json();

                                        if (data.ok) {
                                            setClasses(data.classes);
                                        }
                                    } catch (error) {
                                        console.error(
                                            'No se pudo actualizar el contador:',
                                            error
                                        );
                                    }
                                }}
                            />
                        )}


                    </div>
                </div>,
                document.body
            )}

            {/* FIN MODAL - DETALLES DE CLASE */}

        </div >
    );
}