import { useEffect } from 'react';

const useInteractiveHeading = (headingRef) => {
    useEffect(() => {
        const heading = headingRef.current;
        if (!heading) return;

        const spans = Array.from(heading.querySelectorAll('.char'));
        const defaultWeight = 700;
        const defaultWidth = 100;
        let mouse = { x: 0, y: 0, isActive: false };
        let animationFrameId;

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.isActive = true;
        };
        const handleMouseLeave = () => { mouse.isActive = false; };

        // Attach to the page container for better interaction area
        const page = heading.closest('.page-container');
        page.addEventListener('mousemove', handleMouseMove);
        page.addEventListener('mouseleave', handleMouseLeave);

        const animate = () => {
            if (mouse.isActive) {
                spans.forEach(span => {
                    const rect = span.getBoundingClientRect();
                    if (rect.width === 0) return;
                    const charCenter = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
                    const dist = Math.hypot(mouse.x - charCenter.x, mouse.y - charCenter.y);
                    const maxDist = window.innerWidth / 3;
                    const ratio = Math.max(0, 1 - dist / maxDist);
                    const easedRatio = 1 - Math.pow(1 - ratio, 4); // Ease-out quart
                    
                    const wght = defaultWeight + (900 - defaultWeight) * easedRatio;
                    const wdth = defaultWidth + (150 - defaultWidth) * easedRatio;
                    const ital = 12 * easedRatio;
                    
                    span.style.fontVariationSettings = `'wght' ${wght.toFixed(0)}, 'wdth' ${wdth.toFixed(0)}, 'ital' ${ital.toFixed(2)}`;
                });
            } else {
                spans.forEach(span => {
                    span.style.fontVariationSettings = `'wght' ${defaultWeight}, 'wdth' ${defaultWidth}, 'ital' 0`;
                });
            }
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            page.removeEventListener('mousemove', handleMouseMove);
            page.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [headingRef]);
};

export default useInteractiveHeading;