import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, ChevronDown } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Staff', path: '/staff' },
  { name: 'Academics', path: '/documents', sub: [
    { name: 'Documents', path: '/documents' },
    { name: 'Achievements', path: '/achievements' },
  ]},
  { name: 'School Life', path: '/sport', sub: [
    { name: 'Sport', path: '/sport' },
    { name: 'Activities', path: '/activities' },
  ]},
  { name: 'Admissions', path: '/admissions' },
  { name: 'Boarding', path: '/boarding' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full transition-shadow duration-200"
        style={{
          background: '#fff',
          borderBottom: '1px solid #E5E2D9',
          boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        {/* Top strip */}
        <div style={{ background: '#111111', padding: '6px 1.25rem' }}>
          <div className="container-narrow flex items-center justify-between">
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
              Maluti, Matatiele · Eastern Cape
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="tel:0723000020" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.72rem', textDecoration: 'none' }}>072 300 0020</a>
              <a href="mailto:adventhighschool90@gmail.com" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.72rem', textDecoration: 'none' }}>adventhighschool90@gmail.com</a>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div className="container-narrow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', flexShrink: 0 }}>
            <img src="/logo.svg" alt="ACHS" style={{ width: 40, height: 40, borderRadius: 8, border: '2px solid #B91C1C', background: '#fff' }} />
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: '#111', lineHeight: 1.2 }}>
                Advent Comprehensive
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: '#888', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                High School
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex" style={{ alignItems: 'center', gap: '0.25rem' }}>
            {NAV_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  padding: '0.4rem 0.75rem',
                  borderRadius: '0.4rem',
                  textDecoration: 'none',
                  color: isActive(link.path) ? '#B91C1C' : '#333',
                  background: isActive(link.path) ? '#FEE2E2' : 'transparent',
                  transition: 'all 0.15s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { if (!isActive(link.path)) (e.currentTarget as HTMLElement).style.background = '#f5f5f5'; }}
                onMouseLeave={e => { if (!isActive(link.path)) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            <Link to="/student/login" className="hidden md:inline-flex btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
              <User size={14} /> Student Portal
            </Link>
            <button
              className="md:hidden"
              onClick={() => setOpen(v => !v)}
              aria-label="Toggle menu"
              style={{ padding: '0.5rem', border: 'none', background: 'none', cursor: 'pointer', color: '#111' }}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{ background: '#fff', borderTop: '1px solid #E5E2D9', padding: '1rem 1.25rem 1.5rem' }}>
            {NAV_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  fontWeight: isActive(link.path) ? 600 : 400,
                  color: isActive(link.path) ? '#B91C1C' : '#222',
                  padding: '0.75rem 0',
                  borderBottom: '1px solid #f0efe9',
                  textDecoration: 'none',
                }}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/student/login"
              className="btn btn-primary"
              style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}
            >
              <User size={15} /> Student Portal
            </Link>
          </div>
        )}
      </header>
    </>
  );
};
