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
            {role === 'docente' && (
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
                        
                        {/* Aquí construiremos los inputs del formulario en el siguiente paso */}
                        <div style={{ padding: '2rem', border: '2px dashed #e2e8f0', borderRadius: '8px', textAlign: 'center', color: '#94a3b8' }}>
                            Espacio para el formulario de creación
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}