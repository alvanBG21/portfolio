'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const timeline = [
  {
    period: 'July 2025 - Present',
    role: 'Backend Engineer & Solo Flutter Engineer at',
    company: 'Technova Technologies',
    logo: 'TT',
    color: '#3b82f6',
  },
  {
    period: 'March 2025 - Present',
    role: 'Full Stack Developer at',
    company: 'CNAFF Abia State Revenue Management System',
    logo: 'CN',
    color: '#10b981',
  },
  {
    period: 'January 2025 – Present',
    role: 'Senior Software Engineer at',
    company: 'Babban Gona',
    logo: 'BG',
    color: '#84cc16',
  },
  {
    period: 'January 2022 – January 2025',
    role: 'Software Engineer at',
    company: 'Babban Gona',
    logo: 'BG',
    color: '#84cc16',
  },
  {
    period: 'June 2020 – January 2023',
    role: 'Backend Developer at',
    company: 'Aibanc',
    logo: 'AI',
    color: '#8b5cf6',
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 px-6 bg-[var(--background)]" id="about">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text-primary)]">
            My work experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-10">
          {timeline.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col gap-4"
            >
              {/* Period */}
              <div className="text-[var(--text-secondary)] text-sm font-medium">
                {job.period}
              </div>

              {/* Role */}
              <div className="text-lg text-[var(--text-primary)]">
                {job.role}
              </div>

              {/* Company */}
              <div className="flex items-center gap-4">
                {/* Company Logo */}
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-white shadow-md"
                  style={{ backgroundColor: job.color }}
                >
                  {job.logo}
                </div>
                <p className="text-[var(--text-primary)] font-semibold text-lg">
                  {job.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
