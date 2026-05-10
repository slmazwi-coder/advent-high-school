import React, { useState } from 'react';
import { CheckCircle, Send, AlertCircle } from 'lucide-react';
import { getApplications, setApplications, generateId, generateStudentNumber, calculateAverageMark } from '../admin/utils/storage';

const GRADES = ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'Matric Rewrite'];
const SUBJECTS = ['English', 'Afrikaans', 'isiXhosa', 'Mathematics', 'Mathematical Literacy', 'Physical Sciences', 'Life Sciences', 'Geography', 'History', 'Accounting', 'Business Studies', 'Economics', 'Life Orientation'];

const REQUIREMENTS = [
  'Certified copy of birth certificate',
  'Certified copy of parent/guardian ID',
  'Previous school report (latest)',
  'Transfer letter from previous school',
  'Proof of address',
  '2 × passport-size photos',
];

type Step = 'form' | 'success';

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
    <label style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600, color: '#444', letterSpacing: '0.02em' }}>
      {label}{required && <span style={{ color: '#B91C1C', marginLeft: 2 }}>*</span>}
    </label>
    {children}
  </div>
);

const inputStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.9rem',
  padding: '0.6rem 0.85rem',
  border: '1px solid #ddd',
  borderRadius: '0.45rem',
  outline: 'none',
  color: '#111',
  background: '#fff',
  width: '100%',
  transition: 'border-color 0.15s',
};

