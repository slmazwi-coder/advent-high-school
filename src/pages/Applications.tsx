import React, { useState, type FormEvent } from 'react';
import { Send, CheckCircle, FileText, User, ClipboardList, Heart, Phone, Mail } from 'lucide-react';

const programOptions = [
  { value: '', label: 'Select a programme' },
  { value: 'grade-8', label: 'Grade 8' },
  { value: 'grade-9', label: 'Grade 9' },
  { value: 'grade-10', label: 'Grade 10' },
  { value: 'grade-11', label: 'Grade 11' },
  { value: 'grade-12', label: 'Grade 12' },
  { value: 'matric-rewrite', label: 'Matric Rewrite' },
];

const boardingOptions = [
  { value: '', label: 'Select an option' },
  { value: 'yes', label: 'Yes — Boarding' },
  { value: 'no', label: 'No — Day Scholar' },
];

const howHeardOptions = [
  { value: '', label: 'Select an option' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'word-of-mouth', label: 'Word of Mouth' },
  { value: 'community', label: 'Community / Church' },
  { value: 'google', label: 'Google Search' },
  { value: 'other', label: 'Other' },
];

const steps = [
  { icon: ClipboardList, label: 'Submit form' },
  { icon: FileText, label: 'Documents review' },
  { icon: Heart, label: 'Interview' },
  { icon: CheckCircle, label: 'Acceptance' },
];

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.7rem 0.9rem',
  border: '1px solid #E5E2D9',
  borderRadius: '0.5rem',
  fontSize: '0.9rem',
  fontFamily: 'var(--font-body)',
  background: '#fff',
  color: '#111',
  outline: 'none',
  transition: 'border-color 0.15s',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.82rem',
  fontWeight: 600,
  color: '#333',
  marginBottom: '0.35rem',
  fontFamily: 'var(--font-body)',
};

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div>
    <label style={labelStyle}>
      {label} {required && <span style={{ color: '#B91C1C' }}>*</span>}
    </label>
    {children}
  </div>
);

const SectionHeading = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E5E2D9' }}>
    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon size={16} style={{ color: '#B91C1C' }} />
    </div>
    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', margin: 0, color: '#111' }}>{title}</h3>
  </div>
);

