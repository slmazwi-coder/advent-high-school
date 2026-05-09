import React, { useState } from 'react';
import { setNews, getNews, type NewsItem, generateId } from '../utils/storage';
import { runFullDefenseScan } from '../utils/defense';

export const NewsEditor = () => {
  const [items, setItemsState] = useState<NewsItem[]>(getNews());
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const add = async () => {
    const scan = await runFullDefenseScan({ title, content }, 'news');
    if (!scan.safe) return setMessage(scan.reason || 'Blocked');

    const next = [
      { id: generateId(), title, content, date: 'Update', image: '' },
      ...items,
    ];
    setNews(next);
    setItemsState(next);
    setTitle('');
    setContent('');
    setMessage('Saved');
  };

  const remove = (id: string) => {
    const next = items.filter(i => i.id !== id);
    setNews(next);
    setItemsState(next);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">News</h1>

      {message && <div className="mb-4 text-sm text-green-300">{message}</div>}

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 mb-6">
        <div className="grid gap-3">
          <input className="w-full rounded-xl px-4 py-2 bg-gray-900 border border-gray-700" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
          <textarea className="w-full rounded-xl px-4 py-2 bg-gray-900 border border-gray-700" placeholder="Content" rows={4} value={content} onChange={e=>setContent(e.target.value)} />
          <button onClick={add} className="bg-[#C8102E] hover:bg-[#7A0B1B] px-4 py-2 rounded-xl font-bold">Add notice</button>
        </div>
      </div>

      <div className="grid gap-3">
        {items.map(i => (
          <div key={i.id} className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
            <div className="font-bold">{i.title}</div>
            <div className="text-sm text-gray-300 mt-1">{i.content}</div>
            <button onClick={()=>remove(i.id)} className="mt-3 text-sm text-red-300 hover:text-red-200">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};
