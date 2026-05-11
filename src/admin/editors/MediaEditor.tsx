import React, { useState } from 'react';
import { Upload, CheckCircle, Image, AlertTriangle } from 'lucide-react';

/**
 * This page shows the admin exactly where to upload files in their GitHub repo.
 * It also provides a base64 preview so they can verify images look right before deploying.
 */

const HERO_SLOTS = [
  { label: 'Hero Slide 1', path: 'public/assets/hero/slide1.jpg', tip: 'Main welcome image — school building, gate, or grounds' },
  { label: 'Hero Slide 2', path: 'public/assets/hero/slide2.jpg', tip: 'Learners in class, or school activities' },
  { label: 'Hero Slide 3', path: 'public/assets/hero/slide3.jpg', tip: 'Sport, achievements, or school events' },
];

const PreviewSlot = ({ label, path, tip }: { label: string; path: string; tip: string }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '0.75rem', overflow: 'hidden' }}>
      {/* Preview area */}
      <div style={{ position: 'relative', height: 140, background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {preview ? (
          <img src={preview} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ textAlign: 'center', color: '#555' }}>
            <Image size={28} style={{ margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '0.75rem' }}>No preview yet</div>
          </div>
        )}
        {preview && (
          <div style={{ position: 'absolute', top: 8, right: 8, background: '#16a34a', borderRadius: '50%', padding: 3 }}>
            <CheckCircle size={14} style={{ color: '#fff' }} />
          </div>
        )}
      </div>

      <div style={{ padding: '1rem' }}>
        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#fff', marginBottom: '0.25rem' }}>{label}</div>
        <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.75rem' }}>{tip}</div>

        <label style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          fontSize: '0.78rem', fontWeight: 600, color: '#B91C1C',
          cursor: 'pointer', marginBottom: '0.5rem',
        }}>
          <Upload size={13} /> Preview image
          <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
        </label>

        <div style={{ background: '#111', borderRadius: '0.4rem', padding: '0.5rem 0.65rem' }}>
          <div style={{ fontSize: '0.68rem', color: '#666', marginBottom: '0.15rem' }}>Upload to GitHub at:</div>
          <code style={{ fontSize: '0.72rem', color: '#B91C1C' }}>{path}</code>
        </div>
      </div>
    </div>
  );
};

export const MediaEditor = () => {
  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#fff' }}>Logo &amp; Hero Images</h1>

      {/* Warning */}
      <div style={{ background: '#1c1407', border: '1px solid #92400e', borderRadius: '0.75rem', padding: '1rem 1.25rem', marginBottom: '2rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
        <AlertTriangle size={18} style={{ color: '#f59e0b', flexShrink: 0, marginTop: 2 }} />
        <div style={{ fontSize: '0.85rem', color: '#fcd34d', lineHeight: 1.6 }}>
          <strong>Images must be uploaded directly to your GitHub repository.</strong><br />
          Use the previewer below to check how your image looks, then upload the file to the path shown in your repo. After pushing to GitHub, Vercel will redeploy automatically.
        </div>
      </div>

      {/* Logo */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>School Logo</h2>
        <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '0.75rem', padding: '1.25rem', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <LogoPreview />
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontSize: '0.85rem', color: '#aaa', lineHeight: 1.7, marginBottom: '0.75rem' }}>
              Replace the school logo by uploading your image to:<br />
              <code style={{ color: '#B91C1C', fontSize: '0.82rem' }}>public/logo.svg</code> (or <code style={{ color: '#B91C1C', fontSize: '0.82rem' }}>public/logo.png</code>)<br /><br />
              If using a PNG, also update <code style={{ color: '#aaa', fontSize: '0.78rem' }}>index.html</code> and the <code style={{ color: '#aaa', fontSize: '0.78rem' }}>src</code> in Navbar, Hero, Footer, and About.
            </div>
            <div style={{ background: '#111', borderRadius: '0.4rem', padding: '0.6rem 0.75rem', fontSize: '0.75rem', color: '#666' }}>
              Recommended: SVG or PNG, square, minimum 200×200 px
            </div>
          </div>
        </div>
      </div>

      {/* Hero slides */}
      <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>Hero Slideshow Images</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {HERO_SLOTS.map(s => <PreviewSlot key={s.path} {...s} />)}
      </div>

      <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '0.75rem', padding: '1.25rem' }}>
        <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>Steps to upload images</h3>
        <ol style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            'Go to your GitHub repository (github.com/slmazwi-coder/advent-high-school)',
            'Navigate to the folder: public/assets/hero/',
            'Click "Add file" → "Upload files"',
            'Upload slide1.jpg, slide2.jpg, slide3.jpg',
            'Commit the changes — Vercel will redeploy automatically',
          ].map((step, i) => (
            <li key={i} style={{ fontSize: '0.82rem', color: '#aaa', lineHeight: 1.6 }}>
              <span style={{ color: '#B91C1C', fontWeight: 700, marginRight: '0.4rem' }}>{i + 1}.</span>{step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

const LogoPreview = () => {
  const [preview, setPreview] = useState<string | null>(null);
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', border: '2px solid #B91C1C', overflow: 'hidden', background: '#fff', margin: '0 auto 0.5rem' }}>
        <img src={preview || '/logo.svg'} alt="Logo preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
      <label style={{ fontSize: '0.72rem', color: '#B91C1C', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center' }}>
        <Upload size={11} /> Preview
        <input type="file" accept="image/*" onChange={e => {
          const f = e.target.files?.[0];
          if (!f) return;
          const r = new FileReader();
          r.onload = () => setPreview(r.result as string);
          r.readAsDataURL(f);
        }} style={{ display: 'none' }} />
      </label>
    </div>
  );
};
