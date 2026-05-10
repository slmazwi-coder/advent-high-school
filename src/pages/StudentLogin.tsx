import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
export const StudentLogin = () => (
  <div style={{ minHeight: '100vh', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
    <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '1rem', padding: '2.5rem', maxWidth: 400, width: '100%', textAlign: 'center' }}>
      <div style={{ width: 56, height: 56, background: '#B91C1C', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
        <User size={24} style={{ color: '#fff' }} />
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '1.5rem', margin: '0 0 0.5rem' }}>Student Portal</h1>
      <p style={{ color: '#888', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>Coming soon</p>
      <Link to="/" style={{ fontSize: '0.85rem', color: '#B91C1C', textDecoration: 'none' }}>← Back to website</Link>
    </div>
  </div>
);
