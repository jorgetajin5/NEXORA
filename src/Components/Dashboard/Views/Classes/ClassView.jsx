import React, { useState } from 'react';

export default function ClassView({ userProfile }) {
    // asignamos un rol por defecto si aún no carga
    const role = userProfile?.rol || 'alumno';

    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    return (
        <div style={{ padding: '1rem 0' }}>
            {/* Cabecera de la vista */}
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '0.5rem' }}>Tus Clases</h2>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Gestiona tu entorno de aprendizaje y materiales.</p>
            </div>

            {/* Renderizado específico para Docentes */}
            {role === 'alumno' && (
                <div style={{
                    backgroundColor: '#f4f7fb',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    marginBottom: '1.5rem'
                }}>
                    <h3 style={{ fontSize: '1.05rem', color: '#1e293b', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Crear una nueva clase
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>
                        Configura un nuevo espacio virtual para compartir materiales y asignar tareas a tus estudiantes.
                    </p>

                    {/* Botón que dispara el modal */}
                    <button
                        onClick={() => setCreateModalOpen(true)}
                        style={{
                            padding: '0.6rem 1.2rem',
                            backgroundColor: '#ffffff',
                            color: '#334155',
                            border: '1px solid #cbd5e1',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.85rem',
                            transition: 'all 0.2s'
                        }}
                    >
                        + Crear clase
                    </button>
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


            {/* Contenedor de lista vacía */}
            <div style={{
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '3.5rem',
                textAlign: 'center',
                backgroundColor: '#ffffff'
            }}>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Aún no hay clases registradas...</p>
            </div>



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
                        onClick={(e) => e.stopPropagation()} // Evita que el clic interno cierre el modal
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

                        {/* inputs del formulario */}
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