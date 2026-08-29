import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import './Dashboard.css';
import UnderConstruction from '../../pages/UnderConstruction/UnderConstruction';


export default function Dashboard() {

    // función para cerrar sesión
    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("Sesión cerrada exitosamente");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

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

                    <button 
                        onClick={handleLogout} 
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#fee2e2',
                            color: '#b91c1c',
                            border: '1px solid #f87171',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Cerrar sesión
                    </button>

                    {/* pestañas de navegación */}
                </header>

                {/* Área de contenido dinámico */}
                <section className="dashboard-content">
                    
                    <UnderConstruction pageId="dashboard" />
                </section>
                
            </main>
        </div>
    );
}