// components/socials/SocialCard.tsx
import { forwardRef, memo } from 'react';

interface SocialCardProps {
  img: { src: string; title: string; tag: string };
  onMouseEnter: () => void;
}

const SocialCard = memo(
  forwardRef<HTMLDivElement, SocialCardProps>(({ img, onMouseEnter }, ref) => {
    return (
      <div
        ref={ref}
        onMouseEnter={onMouseEnter}
        className="absolute left-1/2 -translate-x-1/2 w-44 sm:w-52 md:w-64 lg:w-72 h-64 sm:h-72 md:h-96 bg-[#111] border border-white/10 rounded-2xl shadow-xl cursor-pointer origin-bottom"
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden group">
          {/* Image */}
          <img
            src={img.src}
            alt={img.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Content - Shows on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-[transform,opacity] duration-200">
            <p className="text-[#D2FF00] text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">
              {img.tag}
            </p>
            <div className="flex items-center justify-between">
              <h3 className="text-white font-bold uppercase text-sm md:text-base">
                {img.title}
              </h3>
              <div className="w-7 h-7 rounded-full bg-[#D2FF00] flex items-center justify-center flex-shrink-0">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-black"
                >
                  <path
                    d="M1 13L13 1M13 1H5M13 1V9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Hover Border */}
          <div className="absolute inset-0 rounded-2xl border-2 border-[#D2FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
        </div>
      </div>
    );
  })
);

SocialCard.displayName = 'SocialCard';
export default SocialCard;