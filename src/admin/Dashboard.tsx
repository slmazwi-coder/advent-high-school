import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Info, Trophy, FileText, Activity, Users, Phone, FolderUp } from 'lucide-react';

const cards = [
  { path: '/admin/news', label: 'News & Notices', icon: Newspaper, desc: 'Add or remove school notices' },
  { path: '/admin/about', label: 'About', icon: Info, desc: 'Edit school history & principal message' },
  { path: '/admin/achievements', label: 'Achievements', icon: Trophy, desc: 'Manage academic achievements' },
  { path: '/admin/documents', label: 'Documents', icon: FileText, desc: 'Upload school documents' },
  { path: '/admin/extra-curricular', label: 'Sport & Activities', icon: Activity, desc: 'Manage sport and activities' },
  { path: '/admin/applications', label: 'Applications', icon: Users, desc: 'View learner applications' },
  { path: '/admin/student-documents', label: 'Student Docs', icon: FolderUp, desc: 'Upload student documents' },
  { path: '/admin/contact', label: 'Contact Info', icon: Phone, desc: 'Update contact details & hours' },
];

export const AdminDashboard = () => (
  <div>
    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.4rem', color: '#fff' }}>Dashboard</h1>
    <p style={{ color: '#888', fontSize: '0.875rem', marginBottom: '2rem' }}>
      Welcome to the Advent Comprehensive High School staff portal.
    </p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
      {cards.map(c => (
        <Link key={c.path} to={c.path} style={{
          display: 'block', textDecoration: 'none',
          background: '#1a1a1a', border: '1px solid #2a2a2a',
          borderRadius: '0.75rem', padding: '1.25rem',
          transition: 'border-color 0.15s, background 0.15s',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#B91C1C'; (e.currentTarget as HTMLElement).style.background = '#1f0d0d'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2a2a2a'; (e.currentTarget as HTMLElement).style.background = '#1a1a1a'; }}
        >
          <div style={{ width: 36, height: 36, background: '#B91C1C', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
            <c.icon size={17} style={{ color: '#fff' }} />
          </div>
          <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#fff', marginBottom: '0.2rem' }}>{c.label}</div>
          <div style={{ fontSize: '0.75rem', color: '#666', lineHeight: 1.4 }}>{c.desc}</div>
        </Link>
      ))}
    </div>
  </div>
);
