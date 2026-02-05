'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--border-color)]'
          : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold hover:text-[var(--accent-gold)] transition-colors">
            alvan.
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#projects"
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors font-medium"
            >
              Projects
            </a>
            <a
              href="#about"
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors font-medium"
            >
              Experience
            </a>
            <a
              href="#skills"
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors font-medium"
            >
              Skills
            </a>
            <Link
              href="/blog"
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors font-medium"
            >
              Blog
            </Link>
            <a
              href="#contact"
              className="text-sm px-5 py-2 border-2 border-[var(--accent-gold)] text-[var(--accent-gold)] rounded-lg hover:bg-[var(--accent-gold)] hover:text-[var(--background)] transition-all duration-300 font-medium"
            >
              Contact
            </a>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border-2 border-[var(--border-color)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <FiSun className="w-4 h-4" />
              ) : (
                <FiMoon className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border-2 border-[var(--border-color)] hover:border-[var(--accent-gold)] transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <FiSun className="w-4 h-4" />
              ) : (
                <FiMoon className="w-4 h-4" />
              )}
            </button>
            <button
              className="text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors"
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
