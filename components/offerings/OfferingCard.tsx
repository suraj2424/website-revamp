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
    <div
      className={`offering-card group relative rounded-2xl overflow-hidden bg-[#0A0A0A] w-full h-full min-h-[280px] md:min-h-[320px] border border-white/5 hover:border-[#D2FF00]/40 transition-colors duration-500 ${item.span || 'md:col-span-1'}`}
    >
      
      {/* 1. Image Layer */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale group-hover:grayscale-0 will-change-transform"
        />
        {/* Gradients for text readability */}
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
      </div>
      
      {/* 2. Content Layer */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">
        
        {/* Top Row: Number & Arrow */}
        <div className="flex justify-between items-start w-full">
          <span className="text-5xl md:text-6xl font-display font-black text-transparent stroke-text-white group-hover:stroke-text-lime transition-all duration-300 opacity-30 group-hover:opacity-100">
            {item.id}
          </span>
          
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:bg-[#D2FF00] group-hover:border-[#D2FF00] transition-all duration-300 translate-x-4 -translate-y-4 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 14 14" 
              fill="none" 
              className="text-white group-hover:text-black transition-colors"
            >
              <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Bottom Row: Title */}
        <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white uppercase leading-[0.95] drop-shadow-lg">
            {item.title}
          </h3>
          
          <div className="h-0.5 w-0 bg-[#D2FF00] mt-4 transition-all duration-500 ease-out group-hover:w-16" />
        </div>
      </div>

      <style jsx>{`
        .stroke-text-white {
          -webkit-text-stroke: 1px rgba(255,255,255,0.5);
        }
        .stroke-text-lime {
          -webkit-text-stroke: 0px transparent;
          color: #D2FF00;
        }
      `}</style>
    </div>
  );
});

OfferingCard.displayName = 'OfferingCard';
export default OfferingCard;