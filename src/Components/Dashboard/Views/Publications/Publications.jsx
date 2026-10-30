import React from 'react';

export default function Publications({ userProfile }) {
    // Extraemos el rol, por defecto 'alumno' por seguridad
    //const role = userProfile?.rol || 'alumno';
    const firstName = userProfile?.firstname || userProfile?.firstName || 'Docente';

    return (<div style={{ padding: '1rem 0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            
            {/* Encabezado de bienvenida */}
            <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '2.2rem', color: '#1a1a1a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '800' }}>
                        <span role="img" aria-label="wave">👋</span> ¡Hola, {firstName}!
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '600px', margin: 0, lineHeight: '1.5' }}>
                        Tu aula, tus estudiantes y todas las herramientas para hacer la educación una gran experiencia.
                    </p>
                </div>
                {/* Ilustración encabezado, derecha */}
                <div style={{ display: 'none' }}>
                    <img src="/illustration-desk.png" alt="Escritorio" style={{ height: '120px' }} />
                </div>
            </div>

            {/* Unirse a un colegio */}
            <div style={{ 
                backgroundColor: '#fffcf2', 
                borderRadius: '20px', 
                padding: '2rem 2.5rem', 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '2rem',
                border: '1px solid #fde68a',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    {/* Imagen colegio */}
                    <div style={{ width: '120px', height: '120px', backgroundColor: '#fef3c7', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '4rem' }}>
                        🏫
                    </div>
                    
                    {/* Contenido texto */}
                    <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Primer paso
                        </span>
                        <h3 style={{ fontSize: '1.6rem', color: '#1e293b', margin: '0.5rem 0', fontWeight: 'bold' }}>
                            Unirse a un colegio
                        </h3>
                        <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem', maxWidth: '450px', lineHeight: '1.5' }}>
                            Conéctate con tu colegio para acceder a tus clases, estudiantes y recursos.
                        </p>
                        
                        {/* Checks */}
                        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: '#475569', fontWeight: '500' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ color: '#d97706' }}>✔</span> Accede a tus clases
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ color: '#d97706' }}>✔</span> Gestiona tus estudiantes
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ color: '#d97706' }}>✔</span> Utiliza los recursos del colegio
                            </span>
                        </div>
                    </div>
                </div>

                {/* Botón "unirse a un colegio" */}
                <button style={{ 
                    backgroundColor: '#d97706', 
                    color: 'white', 
                    border: 'none', 
                    padding: '0.8rem 1.8rem', 
                    borderRadius: '30px', 
                    fontSize: '1rem', 
                    fontWeight: 'bold', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 6px rgba(217, 119, 6, 0.2)'
                }}>
                    Unirse a un colegio <span>&gt;</span>
                </button>
            </div>

            {/* 3. Sección "Mis Clases" */}
            <div style={{ 
                backgroundColor: '#ffffff', 
                borderRadius: '20px', 
                border: '1px solid #e2e8f0', 
                overflow: 'hidden',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}>
                {/* Encabezado tarjeta */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9' }}>
                    <div>
                        <h3 style={{ fontSize: '1.2rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '10px', margin: 0, fontWeight: 'bold' }}>
                            <span style={{ color: '#d97706', fontSize: '1.4rem' }}>📖</span> Mis clases
                        </h3>
                        <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '0.3rem 0 0 0' }}>
                            Las clases a las que te has unido aparecerán aquí.
                        </p>
                    </div>
                    <button style={{ background: 'none', border: 'none', color: '#0ea5e9', fontWeight: '600', fontSize: '0.95rem', cursor: 'pointer' }}>
                        Ver todas &gt;
                    </button>
                </div>

                {/* Estado vacío "Aún no estas en ninguna clase") */}
                <div style={{ padding: '4rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    
                    
                    <div style={{ fontSize: '4rem', marginBottom: '1rem', position: 'relative' }}>
                        📁
                        <div style={{ 
                            position: 'absolute', bottom: '10px', right: '-10px', 
                            backgroundColor: '#fde68a', color: '#d97706', 
                            borderRadius: '50%', width: '24px', height: '24px', 
                            display: 'flex', justifyContent: 'center', alignItems: 'center', 
                            fontSize: '1rem', fontWeight: 'bold', border: '2px solid white'
                        }}>+</div>
                    </div>

                    <h4 style={{ color: '#1e293b', fontSize: '1.15rem', margin: 0, fontWeight: 'bold' }}>
                        Aún no estás en ninguna clase
                    </h4>
                    <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0, marginBottom: '1.5rem' }}>
                        Únete a un colegio para comenzar a ver tus clases.
                    </p>
                    
                    {/* Botón secundario "Unirse a clase" */}
                    <button style={{ 
                        backgroundColor: '#ffffff', 
                        color: '#d97706', 
                        border: '1.5px solid #d97706', 
                        padding: '0.6rem 1.5rem', 
                        borderRadius: '30px', 
                        fontSize: '0.95rem', 
                        fontWeight: 'bold', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.2s'
                    }}>
                        + Unirse a un colegio
                    </button>
                </div>
            </div>
        </div>
    );
}