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
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: '#ffffff',
      borderBottom: '3px solid #B91C1C',
      boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.10)' : 'none',
      transition: 'box-shadow 0.2s',
    }}>
      <div className="container-narrow" style={{ display: 'flex', alignItems: 'center', height: 64, gap: '0.75rem' }}>

        {/* Logo + name */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', flexShrink: 0 }}>
          <img src="/logo.svg" alt="ACHS logo" style={{ width: 38, height: 38, borderRadius: 7, border: '2px solid #B91C1C', background: '#fff', flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.88rem', color: '#111', lineHeight: 1.2 }}>
              Advent Comprehensive
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.62rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              High School
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex" style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: '0.05rem', overflowX: 'auto' }}>
          {NAV_LINKS.map(l => (
            <Link key={l.path} to={l.path}
              style={{
                fontFamily: 'var(--font-body)', fontSize: '0.76rem', fontWeight: isActive(l.path) ? 700 : 500,
                padding: '0.32rem 0.6rem', borderRadius: '0.3rem', textDecoration: 'none', whiteSpace: 'nowrap',
                color: isActive(l.path) ? '#fff' : '#333',
                background: isActive(l.path) ? '#B91C1C' : 'transparent',
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={e => { if (!isActive(l.path)) { (e.currentTarget as HTMLElement).style.background = '#FEE2E2'; (e.currentTarget as HTMLElement).style.color = '#B91C1C'; }}}
              onMouseLeave={e => { if (!isActive(l.path)) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#333'; }}}
            >
              {l.name}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto', flexShrink: 0 }}>
          <Link to="/student/login"
            className="hidden md:inline-flex"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.76rem',
              padding: '0.38rem 0.85rem', borderRadius: '0.35rem',
              background: '#111', color: '#fff', textDecoration: 'none', whiteSpace: 'nowrap',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#B91C1C')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#111')}
          >
            <User size={12} /> Student Portal
          </Link>

          <button className="md:hidden" onClick={() => setOpen(v => !v)} aria-label="Menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#111', padding: '0.4rem', display: 'flex' }}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ background: '#fff', borderTop: '1px solid #f0efe9', padding: '0.5rem 1.25rem 1.25rem' }}>
          {NAV_LINKS.map(l => (
            <Link key={l.path} to={l.path}
              style={{
                display: 'block', padding: '0.65rem 0',
                borderBottom: '1px solid #f5f5f0',
                fontFamily: 'var(--font-body)', fontSize: '0.92rem',
                fontWeight: isActive(l.path) ? 700 : 400,
                color: isActive(l.path) ? '#B91C1C' : '#222',
                textDecoration: 'none',
              }}>
              {l.name}
            </Link>
          ))}
          <Link to="/student/login"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
              marginTop: '1rem', padding: '0.65rem', background: '#111', color: '#fff',
              borderRadius: '0.5rem', fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none',
            }}>
            <User size={14} /> Student Portal
          </Link>
        </div>
      )}
    </header>
  );
};
