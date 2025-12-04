// components/Footer.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from './Icons'; // Assuming you have this, otherwise replace with Lucide icons
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { name: 'About Us', url: '/about' },
  { name: 'Programs', url: '/programs' },
  { name: 'Mentorship', url: '/mentorship' },
  { name: 'Career Discovery', url: '/career-discovery' },
  { name: 'Blog', url: '/blog' },
  { name: 'Contact', url: '/contact' },
];

const socialLinks = [
  { name: 'Instagram', url: 'https://instagram.com/alcovia', icon: 'instagram' as const },
  { name: 'LinkedIn', url: 'https://linkedin.com/company/alcovia', icon: 'linkedin' as const },
  { name: 'Twitter', url: 'https://twitter.com/alcovia', icon: 'twitter' as const },
  { name: 'YouTube', url: 'https://youtube.com/@alcovia', icon: 'youtube' as const },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animation
      const revealElements = contentRef.current?.querySelectorAll('.footer-reveal');
      if (revealElements) {
        gsap.set(revealElements, { y: 40, opacity: 0 });
        gsap.to(revealElements, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            once: true,
          },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubscribed(true);
    setEmail('');

    // Reset after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="relative bg-[#050505] text-white overflow-hidden"
    >
      {/* Subtle Pattern (White dots on dark bg) */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D2FF00]/50 to-transparent" />

      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Newsletter Section */}
        <div className="py-16 md:py-20 border-b border-white/10">
          <div className="footer-reveal max-w-2xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-[#D2FF00] text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-6 border border-white/5">
              Newsletter
            </span>
            <h3 className="text-3xl md:text-4xl font-display uppercase tracking-tight mb-4 text-white">
              Stay Ahead of the Curve
            </h3>
            <p className="text-white/60 mb-8 max-w-md mx-auto leading-relaxed">
              Get exclusive insights, program updates, and leadership tips delivered straight to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder:text-white/30 focus:outline-none focus:border-[#D2FF00]/50 focus:ring-2 focus:ring-[#D2FF00]/20 transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || isSubscribed}
                className={`px-8 py-4 rounded-full font-bold uppercase text-sm tracking-wider transition-all duration-300 flex items-center justify-center gap-2 min-w-[160px] ${
                  isSubscribed
                    ? 'bg-green-500 text-white'
                    : 'bg-[#D2FF00] text-black hover:bg-white hover:shadow-[0_0_20px_rgba(210,255,0,0.3)]'
                }`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : isSubscribed ? (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Subscribed!
                  </>
                ) : (
                  <>
                    Subscribe
                    <Icon name="arrowRight" size={16} />
                  </>
                )}
              </button>
            </form>

            <p className="text-xs text-white/30 mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Contact Info */}
          <div className="footer-reveal">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40 mb-6">
              Contact Us
            </h4>
            <ul className="space-y-6">
              <li>
                <a
                  href="tel:+919070606050"
                  className="group flex items-start gap-4 text-white/70 hover:text-white transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#D2FF00] transition-colors duration-300">
                    <Icon name="phone" size={18} className="text-white group-hover:text-black transition-colors duration-300" />
                  </div>
                  <div className="pt-1">
                    <span className="text-[10px] text-white/30 uppercase tracking-wider block mb-0.5">Call Us</span>
                    <p className="font-medium text-sm">+91 9070606050</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@alcovia.life"
                  className="group flex items-start gap-4 text-white/70 hover:text-white transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#D2FF00] transition-colors duration-300">
                    <Icon name="email" size={18} className="text-white group-hover:text-black transition-colors duration-300" />
                  </div>
                  <div className="pt-1">
                    <span className="text-[10px] text-white/30 uppercase tracking-wider block mb-0.5">Email Us</span>
                    <p className="font-medium text-sm">info@alcovia.life</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=WeWork+Two+Horizon+Centre+DLF+Phase+5+Gurugram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 text-white/70 hover:text-white transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#D2FF00] transition-colors duration-300 shrink-0">
                    <Icon name="location" size={18} className="text-white group-hover:text-black transition-colors duration-300" />
                  </div>
                  <div className="pt-1">
                    <span className="text-[10px] text-white/30 uppercase tracking-wider block mb-0.5">Visit Us</span>
                    <p className="font-medium text-sm leading-snug">
                      WeWork, Two Horizon Centre,<br />
                      DLF Phase 5, Gurugram
                    </p>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-reveal">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    className="group inline-flex items-center gap-2 text-white/60 hover:text-[#D2FF00] transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D2FF00] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo & Description - Center */}
          <div className="footer-reveal lg:col-span-1 flex flex-col items-center text-center order-first lg:order-none md:col-span-2 lg:col-span-1">
            {/* Logo - Inverted to White */}
            <a href="/" className="inline-block mb-8 group">
              <div className="relative">
                {/* brightness-0 invert forces the logo to be solid white */}
                <Image 
                  src={"/alcovia-logo.png"} 
                  alt="Alcovia Logo" 
                  width={140} 
                  height={50}
                  className="brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
                />
                {/* Hover glow behind logo */}
                <div className="absolute -inset-6 bg-[#D2FF00]/0 group-hover:bg-[#D2FF00]/10 rounded-3xl blur-2xl transition-all duration-500 -z-10" />
              </div>
            </a>

            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-8">
              Building the next generation of leaders through unprecedented learning experiences and meaningful mentorship.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.name}`}
                  className="group w-11 h-11 rounded-full bg-white/5 flex items-center justify-center transition-all duration-300 hover:bg-[#D2FF00] hover:scale-110"
                >
                  <Icon
                    name={social.icon}
                    size={18}
                    className="text-white/60 group-hover:text-black transition-colors duration-300"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Legal & Policies */}
          <div className="footer-reveal">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40 mb-6">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://alcovia.life/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D2FF00] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:translate-x-1 transition-transform">Terms & Conditions</span>
                </a>
              </li>
              <li>
                <a
                  href="https://alcovia.life/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D2FF00] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:translate-x-1 transition-transform">Privacy Policy</span>
                </a>
              </li>
              <li>
                <a
                  href="/cookie-policy"
                  className="group inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D2FF00] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:translate-x-1 transition-transform">Cookie Policy</span>
                </a>
              </li>
            </ul>

            {/* Trust Badge */}
            <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D2FF00] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Verified Secure</p>
                  <p className="text-sm font-medium text-white">Safe Platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-reveal py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright & Trademark */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-white/40">
              <p>© {currentYear} Alcovia. All rights reserved.</p>
              <span className="hidden sm:block opacity-30">•</span>
              <p className="flex items-center gap-1">
                Alcovia™ is a registered trademark
              </p>
            </div>

            {/* Made with love */}
            <p className="text-sm text-white/40 flex items-center gap-2">
              Made with
              <span className="inline-block animate-pulse text-[#D2FF00]">⚡</span>
              for future leaders
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-0.5 bg-gradient-to-r from-[#050505] via-[#D2FF00]/30 to-[#050505]" />
    </footer>
  );
}