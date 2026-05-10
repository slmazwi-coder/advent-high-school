import React, { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

/**
 * ─────────────────────────────────────────────
 *  ADD YOUR REAL PHOTOS HERE
 *  Drop images into public/assets/hero/ and
 *  list them below. Supported: jpg, png, webp.
 *  Recommended size: 1400 × 800 px minimum.
 * ─────────────────────────────────────────────
 */
const SLIDES = [
  {
    src: '/assets/hero/slide1.jpg',
    caption: 'Welcome to Advent Comprehensive High School',
    sub: 'Maluti, Matatiele · Eastern Cape',
  },
  {
    src: '/assets/hero/slide2.jpg',
    caption: 'Admissions 2026 Are Open',
    sub: 'Grade 8 – 12 · Matric Rewrite Available',
  },
  {
    src: '/assets/hero/slide3.jpg',
    caption: 'Faith · Discipline · Excellence',
    sub: '"The fear of the Lord is the beginning of wisdom"',
  },
];

/* Dark overlay so text is always readable over any photo */
const OVERLAY = 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.25) 100%)';

export const Hero = () => {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback((next: number) => {
    setFading(true);
    setTimeout(() => {
      setIdx(next);
      setFading(false);
    }, 350);
  }, []);

  const prev = () => goTo((idx - 1 + SLIDES.length) % SLIDES.length);
  const next = () => goTo((idx + 1) % SLIDES.length);

  useEffect(() => {
    const t = setInterval(() => goTo((idx + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, [idx, goTo]);

  const slide = SLIDES[idx];

  return (
    <section style={{ position: 'relative', height: 'min(90vh, 640px)', overflow: 'hidden', background: '#111' }}>

      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.4s ease',
      }}>
        <img
          src={slide.src}
          alt={slide.caption}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          /* If image fails to load, the dark background still looks fine */
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
        <div style={{ position: 'absolute', inset: 0, background: OVERLAY }} />
      </div>

      {/* Text content */}
      <div style={{
        position: 'relative', zIndex: 2,
        height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '0 1.25rem',
      }}>
        {/* Crest */}
        <img
          src="/logo.svg"
          alt="Advent crest"
          style={{
            width: 64, height: 64,
            borderRadius: '50%',
            border: '2px solid #B91C1C',
            background: '#fff',
            marginBottom: '1.25rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          }}
        />

        {/* Headline */}
        <h1
          key={`h-${idx}`}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.6rem, 5vw, 3rem)',
            fontWeight: 900,
            color: '#fff',
            margin: '0 0 0.6rem',
            lineHeight: 1.15,
            maxWidth: 680,
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            animation: 'slideUp 0.5s ease both',
          }}
        >
          {slide.caption}
        </h1>

        {/* Sub */}
        <p
          key={`s-${idx}`}
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(0.85rem, 2.5vw, 1.05rem)',
            color: 'rgba(255,255,255,0.78)',
            margin: '0 0 2rem',
            maxWidth: 520,
            animation: 'slideUp 0.5s 0.08s ease both',
          }}
        >
          {slide.sub}
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', animation: 'slideUp 0.5s 0.15s ease both' }}>
          <a href="/admissions" className="btn btn-primary">
            Apply Now <ArrowRight size={15} />
          </a>
          <a href="/about" className="btn btn-outline">
            About Us
          </a>
        </div>
      </div>

      {/* Prev / Next arrows */}
      {[
        { fn: prev, side: 'left', label: 'Previous slide', icon: <ChevronLeft size={24} /> },
        { fn: next, side: 'right', label: 'Next slide', icon: <ChevronRight size={24} /> },
      ].map(({ fn, side, label, icon }) => (
        <button
          key={side}
          onClick={fn}
          aria-label={label}
          style={{
            position: 'absolute', zIndex: 3, top: '50%', [side]: '1rem',
            transform: 'translateY(-50%)',
            width: 40, height: 40,
            background: 'rgba(0,0,0,0.35)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%',
            color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#B91C1C')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.35)')}
        >
          {icon}
        </button>
      ))}

      {/* Dot indicators */}
      <div style={{
        position: 'absolute', zIndex: 3,
        bottom: '1.25rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '0.5rem',
      }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === idx ? 24 : 8, height: 8,
              borderRadius: 4,
              background: i === idx ? '#B91C1C' : 'rgba(255,255,255,0.4)',
              border: 'none', cursor: 'pointer',
              transition: 'all 0.3s',
              padding: 0,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};
