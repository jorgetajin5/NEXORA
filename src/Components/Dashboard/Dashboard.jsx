import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import './Dashboard.css';
import UnderConstruction from '../../pages/UnderConstruction/UnderConstruction';
import Sidebar from './Sidebar/Sidebar';
import TopBar from './TopBar/TopBar';
import Publications from './Views/Publications/Publications';
import ClassView from './Views/Classes/ClassView';
import HomeView from './Views/Home/HomeView';
import RightPanel from './RightPanel/RightPanel';


export default function Dashboard({ firebaseUser }) {

    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // estado para controlar el menu movil
    const [isMobileOpen, setIsMobileMenuOpen] = useState(false);
    const handleOpenMobileMenu = () => setIsMobileMenuOpen(true);
    const handleCloseMobileMenu = () => setIsMobileMenuOpen(false);

    const [activeView, setActiveView] = useState('inicio');  // Estado para controlar vista (por defecto "inicio")


    // URL dinámica, nube y local
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    // useEffect se ejecuta cuando el componente se carga

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/users/${firebaseUser.uid}`);
                //const response = await fetch(`${API_URL}/api/users/${firebaseUser.uid}`);

                const data = await response.json();

                if (response.ok) {
                    setUserProfile(data);
                } else {
                    console.error("Error del servidor: ", data.error);
                }
            } catch (error) {
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


    const renderContent = () => {
        switch (activeView) {
            case 'inicio':
                return <HomeView userProfile={userProfile} />;
            case 'clases':
                return <ClassView pageId="clases" />;
            case 'calendario':
            case 'mensajes':
                return <UnderConstruction pageId={activeView} />;
            case 'archivos':
                return <UnderConstruction pageId={activeView} />;
            case 'calificaciones':
                return <UnderConstruction pageId={activeView} />;
            case 'notificaciones':
                return <UnderConstruction pageId={activeView} />;
            case 'configuracion':
                return <UnderConstruction pageId={activeView} />;
            default:
                return <UnderConstruction pageId={Dashboard} />;
        }
    };

    if (loading) {
        return <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>Cargando tu aula digital...</div>;
    }


    return (
        <div className="dashboard-layout">

            {/* Panel izquierdo navegacion menu*/}
            <Sidebar
                isMobileOpen={isMobileOpen}
                onCloseMobile={handleCloseMobileMenu}

                activeView={activeView}
                onNavigate={setActiveView}
            />

            {/* Panel derecho publicaciones */}
            <main className="dashboard-main">

                <TopBar
                    userProfile={userProfile}
                    onLogout={handleLogout}
                    onOpenMobileMenu={handleOpenMobileMenu}
                    activeView={activeView}
                />



                {/* Área de contenido dinámico */}
                <div className="dashboard-body">
                
                {/* Área de contenido dinámico (Izquierda) */}
                <section className="dashboard-content">
                    {renderContent()}
                </section>
                
                {/* Panel Derecho */}
                <RightPanel activeView={activeView} />
                
            </div>

            </main>

        </div>
    );
}