import React, { useState } from 'react';
import { getAbout, setAbout } from '../utils/storage';
import { runFullDefenseScan } from '../utils/defense';

export const AboutEditor = () => {
  const [data, setData] = useState(getAbout());
  const [msg, setMsg] = useState<string | null>(null);

  const save = async () => {
    const scan = await runFullDefenseScan(data, 'about');
    if (!scan.safe) return setMsg(scan.reason || 'Blocked');
    setAbout(data);
    setMsg('Saved');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">About</h1>
      {msg && <div className="mb-4 text-sm text-green-300">{msg}</div>}

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 grid gap-3">
        <label className="text-sm text-gray-300">History (one paragraph per line)</label>
        <textarea className="w-full rounded-xl px-4 py-2 bg-gray-900 border border-gray-700" rows={6}
          value={data.historyParagraphs.join('\n')}
          onChange={e=>setData({ ...data, historyParagraphs: e.target.value.split('\n').filter(Boolean) })}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-gray-300">Principal name</label>
            <input className="w-full rounded-xl px-4 py-2 bg-gray-900 border border-gray-700" value={data.principalName}
              onChange={e=>setData({ ...data, principalName: e.target.value })} />
          </div>
          <div>
            <label className="text-sm text-gray-300">Principal title</label>
            <input className="w-full rounded-xl px-4 py-2 bg-gray-900 border border-gray-700" value={data.principalTitle}
              onChange={e=>setData({ ...data, principalTitle: e.target.value })} />
          </div>
        </div>

        <label className="text-sm text-gray-300">Principal message (one paragraph per line)</label>
        <textarea className="w-full rounded-xl px-4 py-2 bg-gray-900 border border-gray-700" rows={5}
          value={data.principalMessage.join('\n')}
          onChange={e=>setData({ ...data, principalMessage: e.target.value.split('\n').filter(Boolean) })}
        />

        <button onClick={save} className="bg-[#C8102E] hover:bg-[#7A0B1B] px-4 py-2 rounded-xl font-bold">Save</button>
      </div>
    </div>
  );
};
