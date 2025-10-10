import { useEffect, useRef, useState } from 'react';
import '../styles/loader.css';
import var1 from '/var.png';
import var2 from '/var2.png';

const Loader = () => {
    const [imgaa, setImgaa] = useState(var1);
    const scriptRef1 = useRef(null);
    const scriptRef2 = useRef(null);
    const psRef = useRef(null);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        ) || window.innerWidth <= 480;

        if (isMobile) setImgaa(var2);
        else setImgaa(var1);

        const loadScripts = async () => {
            const script1 = document.createElement('script');
            script1.src = 'https://cdn.jsdelivr.net/npm/dat.gui@0.7.7/build/dat.gui.min.js';
            document.body.appendChild(script1);
            scriptRef1.current = script1;
            await new Promise((resolve) => (script1.onload = resolve));

            const script2 = document.createElement('script');
            script2.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/23500/ps-0.9.js';
            document.body.appendChild(script2);
            scriptRef2.current = script2;
            await new Promise((resolve) => (script2.onload = resolve));

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

        const canvasWidth = window.innerWidth * 100;

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