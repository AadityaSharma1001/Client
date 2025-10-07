const imgaa = "data:image/png;base64,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"
import { useEffect, useRef } from 'react';
import '../styles/loader.css';

const Loader = () => {
    const scriptRef1 = useRef(null);
    const scriptRef2 = useRef(null);
    const psRef = useRef(null);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        const loadScripts = async () => {
            const script1 = document.createElement('script');
            script1.src = 'https://cdn.jsdelivr.net/npm/dat.gui@0.7.7/build/dat.gui.min.js';
            document.body.appendChild(script1);
            await new Promise((resolve) => script1.onload = resolve);

            const script2 = document.createElement('script');
            script2.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/23500/ps-0.9.js';
            document.body.appendChild(script2);
            await new Promise((resolve) => script2.onload = resolve);

            initParticles();
        };

        loadScripts();

        return () => {
            if (scriptRef1.current) document.body.removeChild(scriptRef1.current);
            if (scriptRef2.current) document.body.removeChild(scriptRef2.current);
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, []);

    const initParticles = () => {
        if (!window.ParticleSlider) return;

        const canvasWidth = window.innerWidth * 0.8;

        psRef.current = new window.ParticleSlider({
            ptlGap: 1,
            ptlSize: 2,
            width: canvasWidth,
            height: window.innerHeight,
            mouseForce: 0,
            restless: false,
            monochrome: false,
            friction: 1,
        });

        window.addEventListener('mousemove', (e) => e.stopImmediatePropagation(), true);
        updateParticles();
    };

    const updateParticles = () => {
        if (psRef.current) psRef.current.update();
        animationFrameRef.current = requestAnimationFrame(updateParticles);
    };

    return (
        <div id="particle-slider" className="bg-black">
            <div className="slides">
                <div id="first-slide" className="slide" data-src={imgaa}></div>
            </div>
            <canvas className="draw" style={{ width: "100%" }}></canvas>
        </div>
    );
};

export default Loader;
