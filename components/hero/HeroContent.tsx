// components/hero/HeroContent.tsx
import { ArrowRight } from 'lucide-react';

export default function HeroContent() {
  return (
    <div className="flex flex-col items-center text-center max-w-5xl">
      {/* Main Heading */}
      <h1 className="hero-anim-heading text-5xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-[0.85]">
        Build{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D2FF00] to-white/50">
          Future
        </span>
        <br />
        Leaders
      </h1>

      {/* Subtext */}
      <p className="hero-anim-sub mt-6 md:mt-8 max-w-md text-base md:text-lg text-white/60 font-light leading-relaxed">
        Fluidity, boldness, and interactivity. Revamping the digital experience
        for the next generation.
      </p>

      {/* CTA Button */}
      <div className="hero-anim-cta mt-8 md:mt-10">
        <button className="group flex items-center gap-3 rounded-full bg-[#D2FF00] px-6 py-3 md:px-8 md:py-4 text-black font-bold uppercase tracking-wide text-sm hover:brightness-110 transition-all duration-200 active:scale-95">
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