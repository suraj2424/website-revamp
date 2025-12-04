// components/offerings/OfferingsHeader.tsx
export default function OfferingsHeader() {
  return (
    <div className="offerings-header max-w-7xl mx-auto mb-10 md:mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-12 border-b border-white/10 pb-6 md:pb-8">
      
      {/* Left: Title */}
      <div>
        <span className="inline-block text-[#D2FF00] tracking-[0.2em] uppercase text-[10px] md:text-xs font-bold mb-2 md:mb-3">
          The Lifestyle
        </span>
        <h2 className="text-white font-display text-5xl sm:text-6xl md:text-7xl uppercase leading-[0.9] tracking-tight">
          Our <br className="hidden md:block" />
          <span className="text-stroke-lime">Offerings</span>
        </h2>
      </div>

      {/* Right: Description */}
      <p className="text-white/60 text-sm md:text-base leading-relaxed md:text-right max-w-md">
        Unprecedented learnings, failing regularly, and building with friends on a journey of self-discovery.
      </p>
    </div>
  );
}