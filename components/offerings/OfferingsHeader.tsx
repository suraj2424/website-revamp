export default function OfferingsHeader() {
  return (
    <div className="max-w-7xl mx-auto mb-10 md:mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-12 border-b border-white/10 pb-6 md:pb-8 offerings-header opacity-0 translate-y-8">
      
      {/* Left Side: Title */}
      <div className="w-full md:w-auto">
         <span className="inline-flex items-center gap-2 text-[#D2FF00] tracking-[0.2em] md:tracking-[0.3em] uppercase text-[10px] md:text-xs font-bold mb-2 md:mb-4">
          The Lifestyle
        </span>
        <h2 className="text-white font-display text-5xl sm:text-6xl md:text-7xl uppercase leading-[0.9] md:leading-[0.85] tracking-tight">
          Our <br className="hidden md:block" />
          <span className="text-transparent [-webkit-text-stroke:1px_#D2FF00] md:[-webkit-text-stroke:2px_#D2FF00]">
            Offerings
          </span>
        </h2>
      </div>

      {/* Right Side: Description */}
      <p className="text-white/60 text-sm md:text-base leading-relaxed text-left md:text-right max-w-md w-full md:w-auto">
         Unprecedented learnings, failing regularly, and building with friends on a journey of self-discovery.
      </p>
    </div>
  );
}