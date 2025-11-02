import { useEffect, useRef, useState } from "react";
import Loader from "../components/loader";
import useSessionStorage from "../hooks/useSessionStorage";
import "../styles/Home.css";


function Home({ setShowNavbar }) {
  const [hasLoaded, setHasLoaded] = useSessionStorage("hasLoaded", false);
  const [showCanvas, setShowCanvas] = useState(hasLoaded);
  const [showContent, setShowContent] = useState(hasLoaded);
  const canvasRef = useRef(null);
  const loaderTextRef = useRef(null);
  const loaderBarRef = useRef(null);
  const contentRefs = useRef([]);


  const galleryImages = [
    "https://res.cloudinary.com/dvz8vitos/image/upload/v1761935728/images/image1.jpg",
    "https://res.cloudinary.com/dvz8vitos/image/upload/v1761935737/images/image2.jpg",
    "https://res.cloudinary.com/dvz8vitos/image/upload/v1761936434/images/image3.jpg",
    "https://res.cloudinary.com/dvz8vitos/image/upload/v1761936436/images/image4.jpg",
    "https://res.cloudinary.com/dvz8vitos/image/upload/v1761936436/images/image5.jpg",
    "https://res.cloudinary.com/dvz8vitos/image/upload/v1761936438/images/image6.jpg",
    "https://res.cloudinary.com/dvz8vitos/image/upload/v1761935726/images/image0.jpg"
  ];


  useEffect(() => {
    if (!showCanvas) return;


    const frameCount = 532;
    const prefix = 'frame_0';
    const ext = '.webp';
    const padding = 3;
    const framesPath = '/frames/';
    const easing = 0.09;


    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const loaderText = loaderTextRef.current;
    const loaderBar = loaderBarRef.current;


    let images = new Array(frameCount);
    let loadedCount = 0;
    let scrollTarget = 0;
    let smooth = 0;
    let firstFrameDrawn = false;
    let rafId = 0;


    function pad(num) {
      return String(num).padStart(padding, '0');
    }


    function frameUrl(i) {
      return framesPath + prefix + pad(i) + ext;
    }


    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }


    function drawImageToCover(img) {
      if (!img || !img.width) return;
      const vw = canvas.clientWidth;
      const vh = canvas.clientHeight;
      const iw = img.width;
      const ih = img.height;
      const scale = Math.max(vw / iw, vh / ih);
      const w = iw * scale;
      const h = ih * scale;
      const x = (vw - w) / 2;
      const y = (vh - h) / 2;
      ctx.clearRect(0, 0, vw, vh);
      ctx.drawImage(img, x, y, w, h);
    }


    function computeScrollPercent() {
      const el = document.scrollingElement || document.documentElement;
      const docH = el.scrollHeight - el.clientHeight;
      if (docH <= 0) return 0;
      return Math.max(0, Math.min(1, el.scrollTop / docH));
    }


    function animateContents() {
      const totalContents = contentRefs.current.length;
      const currentScrollPercent = computeScrollPercent();


      contentRefs.current.forEach((content, index) => {
        if (!content) return;


        // First item (logo) - visible at start, fades out on scroll
        if (index === 0) {
          const fadeOutThreshold = 0.05;
          if (currentScrollPercent < fadeOutThreshold) {
            content.style.opacity = 1;
            content.style.transform = 'scale(1)';
          } else if (currentScrollPercent < fadeOutThreshold + 0.05) {
            const progress = (currentScrollPercent - fadeOutThreshold) / 0.05;
            content.style.opacity = 1 - progress;
            content.style.transform = `scale(${1 + 0.5 * progress})`;
          } else {
            content.style.opacity = 0;
            content.style.transform = 'scale(1.5)';
          }
          return;
        }


        // Last item (Gallery) - stays visible and at scale 1 once it appears
        if (index === totalContents - 1) {
          const startScroll = index / totalContents;
          const contentScrollRange = 0.3; // Shortened range for faster appearance
          
          if (currentScrollPercent < startScroll) {
            content.style.opacity = 0;
            content.style.transform = 'scale(0.5)';
          } else if (currentScrollPercent < startScroll + contentScrollRange) {
            const progress = (currentScrollPercent - startScroll) / contentScrollRange;
            content.style.opacity = progress;
            content.style.transform = `scale(${0.5 + 0.5 * progress})`;
          } else {
            // Once fully visible, maintain these values
            content.style.opacity = 1;
            content.style.transform = 'scale(1)';
          }
          return;
        }


        // Other items - normal fade in/out behavior
        const startScroll = index / totalContents;
        let endScroll = (index + 1) / totalContents;


        const contentScrollRange = endScroll - startScroll;
        let opacity = 0;
        let scale = 0.5;


        if (currentScrollPercent < startScroll) {
          opacity = 0;
          scale = 0.5;
        } else if (currentScrollPercent < startScroll + contentScrollRange * 0.3) {
          const progress = (currentScrollPercent - startScroll) / (contentScrollRange * 0.3);
          opacity = progress;
          scale = 0.5 + 0.5 * progress;
        } else if (currentScrollPercent < startScroll + contentScrollRange * 0.6) {
          opacity = 1;
          scale = 1.0;
        } else if (currentScrollPercent < endScroll) {
          const progress = (currentScrollPercent - (startScroll + contentScrollRange * 0.7)) / (contentScrollRange * 0.3);
          opacity = 1 - progress;
          scale = 1.0 + 0.5 * progress;
        } else {
          opacity = 0;
          scale = 1.5;
        }


        content.style.transform = `scale(${scale})`;
        content.style.opacity = opacity;
      });
    }


    async function preloadAll() {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          images[i - 1] = img;
          loadedCount++;
          const pct = Math.round((loadedCount / frameCount) * 100);
          if (!firstFrameDrawn) {
            firstFrameDrawn = true;
            drawImageToCover(img);
          }
        };
        img.src = frameUrl(i);
      }
    }


    function loop() {
      smooth += (scrollTarget - smooth) * easing;


      const index = Math.floor(smooth * (frameCount - 1));
      let img = images[index] || images.find(Boolean);
      if (img) drawImageToCover(img);


      animateContents();
      rafId = requestAnimationFrame(loop);
    }


    function onScroll() {
      scrollTarget = computeScrollPercent();
    }


    function onResize() {
      resizeCanvas();
      if (firstFrameDrawn) {
        const index = Math.floor(smooth * (frameCount - 1));
        let img = images[index] || images.find(Boolean);
        if (img) drawImageToCover(img);
      }
    }


    resizeCanvas();
    preloadAll();


    rafId = requestAnimationFrame(loop);
    window.addEventListener("scroll", onScroll);
    onScroll();
    window.addEventListener("resize", onResize);


    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [showCanvas]);


  useEffect(() => {
    if (!showCanvas) return;


    const observerOptions = {
      threshold: 0.5,
      rootMargin: "0px",
    };


    const animateCounter = (element, target) => {
      let current = 0;
      const increment = target / 80;
      const duration = 2000;
      const stepTime = duration / 80;


      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent = target + "+";
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current) + "+";
        }
      }, stepTime);
    };


    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("animated")
        ) {
          entry.target.classList.add("animated");
          const target = parseInt(entry.target.dataset.target);
          animateCounter(entry.target, target);
        }
      });
    }, observerOptions);


    const statNumbers = document.querySelectorAll(".stat-number");
    statNumbers.forEach((stat) => observer.observe(stat));


    return () => observer.disconnect();
  }, [showCanvas]);


  useEffect(() => {
    if (!hasLoaded && !showCanvas) {
      document.documentElement.style.overflowY = "hidden";
    } else {
      document.documentElement.style.overflowY = "auto";
    }
  }, [hasLoaded, showCanvas]);


  return (
    <>
      {!hasLoaded && !showCanvas && (
        <Loader
          onComplete={() => {
            setShowCanvas(true);
            setHasLoaded(true);
            setShowNavbar(true);
            
            setTimeout(() => {
              setShowContent(true);
            }, 500);
          }}
        />
      )}


      {showCanvas && (
        <>
          <canvas id="canvas" ref={canvasRef} aria-hidden="true" />
          <div className="canvas-overlay"></div>


          <div className={`content-wrapper ${showContent ? 'content-visible' : ''}`}>
            <div
              className="content-item content-initial-visible"
              ref={(el) => (contentRefs.current[0] = el)}
            >
              <img src="/var.png" alt="Varchas Logo" className="logo-image" />
            </div>

            <div
              className="content-item"
              ref={(el) => (contentRefs.current[1] = el)}
            >
              <div className="theme-inner">
                <div className="theme-title">ECHOES OF OLYMPIA</div>
                <div className="theme-desc">
                  In the ancient land of Olympia, legends weren't born - they
                  were forged. Every heartbeat on the field, every breath before
                  the finish line, carried the promise of glory. Centuries
                  later, those echoes still resound - in every athlete who dares
                  to dream, in every spirit that refuses to yield. <br /><br />This year, we
                  bring those echoes back to life. As the torch of competition
                  burns bright once again, we step into the arena - not as mere
                  players, but as warriors chasing immortality. "Echoes of
                  Olympia" is more than a sports fest - it's a revival of that
                  eternal flame, a celebration of passion, pride, and
                  perseverance. <br /><br />Here, every race, every match, every cheer
                  becomes part of a legacy that transcends time. Because glory
                  fades… but echoes - they live forever.
                </div>
              </div>
            </div>

            <div
              className="content-item"
              ref={(el) => (contentRefs.current[2] = el)}
            >
              <div className="about-container">
                <div className="about-section">
                  <div className="section-header">
                    <h2 className="section-title">AFTERMOVIE</h2>
                  </div>
                  <div className="video-container">
                    <iframe
                      width="100%"
                      height="315"
                      src="https://www.youtube.com/embed/6hOYDPt8R-s?si=jV8rLLCPPe8y5l1j"
                      title="Varchas 2022 Aftermovie"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>


                <div className="divider"></div>


                <div className="about-section">
                  <h2 className="section-title">ABOUT Varchas</h2>
                  <p className="about-text">
                    Varchas, the annual sports fest of IIT Jodhpur, is a grand celebration of athleticism, teamwork, and sportsmanship. Bringing together colleges from across India, it features thrilling competitions in cricket, football, basketball, athletics, and more. With energetic matches, vibrant nights, and electrifying spirit, Varchas embodies the true essence of passion, perseverance, and victory on the field.
                  </p>
                  <div className="stats-grid">
                    <div className="stat-item">
                      <div className="stat-number" data-target="50">
                        0+
                      </div>
                      <div className="stat-label">Colleges</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number" data-target="20">
                        0+
                      </div>
                      <div className="stat-label">Events</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number" data-target="2000">
                        0+
                      </div>
                      <div className="stat-label">Registrations</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number" data-target="29">
                        0+
                      </div>
                      <div className="stat-label">Footfall (K)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="content-item"
              ref={(el) => (contentRefs.current[3] = el)}
            >
              <div className="oraculum-container">
                <h1 className="oraculum-title">GALLERY</h1>


                <div className="oraculum-gallery">
                  <div className="gallery-row">
                    <img
                      src={galleryImages[0]}
                      alt="Varchas 1"
                      className="gallery-image"
                      loading="lazy"
                    />
                    <img
                      src={galleryImages[1]}
                      alt="Varchas 2"
                      className="gallery-image"
                      loading="lazy"
                    />
                    <img
                      src={galleryImages[2]}
                      alt="Varchas 3"
                      className="gallery-image"
                      loading="lazy"
                    />
                  </div>
                  <div className="gallery-row">
                    <img
                      src={galleryImages[3]}
                      alt="Varchas 4"
                      className="gallery-image"
                      loading="lazy"
                    />
                    <img
                      src={galleryImages[4]}
                      alt="Varchas 5"
                      className="gallery-image"
                      loading="lazy"
                    />
                    <img
                      src={galleryImages[5]}
                      alt="Varchas 6"
                      className="gallery-image"
                      loading="lazy"
                    />
                  </div>
                </div>


                <div className="button-group">
                  <a href="/gallery" className="oraculum-btn">
                    View More
                  </a>
                </div>
              </div>
            </div>
          </div>


          <div className="scroll-spacer"></div>
        </>
      )}
    </>
  );
}


export default Home;
