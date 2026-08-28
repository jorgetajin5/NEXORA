import { useState, useEffect } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/Home/Home';
import AcercaDe from './pages/About/AcercaDe'; // <-- 1. Importamos la nueva página
import UnderConstruction from './pages/UnderConstruction/UnderConstruction';
import AuthModal from './Components/Auth/AuthModal';
import './App.css';

function App() {
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

  // 2. Creamos esta función para manejar qué componente mostrar
  const renderContent = () => {
    if (activePage === 'inicio') {
      return <Home onNavigate={handleNavigate} onOpenModal = {openAuthModal} />;
    }
    
    if (activePage === 'acerca') { // <-- Validamos el ID exacto que usa tu Navbar
      return <AcercaDe />;
    }
    // Para cualquier otra pestaña ("escuelas", "soporte", etc.)
    return <UnderConstruction pageId={activePage} onNavigate={handleNavigate} />;
  };

  return (
    <div className="app-layout">
      <Navbar activePage={activePage} onNavigate={handleNavigate} />
      {/* 3. Llamamos a la función aquí */}
      {renderContent()}
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </div>
  );
}

export default App;