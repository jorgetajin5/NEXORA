import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import './Dashboard.css';
import UnderConstruction from '../../pages/UnderConstruction/UnderConstruction';


export default function Dashboard( { firebaseUser } ) {

    const [userProfile, setUserProfile ] = useState(null);
    const [loading, setLoading] = useState(true);

    // URL dinámica, nube y local
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    // useEffect se ejecuta cuando el componente se carga

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                //const response = await fetch(`http://localhost:3000/api/users/${firebaseUser.uid}`);
                const response = await fetch(`${API_URL}/api/users/${firebaseUser.uid}`);

                const data = await response.json();

                if(response.ok) {
                    setUserProfile(data);
                } else {
                    console.error("Error del servidor: ", data.error);
                }   
            } catch (error){
                console.error("Error conectando al backend: ", error);
            } finally {
                setLoading(false);
            }

        };

        if (firebaseUser?.uid) {
            fetchUserData();
        }
    }, [firebaseUser]);



    // función para cerrar sesión
    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("Sesión cerrada exitosamente");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    if (loading) {
        return <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>Cargando tu aula digital...</div>;
    }

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
                        <span>
                            <strong>{userProfile?.rol ? userProfile.rol.charAt(0).toUpperCase() + userProfile.rol.slice(1) : 'Usuario'}:</strong> 
                            {' '}{userProfile?.firstname || userProfile?.firstName} {userProfile?.lastname || userProfile?.lastName}
                        </span>
                    </div>

                    <button 
                        className='btn-logout'
                        onClick={handleLogout} 
                        
                    >
                        Cerrar sesión
                    </button>

                    {/* pestañas de navegación */}
                </header>

                {/* Área de contenido dinámico */}
                <section className="dashboard-content">
                    {/* <h2>¡Hola, {userProfile?.firstname || userProfile?.firstName}!</h2> */}
                    <UnderConstruction pageId="dashboard" />
                </section>
                
            </main>
        </div>
    );
}