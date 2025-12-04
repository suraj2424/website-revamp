import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { quickLinks, socialLinks, legalLinks } from './footerData';

// --- Sub-Component: Contact Info ---
export function ContactColumn() {
  return (
    <div className="footer-reveal">
      <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40 mb-6">Contact Us</h4>
      <ul className="space-y-6">
        <li>
          <a href="tel:+919070606050" className="group flex items-start gap-4 text-white/70 hover:text-white transition-colors">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#D2FF00] transition-colors duration-300">
              <Phone size={18} className="text-white group-hover:text-black transition-colors duration-300" />
            </div>
            <div className="pt-1">
              <span className="text-[10px] text-white/30 uppercase tracking-wider block mb-0.5">Call Us</span>
              <p className="font-medium text-sm">+91 9070606050</p>
            </div>
          </a>
        </li>
        <li>
          <a href="mailto:info@alcovia.life" className="group flex items-start gap-4 text-white/70 hover:text-white transition-colors">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#D2FF00] transition-colors duration-300">
              <Mail size={18} className="text-white group-hover:text-black transition-colors duration-300" />
            </div>
            <div className="pt-1">
              <span className="text-[10px] text-white/30 uppercase tracking-wider block mb-0.5">Email Us</span>
              <p className="font-medium text-sm">info@alcovia.life</p>
            </div>
          </a>
        </li>
        <li>
          <a href="https://maps.google.com/?q=WeWork+Two+Horizon+Centre+DLF+Phase+5+Gurugram" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 text-white/70 hover:text-white transition-colors">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#D2FF00] transition-colors duration-300 shrink-0">
              <MapPin size={18} className="text-white group-hover:text-black transition-colors duration-300" />
            </div>
            <div className="pt-1">
              <span className="text-[10px] text-white/30 uppercase tracking-wider block mb-0.5">Visit Us</span>
              <p className="font-medium text-sm leading-snug">WeWork, Two Horizon Centre,<br />DLF Phase 5, Gurugram</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
}

// --- Sub-Component: Quick Links ---
export function QuickLinksColumn() {
  return (
    <div className="footer-reveal">
      <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40 mb-6">Quick Links</h4>
      <ul className="space-y-3">
        {quickLinks.map((link, idx) => (
          <li key={idx}>
            <Link href={link.url} className="group inline-flex items-center gap-2 text-white/60 hover:text-[#D2FF00] transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D2FF00] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Sub-Component: Branding & Socials ---
export function BrandingColumn() {
  return (
    <div className="footer-reveal lg:col-span-1 flex flex-col items-center text-center order-first lg:order-none md:col-span-2">
      <Link href="/" className="inline-block mb-8 group">
        <div className="relative">
          <Image 
            src="/alcovia-logo.png" 
            alt="Alcovia Logo" 
            width={140} 
            height={50}
            className="brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <div className="absolute -inset-6 bg-[#D2FF00]/0 group-hover:bg-[#D2FF00]/10 rounded-3xl blur-2xl transition-all duration-500 -z-10" />
        </div>
      </Link>

      <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-8">
        Building the next generation of leaders through unprecedented learning experiences and meaningful mentorship.
      </p>

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
            <social.icon size={18} className="text-white/60 group-hover:text-black transition-colors duration-300" />
          </a>
        ))}
      </div>
    </div>
  );
}

// --- Sub-Component: Legal & Trust ---
export function LegalColumn() {
  return (
    <div className="footer-reveal">
      <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40 mb-6">Legal</h4>
      <ul className="space-y-3">
        {legalLinks.map((link, idx) => (
          <li key={idx}>
            <Link href={link.url} className="group inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D2FF00] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#D2FF00] flex items-center justify-center shrink-0">
            <ShieldCheck size={20} className="text-black" />
          </div>
          <div>
            <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Verified Secure</p>
            <p className="text-sm font-medium text-white">Safe Platform</p>
          </div>
        </div>
      </div>
    </div>
  );
}