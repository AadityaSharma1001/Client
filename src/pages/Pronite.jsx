import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import '../styles/Pronite.css';

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);
  return isMobile;
};

const Pronite = () => {
  const isMobile = useIsMobile(768);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeGallery, setActiveGallery] = useState(0);

  const heroRef = useRef();
  const galleryRef = useRef();
  const artistRef = useRef();
  const statsRef = useRef();
  const highlightsRef = useRef();
  const faqRef = useRef();

  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const galleryInView = useInView(galleryRef, { once: true, amount: 0.2 });
  const artistInView = useInView(artistRef, { once: true, amount: 0.2 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.2 });
  const highlightsInView = useInView(highlightsRef, { once: true, amount: 0.2 });
  const faqInView = useInView(faqRef, { once: true, amount: 0.2 });

  const eventDate = new Date('2025-11-09T20:00:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [eventDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGallery((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const galleryImages = [
    { url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=900&h=600&fit=crop', title: 'Varchas Pronite 2024' },
    { url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&h=600&fit=crop', title: 'Massive Crowd Energy' },
    { url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&h=600&fit=crop', title: 'DJ Performance' },
    { url: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=900&h=600&fit=crop', title: 'Light Show Spectacular' },
    { url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=900&h=600&fit=crop', title: 'Stage Entertainment' },
    { url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&h=600&fit=crop', title: 'Festival Atmosphere' }
  ];

  const highlights = [
    { num: '01', title: 'Live Performances', desc: '6+ hours of non-stop music' },
    { num: '02', title: 'Interactive Setup', desc: 'Photo booths and live streaming' },
    { num: '03', title: 'Premium Seating', desc: 'VIP viewing areas available' },
    { num: '04', title: 'Merchandise', desc: 'Exclusive Varchas event merch' },
    { num: '05', title: 'Medical Support', desc: '24/7 on-site medical team' },
    { num: '06', title: 'Free Parking', desc: 'Ample parking and valet service' }
  ];

  const faqs = [
    { q: 'When is Pronite happening?', a: 'November 9, 2025 at 8:00 PM at IIT Jodhpur Campus Ground' },
    { q: 'What is the ticket price?', a: '₹299 is the entry fees!!' },
    { q: 'Who are the performing artists?', a: 'The Lost Stories band will be performing live with their energetic music!' },
    { q: 'Is food available?', a: 'Yes, food and beverage stalls with various cuisines will be available.' },
    { q: 'What should I bring?', a: 'Valid ID, ticket confirmation, and yourself ready to celebrate!' }
  ];

  return (
    <div className="pronite-page-final">
      <motion.section
        ref={heroRef}
        className="hero-section-final"
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="hero-background-final">
          <div className="bg-layer-1"></div>
          <div className="bg-layer-2"></div>
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>

        <div className="hero-content-final">
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 40 }}
            animate={heroInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 1.2, type: 'spring', stiffness: 50 }}
            className="headline-wrapper-final"
          >
            <h1 className="hero-headline-final">
              <span className="line-1">VARCHAS</span>
              <span className="line-break"></span>
              <span className="line-2">PRONITE</span>
              <span className="line-3">2025</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={heroInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="headline-line-final"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="tagline-final"
          >
            An Unforgettable Music Experience Awaits
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="event-details-final"
          >
            <div className="detail-item">
              <span className="detail-label">Date</span>
              <span className="detail-value">09 NOV 2025</span>
            </div>
            <div className="detail-divider"></div>
            <div className="detail-item">
              <span className="detail-label">Time</span>
              <span className="detail-value">8:00 PM</span>
            </div>
            <div className="detail-divider"></div>
            <div className="detail-item">
              <span className="detail-label">Venue</span>
              <span className="detail-value">IIT JODHPUR</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
            className="countdown-final"
          >
            <h3 className="countdown-title">LAUNCH IN</h3>
            <div className="countdown-grid">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <motion.div
                  key={unit}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.1, duration: 0.6 }}
                  className="countdown-unit"
                >
                  <div className="unit-box">
                    <div className="unit-value">{String(value).padStart(2, '0')}</div>
                    <div className="unit-label">{unit}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="cta-group-final"
          >
            <a href="https://form.qfixonline.com/varchasform" target="_blank" rel="noopener noreferrer" className="btn-primary-final">
              <span className="btn-text">BOOK TICKETS NOW</span>
              <span className="btn-arrow">→</span>
            </a>
          </motion.div>

          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="scroll-indicator"
          >
            <div className="scroll-line"></div>
          </motion.div>
        </div>
      </motion.section>

      {/* <motion.section
        ref={galleryRef}
        className="gallery-section-final"
        initial={{ opacity: 0 }}
        animate={galleryInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="gallery-bg"></div>

        <div className="section-container">

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={galleryInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="gallery-main"
          >
            <img src={galleryImages[activeGallery].url} alt={galleryImages[activeGallery].title} className="main-img" />
            <div className="gallery-label">{galleryImages[activeGallery].title}</div>
          </motion.div>

          <div className="gallery-thumbnails">
            {galleryImages.map((img, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`gallery-thumb ${activeGallery === idx ? 'active' : ''}`}
                onClick={() => setActiveGallery(idx)}
              >
                <img src={img.url} alt={img.title} />
                {activeGallery === idx && <div className="thumb-indicator"></div>}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section> */}

      <motion.section
        ref={artistRef}
        className="artist-section"
        initial={{ opacity: 0 }}
        animate={artistInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="artist-bg"></div>

        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={artistInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="section-header-final"
          >
            <h2 className="section-title-final">Featured Artist</h2>
            <div className="section-line-final"></div>
            <p className="section-subtitle">Get Ready for an Electrifying Performance</p>
          </motion.div>

          <div className="artist-grid">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={artistInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="artist-card-final"
            >
              <div className="artist-img-placeholder">
                <img
                  src="https://img.mensxp.com/media/content/2016/Nov/lost-stories-artist-profile-980x457-1478528496.jpg"
                  alt="Lost Stories Band"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%'
                  }}
                />
                {/* <div className="placeholder-text">LF</div> */}
              </div>
              <h3 className="artist-role">LOST STORIES</h3>
              <p className="artist-role"></p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* <motion.section
        ref={highlightsRef}
        className="highlights-section"
        initial={{ opacity: 0 }}
        animate={highlightsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="highlights-bg"></div>

        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={highlightsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="section-header-final"
          >
            <h2 className="section-title-final">Event Highlights</h2>
            <div className="section-line-final"></div>
          </motion.div>

          <div className="highlights-grid">
            {highlights.map((highlight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={highlightsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + idx * 0.08, duration: 0.6 }}
                className="highlight-card"
              >
                <div className="highlight-num">{highlight.num}</div>
                <h4 className="highlight-title">{highlight.title}</h4>
                <p className="highlight-desc">{highlight.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section> */}

      <motion.section
        ref={statsRef}
        className="stats-section-final"
        initial={{ opacity: 0 }}
        animate={statsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="section-container">
          <div className="stats-grid">
            {[
              { num: '5000+', label: 'ATTENDEES' },
              { num: '2+', label: 'HOURS' },
              { num: '₹299', label: 'ONLY' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1 + idx * 0.1, duration: 0.6 }}
                className="stat-box-final"
              >
                <div className="stat-num">{stat.num}</div>
                <div className="stat-lbl">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={faqRef}
        className="faq-section-final"
        initial={{ opacity: 0 }}
        animate={faqInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="faq-bg"></div>

        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="section-header-final"
          >
            <h2 className="section-title-final">Frequently Asked</h2>
            <div className="section-line-final"></div>
          </motion.div>

          <div className="faq-grid-final">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + idx * 0.08, duration: 0.6 }}
                className="faq-card-final"
              >
                <h4 className="faq-q-final">{faq.q}</h4>
                <p className="faq-a-final">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Pronite;
