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
import StudentClassView from './Views/Classes/StudentClassView';
import ClassroomWorkspace from './Views/Classes/ClassroomWorkspace/ClassroomWorkspace';


export default function Dashboard({ firebaseUser }) {

    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // estado para controlar el menu movil
    const [isMobileOpen, setIsMobileMenuOpen] = useState(false);
    const handleOpenMobileMenu = () => setIsMobileMenuOpen(true);
    const handleCloseMobileMenu = () => setIsMobileMenuOpen(false);

    const [activeView, setActiveView] = useState('inicio');  // Estado para controlar vista (por defecto "inicio")
    const [selectedClassroom, setSelectedClassroom] = useState(null); // Guarda clase seleccionada


    // URL dinámica, nube y local
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    // useEffect se ejecuta cuando el componente se carga

    useEffect(() => {
        if (!firebaseUser) return;

        const controller = new AbortController();

        const fetchUserData = async () => {
            setLoading(true);

            try {
                // Obtiene el token de Firebase
                const token = await firebaseUser.getIdToken();

                // Consulta el usuario autenticado en PostgreSQL
                const response = await fetch(
                    `${API_URL}/api/users/me`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        signal: controller.signal
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || 'No se pudo obtener el perfil'
                    );
                }

                // La API devuelve { ok: true, user: {...} }
                if (!controller.signal.aborted) {
                    setUserProfile(data.user);
                }

            } catch (error) {
                if (!controller.signal.aborted) {
                    console.error(
                        'Error al cargar perfil:',
                        error.message
                    );
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchUserData();

        return () => controller.abort();

    }, [firebaseUser, API_URL]);


    // función para cambiar de sección principal
    const handleNavigate = (view) => {
        setSelectedClassroom(null);
        setActiveView(view);
    };

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
                // Cuando existe una clase seleccionada,
                // mostrar su espacio de trabajo a pantalla completa.
                if (selectedClassroom) {
                    return (
                        <ClassroomWorkspace
                            classroom={selectedClassroom}
                            firebaseUser={firebaseUser}
                            userProfile={userProfile}
                            onBack={() => setSelectedClassroom(null)}
                        />
                    );
                }

                // Vista específica del alumno.
                if (
                    userProfile?.rol === 'alumno' ||
                    userProfile?.roleCode === 'STUDENT'
                ) {
                    return (
                        <StudentClassView
                            firebaseUser={firebaseUser}
                            onOpenClass={(cls) =>
                                setSelectedClassroom(cls)
                            }
                        />
                    );
                }

                // Vista actual del docente/director.
                return (
                    <ClassView
                        userProfile={userProfile}
                        firebaseUser={firebaseUser}
                        onOpenClass={(cls) =>
                            setSelectedClassroom(cls)
                        }
                    />
                );


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
                onNavigate={handleNavigate}
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
                    <section className={ activeView === 'clases' && selectedClassroom ? 'dashboard-content dashboard-content--workspace' : 'dashboard-content' } >
                        {renderContent()}
                    </section>

                    {/* Panel Derecho */}
                    {!(activeView === 'clases' && selectedClassroom) && (
                        <RightPanel activeView={activeView} />
                    )}

                </div>

            </main>

        </div>
    );
}