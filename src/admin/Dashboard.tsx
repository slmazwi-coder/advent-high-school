import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Info, Trophy, FileText, Activity, Users, Phone } from 'lucide-react';

const cards = [
  { path: '/admin/news', label: 'News', icon: Newspaper },
  { path: '/admin/about', label: 'About', icon: Info },
  { path: '/admin/achievements', label: 'Achievements', icon: Trophy },
  { path: '/admin/documents', label: 'Documents', icon: FileText },
  { path: '/admin/extra-curricular', label: 'Sport & Activities', icon: Activity },
  { path: '/admin/applications', label: 'Applications', icon: Users },
  { path: '/admin/contact', label: 'Contact', icon: Phone },
];

export const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link
            to={c.path}
            key={c.path}
            className="bg-gray-800 border border-gray-700 rounded-2xl p-5 hover:border-[#C8102E] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C8102E] flex items-center justify-center">
                <c.icon size={18} />
              </div>
              <div className="font-bold">{c.label}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
