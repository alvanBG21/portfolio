'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const certifications = [
  {
    title: 'AWS Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    year: '2023',
  },
  {
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    year: '2022',
  },
  {
    title: 'Cloud Developer Nanodegree',
    issuer: 'Udacity - ALX T',
    year: '2022',
  },
];

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 px-6 bg-[var(--background)]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text-primary)]">
            Certifications
          </h2>
        </motion.div>

        {/* Certifications List */}
        <div className="space-y-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-[var(--border-color)] pb-6 hover:border-[var(--accent-gold)] transition-colors"
            >
              <div>
                <h3 className="text-lg font-semibold mb-1 text-[var(--text-primary)]">
                  {cert.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm">{cert.issuer}</p>
              </div>
              <div className="text-[var(--text-secondary)] text-sm mt-2 md:mt-0 font-medium">
                {cert.year}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
