// components/hero/HeroContent.tsx
import { ArrowRight } from 'lucide-react';

export default function HeroContent() {
  return (
    <div className="flex flex-col items-center text-center max-w-5xl px-4 sm:px-0">
      {/* Main Heading */}
      <h1 className="hero-anim-heading font-black uppercase tracking-tight text-white leading-tight text-[2.2rem] sm:text-[2.6rem] md:text-[3.6rem] lg:text-[4.4rem] xl:text-[5rem]">
        Build{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D2FF00] to-white/50">
          Future
        </span>
        <br className="hidden xs:block" />
        <span className="inline-block mt-1 sm:mt-0">Leaders</span>
      </h1>

      {/* Subtext */}
      <p className="hero-anim-sub mt-4 sm:mt-5 md:mt-6 max-w-sm sm:max-w-md md:max-w-lg text-xs sm:text-sm md:text-base lg:text-lg text-white/65 font-light leading-relaxed">
        Fluidity, boldness, and interactivity. Revamping the digital experience
        for the next generation.
      </p>

      {/* CTA Button */}
      <div className="hero-anim-cta mt-6 sm:mt-7 md:mt-8">
        <button
          className="group inline-flex items-center gap-2 sm:gap-3 rounded-full bg-[#D2FF00] px-5 py-2.5 sm:px-7 sm:py-3.5 md:px-8 md:py-4 text-black font-semibold sm:font-bold uppercase tracking-wide text-[0.7rem] sm:text-xs md:text-sm hover:brightness-110 transition-transform duration-200 active:scale-95"
        >
          Start Engine
          <ArrowRight
            size={16}
            className="group-hover:translate-x-0.5 transition-transform duration-200"
          />
        </button>
      </div>
    </div>
  );
}