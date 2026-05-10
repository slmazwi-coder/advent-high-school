import React, { useEffect, useState } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { getNews, type NewsItem } from '../admin/utils/storage';

export const NewsSection = () => {
  const [notices, setNotices] = useState<NewsItem[]>(getNews());
  useEffect(() => { setNotices(getNews()); }, []);

  if (notices.length === 0) return null;

  return (
    <section className="section-pad" style={{ background: '#fff' }}>
      <div className="container-narrow">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="rule-accent" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', margin: 0, color: '#111' }}>
              News & Notices
            </h2>
          </div>
          <button style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600, color: '#B91C1C', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            View all <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
          {notices.slice(0, 3).map((n, i) => (
            <article key={n.id} className="card fade-up" style={{ animationDelay: `${i * 0.08}s`, borderLeft: '3px solid #B91C1C', borderRadius: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#999', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                <Calendar size={13} />
                <span>{n.date}</span>
                <span style={{ marginLeft: 'auto', background: '#FEE2E2', color: '#B91C1C', padding: '2px 8px', borderRadius: '2rem', fontWeight: 600, fontSize: '0.7rem', textTransform: 'uppercase' }}>
                  Notice
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.5rem', color: '#111', lineHeight: 1.3 }}>
                {n.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#666', margin: 0, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {n.content}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
