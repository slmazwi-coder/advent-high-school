import React, { useState, type FormEvent } from 'react';
import { ShoppingBag, Send, CheckCircle, Minus, Plus } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  qty: number;
}

const merchandise = [
  {
    id: 'blazer',
    name: 'School Blazer',
    price: 950,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Maroon blazer with embroidered school badge.',
  },
  {
    id: 'trousers',
    name: 'Grey Trousers',
    price: 350,
    sizes: ['28', '30', '32', '34', '36', '38'],
    description: 'Standard grey school trousers.',
  },
  {
    id: 'skirt',
    name: 'School Skirt',
    price: 320,
    sizes: ['28', '30', '32', '34', '36'],
    description: 'Maroon pleated school skirt.',
  },
  {
    id: 'shirt-white',
    name: 'White Shirt',
    price: 200,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Short-sleeve white school shirt with logo.',
  },
  {
    id: 'jersey',
    name: 'School Jersey',
    price: 450,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Maroon V-neck jersey with school crest.',
  },
  {
    id: 'tracksuit',
    name: 'Tracksuit Set',
    price: 650,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Full tracksuit set — jacket and pants.',
  },
  {
    id: 'pe-shirt',
    name: 'PE T-Shirt',
    price: 150,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Maroon PE t-shirt with school logo.',
  },
  {
    id: 'tie',
    name: 'School Tie',
    price: 120,
    sizes: ['One Size'],
    description: 'Striped school tie in maroon and gold.',
  },
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

export const Merchandise = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const addToCart = (item: typeof merchandise[0]) => {
    const size = selectedSizes[item.id] || item.sizes[0];
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id && c.size === size);
      if (existing) {
        return prev.map(c => c.id === item.id && c.size === size ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, size, qty: 1 }];
    });
  };

  const updateQty = (id: string, size: string, delta: number) => {
    setCart(prev =>
      prev
        .map(c => c.id === id && c.size === size ? { ...c, qty: Math.max(0, c.qty + delta) } : c)
        .filter(c => c.qty > 0)
    );
  };

  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div>
        <div className="page-header">
          <div className="rule-accent" style={{ margin: '0 auto 0.75rem' }} />
          <h1>Order Submitted</h1>
        </div>
        <section className="section-pad" style={{ background: '#fff' }}>
          <div className="container-narrow" style={{ maxWidth: '36rem', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#DEF7EC', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <CheckCircle size={32} style={{ color: '#047857' }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', margin: '0 0 0.75rem', color: '#111' }}>
              Order received!
            </h2>
            <p style={{ color: '#555', lineHeight: 1.7, fontSize: '0.95rem', margin: '0 0 1.5rem' }}>
              Thank you for your order. The school will contact you to confirm availability and arrange payment &amp; collection.
            </p>
            <p style={{ color: '#555', lineHeight: 1.7, fontSize: '0.9rem', margin: '0 0 0.5rem' }}>
              <strong>Order total: R{total.toLocaleString()}</strong>
            </p>
            <p style={{ color: '#888', fontSize: '0.82rem', margin: '0 0 2rem' }}>
              Items: {cart.map(c => `${c.name} (${c.size}) ×${c.qty}`).join(', ')}
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
        <h1>School Merchandise</h1>
        <p>Order your Advent school uniform and accessories</p>
      </div>

      <section className="section-pad" style={{ background: '#FAFAF8' }}>
        <div className="container-narrow">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}>

            {/* Product grid */}
            <div>
              <div className="rule-accent" />
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', margin: '0 0 1.5rem', color: '#111' }}>
                Available Items
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))', gap: '1rem' }}>
                {merchandise.map(item => (
                  <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <ShoppingBag size={16} style={{ color: '#B91C1C' }} />
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', margin: 0, color: '#111' }}>{item.name}</h3>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: '#666', margin: '0 0 0.75rem', lineHeight: 1.5, flex: 1 }}>{item.description}</p>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: '#B91C1C', marginBottom: '0.75rem' }}>
                      R{item.price}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <select
                        value={selectedSizes[item.id] || item.sizes[0]}
                        onChange={e => setSelectedSizes(prev => ({ ...prev, [item.id]: e.target.value }))}
                        style={{ ...inputStyle, width: 'auto', padding: '0.4rem 0.6rem', fontSize: '0.8rem' }}
                      >
                        {item.sizes.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <button
                        type="button"
                        onClick={() => addToCart(item)}
                        className="btn btn-primary"
                        style={{ padding: '0.4rem 0.9rem', fontSize: '0.78rem', flex: 1 }}
                      >
                        Add to Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order form */}
            <div id="order-form">
              <div className="rule-accent" />
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', margin: '0 0 1.5rem', color: '#111' }}>
                Your Order
              </h2>

              {cart.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                  <ShoppingBag size={32} style={{ margin: '0 auto 0.75rem', opacity: 0.4 }} />
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>Your order is empty. Add items from the catalogue above.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Cart items */}
                  <div className="card" style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {cart.map(c => (
                        <div key={`${c.id}-${c.size}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f0efe9' }}>
                          <div>
                            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#111' }}>{c.name}</span>
                            <span style={{ fontSize: '0.8rem', color: '#888', marginLeft: '0.5rem' }}>({c.size})</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <button type="button" onClick={() => updateQty(c.id, c.size, -1)} style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Minus size={12} />
                            </button>
                            <span style={{ fontWeight: 600, fontSize: '0.9rem', minWidth: 20, textAlign: 'center' }}>{c.qty}</span>
                            <button type="button" onClick={() => updateQty(c.id, c.size, 1)} style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Plus size={12} />
                            </button>
                            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111', minWidth: 60, textAlign: 'right' }}>
                              R{(c.price * c.qty).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '2px solid #E5E2D9' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#111' }}>Total</span>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: '#B91C1C' }}>R{total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Contact details */}
                  <div className="card" style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', margin: '0 0 1rem', color: '#111' }}>Collection Details</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1rem' }}>
                      <div>
                        <label style={labelStyle}>Full name <span style={{ color: '#B91C1C' }}>*</span></label>
                        <input name="order_name" type="text" required style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Phone number <span style={{ color: '#B91C1C' }}>*</span></label>
                        <input name="order_phone" type="tel" required style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Email address</label>
                        <input name="order_email" type="email" style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Learner name <span style={{ color: '#B91C1C' }}>*</span></label>
                        <input name="order_learner" type="text" required style={inputStyle} placeholder="Name of learner this order is for" />
                      </div>
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                      <label style={labelStyle}>Special requests or notes</label>
                      <textarea name="order_notes" rows={2} style={{ ...inputStyle, resize: 'vertical' }} placeholder="e.g. specific measurements, embroidery name…" />
                    </div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 2.5rem', fontSize: '0.95rem' }}>
                      <Send size={16} /> Submit Order
                    </button>
                    <p style={{ color: '#888', fontSize: '0.8rem', marginTop: '1rem' }}>
                      Payment is arranged after order confirmation. Collection from the school office.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
