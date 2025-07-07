import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

// Even lighter, more transparent overlay
const overlayStyle = {
  position: 'absolute',
  width: '100vw',
  height: '100vh',
  top: 0,
  left: 0,
  background: 'linear-gradient(90deg, rgba(13,13,18,0.18) 60%, rgba(0,163,255,0.08) 100%)',
  boxShadow: '0 0 40px 0 rgba(0,0,0,0.10)',
  zIndex: 1001,
  pointerEvents: 'none',
};

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [prevChildren, setPrevChildren] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (displayedChildren.key !== children.key) {
      setPrevChildren(displayedChildren);
      setDisplayedChildren(children);
      setIsAnimating(true);
    }
  }, [children, displayedChildren]);

  useEffect(() => {
    if (isAnimating && prevChildren && nextRef.current && prevRef.current && overlayRef.current) {
      // Animate prev out, next in, and overlay
      const direction = location.pathname === '/skills' ? -1 : location.pathname === '/projects' ? 1 : 0;
      const tl = gsap.timeline({
        onComplete: () => {
          setPrevChildren(null);
          setIsAnimating(false);
        }
      });
      // Overlay in
      gsap.set(overlayRef.current, { x: direction === 1 ? '100%' : '-100%', opacity: 1 });
      tl.to(overlayRef.current, { x: '0%', duration: 0.45, ease: 'power4.inOut' }, 0);
      // Outgoing page out, incoming page in
      if (direction === -1) {
        // Skills: slide in from left
        gsap.set(nextRef.current, { x: '-100%', opacity: 0 });
        tl.to(prevRef.current, { x: '100%', opacity: 0, duration: 0.85, ease: 'cubic-bezier(0.83,0,0.17,1)' }, 0.10)
          .to(nextRef.current, { x: '0%', opacity: 1, duration: 0.85, ease: 'cubic-bezier(0.83,0,0.17,1)' }, 0.10);
      } else if (direction === 1) {
        // Projects: slide in from right
        gsap.set(nextRef.current, { x: '100%', opacity: 0 });
        tl.to(prevRef.current, { x: '-100%', opacity: 0, duration: 0.85, ease: 'cubic-bezier(0.83,0,0.17,1)' }, 0.10)
          .to(nextRef.current, { x: '0%', opacity: 1, duration: 0.85, ease: 'cubic-bezier(0.83,0,0.17,1)' }, 0.10);
      } else {
        // Fade
        gsap.set(nextRef.current, { opacity: 0 });
        tl.to(prevRef.current, { opacity: 0, duration: 0.7, ease: 'power2.inOut' }, 0.10)
          .to(nextRef.current, { opacity: 1, duration: 0.7, ease: 'power2.inOut' }, 0.10);
      }
      // Overlay out (sooner)
      tl.to(overlayRef.current, { x: direction === 1 ? '-100%' : '100%', duration: 0.45, ease: 'power4.inOut', opacity: 0 }, '>-0.35');
    }
  }, [isAnimating, prevChildren, location.pathname]);

  return (
    <div ref={containerRef} style={{ position: 'fixed', width: '100vw', height: '100vh', top: 0, left: 0, zIndex: 100, background: 'transparent' }}>
      {/* Sliding overlay */}
      <div ref={overlayRef} style={overlayStyle} />
      {prevChildren && (
        <div ref={prevRef} style={{ position: 'absolute', width: '100%', height: '100%' }}>
          {prevChildren}
        </div>
      )}
      <div ref={nextRef} style={{ position: 'absolute', width: '100%', height: '100%' }}>
        {displayedChildren}
      </div>
    </div>
  );
};

export default PageTransition; 