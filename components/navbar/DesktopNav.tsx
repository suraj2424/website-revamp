import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface DesktopNavProps {
  isOpen: boolean;
  isScrolled: boolean;
  toggleMenu: () => void;
}

export default function DesktopNav({ isOpen, isScrolled, toggleMenu }: DesktopNavProps) {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 transition-all duration-500 ease-out ${
        isScrolled ? 'py-3 bg-transparent' : 'py-5 md:py-6 bg-transparent'
      }`}
    >
      <div 
        className={`absolute inset-0 transition-opacity duration-500 -z-10 bg-gradient-to-b from-black/60 to-transparent pointer-events-none ${
           isScrolled ? 'opacity-100' : 'opacity-0' 
        }`} 
      />

      <div className="max-w-[1920px] mx-auto flex items-center justify-between">
        <Link href="/" className="relative z-110 group">
          <img
            src="/alcovia-logo.png"
            alt="Alcovia"
            className="h-8 md:h-10 w-auto object-contain brightness-0 invert transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <div className="flex items-center gap-3 md:gap-4 relative z-[110]">
          <Link
            href="#join"
            className="group relative flex items-center gap-2 bg-[#D2FF00] text-black px-4 md:px-6 py-2.5 md:py-3 rounded-full font-bold uppercase tracking-wider text-xs md:text-sm overflow-hidden hover:shadow-[0_0_30px_rgba(210,255,0,0.4)] transition-shadow duration-300"
          >
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <ShoppingBag size={16} strokeWidth={2.5} className="relative z-10" />
            <span className="relative z-10 hidden md:inline">Join Program</span>
            <span className="relative z-10 md:hidden">Join</span>
          </Link>

          <button
            onClick={toggleMenu}
            className={`w-11 h-11 md:w-12 md:h-12 border-2 rounded-full flex items-center justify-center transition-all duration-300 ${
              isOpen
                ? 'border-white/30 bg-white/10 text-white'
                : 'border-white/20 text-white hover:bg-[#D2FF00] hover:text-black hover:border-[#D2FF00]'
            }`}
          >
            <div className="relative w-6 h-6">
              <Menu size={22} strokeWidth={1.5} className={`absolute inset-0 m-auto transition-all duration-200 ${isOpen ? 'opacity-0 rotate-45 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
              <X size={22} strokeWidth={1.5} className={`absolute inset-0 m-auto transition-all duration-200 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-45 scale-0'}`} />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}