import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import Skills from './pages/Skills/Skills';

import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Cursor from './components/Cursor/Cursor';
import Dock from './components/Dock/Dock';
import ContactModal from './components/ContactModal/ContactModal';
import PageTransition from './components/PageTransition';

function App() {
  const [loading, setLoading] = useState(true);
  const [isContactOpen, setContactOpen] = useState(false);
  const location = useLocation();
  const nodeRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo('.page-container, .hero-section', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, [location]);

  // Determine the direction based on pathname
  const getClassNames = () => {
    if (location.pathname === '/skills') return 'slide-window';
    if (location.pathname === '/projects') return 'slide-window-reverse';
    return 'fade';
  };

  return (
    <>
      <Cursor />
      {loading ? (
        <LoadingScreen onLoaded={() => setLoading(false)} />
      ) : (
        <>
          <Dock onContactClick={() => setContactOpen(true)} />
          <ContactModal isOpen={isContactOpen} onClose={() => setContactOpen(false)} />
          <PageTransition key={location.pathname}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </PageTransition>
        </>
      )}
    </>
  );
}

export default App;