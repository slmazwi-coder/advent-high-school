import React from 'react';
import { ArrowRight, BookOpen, Users, Award, Phone } from 'lucide-react';

const stats = [
  { value: 'Gr 8–12', label: 'Grades Offered', icon: BookOpen },
  { value: 'Available', label: 'Matric Rewrite', icon: Award },
  { value: '2026', label: 'Admissions Open', icon: Users },
];

export const Home = () => (
  <div>
    {/* Stats strip */}
    <section style={{ background: '#B91C1C' }}>
      <div className="container-narrow" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            padding: '1.5rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none',
          }}>
            <s.icon size={22} style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }} />
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1rem, 3vw, 1.4rem)', color: '#fff' }}>{s.value}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '0.2rem' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>

    {/* Welcome */}
    <section className="section-pad" style={{ background: '#FAFAF8' }}>
      <div className="container-narrow">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div className="fade-up">
            <div className="rule-accent" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', margin: '0 0 1rem', color: '#111' }}>
              A School Built on Faith & Excellence
            </h2>
            <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '1rem', fontSize: '0.95rem' }}>
              Advent Comprehensive High School is an independent co-educational school in Maluti, Matatiele. We offer Grade 8 to Grade 12 and matric rewrite, nurturing learners in a disciplined, faith-centred environment.
            </p>
            <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '1.75rem', fontSize: '0.95rem' }}>
              Our mission is to develop the whole person — academically, spiritually, and socially — so that every learner leaves equipped for a successful future.
            </p>
            <a href="/about" className="btn btn-ghost">
              Learn More <ArrowRight size={15} />
            </a>
          </div>

          {/* Info cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} className="fade-up delay-2">
            {[
              { title: 'Admissions 2026 Still Open', body: 'Grade 8–12 and matric rewrite applications are open. Apply online to secure your place.', cta: 'Apply now', href: '/applications' },
              { title: 'Boarding Available', body: 'We offer boarding facilities for learners from outside Matatiele. Contact us for availability.', cta: 'Learn more', href: '/boarding' },
            ].map(card => (
              <div key={card.title} className="card" style={{ borderLeft: '3px solid #B91C1C' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.4rem', color: '#111' }}>{card.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#666', margin: '0 0 0.75rem', lineHeight: 1.6 }}>{card.body}</p>
                <a href={card.href} style={{ fontSize: '0.82rem', fontWeight: 600, color: '#B91C1C', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
                  {card.cta} <ArrowRight size={13} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Motto banner */}
    <section style={{ background: '#111111', padding: '4rem 1.25rem', textAlign: 'center' }}>
      <div className="container-narrow" style={{ maxWidth: '600px' }}>
        <div className="rule-accent" style={{ margin: '0 auto 1.25rem' }} />
        <blockquote style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(1.2rem, 3vw, 1.75rem)', color: '#fff', margin: 0, lineHeight: 1.5 }}>
          "The fear of the Lord is the beginning of wisdom"
        </blockquote>
        <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          School Motto
        </p>
      </div>
    </section>

    {/* Contact CTA */}
    <section className="section-pad" style={{ background: '#FAFAF8' }}>
      <div className="container-narrow" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', margin: '0 0 0.4rem', color: '#111' }}>
            Have questions?
          </h3>
          <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>
            We're happy to help with admissions, fees, or anything else.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a href="tel:0723000020" className="btn btn-primary">
            <Phone size={15} /> Call Us
          </a>
          <a href="/contact" className="btn btn-ghost">
            Contact Page <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  </div>
);
