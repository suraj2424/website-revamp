import { forwardRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface SocialCardProps {
  img: { src: string; title: string; tag: string };
  onMouseEnter: () => void;
  // No onMouseLeave here - handled by parent deck
}

const SocialCard = forwardRef<HTMLDivElement, SocialCardProps>(({ img, onMouseEnter }, ref) => {
  return (
    <div
      ref={ref}
      onMouseEnter={onMouseEnter}
      // Responsive Sizing & Centering (Negative margins = half of width)
      // Mobile: w-44 (176px) -> -ml-22
      // Small: w-52 (208px) -> -ml-26
      // Tablet: w-64 (256px) -> -ml-32
      // Desktop: w-72 (288px) -> -ml-36
      className="absolute left-1/2 w-44 -ml-22 sm:w-52 sm:-ml-26 md:w-64 md:-ml-32 lg:w-72 lg:-ml-36 h-64 sm:h-72 md:h-96 bg-[#111] border border-white/10 rounded-2xl shadow-2xl cursor-pointer origin-bottom will-change-transform pointer-events-auto"
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden group">
        <img 
          src={img.src} 
          alt={img.title} 
          className="w-full h-full object-cover select-none pointer-events-none" 
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#D2FF00] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">
                {img.tag}
              </p>
              <h3 className="text-white font-display text-sm md:text-base uppercase tracking-wide">
                {img.title}
              </h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#D2FF00] flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-black" />
            </div>
          </div>
        </div>

        {/* Hover Border */}
        <div className="absolute inset-0 border-2 border-[#D2FF00] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </div>
  );
});

SocialCard.displayName = 'SocialCard';
export default SocialCard;