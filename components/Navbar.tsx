// components/Navbar.tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';

const menuLinks = [
  { title: 'Home', href: '#hero' },
  { title: 'Manifesto', href: '#manifesto' },
  { title: 'Offerings', href: '#offerings' },
  { title: 'Context', href: '#toggle' },
  { title: 'Life at Alcovia', href: '#socials' },
  { title: 'Contact', href: '#footer' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Refs
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLAnchorElement[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Scroll handler with throttle
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize GSAP timeline
  useEffect(() => {
    const container = menuContainerRef.current;
    const footer = footerRef.current;
    const bgText = bgTextRef.current;

    if (!container) return;

    gsap.set(container, {
      autoAlpha: 0,
      pointerEvents: 'none',
    });

    tlRef.current = gsap
      .timeline({ paused: true })
      .to(container, {
        autoAlpha: 1,
        pointerEvents: 'auto',
        duration: 0.3,
        ease: 'power2.out',
      })
      .fromTo(
        bgText,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 0.03, duration: 0.4, ease: 'power2.out' },
        '-=0.1'
      )
      .fromTo(
        menuItemsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.04,
          ease: 'power3.out',
        },
        '-=0.2'
      )
      .fromTo(
        footer,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' },
        '-=0.15'
      );

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  // Play/Reverse animation
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      tlRef.current?.timeScale(1).play();
    } else {
      document.body.style.overflow = '';
      tlRef.current?.timeScale(1.5).reverse();
    }
  }, [isOpen]);

  // Handle link click
  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsOpen(false);

      setTimeout(() => {
        const target = document.querySelector(href);
        target?.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    },
    []
  );

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Store ref helper
  const setMenuItemRef = (el: HTMLAnchorElement | null, index: number) => {
    if (el) menuItemsRef.current[index] = el;
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 transition-all duration-500 ease-out ${
          isScrolled
            ? 'py-3 bg-transparent' // Scrolled: Compact padding, transparent bg
            : 'py-5 md:py-6 bg-transparent' // Top: Larger padding, transparent bg
        }`}
      >
        {/* Optional: Gradient fade for readability without blocking content */}
        <div 
          className={`absolute inset-0 transition-opacity duration-500 -z-10 bg-gradient-to-b from-black/60 to-transparent pointer-events-none ${
             isScrolled ? 'opacity-100' : 'opacity-0' 
          }`} 
        />

        <div className="max-w-[1920px] mx-auto flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="relative z-[110] group">
            <img
              src="/alcovia-logo.png"
              alt="Alcovia"
              className="h-8 md:h-10 w-auto object-contain brightness-0 invert transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3 md:gap-4 relative z-[110]">
            {/* Join Button */}
            <Link
              href="#join"
              className="group relative flex items-center gap-2 bg-[#D2FF00] text-black px-4 md:px-6 py-2.5 md:py-3 rounded-full font-bold uppercase tracking-wider text-xs md:text-sm overflow-hidden hover:shadow-[0_0_30px_rgba(210,255,0,0.4)] transition-shadow duration-300"
            >
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <ShoppingBag
                size={16}
                strokeWidth={2.5}
                className="relative z-10"
              />
              <span className="relative z-10 hidden md:inline">
                Join Program
              </span>
              <span className="relative z-10 md:hidden">Join</span>
            </Link>

            {/* Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`w-11 h-11 md:w-12 md:h-12 border-2 rounded-full flex items-center justify-center transition-all duration-300 ${
                isOpen
                  ? 'border-white/30 bg-white/10 text-white'
                  : 'border-white/20 text-white hover:bg-[#D2FF00] hover:text-black hover:border-[#D2FF00]'
              }`}
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={22}
                  strokeWidth={1.5}
                  className={`absolute inset-0 m-auto transition-all duration-200 ${
                    isOpen
                      ? 'opacity-0 rotate-45 scale-0'
                      : 'opacity-100 rotate-0 scale-100'
                  }`}
                />
                <X
                  size={22}
                  strokeWidth={1.5}
                  className={`absolute inset-0 m-auto transition-all duration-200 ${
                    isOpen
                      ? 'opacity-100 rotate-0 scale-100'
                      : 'opacity-0 -rotate-45 scale-0'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ================= FULLSCREEN MENU ================= */}
      <div
        ref={menuContainerRef}
        className="fixed inset-0 z-[90] bg-[#050505] overflow-hidden"
        aria-hidden={!isOpen}
      >
        {/* Background Gradient Orb */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06]"
            style={{
              background: 'radial-gradient(circle, #D2FF00 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span
            ref={bgTextRef}
            className="text-[15vw] font-display font-black text-white uppercase select-none"
            style={{ opacity: 0.03 }}
          >
            Menu
          </span>
        </div>

        {/* Main Content Container */}
        <div className="relative h-full w-full flex flex-col">
          {/* Spacer for navbar to avoid overlap */}
          <div className="h-20 md:h-24 shrink-0" />

          {/* Links Container - Centered and Dynamic */}
          <div className="flex-1 flex items-center justify-center overflow-y-auto py-4">
            <nav className="w-full max-w-4xl mx-auto px-6 md:px-12 flex flex-col justify-center min-h-0">
              {menuLinks.map((item, index) => (
                <a
                  key={item.title}
                  ref={(el) => setMenuItemRef(el, index)}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="group flex items-center py-3 md:py-3 lg:py-5 border-b border-white/10 hover:border-[#D2FF00]/50 transition-colors duration-200 w-full"
                >
                  {/* Number */}
                  <span className="w-8 md:w-12 text-[10px] md:text-sm font-display text-white/30 group-hover:text-[#D2FF00] transition-colors duration-200 shrink-0">
                    0{index + 1}
                  </span>

                  {/* Title */}
                  <span
                    className="flex-1 font-display font-bold text-white uppercase tracking-tight group-hover:text-[#D2FF00] group-hover:translate-x-2 transition-all duration-200 truncate"
                    style={{
                      // Adjusted Clamp: Smaller minimum size to fit comfortably on laptops
                      fontSize: 'clamp(1rem, 5vw, 2.8rem)',
                      lineHeight: 1.1,
                    }}
                  >
                    {item.title}
                  </span>

                  {/* Arrow */}
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#D2FF00] group-hover:border-[#D2FF00] transition-all duration-200 shrink-0 ml-4">
                    <ArrowRight
                      size={18}
                      className="text-white/40 group-hover:text-black transition-colors duration-200"
                    />
                  </div>
                </a>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div
            ref={footerRef}
            className="shrink-0 px-6 md:px-12 py-4 md:py-6 border-t border-white/10 mt-auto"
          >
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Contact Links */}
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-xs md:text-sm">
                <a
                  href="mailto:info@alcovia.life"
                  className="text-white/50 hover:text-[#D2FF00] transition-colors duration-200"
                >
                  info@alcovia.life
                </a>
                <span className="text-white/20 hidden sm:inline">•</span>
                <a
                  href="tel:+919070606050"
                  className="text-white/50 hover:text-[#D2FF00] transition-colors duration-200"
                >
                  +91 9070606050
                </a>
              </div>

              {/* Copyright */}
              <p className="text-[10px] md:text-xs text-white/30 uppercase tracking-widest">
                © {new Date().getFullYear()} Alcovia
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}