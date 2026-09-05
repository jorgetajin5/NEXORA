import { useState, useEffect } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/Home/Home';
import AcercaDe from './pages/About/AcercaDe'; // <-- 1. Importamos la nueva página
import UnderConstruction from './pages/UnderConstruction/UnderConstruction';
import AuthModal from './Components/Auth/AuthModal';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function App() {

  // estado para controlar la sesión del usuario
  const [user, setUser] = useState(null);

  // Estado para mostrar una pantalla de carga
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Estado para controlar si el modal está abierto o cerrado
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Funciones para abrir y cerrar
  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '').trim();
    return hash || 'inicio';
  };

  const [activePage, setActivePage] = useState(getInitialPage);

  useEffect(() => {
    const handleUrlChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      setActivePage(hash || 'inicio');
    };

    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    if (pageId === 'inicio') {
      window.history.pushState(null, '', window.location.pathname);
    } else {
      window.history.pushState(null, '', `#${pageId}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  //  función para manejar qué componente mostrar
  const renderContent = () => {
    if (activePage === 'inicio') {
      return <Home onNavigate={handleNavigate} onOpenModal={openAuthModal} />;
    }

    if (activePage === 'acerca') { // <-- Validamos el ID exacto que usa tu Navbar
      return <AcercaDe />;
    }
    // Para cualquier otra pestaña ("escuelas", "soporte", etc.)
    return <UnderConstruction pageId={activePage} onNavigate={handleNavigate} />;
  };


  // Observador de sesión de Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Si hay sesión, guarda los datos; si no, guarda null
      setLoadingAuth(false); // Termina la validación
    });

    // limpia observador 
    return () => unsubscribe();
  }, []);


  // Pantalla de carga mientras Firebase verifica
  if (loadingAuth) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fdfaf2', color: '#ffeabb' }}>
        <h2>Cargando...</h2>
      </div>
    );
  }


  // condicional: si hay usuario, muestra solo el DASHBOARD
  if (user) {
    return <Dashboard firebaseUser = {user} />;
  }

  // si no hay usuario, muestra la landingPage
  return (
    <div className="app-layout">
      <Navbar activePage={activePage} onNavigate={handleNavigate} />
      {renderContent()}

      {/* Pasa funcion para actualizar el estado user al tener exito*/}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        onLoginSuccess={(loggedUser) => setUser(loggedUser)}
      />
    </div>
  );
}

export default App;