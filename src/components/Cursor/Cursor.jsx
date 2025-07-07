// Cursor.jsx
import React from 'react';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import './Cursor.css';

const Cursor = () => {
  useEffect(() => {
    const cursor = document.querySelector('.cursor');
    if (!cursor) return;

    const quickToX = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power2.out" });
    const quickToY = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power2.out" });
    const quickToRot = gsap.quickTo(cursor, "rotation", { duration: 0.6, ease: "power2.out" });
    
    let prevMouseX = 0, prevMouseY = 0;

    const handleMouseMove = e => {
      const { clientX, clientY } = e;
      quickToX(clientX);
      quickToY(clientY);
      const dx = clientX - prevMouseX;
      const dy = clientY - prevMouseY;
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        quickToRot(angle + 90);
      }
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <div className="cursor"></div>;
};

export default Cursor;