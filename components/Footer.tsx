// components/Footer.tsx
'use client';

import { useEffect, useRef } from 'react';
import Newsletter from './footer/Newsletter';
import {
  ContactColumn,
  QuickLinksColumn,
  BrandingColumn,
  LegalColumn,
} from './footer/FooterColumns';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          footer.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="footer-section relative bg-[#050505] text-white"
    >
      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D2FF00]/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        {/* Newsletter */}
        <Newsletter />

        {/* Main Grid */}
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <ContactColumn />
          <QuickLinksColumn />
          <BrandingColumn />
          <LegalColumn />
        </div>

        {/* Copyright */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
            <p>© {CURRENT_YEAR} Alcovia. All rights reserved.</p>
            <p className="flex items-center gap-2">
              Made with <span className="text-[#D2FF00]">⚡</span> for future leaders
            </p>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#D2FF00]/20 to-transparent" />
    </footer>
  );
}