import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { getContact } from '../admin/utils/storage';

export const Contact = () => {
  const contact = getContact();

  return (
    <div className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="section-title">Contact</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <div className="flex items-center gap-2 text-[#C8102E] font-bold mb-2"><MapPin size={18}/> Address</div>
            <div className="text-gray-700">{contact.address}</div>
          </div>
          <div className="card">
            <div className="flex items-center gap-2 text-[#C8102E] font-bold mb-2"><Phone size={18}/> Phone</div>
            <div className="text-gray-700">{contact.phone}</div>
          </div>
          <div className="card">
            <div className="flex items-center gap-2 text-[#C8102E] font-bold mb-2"><Mail size={18}/> Email</div>
            <div className="text-gray-700 break-all">{contact.email}</div>
          </div>
        </div>

        <div className="mt-8 card">
          <div className="text-[#111827] font-bold mb-2">School Hours</div>
          <div className="text-gray-700 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div><span className="font-semibold">Mon–Thu:</span> {contact.monThu}</div>
            <div><span className="font-semibold">Friday:</span> {contact.friday}</div>
            <div><span className="font-semibold">Weekend:</span> {contact.weekend}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
