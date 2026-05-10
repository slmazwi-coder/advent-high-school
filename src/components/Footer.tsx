import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook } from 'lucide-react';

export const Footer = () => (
  <footer style={{ background: '#111111', color: '#fff' }}>
    <div className="container-narrow" style={{ padding: '3.5rem 1.25rem 2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>

        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <img src="/logo.svg" alt="ACHS" style={{ width: 40, height: 40, borderRadius: 8, border: '2px solid #B91C1C', background: '#fff' }} />
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.2 }}>
                Advent Comprehensive<br />High School
              </div>
            </div>
          </div>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, margin: '0 0 1rem' }}>
            "The fear of the Lord is the beginning of wisdom"
          </p>
          <a href="https://facebook.com" target="_blank" rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', color: '#fff', textDecoration: 'none', transition: 'background 0.15s' }}
            aria-label="Facebook"
          >
            <Facebook size={16} />
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>
            Quick Links
          </h4>
          {[
            { label: 'About Us', to: '/about' },
            { label: 'Admissions', to: '/admissions' },
            { label: 'Applications', to: '/applications' },
            { label: 'Boarding', to: '/boarding' },
            { label: 'Merchandise', to: '/merchandise' },
            { label: 'Contact', to: '/contact' },
            { label: 'Student Portal', to: '/student/login' },
            { label: 'Staff Portal', to: '/admin/login' },
          ].map(l => (
            <Link key={l.to} to={l.to} style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', textDecoration: 'none', marginBottom: '0.5rem', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>
            Contact
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {[
              { icon: MapPin, text: '505 Maluti, Matatiele, 4740' },
              { icon: Phone, text: '072 300 0020 / 060 700 8052' },
              { icon: Mail, text: 'adventhighschool90@gmail.com' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                <Icon size={14} style={{ color: '#B91C1C', flexShrink: 0, marginTop: 3 }} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hours */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>
            School Hours
          </h4>
          {[
            { day: 'Mon – Thu', hours: '07:30 – 15:30' },
            { day: 'Friday', hours: '07:30 – 13:30' },
            { day: 'Weekend', hours: 'Closed' },
          ].map(r => (
            <div key={r.day} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
              <span>{r.day}</span>
              <span style={{ fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>{r.hours}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
          © {new Date().getFullYear()} Advent Comprehensive High School · Matatiele, Eastern Cape
        </p>
      </div>
    </div>
  </footer>
);
