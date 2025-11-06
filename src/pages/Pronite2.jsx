// import React, { useState, useEffect, useRef } from 'react';
// import { motion, useInView } from 'framer-motion';
// import '../styles/Pronite.css';

// const useIsMobile = (breakpoint = 768) => {
//   const [isMobile, setIsMobile] = useState(false);
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, [breakpoint]);
//   return isMobile;
// };

// const Pronite = () => {
//   const isMobile = useIsMobile(768);
//   const [activeImage, setActiveImage] = useState(0);
//   const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//   const [expandedFaq, setExpandedFaq] = useState(null);
  
//   const heroRef = useRef();
//   const aboutRef = useRef();
//   const lineupRef = useRef();
//   const scheduleRef = useRef();
//   const galleryRef = useRef();
//   const ticketsRef = useRef();
//   const faqRef = useRef();
  
//   const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
//   const aboutInView = useInView(aboutRef, { once: true, amount: 0.2 });
//   const lineupInView = useInView(lineupRef, { once: true, amount: 0.1 });
//   const scheduleInView = useInView(scheduleRef, { once: true, amount: 0.2 });
//   const galleryInView = useInView(galleryRef, { once: true, amount: 0.2 });
//   const ticketsInView = useInView(ticketsRef, { once: true, amount: 0.2 });
//   const faqInView = useInView(faqRef, { once: true, amount: 0.2 });

