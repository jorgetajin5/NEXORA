import React from 'react';

export default function ClassView({ userProfile }) {
    // asignamos un rol por defecto si aún no carga
    const role = userProfile?.rol || 'alumno';

    return (
        <div style={{ padding: '1rem 0' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '0.5rem' }}>Tus Clases</h2>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Gestiona tu entorno de aprendizaje y materiales.</p>
            </div>

            {/* Renderizado específico para Docentes */}
            {role === 'docente' && (
                <div style={{ padding: '1.5rem', backgroundColor: '#fcf6e5', borderRadius: '12px', border: '1px dashed #d49a1c', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1rem', color: '#8c6314', marginBottom: '0.5rem' }}>Gestión de Aulas</h3>
                    <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>Crea nuevos espacios virtuales para tus grupos de estudiantes.</p>
                    <button style={{ padding: '0.6rem 1.2rem', backgroundColor: '#d49a1c', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                        + Crear nueva clase
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

            {/* Contenido general (Lista de clases vacía) */}
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '3rem', textAlign: 'center', backgroundColor: 'white' }}>
                <p style={{ color: '#94a3b8' }}>Aún no hay clases registradas...</p>
            </div>
        </div>
    );
}