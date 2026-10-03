import React from 'react';

export default function Publications({ userProfile }) {
    // Extraemos el rol, por defecto 'alumno' por seguridad
    const role = userProfile?.rol || 'alumno';

    return (
        <div className="view-container" style={{ padding: '1rem 0' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '0.5rem' }}>Inicio / Publicaciones</h2>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Últimas novedades y anuncios del aula.</p>
            </div>

            {/* Renderizado condicional basado en el rol */}
            <div className="role-specific-actions" style={{ marginBottom: '2rem' }}>
                
                {role === 'docente' && (
                    <div style={{ display: 'flex', gap: '1rem', padding: '1.5rem', backgroundColor: '#fcf6e5', borderRadius: '12px', border: '1px dashed #d49a1c' }}>
                        <div>
                            <h3 style={{ fontSize: '1rem', color: '#8c6314', marginBottom: '0.5rem' }}>Panel de Docente</h3>
                            <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>Crea nuevos anuncios para tus clases o envía circulares a los padres.</p>
                            <button style={{ padding: '0.6rem 1.2rem', backgroundColor: '#d49a1c', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                                + Nueva Publicación
                            </button>
                        </div>
                    </div>
                )}

                {role === 'alumno' && (
                    <div style={{ padding: '1.5rem', backgroundColor: '#f0f4f8', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                        <h3 style={{ fontSize: '1rem', color: '#334155', marginBottom: '0.5rem' }}>Tus pendientes</h3>
                        <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Revisa las últimas instrucciones de tus profesores. Tienes 2 tareas próximas a vencer.</p>
                    </div>
                )}

                {role === 'padre' && (
                    <div style={{ padding: '1.5rem', backgroundColor: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                        <h3 style={{ fontSize: '1rem', color: '#166534', marginBottom: '0.5rem' }}>Resumen para Padres</h3>
                        <p style={{ fontSize: '0.8rem', color: '#15803d' }}>Consulte los avisos generales de la institución y el rendimiento reciente de su hijo.</p>
                    </div>
                )}
                
            </div>

            {/* Contenido general visible para todos */}
            <div className="feed-area" style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '2rem', textAlign: 'center', backgroundColor: 'white' }}>
                <p style={{ color: '#94a3b8' }}>El muro de publicaciones aparecerá aquí...</p>
            </div>
        </div>
    );
}