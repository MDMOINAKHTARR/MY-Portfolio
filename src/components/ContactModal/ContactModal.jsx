// ContactModal.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './ContactModal.css';
import Particles from './Particles';
import VariableProximity from './VariableProximity';
import Dock from '../Dock/Dock';
import { useNavigate } from 'react-router-dom';

const useSquaresCanvas = (canvasRef, isActive) => {
    useEffect(() => {
        if (!isActive || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        const config = { speed: 0.3, borderColor: 'rgba(255, 255, 255, 0.08)', squareSize: 40 };
        let gridOffset = { x: 0, y: 0 };
        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
        const drawGrid = () => { /* ... simplified for brevity ... */ };
        const update = () => { /* ... simplified ... */ requestAnimationFrame(update); };
        resize();
        window.addEventListener('resize', resize);
        update();
        return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
    }, [canvasRef, isActive]);
};

const ContactModal = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const [showHireReady, setShowHireReady] = useState(false);
    useSquaresCanvas(canvasRef, isOpen);

    useEffect(() => {
        if (!modalRef.current) return;
        if (isOpen) {
            gsap.set(modalRef.current, { y: '100%', opacity: 0, pointerEvents: 'auto' });
            gsap.to(modalRef.current, {
                y: '0%',
                opacity: 1,
                pointerEvents: 'auto',
                duration: 0.7,
                ease: 'power4.out',
            });
        } else {
            gsap.to(modalRef.current, {
                y: '-100%',
                opacity: 0,
                pointerEvents: 'none',
                duration: 0.6,
                ease: 'power4.in',
            });
        }
    }, [isOpen]);

    const handleSubmit = (e) => { e.preventDefault(); alert("Form submitted!"); onClose(); };

    // Handler to close modal and navigate
    const handleNavigate = (path) => {
        onClose();
        setTimeout(() => navigate(path), 300); // Wait for modal close animation
    };

    return (
        <div id="contact-modal" ref={modalRef} style={{ position: 'relative', width: '100vw', minHeight: '200vh', background: '#000', overflowY: 'auto', overflowX: 'hidden' }}>
            {/* Dock Icon Bar */}
            <Dock onContactClick={onClose} onNavigate={handleNavigate} />
            {/* All modal content except Dock */}
            <Particles
                particleColors={['#ffffff', '#ffffff']}
                particleCount={200}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={false}
                disableRotation={false}
            />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 2 }}>
                <div ref={containerRef} style={{ marginLeft: '5vw', maxWidth: '90vw', wordBreak: 'break-word', whiteSpace: 'pre-line', textAlign: 'left', pointerEvents: 'auto' }}>
                    <VariableProximity
                        label={'Lets Connect \nand Build something \nCools Together!!'}
                        className={'variable-proximity-demo'}
                        fromFontVariationSettings="'wght' 400, 'opsz' 9"
                        toFontVariationSettings="'wght' 1000, 'opsz' 40"
                        containerRef={containerRef}
                        radius={100}
                        falloff='linear'
                    />
                   
                </div>
            </div>
            {/* Down Arrow */}
            <div style={{ position: 'absolute', top: '70vh', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
                <button
                    onClick={() => {
                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                        setTimeout(() => setShowHireReady(true), 700); // Wait for scroll animation
                    }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', outline: 'none', marginBottom: '8px' }}
                    aria-label="Scroll Down"
                >
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="24" cy="24" r="24" fill="#222" fillOpacity="0.7"/>
                        <path d="M16 20l8 8 8-8" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <div style={{ 
                    color: '#8A8A93', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    textAlign: 'center',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '0.02em'
                }}>
                    Click To Scroll Down
                </div>
            </div>
            {/* Hire-ready text after scroll, bottom left */}
            {showHireReady && (
              <div className="hire-ready-row">
                <span className="hire-ready-section">
                  Up for a quick chat or a cool project? Hit me up — I'm hire-ready!
                </span>
                <div className="linkedin-profile-card">
                  <img
                    className="linkedin-profile-pic"
                    src="\src\assets\profile.jpeg" 
                    alt="Mohd Moin Akhtar"
                  />
                  <div className="linkedin-profile-info">
                    <div className="linkedin-profile-name">Mohd Moin Akhtar</div>
                    <div className="linkedin-profile-desc">
                      Aspiring Software Developer | B.Tech – 27 | Artificial Intelligence and Data Science | Web Developer 
                    </div>
                    <div className="linkedin-profile-institute">
                    Vivekananda Institute of Professional Studies- Technical Campus (VIPS-TC)
                    </div>
                    <div className="linkedin-profile-actions">
                      <a
                        className="linkedin-btn"
                        href="https://www.linkedin.com/in/mdmoinakhtar"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg"
                          alt="LinkedIn"
                          style={{ width: 20, height: 20, marginRight: 8 }}
                        />
                        View Profile
                      </a>
                      <a
                        className="resume-btn"
                        href="https://drive.google.com/file/d/1Ckkf2FKyAboBZ5th3QBI8ktMbi4Y2eMs/view?usp=drive_link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span style={{ marginRight: 8 }}>📝</span> Resume
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
        
    );
};
export default ContactModal;