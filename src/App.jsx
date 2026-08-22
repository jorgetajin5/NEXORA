import { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
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

  return (
    <div className="app-layout">
      <Navbar activePage={activePage} onNavigate={handleNavigate} />
      {activePage === 'inicio' ? (
        <Home onNavigate={handleNavigate} />
      ) : (
        <UnderConstruction pageId={activePage} onNavigate={handleNavigate} />
      )}
    </div>
  );
}

export default App;
