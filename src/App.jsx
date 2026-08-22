import { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import AcercaDe from './Components/AcercaDe'; // <-- 1. Importamos la nueva página
import UnderConstruction from './Components/UnderConstruction';
import './App.css';

function App() {
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '').trim();
    return hash || 'inicio';
  };

  const [activePage, setActivePage] = useState(getInitialPage);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      setActivePage(hash || 'inicio');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    window.location.hash = pageId === 'inicio' ? '' : pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 2. Creamos esta función para manejar qué componente mostrar
  const renderContent = () => {
    if (activePage === 'inicio') {
      return <Home onNavigate={handleNavigate} />;
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
    </div>
  );
}

export default App;