import React from 'react';
import { ChromaGrid } from '../components/ChromaGrid';
import '../styles/ChromaGrid.css';
import eventsData from '../../data.json';


function Team() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      padding: '2rem 0'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem',
        padding: '0 2rem'
      }}>
        <h1 style={{
          color: '#D4AF37',
          fontSize: '3rem',
          fontWeight: '700',
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          OUR TEAM
        </h1>
        <p style={{
          color: '#ccc',
          fontSize: '1.2rem',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Meet the dedicated individuals behind VARCHAS 2025.
          Our passionate team works tirelessly to bring you the best sports experience.
        </p>
      </div>

      <ChromaGrid
        items={eventsData}
        columns={3}
        rows={2}
        radius={300}
        className="events-grid"
      />
    </div>
  );
}

export default Team;
