import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Users, Megaphone, ArrowRight } from 'lucide-react';

const stats = [
  { label: 'Grades', value: '8–12', icon: BookOpen },
  { label: 'Matric Rewrite', value: 'Available', icon: Users },
  { label: 'Admissions', value: '2026 Open', icon: Megaphone },
];

export const Home = () => {
  return (
    <div className="flex flex-col">
      <section className="py-10 sm:py-12 bg-white">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-3xl border border-[#C8102E] bg-[#FFF5F7] p-6 sm:p-7 flex gap-4 items-start">
              <div className="p-3 rounded-2xl bg-white border border-[#C8102E] text-[#C8102E] shrink-0">
                <Megaphone size={22} />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-sm font-black uppercase tracking-widest text-[#111827]">Notice</div>
                  <span className="px-2 py-1 rounded-full text-xs font-bold bg-white border border-[#C8102E] text-gray-700">
                    2026
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mt-2">Admissions are still open</h3>
                <p className="text-gray-700 mt-1">
                  Applications for the <span className="font-bold">2026</span> academic year are still open.
                </p>
                <a href="/admissions" className="mt-4 inline-flex items-center gap-2 text-[#C8102E] font-bold">
                  Enroll now <ArrowRight size={18} />
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 sm:p-7 flex gap-4 items-start">
              <div className="p-3 rounded-2xl bg-white border border-gray-200 text-[#C8102E] shrink-0">
                <Megaphone size={22} />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-sm font-black uppercase tracking-widest text-[#111827]">Matric Rewrite</div>
                  <span className="px-2 py-1 rounded-full text-xs font-bold bg-white border border-gray-200 text-gray-700">
                    Available
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mt-2">Matric rewrite is offered</h3>
                <p className="text-gray-700 mt-1">
                  Contact the school for matric rewrite requirements and registration.
                </p>
                <a href="/contact" className="mt-4 inline-flex items-center gap-2 text-[#C8102E] font-bold">
                  Contact us <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 -mt-4 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}

              className="bg-white p-8 rounded-2xl shadow-xl flex items-center gap-6 border-b-4 border-[#C8102E]"
            >
              <div className="p-4 bg-[#FFF5F7] rounded-xl text-[#C8102E]">
                <stat.icon size={32} />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-500 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="section-title">Our Motto</h2>
          <p className="text-2xl text-gray-700 leading-relaxed font-light italic">
            "The fear of the Lord is the beginning of wisdom"
          </p>
        </div>
      </section>
    </div>
  );
};
