'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const skills = [
  'TypeScript',
  'JavaScript',
  'Python',
  'Java',
  'Spring Boot',
  'NestJS',
  'FastAPI',
  'Django',
  'GraphQL',
  'REST APIs',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'MySQL',
  'AWS',
  'GCP',
  'Docker',
  'Kubernetes',
  'Kafka',
  'RabbitMQ',
  'CI/CD',
  'Terraform',
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 px-6 bg-[var(--background)]" id="skills">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text-primary)]">
            Technical Skills
          </h2>
          <p className="text-[var(--text-secondary)] text-lg">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Skills List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3"
        >
          {skills.map((skill, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.02 }}
              className="px-5 py-3 border-2 border-[var(--border-color)] rounded-lg text-sm font-medium hover:border-[var(--accent-gold)] hover:bg-[var(--card-bg)] hover:text-[var(--accent-gold)] transition-all duration-300"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
