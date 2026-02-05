'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';

const projects = [
  {
    title: 'QueryFlow Studio',
    description:
      'A database studio with superpowers. Generate queries and communicate with your database using AI.',
    link: '#',
    linkText: 'Check it out',
    logo: '🗄️',
    color: '#10b981',
  },
  {
    title: 'Olive MFB App',
    description:
      'Mobile banking application built under Technova Technologies for Olive Microfinance Bank.',
    link: '#',
    linkText: 'View Project',
    logo: '🫒',
    color: '#84cc16',
  },
  {
    title: 'CNAFF Abia State Revenue System',
    description:
      'Revenue collection and management system for Abia State Government, generating over 1 billion naira monthly.',
    link: '#',
    linkText: 'Check it out',
    logo: '🌊',
    color: '#3b82f6',
  },
  {
    title: 'Engy (Esports NG)',
    description:
      'Mobile application for the Nexal Gaming Community.',
    link: '#',
    linkText: 'View Application',
    logo: '🎮',
    color: '#8b5cf6',
  },
  {
    title: 'Entity Docs',
    description:
      'TypeScript library using React, decorators, and builder pattern to automatically generate database schema documentation.',
    link: 'https://www.npmjs.com/package/entity-docs',
    linkText: 'Learn more',
    logo: '📚',
    color: '#f59e0b',
  },
  {
    title: 'Country Phone Codes',
    description:
      'Lightweight TypeScript NPM package for fetching country phone codes, currency symbols, and ISO codes.',
    link: 'https://www.npmjs.com/package/country-phone-codes',
    linkText: 'Get Started',
    logo: '🌍',
    color: '#06b6d4',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 px-6 bg-[var(--background)]" id="projects">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <p className="text-sm uppercase tracking-wider text-[var(--text-secondary)] mb-3">
            PROJECTS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
            Some cool projects I've built.
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="group bg-[var(--card-bg)] rounded-2xl p-8 border border-[var(--border-color)] hover:border-[var(--accent-gold)] hover:shadow-xl transition-all duration-300"
            >
              {/* Project Logo */}
              <div 
                className="w-16 h-16 rounded-xl mb-6 flex items-center justify-center text-3xl shadow-md"
                style={{ backgroundColor: project.color + '20' }}
              >
                {project.logo}
              </div>

              {/* Project Title */}
              <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                {project.title}
              </h3>

              {/* Project Description */}
              <p className="text-[var(--text-secondary)] mb-6 text-sm leading-relaxed">
                {project.description}
              </p>

              {/* Link */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors font-medium group"
                >
                  {project.linkText}
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
