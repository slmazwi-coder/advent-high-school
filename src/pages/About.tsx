import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { getAbout, type AboutInfo } from '../admin/utils/storage';

export const About = () => {
  const [data, setData] = useState<AboutInfo>(getAbout());
  const [campusFailed, setCampusFailed] = useState(false);
  const [principalFailed, setPrincipalFailed] = useState(false);

  const campusImageUrl = '/assets/about/campus.jpg';
  const principalImageUrl = '/assets/about/principal.jpg';

  useEffect(() => {
    setData(getAbout());
  }, []);

  return (
    <div className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="section-title">About Advent Comprehensive High School</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="border-l-4 border-[#C8102E] pl-5 mb-6">
              <h2 className="text-2xl font-bold text-[#111827]">Our School</h2>
            </div>
            <div className="space-y-4 text-gray-600 leading-relaxed text-base">
              {data.historyParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            viewport={{ once: true }}
            className="bg-[#F8FAFC] rounded-3xl overflow-hidden shadow-lg border border-gray-200"
          >
            <div className="bg-[#111827] p-6 sm:p-8">
              <div className="w-full rounded-3xl bg-[#111827] p-2 sm:p-3" style={{ border: '4px solid #C8102E' }}>
                <div className="w-full rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: '4/3' }}>
                  {!campusFailed ? (
                    <img
                      src={campusImageUrl}
                      alt="School campus"
                      className="w-full h-full object-cover bg-black"
                      onError={() => setCampusFailed(true)}
                    />
                  ) : (
                    <img src="/assets/about/campus.svg" alt="Campus placeholder" className="w-full h-full object-cover" />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-24"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#111827] mb-2">Principal's Message</h2>
            <div className="w-16 h-1 bg-[#C8102E] mx-auto rounded-full" />
          </div>

          <div className="bg-[#F8FAFC] rounded-3xl overflow-hidden shadow-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="flex flex-col items-center justify-center bg-[#111827] p-8 md:p-10">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#C8102E] shadow-xl mb-5 bg-white">
                  {!principalFailed ? (
                    <img
                      src={principalImageUrl}
                      alt="Principal"
                      className="w-full h-full object-cover object-top"
                      onError={() => setPrincipalFailed(true)}
                    />
                  ) : (
                    <img src="/assets/about/principal.svg" alt="Principal placeholder" className="w-full h-full object-cover" />
                  )}
                </div>

                <h3 className="text-lg font-bold text-white text-center leading-tight">
                  {data.principalName}
                </h3>
                <p className="text-white text-sm font-semibold mt-1 text-center" style={{ opacity: 0.85 }}>
                  {data.principalTitle}
                </p>
              </div>

              <div className="col-span-2 flex flex-col justify-center p-8 md:p-12">
                <div className="text-[#C8102E] text-6xl font-serif leading-none mb-2 opacity-25 select-none">"</div>

                <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
                  {data.principalMessage.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="text-[#C8102E] text-6xl font-serif leading-none mt-2 text-right opacity-25 select-none">"</div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};
