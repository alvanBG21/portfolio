'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 px-6 bg-[var(--background)]" id="contact">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--text-primary)]">
            Let's get in touch
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mb-8">
            Let's work together and bring your ideas to life.
          </p>
          <a
            href="mailto:alvannwanorim@gmail.com"
            className="text-xl text-[var(--accent-gold)] hover:text-[var(--accent-gold-light)] transition-colors font-medium"
          >
            alvannwanorim@gmail.com
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-3 mb-16 text-sm"
        >
          <a
            href="https://twitter.com/alvan_nwanorim"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors font-medium"
          >
            X
          </a>
          <span className="text-[var(--text-muted)]">•</span>
          <a
            href="https://www.linkedin.com/in/alvan-nwanorim/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors font-medium"
          >
            Linkedin
          </a>
          <span className="text-[var(--text-muted)]">•</span>
          <a
            href="https://github.com/alvanBG21"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors font-medium"
          >
            Github
          </a>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-[var(--border-color)] pt-8"
        >
          <p className="text-sm text-[var(--text-muted)]">alvan nwanorim</p>
        </motion.div>
      </div>
    </section>
  );
}
