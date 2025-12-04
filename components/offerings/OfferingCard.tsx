// components/offerings/OfferingCard.tsx
import { memo } from 'react';

type OfferingCardProps = {
  item: {
    id: string;
    title: string;
    image: string;
    span?: string;
  };
};

const OfferingCard = memo(({ item }: OfferingCardProps) => {
  return (
    <article
      className={`offering-card group relative w-full h-full min-h-[280px] md:min-h-[320px] rounded-2xl overflow-hidden bg-[#050505] border border-white/8 hover:border-[#D2FF00]/50 transition-colors duration-300 ${item.span || 'md:col-span-1'}`}
    >
      {/* Image Layer */}
      <div className="absolute inset-0">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover scale-100 group-hover:scale-[1.04] transition-transform duration-500 ease-out"
        />
        {/* Darken for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* Subtle card glow on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute -inset-10 bg-[radial-gradient(circle_at_20%_0%,rgba(210,255,0,0.28),transparent_55%)] mix-blend-screen" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-7">
        {/* Top: ID + Arrow */}
        <div className="flex items-start justify-between gap-4">
          <span className="text-4xl md:text-5xl font-display font-black text-white/15 group-hover:text-[#D2FF00]/35 transition-colors duration-300">
            {item.id}
          </span>

          <div className="shrink-0">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/15 bg-black/30 flex items-center justify-center translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-[opacity,transform,border-color,background-color] duration-250">
              <svg
                width="13"
                height="13"
                viewBox="0 0 14 14"
                fill="none"
                className="text-white/70 group-hover:text-black transition-colors duration-250"
              >
                <path
                  d="M1 13L13 1M13 1H4M13 1V10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom: Title */}
        <div className="mt-4 md:mt-6">
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-white uppercase leading-snug">
            {item.title}
          </h3>
          <div className="mt-3 h-0.5 w-0 bg-[#D2FF00] transition-[width] duration-300 group-hover:w-16" />
        </div>
      </div>
    </article>
  );
});

OfferingCard.displayName = 'OfferingCard';
export default OfferingCard;