export const Admissions = () => {
  const [step, setStep] = useState<Step>('form');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [studentNumber, setStudentNumber] = useState('');

  const [form, setForm] = useState({
    firstName: '', lastName: '', dob: '', gender: '',
    grade: '', previousSchool: '', lastGradeCompleted: '',
    medicalInfo: '',
    guardianName: '', guardianRelationship: '', guardianPhone: '', guardianEmail: '',
    address: '', locality: '',
    applicationType: 'General' as 'General' | 'Boarding',
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.firstName || !form.lastName || !form.dob || !form.grade || !form.guardianName || !form.guardianPhone) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    const year = new Date().getFullYear().toString();
    const sn = generateStudentNumber(year);

    const apps = getApplications();
    apps.unshift({
      id: generateId(),
      ...form,
      year,
      studentNumber: sn,
      uploads: [],
      subjectMarks: [],
      averageMark: 0,
      status: 'Pending',
      submittedDate: new Date().toISOString(),
    });
    setApplications(apps);

    setStudentNumber(sn);
    setSubmitting(false);
    setStep('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (step === 'success') {
    return (
      <div>
        <div className="page-header">
          <h1>Application Submitted</h1>
        </div>
        <section className="section-pad" style={{ background: '#fff' }}>
          <div className="container-narrow" style={{ maxWidth: 560 }}>
            <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem', borderTop: '4px solid #16a34a' }}>
              <CheckCircle size={52} style={{ color: '#16a34a', margin: '0 auto 1.25rem' }} />
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', margin: '0 0 0.5rem' }}>
                Thank you, {form.firstName}!
              </h2>
              <p style={{ color: '#555', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                Your application has been received. Please save your student reference number below and bring your supporting documents to the school.
              </p>
              <div style={{ background: '#FAFAF8', border: '2px dashed #B91C1C', borderRadius: '0.75rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  Reference Number
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: '#B91C1C', letterSpacing: '0.05em' }}>
                  {studentNumber}
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '1.5rem' }}>
                The school will contact you at <strong>{form.guardianPhone}</strong> once your application has been reviewed.
              </p>
              <a href="/" className="btn btn-primary">Back to Home</a>
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
        <h1>Admissions</h1>
        <p>2026 applications — Grade 8 to 12 &amp; Matric Rewrite</p>
      </div>

      <section className="section-pad" style={{ background: '#fff' }}>
        <div className="container-narrow">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '2.5rem', alignItems: 'start' }}>

            {/* ── Application form ── */}
            <div>
              <div className="rule-accent" />
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', margin: '0 0 1.5rem' }}>
                Online Application Form
              </h2>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                {/* Section: Learner */}
                <div style={{ background: '#FAFAF8', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #eee' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', margin: '0 0 1rem', color: '#B91C1C' }}>Learner Details</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                    <Field label="First Name" required>
                      <input style={inputStyle} value={form.firstName} onChange={set('firstName')} required />
                    </Field>
                    <Field label="Last Name" required>
                      <input style={inputStyle} value={form.lastName} onChange={set('lastName')} required />
                    </Field>
                    <Field label="Date of Birth" required>
                      <input type="date" style={inputStyle} value={form.dob} onChange={set('dob')} required />
                    </Field>
                    <Field label="Gender">
                      <select style={inputStyle} value={form.gender} onChange={set('gender')}>
                        <option value="">Select…</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </Field>
                    <Field label="Grade Applying For" required>
                      <select style={inputStyle} value={form.grade} onChange={set('grade')} required>
                        <option value="">Select grade…</option>
                        {GRADES.map(g => <option key={g}>{g}</option>)}
                      </select>
                    </Field>
                    <Field label="Application Type" required>
                      <select style={inputStyle} value={form.applicationType} onChange={set('applicationType')}>
                        <option value="General">Day Scholar</option>
                        <option value="Boarding">Boarding</option>
                      </select>
                    </Field>
                    <Field label="Previous School">
                      <input style={inputStyle} value={form.previousSchool} onChange={set('previousSchool')} />
                    </Field>
                    <Field label="Last Grade Completed">
                      <input style={inputStyle} placeholder="e.g. Grade 7" value={form.lastGradeCompleted} onChange={set('lastGradeCompleted')} />
                    </Field>
                  </div>
                  <div style={{ marginTop: '0.85rem' }}>
                    <Field label="Medical / Special Needs (optional)">
                      <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 60 }} value={form.medicalInfo} onChange={set('medicalInfo')} />
                    </Field>
                  </div>
                </div>

                {/* Section: Guardian */}
                <div style={{ background: '#FAFAF8', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #eee' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', margin: '0 0 1rem', color: '#B91C1C' }}>Parent / Guardian Details</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                    <Field label="Full Name" required>
                      <input style={inputStyle} value={form.guardianName} onChange={set('guardianName')} required />
                    </Field>
                    <Field label="Relationship">
                      <select style={inputStyle} value={form.guardianRelationship} onChange={set('guardianRelationship')}>
                        <option value="">Select…</option>
                        <option>Parent</option>
                        <option>Guardian</option>
                        <option>Grandparent</option>
                        <option>Other</option>
                      </select>
                    </Field>
                    <Field label="Phone Number" required>
                      <input type="tel" style={inputStyle} value={form.guardianPhone} onChange={set('guardianPhone')} required />
                    </Field>
                    <Field label="Email Address">
                      <input type="email" style={inputStyle} value={form.guardianEmail} onChange={set('guardianEmail')} />
                    </Field>
                  </div>
                  <div style={{ marginTop: '0.85rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                    <Field label="Home Address" required>
                      <input style={inputStyle} value={form.address} onChange={set('address')} required />
                    </Field>
                    <Field label="Town / Village">
                      <input style={inputStyle} value={form.locality} onChange={set('locality')} />
                    </Field>
                  </div>
                </div>

                {error && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#B91C1C', fontSize: '0.875rem', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '0.5rem', padding: '0.75rem 1rem' }}>
                    <AlertCircle size={16} /> {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.95rem', padding: '0.85rem', opacity: submitting ? 0.6 : 1 }}
                >
                  <Send size={16} /> {submitting ? 'Submitting…' : 'Submit Application'}
                </button>

                <p style={{ fontSize: '0.78rem', color: '#aaa', textAlign: 'center', margin: 0 }}>
                  You must still bring original documents to the school for verification.
                </p>
              </form>
            </div>

            {/* ── Sidebar info ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="card" style={{ borderTop: '3px solid #B91C1C' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', margin: '0 0 1rem' }}>Required Documents</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {REQUIREMENTS.map(r => (
                    <div key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                      <CheckCircle size={14} style={{ color: '#B91C1C', flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: '0.85rem', color: '#444', lineHeight: 1.5 }}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card" style={{ background: '#FEF2F2', borderColor: '#FECACA' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', margin: '0 0 0.5rem', color: '#B91C1C' }}>Need help?</h3>
                <p style={{ fontSize: '0.85rem', color: '#555', margin: '0 0 0.75rem', lineHeight: 1.6 }}>
                  Call us and we'll guide you through the application process.
                </p>
                <a href="tel:0723000020" style={{ fontSize: '0.85rem', fontWeight: 700, color: '#B91C1C', textDecoration: 'none' }}>
                  072 300 0020
                </a>
                <br />
                <a href="tel:0607008052" style={{ fontSize: '0.85rem', fontWeight: 700, color: '#B91C1C', textDecoration: 'none' }}>
                  060 700 8052
                </a>
              </div>

              <div className="card">
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', margin: '0 0 0.5rem' }}>Grades Offered</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {GRADES.map(g => (
                    <span key={g} style={{ fontSize: '0.78rem', padding: '0.25rem 0.65rem', background: '#FAFAF8', border: '1px solid #E5E2D9', borderRadius: '2rem', color: '#444' }}>
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
