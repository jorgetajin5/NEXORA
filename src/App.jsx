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
