// Home.jsx
import React from 'react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Home.css';
import mainImage from '../../assets/main-image.png';
import useParticleCanvas from '../../hooks/useParticleCanvas';

const Home = () => {
    const canvasRef = useRef(null);
    useParticleCanvas(canvasRef);

    useEffect(() => {
        const tl = gsap.timeline();
        tl.to('.main-image', { duration: 1.5, opacity: 1, ease: 'power3.out' }, "+=0.5")
          .to('.top-left-info, .top-right-info', { duration: 1, opacity: 1, ease: 'power3.out' }, "-=1");

        const scrollers = document.querySelectorAll('.scroller');
        if (scrollers.length === 0) return;
        
        let animationFrameId;
        const baseVelocity = -0.85;
        const animateText = () => {
            scrollers.forEach(scroller => {
                let x = parseFloat(scroller.dataset.x) || 0;
                const direction = parseFloat(scroller.dataset.direction);
                const singleSpanWidth = scroller.querySelector('span')?.offsetWidth || 0;
                x += direction * baseVelocity;
                if (singleSpanWidth > 0) {
                    const wrap = (min, max, v) => ((((v - min) % (max - min)) + (max - min)) % (max - min)) + min;
                    scroller.style.transform = `translateX(${wrap(-singleSpanWidth, 0, x)}px)`;
                }
                scroller.dataset.x = x;
            });
            animationFrameId = requestAnimationFrame(animateText);
        };
        animateText();
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    const scrollingTexts = ['An AI and Data Science', 'Frontend Developer'];

    return (
        <section className="hero-section">
            <canvas ref={canvasRef} id="particle-canvas"></canvas>
            <header>
                <div className="top-left-info">MD MOIN AKHTAR</div>
                <div className="top-right-info">AI & Data Science | Frontend Development</div>
            </header>
            <div className="content-wrapper">
                <div className="scroll-velocity-wrapper">
                    {scrollingTexts.map((text, i) => (
                        <div className="parallax" key={i}>
                            <div className="scroller" data-direction={i % 2 === 0 ? 1 : -1} data-x={0}>
                                {[...Array(6)].map((_, j) => (
                                    <span
                                        className="custom-scroll-text"
                                        key={j}
                                        style={{ color: 'rgba(234, 234, 239, 0.25)' }}
                                    >
                                        {text + ' '}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <img src={mainImage} alt="Md Moin Akhtar Portrait" className="main-image" />
            </div>
        </section>
    );
};

export default Home;