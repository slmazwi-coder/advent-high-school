import React from 'react';
import { CheckCircle, Phone, Mail, ArrowRight } from 'lucide-react';

const requirements = [
  'Certified copy of birth certificate',
  'Certified copy of parent/guardian ID',
  'Previous school report (Grade 7 or latest)',
  'Transfer letter from previous school',
  'Proof of address',
  'Passport-size photos (x2)',
];

export const Admissions = () => (
  <div>
    <div className="page-header">
      <div className="rule-accent" style={{ margin: '0 auto 0.75rem' }} />
      <h1>Admissions</h1>
      <p>2026 applications are open — Grade 8 to 12 &amp; Matric Rewrite</p>
    </div>

    <section className="section-pad" style={{ background: '#fff' }}>
      <div className="container-narrow">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2.5rem' }}>
          <div className="fade-up">
            <div className="rule-accent" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', margin: '0 0 1rem' }}>How to Apply</h2>
            <p style={{ color: '#555', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '1rem' }}>
              Advent Comprehensive High School welcomes learners for Grade 8 to Grade 12 as well as matric rewrites. Admission is subject to availability and meeting our entry requirements.
            </p>
            <p style={{ color: '#555', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              To begin the application process, contact the school directly by phone or email and our admissions team will guide you through the next steps.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href="tel:0723000020" className="btn btn-primary" style={{ width: 'fit-content' }}>
                <Phone size={15} /> Call to Apply
              </a>
              <a href="mailto:adventhighschool90@gmail.com" className="btn btn-ghost" style={{ width: 'fit-content' }}>
                <Mail size={15} /> Email Us
              </a>
            </div>
          </div>

          <div className="fade-up delay-2">
            <div className="card" style={{ borderTop: '3px solid #B91C1C' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', margin: '0 0 1.25rem' }}>Required Documents</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {requirements.map(r => (
                  <div key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <CheckCircle size={15} style={{ color: '#B91C1C', flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: '0.88rem', color: '#444', lineHeight: 1.5 }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ marginTop: '1rem', background: '#FEF2F2', borderColor: '#FECACA' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', margin: '0 0 0.5rem', color: '#B91C1C' }}>Matric Rewrite</h3>
              <p style={{ fontSize: '0.85rem', color: '#555', margin: '0 0 0.75rem', lineHeight: 1.6 }}>
                We offer matric rewrite programmes for learners who wish to improve their NSC results.
              </p>
              <a href="/contact" style={{ fontSize: '0.82rem', fontWeight: 600, color: '#B91C1C', display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
                Enquire now <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);
