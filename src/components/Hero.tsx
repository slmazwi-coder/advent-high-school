import React, { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ImageOff } from 'lucide-react';

/**
 * ═══════════════════════════════════════════════════════
 *  HOW TO ADD YOUR HERO PHOTOS
 *  ─────────────────────────────────────────────────────
 *  1. In your GitHub repo, open the folder: public/assets/hero/
 *  2. Upload your photos and name them exactly:
 *       slide1.jpg   (or .png / .webp)
 *       slide2.jpg
 *       slide3.jpg
 *  3. Update the `src` values in SLIDES below to match.
 *  4. The recommended image size is 1400 × 800 px minimum.
 *  5. A dark overlay is always applied, so any photo works.
 * ═══════════════════════════════════════════════════════
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
    sub: 'Grade 8–12 · Matric Rewrite Available',
  },
  {
    src: '/assets/hero/slide3.jpg',
    caption: 'Faith · Discipline · Excellence',
    sub: '"The fear of the Lord is the beginning of wisdom"',
  },
];

const OVERLAY = 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.25) 100%)';

export const Hero = () => {
  const [idx, setIdx] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [loadedMap, setLoadedMap] = useState<Record<number, boolean>>({});
  const [failedMap, setFailedMap] = useState<Record<number, boolean>>({});

  const goTo = useCallback((next: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setIdx(next);
      setTransitioning(false);
    }, 380);
  }, [transitioning]);

  const prev = () => goTo((idx - 1 + SLIDES.length) % SLIDES.length);
  const next = () => goTo((idx + 1) % SLIDES.length);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => goTo((idx + 1) % SLIDES.length), 6500);
    return () => clearInterval(t);
  }, [idx, goTo]);

  // Preload all images
  useEffect(() => {
    SLIDES.forEach((s, i) => {
      const img = new Image();
      img.src = s.src;
      img.onload = () => setLoadedMap(m => ({ ...m, [i]: true }));
      img.onerror = () => setFailedMap(m => ({ ...m, [i]: true }));
    });
  }, []);

  const slide = SLIDES[idx];
  const imageReady = loadedMap[idx] && !failedMap[idx];
  const anyLoaded = Object.keys(loadedMap).length > 0;

  return (
    <section style={{
      position: 'relative',
      height: 'min(88vh, 620px)',
      minHeight: 380,
      overflow: 'hidden',
      background: '#111',
      userSelect: 'none',
    }}>

      {/* ── Background image ── */}
      {imageReady && (
        <div style={{
          position: 'absolute', inset: 0,
          opacity: transitioning ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}>
          <img
            src={slide.src}
            alt=""
            aria-hidden
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      )}

      {/* ── Overlay ── */}
      <div style={{ position: 'absolute', inset: 0, background: OVERLAY, zIndex: 1 }} />

      {/* ── No-photo placeholder (shows until photos are uploaded) ── */}
      {!anyLoaded && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d0a0a 100%)',
        }} />
      )}

      {/* ── Content ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem 1.5rem',
      }}>
        {/* School crest */}
        <img
          src="/logo.png"
          alt="Advent Comprehensive High School crest"
          style={{
            width: 68, height: 68,
            borderRadius: '50%',
            border: '2.5px solid #B91C1C',
            background: '#fff',
            boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
            marginBottom: '1.25rem',
          }}
        />

        {/* Headline — animates on slide change */}
        <h1
          key={`h-${idx}`}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 4.5vw, 2.75rem)',
            fontWeight: 900,
            color: '#fff',
            margin: '0 0 0.65rem',
            lineHeight: 1.18,
            maxWidth: 640,
            textShadow: '0 2px 10px rgba(0,0,0,0.55)',
            animation: 'heroSlideUp 0.55s ease both',
          }}
        >
          {slide.caption}
        </h1>

        <p
          key={`p-${idx}`}
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(0.82rem, 2.2vw, 1rem)',
            color: 'rgba(255,255,255,0.75)',
            margin: '0 0 2rem',
            maxWidth: 480,
            animation: 'heroSlideUp 0.55s 0.07s ease both',
          }}
        >
          {slide.sub}
        </p>

        {/* CTA buttons */}
        <div style={{
          display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center',
          animation: 'heroSlideUp 0.55s 0.14s ease both',
        }}>
          <a href="/admissions" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.88rem',
            padding: '0.75rem 1.6rem', borderRadius: '0.45rem',
            background: '#B91C1C', color: '#fff', textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(185,28,28,0.5)',
            transition: 'background 0.15s',
          }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#7F1D1D')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#B91C1C')}
          >
            Apply Now <ArrowRight size={15} />
          </a>
          <a href="/about" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.88rem',
            padding: '0.75rem 1.6rem', borderRadius: '0.45rem',
            background: 'transparent', color: '#fff',
            border: '2px solid rgba(255,255,255,0.55)',
            textDecoration: 'none',
            transition: 'border-color 0.15s, background 0.15s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#fff'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.55)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            About Us
          </a>
        </div>
      </div>

      {/* ── Prev / Next ── */}
      {(['prev', 'next'] as const).map(dir => (
        <button
          key={dir}
          onClick={dir === 'prev' ? prev : next}
          aria-label={dir === 'prev' ? 'Previous slide' : 'Next slide'}
          style={{
            position: 'absolute', zIndex: 3,
            top: '50%', transform: 'translateY(-50%)',
            [dir === 'prev' ? 'left' : 'right']: '0.75rem',
            width: 38, height: 38,
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            transition: 'background 0.18s',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#B91C1C')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.4)')}
        >
          {dir === 'prev' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      ))}

      {/* ── Dot indicators ── */}
      <div style={{
        position: 'absolute', zIndex: 3,
        bottom: '1rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '0.45rem', alignItems: 'center',
      }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === idx ? 22 : 7, height: 7,
              borderRadius: 4,
              background: i === idx ? '#B91C1C' : 'rgba(255,255,255,0.35)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>

      {/* ── Upload reminder (only shown when no images loaded) ── */}
      {!anyLoaded && (
        <div style={{
          position: 'absolute', zIndex: 4,
          bottom: '3.5rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(0,0,0,0.55)', borderRadius: '2rem',
          padding: '0.4rem 1rem',
          color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem',
          whiteSpace: 'nowrap',
        }}>
          <ImageOff size={13} />
          Upload photos to public/assets/hero/ (slide1.jpg, slide2.jpg, slide3.jpg)
        </div>
      )}

      <style>{`
        @keyframes heroSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};
