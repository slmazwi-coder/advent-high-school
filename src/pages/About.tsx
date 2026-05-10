import React, { useEffect, useState } from 'react';
import { getAbout, type AboutInfo } from '../admin/utils/storage';

export const About = () => {
  const [data, setData] = useState<AboutInfo>(getAbout());
  const [principalFailed, setPrincipalFailed] = useState(false);
  useEffect(() => { setData(getAbout()); }, []);

  return (
    <div>
      <div className="page-header">
        <div className="rule-accent" style={{ margin: '0 auto 0.75rem' }} />
        <h1>About Our School</h1>
        <p>Maluti, Matatiele · Eastern Cape</p>
      </div>

      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="container-narrow">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '3rem', alignItems: 'start' }}>
            <div className="fade-up">
              <div className="rule-accent" />
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 4vw, 2rem)', margin: '0 0 1.25rem' }}>Our School</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {data.historyParagraphs.map((p, i) => (
                  <p key={i} style={{ color: '#555', lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>{p}</p>
                ))}
              </div>
            </div>

            <div className="fade-up delay-2">
              <div style={{ background: '#111', borderRadius: '1rem', overflow: 'hidden', aspectRatio: '4/3', border: '3px solid #B91C1C' }}>
                <img
                  src="/assets/about/campus.jpg"
                  alt="Campus"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { (e.currentTarget as HTMLImageElement).src = '/assets/about/campus.svg'; }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principal */}
      <section className="section-pad" style={{ background: '#FAFAF8' }}>
        <div className="container-narrow">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="rule-accent" style={{ margin: '0 auto 0.75rem' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 4vw, 2rem)', margin: 0 }}>Principal's Message</h2>
          </div>

          <div style={{ background: '#fff', borderRadius: '1rem', border: '1px solid #E5E2D9', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))' }}>
            <div style={{ background: '#111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2.5rem 2rem', textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, borderRadius: '50%', border: '3px solid #B91C1C', overflow: 'hidden', marginBottom: '1rem', background: '#333' }}>
                {!principalFailed ? (
                  <img src="/assets/about/principal.jpg" alt="Principal" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={() => setPrincipalFailed(true)} />
                ) : (
                  <img src="/assets/about/principal.svg" alt="Principal" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#fff', margin: '0 0 0.25rem' }}>{data.principalName}</h3>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', margin: 0 }}>{data.principalTitle}</p>
            </div>

            <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', color: '#B91C1C', opacity: 0.2, lineHeight: 1, marginBottom: '0.5rem' }}>"</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {data.principalMessage.map((p, i) => (
                  <p key={i} style={{ color: '#444', lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
