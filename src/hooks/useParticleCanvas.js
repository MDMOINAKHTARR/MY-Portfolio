import { useEffect } from 'react';

const useParticleCanvas = (canvasRef) => {
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let particlesArray = [];
        const mouse = { x: null, y: null, radius: (canvas.height / 110) * (canvas.width / 110) };

        const handleMouseMove = e => { mouse.x = e.clientX; mouse.y = e.clientY; };
        window.addEventListener('mousemove', handleMouseMove);

        class Particle {
            constructor(x, y, dirX, dirY, size) {
                this.x = x; this.y = y; this.directionX = dirX; this.directionY = dirY; this.size = size;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = 'rgba(0, 163, 255, 0.4)';
                ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
                if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
                
                if (mouse.x !== null) {
                    let dx = mouse.x - this.x; let dy = mouse.y - this.y;
                    if (Math.hypot(dx, dy) < mouse.radius + this.size) {
                        if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 3;
                        if (mouse.x > this.x && this.x > this.size * 10) this.x -= 3;
                        if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 3;
                        if (mouse.y > this.y && this.y > this.size * 10) this.y -= 3;
                    }
                }
                this.x += this.directionX; this.y += this.directionY;
                this.draw();
            }
        }
        
        const initParticles = () => {
            particlesArray = [];
            let num = (canvas.height * canvas.width) / 12000;
            for (let i = 0; i < num; i++) {
                let size = (Math.random() * 2) + 1;
                let x = Math.random() * (innerWidth - size * 2) + size * 2;
                let y = Math.random() * (innerHeight - size * 2) + size * 2;
                let dirX = (Math.random() * 0.4) - 0.2;
                let dirY = (Math.random() * 0.4) - 0.2;
                particlesArray.push(new Particle(x, y, dirX, dirY, size));
            }
        };

        const connectParticles = () => {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = Math.hypot(particlesArray[a].x - particlesArray[b].x, particlesArray[a].y - particlesArray[b].y);
                    if (distance < (canvas.width / 8)) {
                        opacityValue = 1 - (distance / 200);
                        ctx.strokeStyle = `rgba(0, 163, 255, ${opacityValue})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        };
        
        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            particlesArray.forEach(p => p.update());
            connectParticles();
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            mouse.radius = (canvas.height / 110) * (canvas.width / 110);
            initParticles();
        };

        window.addEventListener('resize', handleResize);
        initParticles();
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [canvasRef]);
};

export default useParticleCanvas;