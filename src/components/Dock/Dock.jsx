// Dock.jsx
import React from 'react';
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Dock.css';
import HomeLogo from '../../assets/home-logo.png'; 

const Dock = ({ onContactClick, onNavigate }) => {
    const [tooltip, setTooltip] = useState({ active: false, text: '', x: 0, y: 0 });

    const showTooltip = (e, text) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltip({ active: true, text: text, x: rect.left + rect.width / 2, y: rect.top - 10 });
    };
    const hideTooltip = () => setTooltip(prev => ({ ...prev, active: false }));

    return (
        <>
            <div className={`dock-tooltip ${tooltip.active ? 'active' : ''}`} style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}>
                {tooltip.text}
            </div>
            <nav className="icon-dock">
                <a href="https://github.com/MDMOINAKHTARR" target="_blank" rel="noopener noreferrer" className="dock-item" onMouseEnter={(e) => showTooltip(e, 'GitHub')} onMouseLeave={hideTooltip}>
                    <svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                {onNavigate ? (
                    <button className="dock-item" onClick={() => onNavigate('/skills')} onMouseEnter={(e) => showTooltip(e, 'Skills')} onMouseLeave={hideTooltip}>
                        <span style={{display:'flex',alignItems:'center',justifyContent:'center',width:'26px',height:'26px',background:'#1A1A21',borderRadius:'50%'}}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.5 7L4 12L8.5 17" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7"/>
                                <path d="M15.5 7L20 12L15.5 17" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7"/>
                                <path d="M14 3L10 21" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7"/>
                            </svg>
                        </span>
                    </button>
                ) : (
                    <NavLink to="/skills" className="dock-item" onMouseEnter={(e) => showTooltip(e, 'Skills')} onMouseLeave={hideTooltip}>
                        <span style={{display:'flex',alignItems:'center',justifyContent:'center',width:'26px',height:'26px',background:'#1A1A21',borderRadius:'50%'}}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.5 7L4 12L8.5 17" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7"/>
                                <path d="M15.5 7L20 12L15.5 17" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7"/>
                                <path d="M14 3L10 21" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7"/>
                            </svg>
                        </span>
                    </NavLink>
                )}
                {onNavigate ? (
                    <button className="dock-item" onClick={() => onNavigate('/')} onMouseEnter={(e) => showTooltip(e, 'Home')} onMouseLeave={hideTooltip}>
                        <img src={HomeLogo} alt="Home Logo" className="about-logo-dock" />
                    </button>
                ) : (
                    <Link to="/" className="dock-item" onMouseEnter={(e) => showTooltip(e, 'Home')} onMouseLeave={hideTooltip}>
                        <img src={HomeLogo} alt="Home Logo" className="about-logo-dock" />
                    </Link>
                )}
                {onNavigate ? (
                    <button className="dock-item" onClick={() => onNavigate('/projects')} onMouseEnter={(e) => showTooltip(e, 'Projects')} onMouseLeave={hideTooltip}>
                        <svg viewBox="0 0 24 24"><path d="M21 2h-18c-1.657 0-3 1.343-3 3v14c0 1.657 1.343 3 3 3h18c1.657 0 3-1.343 3-3v-14c0-1.657-1.343-3-3-3zm-14 17h-3v-9h3v9zm5 0h-3v-9h3v9zm5 0h-3v-9h3v9zm3-11h-17v-3h17v3z"/></svg>
                    </button>
                ) : (
                    <NavLink to="/projects" className="dock-item" onMouseEnter={(e) => showTooltip(e, 'Projects')} onMouseLeave={hideTooltip}>
                        <svg viewBox="0 0 24 24"><path d="M21 2h-18c-1.657 0-3 1.343-3 3v14c0 1.657 1.343 3 3 3h18c1.657 0 3-1.343 3-3v-14c0-1.657-1.343-3-3-3zm-14 17h-3v-9h3v9zm5 0h-3v-9h3v9zm5 0h-3v-9h3v9zm3-11h-17v-3h17v3z"/></svg>
                    </NavLink>
                )}
                <button className="dock-item" onClick={onContactClick} onMouseEnter={(e) => showTooltip(e, 'Contact')} onMouseLeave={hideTooltip}>
                    <svg viewBox="0 0 24 24" width="26" height="26" fill="var(--secondary-text)">
                        <path d="M2 6.75A2.75 2.75 0 0 1 4.75 4h14.5A2.75 2.75 0 0 1 22 6.75v10.5A2.75 2.75 0 0 1 19.25 20H4.75A2.75 2.75 0 0 1 2 17.25V6.75zm2.16-.25l7.34 5.5 7.34-5.5a1.25 1.25 0 0 0-1.09-.5H4.75a1.25 1.25 0 0 0-1.09.5zm15.59 1.63l-7.07 5.3a1.25 1.25 0 0 1-1.56 0l-7.07-5.3A1.25 1.25 0 0 0 2.5 7.81v9.44c0 .69.56 1.25 1.25 1.25h14.5c.69 0 1.25-.56 1.25-1.25V7.81a1.25 1.25 0 0 0-.25-.68z"/>
                    </svg>
                </button>
            </nav>
        </>
    );
};
export default Dock;