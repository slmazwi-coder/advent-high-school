import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';

export const Hero = () => {
  return (
    <section
      style={{
        position: 'relative',
        background: '#111111',
        overflow: 'hidden',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Geometric background accent */}
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute',
          top: '-10%', right: '-5%',
          width: '55%', height: '80%',
          background: 'linear-gradient(135deg, #B91C1C 0%, #7F1D1D 100%)',
          clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)',
          opacity: 0.18,
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #B91C1C, transparent)',
        }} />
        {/* Subtle grid */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.03 }}>
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container-narrow fade-up" style={{ position: 'relative', zIndex: 1, padding: '5rem 1.25rem' }}>
        <div style={{ maxWidth: '640px' }}>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <img src="/logo.svg" alt="ACHS" style={{ width: 48, height: 48, borderRadius: 10, border: '2px solid #B91C1C', background: '#fff', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#B91C1C',
              background: 'rgba(185,28,28,0.12)',
              padding: '0.3rem 0.8rem',
              borderRadius: '2rem',
              border: '1px solid rgba(185,28,28,0.3)',
            }}>
              Admissions 2026 Open
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 7vw, 4rem)',
            fontWeight: 900,
            color: '#ffffff',
            margin: '0 0 1rem',
            lineHeight: 1.1,
          }}>
            Advent<br />
            <span style={{ color: '#B91C1C' }}>Comprehensive</span><br />
            High School
          </h1>

          {/* Motto */}
          <p style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
            color: 'rgba(255,255,255,0.55)',
            margin: '0 0 2.5rem',
          }}>
            "The fear of the Lord is the beginning of wisdom"
          </p>

          {/* CTA row */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href="/admissions" className="btn btn-primary delay-1 fade-up">
              Enroll Now <ArrowRight size={16} />
            </a>
            <a href="/about" className="btn btn-outline delay-2 fade-up">
              About Us
            </a>
          </div>

          {/* Contact strip */}
          <div style={{
            marginTop: '3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '0.82rem',
          }}>
            <Phone size={14} style={{ color: '#B91C1C', flexShrink: 0 }} />
            <span>072 300 0020 &nbsp;·&nbsp; 060 700 8052</span>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        opacity: 0.3,
      }}>
        <div style={{ width: 1, height: 40, background: '#fff' }} />
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: '#fff', textTransform: 'uppercase' }}>Scroll</span>
      </div>
    </section>
  );
};
