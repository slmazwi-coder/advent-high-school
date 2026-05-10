import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { getApplications, type Application } from '../admin/utils/storage';

type ChatRole = 'user' | 'bot';
type ChatMessage = { id: string; role: ChatRole; text: string; createdAt: number; };

function uid() { return `${Date.now()}-${Math.random().toString(16).slice(2)}`; }
function normalize(s: string) { return s.toLowerCase().trim(); }
function formatDate(iso?: string) { if (!iso) return ''; try { return new Date(iso).toLocaleDateString(); } catch { return iso; } }

type StatusQuery =
  | { kind: 'studentNumber'; studentNumber: string }
  | { kind: 'nameAndDob'; firstName: string; lastName: string; dob: string };

function parseStatusQuery(input: string): StatusQuery | null {
  const text = normalize(input);
  const snMatch = text.match(/(student number|student no|student|status)\s*[:#]?\s*([a-z0-9-]{6,})/i);
  if (snMatch?.[2]) return { kind: 'studentNumber', studentNumber: snMatch[2].toUpperCase() };
  const dobMatch = text.match(/\b(19|20)\d{2}-\d{2}-\d{2}\b/);
  if (dobMatch) {
    const dob = dobMatch[0];
    const tokens = text.replace(dob, ' ').split(/\s+/).filter(Boolean);
    const idx = tokens.findIndex(t => t === 'status');
    const start = idx >= 0 ? idx + 1 : 0;
    if (tokens[start] && tokens[start + 1]) return { kind: 'nameAndDob', firstName: tokens[start], lastName: tokens[start + 1], dob };
  }
  return null;
}

function findApplication(apps: Application[], q: StatusQuery) {
  if (q.kind === 'studentNumber') return apps.find(a => normalize(a.studentNumber) === normalize(q.studentNumber));
  return apps.find(a => normalize(a.firstName) === normalize(q.firstName) && normalize(a.lastName) === normalize(q.lastName) && normalize(a.dob) === normalize(q.dob));
}

const SYSTEM_PROMPT = `You are a warm, helpful assistant for Advent Comprehensive High School in Matatiele, Eastern Cape, South Africa.
Help parents, learners, and guardians with: admissions, required documents, fees, school hours, subjects, sport, activities, matric rewrite, and contact info.
School details: Maluti, Matatiele, Eastern Cape. Phone: 072 300 0020 / 060 700 8052. Email: adventhighschool90@gmail.com. Grades 8–12. Matric rewrite offered.
Be warm, clear and concise. For specific questions you're unsure about, direct them to call or email the school.`;

const QUICK = ['How to apply?', 'Documents needed?', 'Matric rewrite?', 'School hours?'];

async function askClaude(msg: string): Promise<string> {
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 900, system: SYSTEM_PROMPT, messages: [{ role: 'user', content: msg }] }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data?.content?.filter((b: any) => b.type === 'text').map((b: any) => b.text).join('\n').trim() || '';
  } catch {
    return "I'm having trouble connecting. Please call the school: 072 300 0020.";
  }
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: uid(), role: 'bot', createdAt: Date.now(),
    text: 'Hello! I can help with admissions, matric rewrite, school hours, and more. What would you like to know?',
  }]);
  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const apps = useMemo(() => { try { return getApplications(); } catch { return []; } }, [open]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, open]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 150); }, [open]);

  async function send(override?: string) {
    const text = (override ?? input).trim();
    if (!text || typing) return;
    setMessages(prev => [...prev, { id: uid(), role: 'user', text, createdAt: Date.now() }]);
    setInput('');
    setTyping(true);
    try {
      const sq = parseStatusQuery(text);
      if (sq) {
        const app = findApplication(apps, sq);
        const reply = app
          ? `Application found: ${app.firstName} ${app.lastName} (${app.studentNumber}). Status: ${app.status}.${app.submittedDate ? ` Submitted: ${formatDate(app.submittedDate)}.` : ''}`
          : 'No matching application found. Please check the student number or learner name and date of birth.';
        setMessages(prev => [...prev, { id: uid(), role: 'bot', text: reply, createdAt: Date.now() }]);
        return;
      }
      const reply = await askClaude(text);
      setMessages(prev => [...prev, { id: uid(), role: 'bot', text: reply, createdAt: Date.now() }]);
    } catch {
      setMessages(prev => [...prev, { id: uid(), role: 'bot', text: 'Something went wrong. Please call 072 300 0020.', createdAt: Date.now() }]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <>
      {open && (
        <div style={{
          position: 'fixed', zIndex: 50,
          bottom: '5rem', right: '1rem',
          width: 'min(calc(100vw - 2rem), 360px)',
          height: 'min(70vh, 520px)',
          background: '#fff',
          borderRadius: '1rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
          border: '1px solid #E5E2D9',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          animation: 'fadeUp 0.2s ease both',
        }}>
          {/* Header */}
          <div style={{ background: '#B91C1C', padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <div style={{ width: 34, height: 34, background: 'rgba(255,255,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={15} style={{ color: '#fff' }} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: '#fff' }}>Advent Assistant</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 6, height: 6, background: '#4ade80', borderRadius: '50%', display: 'inline-block' }} />
                  Online · AI-powered
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: '0.25rem' }} aria-label="Close">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.625rem', background: '#FAFAF8' }}>
            {messages.map(m => (
              <div key={m.id} style={{ display: 'flex', flexDirection: m.role === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: '0.5rem' }}>
                {m.role === 'bot' && (
                  <div style={{ width: 24, height: 24, background: '#B91C1C', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Sparkles size={11} style={{ color: '#fff' }} />
                  </div>
                )}
                <div style={{
                  maxWidth: '80%',
                  padding: '0.625rem 0.875rem',
                  borderRadius: m.role === 'user' ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
                  background: m.role === 'user' ? '#B91C1C' : '#fff',
                  color: m.role === 'user' ? '#fff' : '#222',
                  fontSize: '0.85rem',
                  lineHeight: 1.6,
                  border: m.role === 'bot' ? '1px solid #E5E2D9' : 'none',
                  whiteSpace: 'pre-wrap',
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                <div style={{ width: 24, height: 24, background: '#B91C1C', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Sparkles size={11} style={{ color: '#fff' }} />
                </div>
                <div style={{ background: '#fff', border: '1px solid #E5E2D9', borderRadius: '1rem 1rem 1rem 0.25rem', padding: '0.625rem 0.875rem', display: 'flex', gap: 4 }}>
                  {[0, 150, 300].map(d => (
                    <span key={d} style={{ width: 6, height: 6, background: '#bbb', borderRadius: '50%', display: 'inline-block', animation: 'bounce 1s infinite', animationDelay: `${d}ms` }} />
                  ))}
                </div>
              </div>
            )}
            {messages.length <= 1 && !typing && (
              <div style={{ marginTop: '0.5rem' }}>
                <p style={{ fontSize: '0.72rem', color: '#aaa', textAlign: 'center', marginBottom: '0.5rem' }}>Quick questions:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                  {QUICK.map(q => (
                    <button key={q} onClick={() => send(q)} style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.75rem', padding: '0.3rem 0.75rem',
                      borderRadius: '2rem', background: '#fff', border: '1px solid #B91C1C',
                      color: '#B91C1C', cursor: 'pointer', fontWeight: 500,
                    }}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '0.75rem', background: '#fff', borderTop: '1px solid #E5E2D9', flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Ask about the school…"
                disabled={typing}
                style={{
                  flex: 1, fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                  border: '1px solid #E5E2D9', borderRadius: '0.5rem',
                  padding: '0.6rem 0.875rem', outline: 'none', background: '#FAFAF8',
                  color: '#111',
                }}
              />
              <button
                onClick={() => send()}
                disabled={typing || !input.trim()}
                style={{
                  background: '#B91C1C', color: '#fff', border: 'none',
                  borderRadius: '0.5rem', padding: '0.6rem 0.875rem',
                  cursor: 'pointer', opacity: (typing || !input.trim()) ? 0.4 : 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </div>
            <p style={{ fontSize: '0.67rem', color: '#bbb', textAlign: 'center', marginTop: '0.4rem' }}>
              AI-powered · English · isiXhosa · isiZulu · Sesotho
            </p>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Close assistant' : 'Open assistant'}
        style={{
          position: 'fixed', zIndex: 50, bottom: '1.25rem', right: '1rem',
          width: 52, height: 52, borderRadius: '50%',
          background: '#B91C1C', color: '#fff', border: 'none',
          boxShadow: '0 4px 20px rgba(185,28,28,0.45)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.15s, background 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#7F1D1D')}
        onMouseLeave={e => (e.currentTarget.style.background = '#B91C1C')}
      >
        <div style={{ position: 'relative' }}>
          {open ? <X size={22} /> : (
            <>
              <MessageCircle size={22} />
              <span style={{ position: 'absolute', top: -2, right: -2, width: 9, height: 9, background: '#4ade80', borderRadius: '50%', border: '2px solid #fff' }} />
            </>
          )}
        </div>
      </button>

      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }`}</style>
    </>
  );
}