//   const eventDate = new Date('2025-02-15T20:00:00').getTime();

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const now = new Date().getTime();
//       const distance = eventDate - now;
//       setTimeLeft({
//         days: Math.floor(distance / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
//         minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
//         seconds: Math.floor((distance % (1000 * 60)) / 1000)
//       });
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [eventDate]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveImage((prev) => (prev + 1) % galleryImages.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const galleryImages = [
//     { url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800', caption: 'Varchas Pronite 2024' },
//     { url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800', caption: 'Epic Night Vibes' },
//     { url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800', caption: 'Crowd Energy' },
//     { url: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800', caption: 'Light Show' },
//     { url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800', caption: 'DJ Performance' },
//     { url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800', caption: 'Festival Atmosphere' }
//   ];

//   const artists = [
//     { 
//       name: 'DJ NUCLEYA', 
//       role: 'HEADLINER', 
//       image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400',
//       time: '10:00 PM',
//       genre: 'Bass / EDM'
//     },
//     { 
//       name: 'RITVIZ', 
//       role: 'SPECIAL GUEST', 
//       image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400',
//       time: '8:30 PM',
//       genre: 'Electronic Pop'
//     },
//     { 
//       name: 'SARTEK', 
//       role: 'OPENING ACT', 
//       image: 'https://images.unsplash.com/photo-1574769566514-01e1ce2b0c81?w=400',
//       time: '8:00 PM',
//       genre: 'House / Techno'
//     }
//   ];

//   const schedule = [
//     { time: '7:00 PM', event: 'Gates Open', description: 'Entry & Security Check', icon: '🚪' },
//     { time: '7:30 PM', event: 'DJ Warm Up', description: 'Opening Beats', icon: '🎵' },
//     { time: '8:00 PM', event: 'SARTEK Live', description: 'House & Techno Set', icon: '🎧' },
//     { time: '8:30 PM', event: 'RITVIZ Performance', description: 'Electronic Pop Hits', icon: '🎹' },
//     { time: '10:00 PM', event: 'DJ NUCLEYA', description: 'Main Headliner Set', icon: '👑' },
//     { time: '12:00 AM', event: 'After Party', description: 'Resident DJ Set', icon: '🌙' },
//     { time: '2:00 AM', event: 'Event Closes', description: 'See you next year!', icon: '🌟' }
//   ];

//   const faqs = [
//     { q: 'What should I bring?', a: 'Valid ID, ticket (digital/printed), and yourself! Outside food/drinks not allowed. Please carry a light jacket as it may get cold.' },
//     { q: 'Is parking available?', a: 'Yes, free parking with ample space. Valet service available. Arrive early for best spots.' },
//     { q: 'Age restrictions?', a: 'Open to all college students 18+ with valid ID proof. Non-students must be accompanied by a student.' },
//     { q: 'Can I get a refund?', a: 'Non-refundable, but transferable to another person via support team. Contact us for ticket transfers.' },
//     { q: 'Will food be available?', a: 'Yes! 20+ food stalls with various cuisines, plus dedicated beverage bars. All prices are reasonable.' },
//     { q: 'What time should I arrive?', a: 'Gates open at 7:00 PM. We recommend arriving by 7:30 PM for the best experience and to avoid queues.' },
//     { q: 'Is the event wheelchair accessible?', a: 'Yes, the venue is fully accessible with dedicated viewing areas. Assistance available 24/7.' },
//     { q: 'Can I bring a camera?', a: 'Personal cameras allowed. Professional equipment requires media pass approval. Contact organizers for details.' }
//   ];

//   const scrollToTickets = () => {
//     ticketsRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <div className="pronite-page">
      
//       {/* Hero Section */}
//       <motion.section 
//         ref={heroRef}
//         className="hero-section"
//         initial={{ opacity: 0 }}
//         animate={heroInView ? { opacity: 1 } : {}}
//         transition={{ duration: 1 }}
//       >
//         {/* Animated Background with Multiple Layers */}
//         <div className="hero-bg-layer-1"></div>
//         <div className="hero-bg-layer-2"></div>
//         <div className="hero-glow-1"></div>
//         <div className="hero-glow-2"></div>
//         <div className="hero-particles"></div>
        
//         <div className="hero-container">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={heroInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 0.2, duration: 0.8 }}
//             className="hero-badge"
//           >
//             <span className="live-pulse"></span>
//             <span className="badge-text">VARCHAS 2025 PRESENTS</span>
//           </motion.div>

//           <motion.h1
//             initial={{ opacity: 0, scale: 0.8, letterSpacing: '0.05em' }}
//             animate={heroInView ? { opacity: 1, scale: 1, letterSpacing: '0.1em' } : {}}
//             transition={{ delay: 0.3, duration: 0.9, type: 'spring' }}
//             className="hero-title"
//           >
//             PRONITE
//           </motion.h1>

//           <motion.div
//             initial={{ opacity: 0, width: 0 }}
//             animate={heroInView ? { opacity: 1, width: '120px' } : {}}
//             transition={{ delay: 0.5, duration: 0.8 }}
//             className="title-underline"
//           ></motion.div>

//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={heroInView ? { opacity: 1 } : {}}
//             transition={{ delay: 0.6, duration: 0.8 }}
//             className="hero-subtitle"
//           >
//             The Ultimate EDM Experience
//           </motion.p>

//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={heroInView ? { opacity: 1 } : {}}
//             transition={{ delay: 0.7, duration: 0.8 }}
//             className="hero-date"
//           >
//             February 15, 2025 • 7:00 PM onwards
//           </motion.p>

//           {/* Countdown */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={heroInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 0.8, duration: 0.8 }}
//             className="countdown-container"
//           >
//             {Object.entries(timeLeft).map(([unit, value]) => (
//               <div key={unit} className="countdown-box">
//                 <div className="countdown-box-inner">
//                   <div className="countdown-number">{String(value).padStart(2, '0')}</div>
//                   <div className="countdown-text">{unit}</div>
//                 </div>
//               </div>
//             ))}
//           </motion.div>

//           {/* CTA Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={heroInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 0.9, duration: 0.8 }}
//             className="hero-buttons"
//           >
//             <button className="btn-primary" onClick={scrollToTickets}>
//               <span className="btn-text">GET TICKETS NOW</span>
//               <span className="btn-arrow">→</span>
//             </button>
//             <button className="btn-secondary">
//               <span className="btn-text">WATCH TEASER</span>
//               <span className="btn-arrow">▶</span>
//             </button>
//           </motion.div>

//           {/* Hero Stats */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={heroInView ? { opacity: 1 } : {}}
//             transition={{ delay: 1, duration: 0.8 }}
//             className="hero-stats"
//           >
//             <div className="hero-stat-item">
//               <div className="stat-icon">👥</div>
//               <div className="stat-number">5000+</div>
//               <div className="stat-text">Attendees</div>
//             </div>
//             <div className="stat-separator"></div>
//             <div className="hero-stat-item">
//               <div className="stat-icon">🎤</div>
//               <div className="stat-number">3</div>
//               <div className="stat-text">Top Artists</div>
//             </div>
//             <div className="stat-separator"></div>
//             <div className="hero-stat-item">
//               <div className="stat-icon">⏱️</div>
//               <div className="stat-number">6+</div>
//               <div className="stat-text">Hours</div>
//             </div>
//           </motion.div>
//         </div>

//         <motion.div
//           animate={{ y: [0, 15, 0] }}
//           transition={{ repeat: Infinity, duration: 2 }}
//           className="scroll-down"
//         >
//           <div className="scroll-wheel"></div>
//         </motion.div>
//       </motion.section>

//       {/* Features Scroll */}
//       <div className="features-scroll">
//         <div className="features-scroll-content">
//           <div className="scroll-track">
//             <span className="scroll-item">🎵 50,000W Sound System</span>
//             <span className="scroll-item">💡 360° LED Light Show</span>
//             <span className="scroll-item">🎬 Live Streaming Available</span>
//             <span className="scroll-item">🍔 20+ Food Stalls</span>
//             <span className="scroll-item">🎁 Exclusive Merchandise</span>
//             <span className="scroll-item">📸 Photo Booths</span>
//             <span className="scroll-item">🚗 Free Parking</span>
//             <span className="scroll-item">🏥 Medical Support</span>
//           </div>
//         </div>
//       </div>

//       {/* About Section */}
//       <motion.section
//         ref={aboutRef}
//         id="about"
//         className="about-section"
//         initial={{ opacity: 0 }}
//         animate={aboutInView ? { opacity: 1 } : {}}
//         transition={{ duration: 0.8 }}
//       >
//         <div className="about-bg-glow"></div>
//         <div className="section-container">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={aboutInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 0.1, duration: 0.8 }}
//             className="section-header"
//           >
//             <span className="section-tag">WHAT TO EXPECT</span>
//             <h2 className="section-title">Experience The Magic</h2>
//             <div className="gold-divider"></div>
//           </motion.div>

//           <div className="about-content">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={aboutInView ? { opacity: 1, x: 0 } : {}}
//               transition={{ delay: 0.2, duration: 0.8 }}
//               className="about-text-box"
//             >
//               <h3 className="about-heading">The Biggest EDM Night of the Year</h3>
//               <p className="about-paragraph">
//                 Get ready for an unforgettable night as Varchas 2025 transforms IIT Jodhpur into the ultimate EDM paradise. With world-class artists, cutting-edge production, and an electric atmosphere, this is THE event you cannot miss.
//               </p>
//               <p className="about-paragraph">
//                 Experience thundering bass drops, mesmerizing light shows, and the energy of thousands of music lovers united under the stars. This isn't just a concert—it's a movement.
//               </p>
//               <div className="feature-badges">
//                 <div className="badge">
//                   <span className="badge-icon">🎧</span>
//                   <span>3 Top Artists</span>
//                 </div>
//                 <div className="badge">
//                   <span className="badge-icon">⚡</span>
//                   <span>50,000W Sound</span>
//                 </div>
//                 <div className="badge">
//                   <span className="badge-icon">✨</span>
//                   <span>LED Spectacle</span>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               animate={aboutInView ? { opacity: 1, x: 0 } : {}}
//               transition={{ delay: 0.3, duration: 0.8 }}
//               className="about-image"
//             >
//               <div className="image-frame">
//                 <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600" alt="Pronite" />
//                 <div className="image-overlay">
//                   <button className="play-btn">▶</button>
//                 </div>
//                 <div className="frame-border"></div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </motion.section>

//       {/* Artist Lineup */}
//       <motion.section
//         ref={lineupRef}
//         id="lineup"
//         className="lineup-section"
//         initial={{ opacity: 0 }}
//         animate={lineupInView ? { opacity: 1 } : {}}
//         transition={{ duration: 0.8 }}
//       >
//         <div className="lineup-bg-glow"></div>
//         <div className="section-container">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={lineupInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 0.1, duration: 0.8 }}
//             className="section-header"
//           >
//             <span className="section-tag">STAR STUDDED</span>
//             <h2 className="section-title">Artist Lineup</h2>
//             <div className="gold-divider"></div>
//           </motion.div>

//           <div className="lineup-grid">
//             {artists.map((artist, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={lineupInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ delay: idx * 0.15, duration: 0.6 }}
//                 className="artist-card"
//               >
//                 <div className="artist-card-inner">
//                   <div className="artist-img-wrapper">
//                     <img src={artist.image} alt={artist.name} className="artist-img" />
//                     <div className="artist-overlay-gradient"></div>
//                     <div className="artist-role">{artist.role}</div>
//                   </div>
//                   <div className="artist-details">
//                     <div className="artist-name-container">
//                       <h3 className="artist-name">{artist.name}</h3>
//                       <div className="artist-line"></div>
//                     </div>
//                     <div className="artist-meta">
//                       <span className="genre-badge">{artist.genre}</span>
//                       <span className="time-badge">🕙 {artist.time}</span>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* Schedule Timeline */}
//       <motion.section
//         ref={scheduleRef}
//         id="schedule"
//         className="schedule-section"
//         initial={{ opacity: 0 }}
//         animate={scheduleInView ? { opacity: 1 } : {}}
//         transition={{ duration: 0.8 }}
//       >
//         <div className="section-container">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={scheduleInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 0.1, duration: 0.8 }}
//             className="section-header"
//           >
//             <span className="section-tag">PLAN YOUR NIGHT</span>
//             <h2 className="section-title">Event Schedule</h2>
//             <div className="gold-divider"></div>
//           </motion.div>

//           <div className="timeline">
//             {schedule.map((item, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
//                 animate={scheduleInView ? { opacity: 1, x: 0 } : {}}
//                 transition={{ delay: idx * 0.1, duration: 0.6 }}
//                 className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}
//               >
//                 <div className="timeline-box">
//                   <div className="timeline-icon">{item.icon}</div>
//                   <div className="timeline-time">{item.time}</div>
//                   <h4 className="timeline-event">{item.event}</h4>
//                   <p className="timeline-desc">{item.description}</p>
//                 </div>
//                 <div className="timeline-dot"></div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* Gallery Section */}
//       <motion.section
//         ref={galleryRef}
//         id="gallery"
//         className="gallery-section"
//         initial={{ opacity: 0 }}
//         animate={galleryInView ? { opacity: 1 } : {}}
//         transition={{ duration: 0.8 }}
//       >
//         <div className="gallery-bg-glow"></div>
//         <div className="section-container-full">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={galleryInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 0.1, duration: 0.8 }}
//             className="section-header"
//           >
//             <span className="section-tag">MEMORIES</span>
//             <h2 className="section-title">Past Pronites</h2>
//             <div className="gold-divider"></div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={galleryInView ? { opacity: 1, scale: 1 } : {}}
//             transition={{ delay: 0.2, duration: 0.8 }}
//             className="gallery-main"
//           >
//             <img src={galleryImages[activeImage].url} alt={galleryImages[activeImage].caption} className="main-image" />
//             <div className="gallery-label">
//               <span className="label-text">{galleryImages[activeImage].caption}</span>
//             </div>
//           </motion.div>

//           <div className="gallery-thumbs">
//             {galleryImages.map((img, idx) => (
//               <motion.div
//                 key={idx}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 className={`thumb ${activeImage === idx ? 'active' : ''}`}
//                 onClick={() => setActiveImage(idx)}
//               >
//                 <img src={img.url} alt={img.caption} />
//                 {activeImage === idx && <div className="thumb-indicator"></div>}
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* Tickets Section */}
//       <motion.section
//         ref={ticketsRef}
//         className="tickets-section"
//         initial={{ opacity: 0 }}
//         animate={ticketsInView ? { opacity: 1 } : {}}
//         transition={{ duration: 0.8 }}
//       >
//         <div className="tickets-bg-glow"></div>
//         <div className="section-container">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={ticketsInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 0.1, duration: 0.8 }}
//             className="section-header"
//           >
//             <span className="section-tag">SECURE YOUR SPOT</span>
//             <h2 className="section-title">Get Your Tickets</h2>
//             <div className="gold-divider"></div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 50, scale: 0.9 }}
//             animate={ticketsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
//             transition={{ delay: 0.2, duration: 0.8 }}
//             className="single-ticket-card"
//           >
//             <div className="ticket-card-glow"></div>
//             <div className="ticket-card-content">
//               <div className="ticket-header">
//                 <div className="ticket-icon">🎫</div>
//                 <h3 className="ticket-tier">PRONITE 2025</h3>
//               </div>
              
//               <div className="ticket-price-section">
//                 <div className="price-tag">
//                   <span className="current">₹299</span>
//                 </div>
//                 <div className="price-highlight">Unlimited Access</div>
//               </div>

//               <ul className="features-list">
//                 <li>
//                   <span className="check">✓</span>
//                   <span>General Entry to Main Stage</span>
//                 </li>
//                 <li>
//                   <span className="check">✓</span>
//                   <span>6+ Hours of Non-Stop EDM Music</span>
//                 </li>
//                 <li>
//                   <span className="check">✓</span>
//                   <span>Access to All Food & Beverage Stalls</span>
//                 </li>
//                 <li>
//                   <span className="check">✓</span>
//                   <span>Stunning Light & Laser Shows</span>
//                 </li>
//                 <li>
//                   <span className="check">✓</span>
//                   <span>Official Varchas Merchandise</span>
//                 </li>
//                 <li>
//                   <span className="check">✓</span>
//                   <span>Photo Booth & Social Media Features</span>
//                 </li>
//                 <li>
//                   <span className="check">✓</span>
//                   <span>Free Parking Available</span>
//                 </li>
//                 <li>
//                   <span className="check">✓</span>
//                   <span>24/7 Medical Support On-Site</span>
//                 </li>
//               </ul>

//               <a
//                 href="https://form.qfixonline.com/varchasform"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="book-btn"
//               >
//                 <span>BOOK YOUR SPOT NOW</span>
//                 <span className="btn-arrow-icon">→</span>
//               </a>

//               <div className="payment-badges">
//                 <div className="payment-badge">
//                   <span className="badge-icon">🔒</span>
//                   <span>Secure</span>
//                 </div>
//                 <div className="payment-badge">
//                   <span className="badge-icon">⚡</span>
//                   <span>Instant</span>
//                 </div>
//                 <div className="payment-badge">
//                   <span className="badge-icon">✓</span>
//                   <span>Verified</span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </motion.section>

//       {/* FAQ Section */}
//       <motion.section
//         ref={faqRef}
//         className="faq-section"
//         initial={{ opacity: 0 }}
//         animate={faqInView ? { opacity: 1 } : {}}
//         transition={{ duration: 0.8 }}
//       >
//         <div className="faq-bg-glow"></div>
//         <div className="section-container">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={faqInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 0.1, duration: 0.8 }}
//             className="section-header"
//           >
//             <span className="section-tag">GOT QUESTIONS?</span>
//             <h2 className="section-title">FAQ</h2>
//             <div className="gold-divider"></div>
//           </motion.div>

//           <div className="faq-grid">
//             {faqs.map((faq, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={faqInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ delay: idx * 0.08, duration: 0.6 }}
//                 className={`faq-item ${expandedFaq === idx ? 'expanded' : ''}`}
//               >
//                 <button
//                   className="faq-question"
//                   onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
//                 >
//                   <span className="question-text">{faq.q}</span>
//                   <span className="toggle-icon">{expandedFaq === idx ? '−' : '+'}</span>
//                 </button>
//                 {expandedFaq === idx && (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: 'auto' }}
//                     exit={{ opacity: 0, height: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="faq-answer"
//                   >
//                     {faq.a}
//                   </motion.div>
//                 )}
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>
//     </div>
//   );
// };

// export default Pronite;

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
  const [email, setEmail] = useState('');
  const [notifySuccess, setNotifySuccess] = useState(false);
  const [emailError, setEmailError] = useState(false);
  
  const heroRef = useRef();
  const featuresRef = useRef();
  const notifyRef = useRef();
  
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const notifyInView = useInView(notifyRef, { once: true, amount: 0.2 });

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

  const features = [
    { icon: '🎵', title: 'Top EDM Artists', desc: 'World-class DJs performing live' },
    { icon: '💡', title: '360° Light Show', desc: 'Stunning visual spectacle' },
    { icon: '🔊', title: 'Premium Sound', desc: '50,000W audio system' },
    { icon: '🎉', title: 'Incredible Vibe', desc: '5000+ music lovers united' }
  ];

  const suspenseCards = [
    { num: '01', text: 'Mystery Artist Reveal', emoji: '🎭', color: 'gold-1' },
    { num: '02', text: 'Exclusive Performance', emoji: '🎸', color: 'gold-2' },
    { num: '03', text: 'Surprise Collaborations', emoji: '🤝', color: 'gold-3' },
    { num: '04', text: 'Limited Merchandise', emoji: '🎁', color: 'gold-4' }
  ];

  const handleEmailNotify = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email.trim()) {
      setEmailError(true);
      setTimeout(() => setEmailError(false), 3000);
      return;
    }

    if (!emailRegex.test(email)) {
      setEmailError(true);
      setTimeout(() => setEmailError(false), 3000);
      return;
    }

    setNotifySuccess(true);
    setEmail('');
    setTimeout(() => setNotifySuccess(false), 5000);
  };

  return (
    <div className="pronite-page">
      
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="hero-section-coming"
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="hero-bg-animated">
          <div className="glow-orb glow-1"></div>
          <div className="glow-orb glow-2"></div>
          <div className="glow-orb glow-3"></div>
        </div>

        <div className="stars-bg"></div>
        
        <div className="hero-container-coming">
          {/* Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="coming-soon-badge"
          >
            <span className="badge-glow"></span>
            <span className="badge-text">COMING SOON</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 1, type: 'spring' }}
            className="hero-title-coming"
          >
            <span className="title-word">PRONITE</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={heroInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="title-line"
          ></motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hero-subtitle-coming"
          >
            The Ultimate EDM Experience is Coming
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="hero-date-coming"
          >
            November 9, 2025 • 8:00 PM
          </motion.p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="countdown-container-coming"
          >
            <div className="countdown-wrapper">
              {Object.entries(timeLeft).map(([unit, value], idx) => (
                <motion.div
                  key={unit}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.9 + idx * 0.1, duration: 0.6 }}
                  className="countdown-box-coming"
                >
                  <div className="countdown-inner">
                    <div className="countdown-value">{String(value).padStart(2, '0')}</div>
                    <div className="countdown-unit">{unit}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="cta-buttons-coming"
          >
            <a href="https://form.qfixonline.com/varchasform" target="_blank" rel="noopener noreferrer" className="cta-btn primary">
              <span className="btn-icon">🎫</span>
              <span className="btn-text">BOOK TICKETS</span>
              <span className="btn-arrow">→</span>
            </a>
            <button className="cta-btn secondary" onClick={() => notifyRef.current?.scrollIntoView({ behavior: 'smooth' })}>
              <span className="btn-icon">🔔</span>
              <span className="btn-text">GET NOTIFIED</span>
              <span className="btn-arrow">↓</span>
            </button>
          </motion.div>

          {/* Hype Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="hype-text"
          >
            <span className="pulse-dot"></span>
            <span>Be part of something extraordinary</span>
          </motion.div>
        </div>

        {/* Animated Scroll Down */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="scroll-indicator"
        >
          <div className="scroll-icon"></div>
        </motion.div>
      </motion.section>

      {/* Suspense Features Section */}
      <motion.section
        ref={featuresRef}
        className="features-section-coming"
        initial={{ opacity: 0 }}
        animate={featuresInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="section-bg-glow"></div>

        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="section-header-coming"
          >
            <h2 className="section-title-coming">What's Coming</h2>
            <div className="section-divider-coming"></div>
          </motion.div>

          {/* Suspense Cards */}
          <div className="suspense-grid">
            {suspenseCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, rotateY: -10 }}
                animate={featuresInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                transition={{ delay: 0.2 + idx * 0.15, duration: 0.6 }}
                className={`suspense-card ${card.color}`}
              >
                <div className="card-inner">
                  <div className="card-number">{card.num}</div>
                  <div className="card-emoji">{card.emoji}</div>
                  <div className="card-text">{card.text}</div>
                  <div className="card-glow"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feature Highlights */}
          <div className="features-grid-coming">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={featuresInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + idx * 0.1, duration: 0.6 }}
                className="feature-card-coming"
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Email Notification Section */}
      <motion.section
        ref={notifyRef}
        className="notify-section-coming"
        initial={{ opacity: 0 }}
        animate={notifyInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="notify-bg-glow"></div>

        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={notifyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="notify-content"
          >
            <h2 className="notify-title">Stay Updated</h2>
            <p className="notify-subtitle">Get exclusive updates and early access to tickets</p>

            <form onSubmit={handleEmailNotify} className="notify-form">
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`email-input ${emailError ? 'error' : ''}`}
                />
                <button type="submit" className="notify-btn">
                  <span>NOTIFY ME</span>
                  <span className="arrow">→</span>
                </button>
              </div>
              {emailError && <div className="error-msg">Please enter a valid email</div>}
              {notifySuccess && <div className="success-msg">✓ We'll notify you soon!</div>}
            </form>

            <div className="form-note">
              🔒 We respect your privacy. Unsubscribe at any time.
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Social Proof Section */}
      <motion.section
        className="social-proof-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="section-container">
          <div className="proof-grid">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="proof-card"
            >
              <div className="proof-icon">🎉</div>
              <div className="proof-number">5000+</div>
              <div className="proof-text">Confirmed Attendees</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="proof-card"
            >
              <div className="proof-icon">🎤</div>
              <div className="proof-number">3+</div>
              <div className="proof-text">Top Artists</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="proof-card"
            >
              <div className="proof-icon">⭐</div>
              <div className="proof-number">6+</div>
              <div className="proof-text">Hours of Music</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="proof-card"
            >
              <div className="proof-icon">🎊</div>
              <div className="proof-number">₹299</div>
              <div className="proof-text">Only</div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="faq-section-coming"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="section-container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="faq-title"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="faq-grid-coming">
            {[
              { q: 'When is Pronite happening?', a: 'November 9, 2025 at 8:00 PM at IIT Jodhpur Campus' },
              { q: 'How much are the tickets?', a: '₹299 only for general entry. Early bird pricing available!' },
              { q: 'Who are the artists?', a: 'We have top EDM artists performing. More details coming soon!' },
              { q: 'Will there be food?', a: 'Yes! 20+ food stalls with various cuisines available.' }
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + idx * 0.1, duration: 0.6 }}
                className="faq-item-coming"
              >
                <h4 className="faq-q">{faq.q}</h4>
                <p className="faq-a">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Pronite;
