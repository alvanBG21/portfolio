'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative py-20 px-6 overflow-hidden bg-[var(--background)]">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-background"></div>
      
      {/* Gradient Overlay - Fades the grid at edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-transparent to-[var(--background)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-transparent to-[var(--background)] pointer-events-none"></div>

      {/* Fixed Image Placeholder - Right Side */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="fixed right-8 top-24 hidden lg:block z-10"
      >
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--accent-gold)] to-[var(--accent-gold-light)] flex items-center justify-center text-[var(--background)] text-2xl font-bold shadow-2xl">
            AN
          </div>
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-full bg-[var(--accent-gold)] opacity-20 blur-xl"></div>
        </div>
      </motion.div>

      <div className="max-w-5xl w-full text-center relative z-10">
        {/* Name Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-16 w-full max-w-2xl"
        >
          <div className="px-16 py-7 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide shadow-2xl">
            alvan nwanorim
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 text-[var(--text-primary)]"
        >
          <span className="text-[var(--text-primary)]">Alvan</span> is a senior software engineer{' '}
          <span className="text-[var(--text-secondary)]">
            building scalable distributed systems.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto"
        >
          i'm also known as alvan (bg for short)
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Link
            href="#contact"
            className="inline-block px-8 py-4 border-2 border-[var(--text-primary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--text-primary)] hover:text-[var(--background)] transition-all duration-300 font-medium"
          >
            Check Resumé
          </Link>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href="https://github.com/alvanBG21"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center bg-[var(--text-primary)] text-[var(--background)] rounded-lg hover:scale-110 hover:bg-[var(--accent-gold)] transition-all duration-300"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/alvan-nwanorim/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center bg-[var(--text-primary)] text-[var(--background)] rounded-lg hover:scale-110 hover:bg-[var(--accent-gold)] transition-all duration-300"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://twitter.com/alvan_nwanorim"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center bg-[var(--text-primary)] text-[var(--background)] rounded-lg hover:scale-110 hover:bg-[var(--accent-gold)] transition-all duration-300"
          >
            <FaTwitter size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
