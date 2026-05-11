import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Staff', path: '/staff' },
  { name: 'Documents', path: '/documents' },
  { name: 'Achievements', path: '/achievements' },
  { name: 'Sport', path: '/sport' },
  { name: 'Activities', path: '/activities' },
  { name: 'Admissions', path: '/admissions' },
  { name: 'Boarding', path: '/boarding' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 900);
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: '#ffffff',
      borderBottom: '3px solid #B91C1C',
      boxShadow: scrolled ? '0 2px 14px rgba(0,0,0,0.12)' : 'none',
      transition: 'box-shadow 0.2s',
    }}>

      {/* ── Top row: logo + school name + right button ── */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '0 1.25rem',
        height: 60,
        maxWidth: '72rem', margin: '0 auto',
        gap: '0.75rem',
        borderBottom: isMobile ? 'none' : '1px solid #f0efe9',
      }}>
        {/* Logo + name */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none', flex: 1 }}>
          <img
            src="/logo.png"
            alt="Advent Comprehensive High School"
            style={{ width: 40, height: 40, borderRadius: 8, border: '2px solid #B91C1C', background: '#fff', flexShrink: 0 }}
          />
          <div style={{ lineHeight: 1.25 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: '#111' }}>
              Advent Comprehensive High School
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              Maluti · Matatiele · Eastern Cape
            </div>
          </div>
        </Link>

        {/* Desktop: Student Portal button */}
        {!isMobile && (
          <Link to="/student/login" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
            fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.78rem',
            padding: '0.42rem 1rem', borderRadius: '0.4rem',
            background: '#111', color: '#fff', textDecoration: 'none', whiteSpace: 'nowrap',
            flexShrink: 0, transition: 'background 0.15s',
          }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#B91C1C')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#111')}
          >
            <User size={13} /> Student Portal
          </Link>
        )}

        {/* Mobile: hamburger */}
        {isMobile && (
          <button
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            style={{
              background: 'none', border: '1.5px solid #ddd', borderRadius: '0.4rem',
              cursor: 'pointer', color: '#111',
              padding: '0.35rem 0.5rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        )}
      </div>

      {/* ── Desktop bottom row: nav links ── */}
      {!isMobile && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexWrap: 'wrap',
          padding: '0.35rem 1.25rem',
          gap: '0.1rem',
          maxWidth: '72rem', margin: '0 auto',
        }}>
          {NAV_LINKS.map(l => (
            <Link
              key={l.path}
              to={l.path}
              style={{
                fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                fontWeight: isActive(l.path) ? 700 : 500,
                padding: '0.35rem 0.7rem', borderRadius: '0.35rem',
                textDecoration: 'none', whiteSpace: 'nowrap',
                color: isActive(l.path) ? '#fff' : '#333',
                background: isActive(l.path) ? '#B91C1C' : 'transparent',
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={e => {
                if (!isActive(l.path)) {
                  (e.currentTarget as HTMLElement).style.background = '#FEE2E2';
                  (e.currentTarget as HTMLElement).style.color = '#B91C1C';
                }
              }}
              onMouseLeave={e => {
                if (!isActive(l.path)) {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = '#333';
                }
              }}
            >
              {l.name}
            </Link>
          ))}
        </div>
      )}

      {/* ── Mobile drawer ── */}
      {isMobile && open && (
        <div style={{
          background: '#fff',
          borderTop: '1px solid #f0efe9',
          padding: '0.5rem 1.25rem 1.5rem',
          maxHeight: '80vh',
          overflowY: 'auto',
        }}>
          {NAV_LINKS.map(l => (
            <Link
              key={l.path}
              to={l.path}
              style={{
                display: 'flex', alignItems: 'center',
                padding: '0.8rem 0',
                borderBottom: '1px solid #f5f5f0',
                fontFamily: 'var(--font-body)', fontSize: '1rem',
                fontWeight: isActive(l.path) ? 700 : 400,
                color: isActive(l.path) ? '#B91C1C' : '#222',
                textDecoration: 'none',
              }}
            >
              {isActive(l.path) && (
                <span style={{ width: 3, height: 18, background: '#B91C1C', borderRadius: 2, marginRight: '0.75rem', flexShrink: 0 }} />
              )}
              {l.name}
            </Link>
          ))}

          <Link
            to="/student/login"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              marginTop: '1.25rem', padding: '0.8rem',
              background: '#111', color: '#fff',
              borderRadius: '0.5rem', fontWeight: 600, fontSize: '0.95rem',
              textDecoration: 'none',
            }}
          >
            <User size={16} /> Student Portal
          </Link>
        </div>
      )}
    </header>
  );
};