export const Applications = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div>
        <div className="page-header">
          <div className="rule-accent" style={{ margin: '0 auto 0.75rem' }} />
          <h1>Application Submitted</h1>
        </div>
        <section className="section-pad" style={{ background: '#fff' }}>
          <div className="container-narrow" style={{ maxWidth: '36rem', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#DEF7EC', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <CheckCircle size={32} style={{ color: '#047857' }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', margin: '0 0 0.75rem', color: '#111' }}>
              Application received!
            </h2>
            <p style={{ color: '#555', lineHeight: 1.7, fontSize: '0.95rem', margin: '0 0 1.5rem' }}>
              Thank you for applying to Advent Comprehensive High School. Our admissions team will review your application and contact you within <strong>5–7 school days</strong>.
            </p>
            <p style={{ color: '#555', lineHeight: 1.7, fontSize: '0.9rem', margin: '0 0 2rem' }}>
              Please prepare certified copies of all required documents for submission when contacted.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href="/" className="btn btn-primary">Back to Home</a>
              <a href="/contact" className="btn btn-ghost">Contact Us</a>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div className="rule-accent" style={{ margin: '0 auto 0.75rem' }} />
        <h1>Apply Online</h1>
        <p>2026 applications are open — Grade 8 to 12 &amp; Matric Rewrite</p>
      </div>

      {/* Steps */}
      <section style={{ background: '#fff', padding: '2.5rem 1.25rem' }}>
        <div className="container-narrow">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem', maxWidth: '48rem', margin: '0 auto' }}>
            {steps.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem' }}>
                  <s.icon size={20} style={{ color: '#B91C1C' }} />
                </div>
                <div style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#999', marginBottom: '0.2rem' }}>Step {i + 1}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, color: '#111' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section-pad" style={{ background: '#FAFAF8' }}>
        <div className="container-narrow" style={{ maxWidth: '52rem' }}>
          <form onSubmit={handleSubmit}>

            {/* Learner Information */}
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <SectionHeading icon={User} title="Learner Information" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1rem' }}>
                <Field label="Learner's full name" required>
                  <input name="learner_name" type="text" required style={inputStyle} />
                </Field>
                <Field label="Date of birth" required>
                  <input name="learner_dob" type="date" required style={inputStyle} />
                </Field>
                <Field label="Grade applying for" required>
                  <select name="grade" required style={inputStyle}>
                    {programOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </Field>
                <Field label="Boarding or Day Scholar" required>
                  <select name="boarding" required style={inputStyle}>
                    {boardingOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </Field>
                <Field label="Previous / current school" required>
                  <input name="previous_school" type="text" required style={inputStyle} />
                </Field>
                <Field label="Home language">
                  <input name="home_language" type="text" style={inputStyle} placeholder="e.g. Sesotho, isiXhosa, English" />
                </Field>
              </div>
            </div>

            {/* Parent / Guardian */}
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <SectionHeading icon={User} title="Parent / Guardian Details" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1rem' }}>
                <Field label="Parent / Guardian full name" required>
                  <input name="parent_name" type="text" required style={inputStyle} />
                </Field>
                <Field label="Relationship to learner" required>
                  <input name="relationship" type="text" required style={inputStyle} placeholder="e.g. Mother, Father, Guardian" />
                </Field>
                <Field label="ID / Passport number">
                  <input name="parent_id" type="text" style={inputStyle} />
                </Field>
                <Field label="Occupation">
                  <input name="occupation" type="text" style={inputStyle} />
                </Field>
                <Field label="Phone number" required>
                  <input name="phone" type="tel" required style={inputStyle} />
                </Field>
                <Field label="Email address" required>
                  <input name="email" type="email" required style={inputStyle} />
                </Field>
                <div style={{ gridColumn: '1 / -1' }}>
                  <Field label="Residential address" required>
                    <input name="address" type="text" required style={inputStyle} />
                  </Field>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <SectionHeading icon={Phone} title="Emergency Contact" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1rem' }}>
                <Field label="Emergency contact name" required>
                  <input name="emergency_name" type="text" required style={inputStyle} />
                </Field>
                <Field label="Emergency contact phone" required>
                  <input name="emergency_phone" type="tel" required style={inputStyle} />
                </Field>
                <Field label="Relationship to learner" required>
                  <input name="emergency_relationship" type="text" required style={inputStyle} placeholder="e.g. Uncle, Grandmother" />
                </Field>
              </div>
            </div>

            {/* Medical */}
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <SectionHeading icon={Heart} title="Medical Information" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1rem' }}>
                <Field label="Allergies">
                  <input name="allergies" type="text" style={inputStyle} placeholder="List any known allergies or type 'None'" />
                </Field>
                <Field label="Chronic conditions">
                  <input name="chronic" type="text" style={inputStyle} placeholder="e.g. Asthma, epilepsy or 'None'" />
                </Field>
                <div style={{ gridColumn: '1 / -1' }}>
                  <Field label="Additional medical notes">
                    <textarea name="medical_notes" rows={3} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Anything else we should know about the learner's health…" />
                  </Field>
                </div>
              </div>
            </div>

            {/* Additional */}
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <SectionHeading icon={ClipboardList} title="Additional Information" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1rem' }}>
                <Field label="How did you hear about us?">
                  <select name="how_heard" style={inputStyle}>
                    {howHeardOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </Field>
                <Field label="Sibling(s) at Advent?">
                  <input name="siblings" type="text" style={inputStyle} placeholder="Name(s) or 'None'" />
                </Field>
                <div style={{ gridColumn: '1 / -1' }}>
                  <Field label="Any questions or comments?">
                    <textarea name="comments" rows={3} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Feel free to ask us anything…" />
                  </Field>
                </div>
              </div>
            </div>

            {/* Consent */}
            <div className="card" style={{ marginBottom: '1.5rem', background: '#FEF2F2', borderColor: '#FECACA' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                <input type="checkbox" name="consent" required style={{ marginTop: 4, accentColor: '#B91C1C', width: 18, height: 18, flexShrink: 0 }} />
                <span style={{ fontSize: '0.85rem', color: '#444', lineHeight: 1.6 }}>
                  I confirm that the information provided is accurate and I consent to Advent Comprehensive High School contacting me regarding this application. I understand that submitting this form does not guarantee admission and that places are subject to availability.
                </span>
              </label>
            </div>

            {/* Submit */}
            <div style={{ textAlign: 'center' }}>
              <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 2.5rem', fontSize: '0.95rem' }}>
                <Send size={16} /> Submit Application
              </button>
              <p style={{ color: '#888', fontSize: '0.8rem', marginTop: '1rem' }}>
                Need help? <a href="/contact" style={{ color: '#B91C1C', fontWeight: 600, textDecoration: 'none' }}>Contact us</a> or call <a href="tel:0723000020" style={{ color: '#B91C1C', fontWeight: 600, textDecoration: 'none' }}>072 300 0020</a>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
