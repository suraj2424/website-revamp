// components/navbar/FullScreenMenu.tsx
import { ArrowRight } from 'lucide-react';
import { menuLinks } from './menuData';

interface FullScreenMenuProps {
  isOpen: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  bgTextRef: React.RefObject<HTMLSpanElement | null>;
  footerRef: React.RefObject<HTMLDivElement | null>;
  setMenuItemRef: (index: number) => (el: HTMLAnchorElement | null) => void;
  handleLinkClick: (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

// Computed once outside component
const CURRENT_YEAR = new Date().getFullYear();

export default function FullScreenMenu({
  isOpen,
  containerRef,
  bgTextRef,
  footerRef,
  setMenuItemRef,
  handleLinkClick,
}: FullScreenMenuProps) {
  return (
    <div
      ref={containerRef}
      className="invisible opacity-0 fixed inset-0 z-[90] bg-[#050505] flex flex-col overflow-hidden"
      aria-hidden={!isOpen}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(210,255,0,0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          ref={bgTextRef}
          className="text-[18vw] font-display font-black text-white uppercase select-none opacity-[0.03]"
        >
          Menu
        </span>
      </div>

      {/* Content */}
      <div className="relative flex flex-col flex-1 min-h-0 pt-16 md:pt-20">
        {/* Links */}
        <div className="flex-1 min-h-0 overflow-y-auto px-6 md:px-12">
          <nav className="w-full max-w-4xl mx-auto flex flex-col">
            {menuLinks.map((item, index) => (
              <a
                key={item.title}
                ref={setMenuItemRef(index)}
                href={item.href}
                onClick={handleLinkClick(item.href)}
                className="group flex items-center py-4 border-b border-white/10 hover:border-[#D2FF00]/50 transition-colors duration-200"
              >
                <span className="w-10 text-xs md:text-sm font-display text-white/30 group-hover:text-[#D2FF00] transition-colors duration-200">
                  0{index + 1}
                </span>

                <span className="flex-1 font-display font-bold text-white uppercase tracking-tight group-hover:text-[#D2FF00] group-hover:translate-x-2 transition-all duration-200 truncate text-[1.4rem] sm:text-[4vw] lg:text-[2.8rem] leading-tight">
                  {item.title}
                </span>

                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#D2FF00] group-hover:border-[#D2FF00] transition-colors duration-200 ml-4">
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
          className="px-6 md:px-12 py-4 md:py-6 border-t border-white/10 shrink-0 bg-[#050505]"
        >
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs md:text-sm">
            <div className="flex items-center gap-4">
              <a
                href="mailto:info@alcovia.life"
                className="text-white/50 hover:text-[#D2FF00] transition-colors duration-200"
              >
                info@alcovia.life
              </a>
              <a
                href="tel:+919070606050"
                className="text-white/50 hover:text-[#D2FF00] transition-colors duration-200"
              >
                +91 9070606050
              </a>
            </div>

            <p className="text-[10px] md:text-xs text-white/30 uppercase tracking-widest">
              © {CURRENT_YEAR} Alcovia
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}