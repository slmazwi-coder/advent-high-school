import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { logout } from './utils/storage';
import {
  Newspaper, Info, Trophy, FileText, Activity, Users,
  Phone, LogOut, LayoutDashboard, ShieldCheck, ArrowLeft,
  FolderUp,
} from 'lucide-react';

const adminTabs = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/news', label: 'News', icon: Newspaper },
  { path: '/admin/about', label: 'About', icon: Info },
  { path: '/admin/achievements', label: 'Achievements', icon: Trophy },
  { path: '/admin/documents', label: 'Documents', icon: FileText },
  { path: '/admin/extra-curricular', label: 'Sport & Activities', icon: Activity },
  { path: '/admin/applications', label: 'Applications', icon: Users },
  { path: '/admin/student-documents', label: 'Student Docs', icon: FolderUp },
  { path: '/admin/contact', label: 'Contact', icon: Phone },
];

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0f', color: '#fff' }}>
      <div style={{ background: '#B91C1C', textAlign: 'center', padding: '5px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Admin Mode — Changes affect the live website
      </div>

      <nav style={{ background: '#1a1a1a', borderBottom: '1px solid #2a2a2a', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1rem', display: 'flex', alignItems: 'center', height: 52, gap: '1rem' }}>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', flexShrink: 0 }}>
            <ArrowLeft size={14} /> Back
          </button>
          <Link to="/admin" style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff', textDecoration: 'none', flexShrink: 0 }}>
            <span style={{ color: '#B91C1C' }}>ACHS</span> Staff Portal
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.2rem 0.6rem', background: 'rgba(255,255,255,0.06)', borderRadius: '2rem', fontSize: '0.65rem', fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.06em', flexShrink: 0 }}>
            <ShieldCheck size={11} /> Active
          </div>
          <div style={{ flex: 1 }} />
          <button onClick={() => { logout(); navigate('/admin/login'); }}
            style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', flexShrink: 0 }}>
            <LogOut size={14} /> Logout
          </button>
        </div>

        <div style={{ overflowX: 'auto', display: 'flex', gap: '0.15rem', padding: '0.35rem 1rem', maxWidth: '72rem', margin: '0 auto' }}>
          {adminTabs.map(tab => {
            const Icon = tab.icon;
            const active = location.pathname === tab.path;
            return (
              <Link key={tab.path} to={tab.path} style={{
                display: 'flex', alignItems: 'center', gap: '0.35rem',
                padding: '0.35rem 0.75rem', borderRadius: '0.4rem',
                fontSize: '0.76rem', fontWeight: active ? 700 : 500,
                whiteSpace: 'nowrap', textDecoration: 'none',
                color: active ? '#fff' : '#888',
                background: active ? '#B91C1C' : 'transparent',
                transition: 'background 0.15s, color 0.15s',
              }}>
                <Icon size={13} /> {tab.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <main style={{ maxWidth: '72rem', margin: '0 auto', padding: '2rem 1.25rem' }}>
        <Outlet />
      </main>
    </div>
  );
};
