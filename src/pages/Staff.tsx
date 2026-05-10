import React, { useState } from 'react';

interface StaffMember {
  name: string;
  role: string;
  photo: string; // path under public/assets/staff/
}

/**
 * ─────────────────────────────────────────
 *  ADD REAL STAFF MEMBERS HERE
 *  Drop photos into public/assets/staff/
 *  and update this list.
 * ─────────────────────────────────────────
 */
const STAFF: StaffMember[] = [
  { name: 'Principal', role: 'School Principal', photo: '/assets/staff/principal.jpg' },
  { name: 'Deputy Principal', role: 'Deputy Principal', photo: '/assets/staff/deputy.jpg' },
  { name: 'HOD: Languages', role: 'Head of Department', photo: '/assets/staff/hod-languages.jpg' },
  { name: 'HOD: Mathematics', role: 'Head of Department', photo: '/assets/staff/hod-maths.jpg' },
  { name: 'HOD: Sciences', role: 'Head of Department', photo: '/assets/staff/hod-sciences.jpg' },
  { name: 'HOD: Social Sciences', role: 'Head of Department', photo: '/assets/staff/hod-social.jpg' },
  { name: 'HOD: EMS', role: 'Head of Department', photo: '/assets/staff/hod-ems.jpg' },
  { name: 'Administrative Officer', role: 'Administration', photo: '/assets/staff/admin.jpg' },
];

const StaffCard = ({ member }: { member: StaffMember }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '1.75rem 1.25rem' }}>
      {/* Photo or logo placeholder */}
      <div style={{
        width: 100, height: 100,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '3px solid #B91C1C',
        marginBottom: '1rem',
        background: '#f5f5f5',
        flexShrink: 0,
      }}>
        {!failed ? (
          <img
            src={member.photo}
            alt={member.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            onError={() => setFailed(true)}
          />
        ) : (
          /* Fallback: school logo inside the circle */
          <div style={{
            width: '100%', height: '100%',
            background: '#111',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <img
              src="/logo.svg"
              alt="Advent logo"
              style={{ width: '72%', height: '72%', objectFit: 'contain' }}
            />
          </div>
        )}
      </div>

      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, margin: '0 0 0.25rem', color: '#111' }}>
        {member.name}
      </h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#888', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {member.role}
      </p>
    </div>
  );
};

export const Staff = () => (
  <div>
    <div className="page-header">
      <div className="rule-accent" style={{ margin: '0 auto 0.75rem' }} />
      <h1>Our Staff</h1>
      <p>The dedicated team at Advent Comprehensive High School</p>
    </div>

    <section className="section-pad" style={{ background: '#fff' }}>
      <div className="container-narrow">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="rule-accent" style={{ margin: '0 auto 0.75rem' }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', margin: '0 0 0.5rem' }}>
            Management &amp; Staff
          </h2>
          <p style={{ color: '#888', fontSize: '0.875rem', margin: 0 }}>
            Photos will appear once uploaded to <code>public/assets/staff/</code>
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 180px), 1fr))',
          gap: '1.25rem',
        }}>
          {STAFF.map(m => <StaffCard key={m.name} member={m} />)}
        </div>
      </div>
    </section>
  </div>
);
