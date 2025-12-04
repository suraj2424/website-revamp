// components/offerings/OfferingsHeader.tsx
export default function OfferingsHeader() {
  return (
    <header className="offerings-header max-w-7xl mx-auto mb-10 md:mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-5 md:gap-10 border-b border-white/10 pb-6 md:pb-8 px-1 sm:px-0">
      {/* Left: Title */}
      <div className="w-full md:w-auto">
        <span className="inline-block text-[#D2FF00] tracking-[0.22em] md:tracking-[0.28em] uppercase text-[10px] sm:text-[11px] md:text-xs font-bold mb-2 md:mb-3">
          The Lifestyle
        </span>

        <h2 className="text-white font-display uppercase tracking-tight leading-[0.92] text-[2rem] sm:text-[2.4rem] md:text-[3rem] lg:text-[3.5rem]">
          Our
          <br className="hidden sm:block" />
          <span className="block sm:inline text-stroke-lime mt-1 sm:mt-0">
            Offerings
          </span>
        </h2>
      </div>
    </header>
  );
}