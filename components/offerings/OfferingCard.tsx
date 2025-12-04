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
    <div className="group relative rounded-2xl overflow-hidden bg-[#0A0A0A] w-full h-full border border-white/5 hover:border-[#D2FF00]/30 transition-[border-color] duration-300">
      
      {/* Image Layer - Simplified */}
      <div className="absolute inset-0">
        <img 
          src={item.image} 
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 opacity-60 group-hover:opacity-80"
        />
        {/* Single gradient overlay - not multiple */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>
      
      {/* Content Layer */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">
        
        {/* Top: Number */}
        <span className="text-5xl md:text-6xl font-display font-black text-white/10 group-hover:text-[#D2FF00]/20 transition-colors duration-300">
          {item.id}
        </span>

        {/* Bottom: Title */}
        <div>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white uppercase leading-tight">
            {item.title}
          </h3>
          <div className="h-0.5 w-0 bg-[#D2FF00] mt-3 transition-[width] duration-300 group-hover:w-12" />
        </div>
      </div>

      {/* Hover Arrow - Simple */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
          <path 
            d="M1 13L13 1M13 1H4M13 1V10" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
});

OfferingCard.displayName = 'OfferingCard';
export default OfferingCard;