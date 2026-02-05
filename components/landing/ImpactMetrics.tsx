'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '10+', label: 'Microservices Built' },
  { value: '20%', label: 'Performance Boost' },
  { value: '30%', label: 'Cost Reduction' },
];

export default function ImpactMetrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-16 px-6 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 text-[var(--accent-gold)] group-hover:text-[var(--accent-gold-light)] transition-colors">
                {stat.value}
              </div>
              <div className="text-[var(--text-secondary)] text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
