// LoadingScreen.jsx
import React from 'react';
import { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onLoaded }) => {
  const [count, setCount] = useState(0);
  const [slideUp, setSlideUp] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setSlideUp(true);
            setTimeout(onLoaded, 1200); // Match CSS transition
          }, 300);
          return 100;
        }
        return prevCount + 1;
      });
    }, 10); // 2 seconds total

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div className={`loading-screen ${slideUp ? 'slide-up' : ''}`}>
      <div className="counter">{count}</div>
    </div>
  );
};

export default LoadingScreen;