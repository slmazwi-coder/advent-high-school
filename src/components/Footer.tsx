import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="pt-12 pb-8 w-full" style={ { background: '#111827', borderTop: '4px solid #C8102E' } }>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">

          {/* Col 1 — Logo + Name + Socials */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 shrink-0 rounded-xl overflow-hidden shadow-lg"
                style={ { background: '#ffffff', border: '2px solid #C8102E' } }>
                <img src="/logo.svg" alt="Advent Comprehensive High School logo"
                  className="h-full w-full object-cover" />
              </div>
              <div>
                <h3 className="text-base font-bold leading-tight" style={ { color: '#ffffff' } }>
                  Advent Comprehensive High School
                </h3>
                <p className="text-sm italic mt-0.5" style={ { color: 'rgba(255,255,255,0.7)' } }>
                  "The fear of the Lord is the beginning of wisdom"
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <a href="#" target="_blank" rel="noreferrer"
                className="p-2 rounded-full transition-colors"
                style={ { background: 'rgba(200,16,46,0.15)', color: '#ffffff' } }
                aria-label="Facebook">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Col 2 — Contact */}
          <div>
            <h4 className="text-sm font-bold mb-4 pb-2 uppercase tracking-wide"
              style={ { color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.18)' } }>
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm" style={ { color: 'rgba(255,255,255,0.8)' } }>
              <li className="flex items-start gap-2">
                <MapPin className="shrink-0 mt-0.5" size={16} />
                <span>505 Maluti, Matatiele, 4740 (Eastern Cape)</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0" />
                <span>072 300 0020 / 060 700 8052</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="shrink-0 mt-0.5" />
                <span className="break-all">adventhighschool90@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Col 3 — School Hours */}
          <div>
            <h4 className="text-sm font-bold mb-4 pb-2 uppercase tracking-wide"
              style={ { color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.18)' } }>
              School Hours
            </h4>
            <ul className="space-y-2 text-sm" style={ { color: 'rgba(255,255,255,0.8)' } }>
              <li className="flex justify-between gap-4">
                <span>Mon – Thu</span>
                <span className="font-medium">07:30 – 15:30</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Friday</span>
                <span className="font-medium">07:30 – 13:30</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Sat – Sun</span>
                <span className="font-medium">Closed</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 text-center text-xs" style={ { borderTop: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.55)' } }>
          <p>© {new Date().getFullYear()} Advent Comprehensive High School. All Rights Reserved.</p>
          <Link to="/admin/login"
            className="text-xs mt-2 inline-block transition-colors hover:opacity-80"
            style={ { color: 'rgba(255,255,255,0.35)' } }
          >
            Staff Portal
          </Link>
        </div>

      </div>
    </footer>
  );
};
