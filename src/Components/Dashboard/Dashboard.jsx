import React from 'react';
import './Dashboard.css';

export default function Dashboard() {
    return (
        <div className="dashboard-layout">
            
            {/* Panel izquierdo navegacion menu*/}
            <aside className="dashboard-sidebar">
                <h2>Aula conectada</h2>
                <p>Evolución del aula digital</p>
                {/* componente <Sidebar /> */}
            </aside>

            {/* Panel derecho publicaciones */}
            <main className="dashboard-main">
                
                {/* Encabezado superior */}
                <header className="dashboard-topbar">
                    <div className="user-profile">
                        <div className="avatar-placeholder"></div>
                        <span><strong>Profesor:</strong> Nombre del profesor</span>
                    </div>
                    {/* pestañas de navegación */}
                </header>

                {/* Área de contenido dinámico */}
                <section className="dashboard-content">
                    <h1>🚧 Panel en construcción 🚧</h1>
                    <p>Próximamente: Publicaciones, calendario y mensajes.</p>
                </section>
                
            </main>
        </div>
    );
}