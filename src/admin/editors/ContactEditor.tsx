import React, { useState } from 'react';
import { getContact, setContact } from '../utils/storage';
import { runFullDefenseScan } from '../utils/defense';

export const ContactEditor = () => {
  const [data, setData] = useState(getContact());
  const [msg, setMsg] = useState<string | null>(null);

  const save = async () => {
    const scan = await runFullDefenseScan(data, 'contact');
    if (!scan.safe) return setMsg(scan.reason || 'Blocked');
    setContact(data);
    setMsg('Saved');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Contact</h1>
      {msg && <div className="mb-4 text-sm text-green-300">{msg}</div>}

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 grid gap-3">
        {(
          [
            ['address','Address'],
            ['phone','Phone'],
            ['email','Email'],
            ['monThu','Mon–Thu'],
            ['friday','Friday'],
            ['weekend','Weekend'],
          ] as const
        ).map(([key,label]) => (
          <div key={key}>
            <label className="text-sm text-gray-300">{label}</label>
            <input className="w-full rounded-xl px-4 py-2 bg-gray-900 border border-gray-700" value={(data as any)[key]}
              onChange={e=>setData({ ...data, [key]: e.target.value })} />
          </div>
        ))}
        <button onClick={save} className="bg-[#C8102E] hover:bg-[#7A0B1B] px-4 py-2 rounded-xl font-bold">Save</button>
      </div>
    </div>
  );
};
