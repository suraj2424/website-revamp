import { forwardRef } from 'react';

const HeroContent = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div 
      ref={ref} 
      // Added overflow-x-hidden to wrapper to prevent accidental scrollbars
      className="relative z-20 flex flex-col items-center justify-center h-full w-full min-h-[85dvh] px-4 sm:px-6 overflow-x-hidden"
    >
      <div className="flex flex-col items-center w-full max-w-7xl mx-auto">

        {/* Badge */}
        <div className="hero-anim-badge mb-6 md:mb-10 opacity-0 translate-y-10">
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-medium tracking-[0.2em] text-[#D2FF00] uppercase px-4 py-2 rounded-full border border-[#D2FF00]/30 bg-[#D2FF00]/5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-[#D2FF00] rounded-full animate-pulse" />
            Building Future Leaders
          </span>
        </div>

        {/* Main Heading - FIXED RESPONSIVENESS */}
        {/* Changed: 
            1. w-full to ensure centering 
            2. clamp() reduced to 11.5vw (7 chars * 11.5 = ~80vw, leaving room for padding) 
            3. Added max-w-full and break-words as safety nets 
        */}
        <div className="relative w-full flex justify-center py-2">
          <h1
            className="hero-anim-heading font-display text-white mix-blend-difference select-none uppercase leading-[0.9] tracking-tighter opacity-0 translate-y-[50px] scale-95 text-center w-full max-w-full break-words"
            style={{
              // Drastically reduced min-size to 2rem for tiny screens
              // Tuned vw to 11.5 to fit inside padding
              fontSize: 'clamp(2.5rem, 11.5vw, 10rem)', 
            }}
          >
            ALCOVIA
          </h1>
        </div>

        {/* Subheading */}
        <div className="hero-anim-sub mt-6 md:mt-10 max-w-[85vw] md:max-w-2xl text-center opacity-0 translate-y-10">
          <p className="text-sm sm:text-lg md:text-2xl font-light text-gray-300 leading-relaxed tracking-wide">
            Where{' '}
            <span className="text-[#D2FF00] font-medium whitespace-nowrap">unprecedented learning</span>
            {' '}meets{' '}
            <span className="text-white font-medium relative inline-block group whitespace-nowrap">
              extraordinary growth
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D2FF00] transition-all duration-500 group-hover:w-full" />
            </span>
          </p>
        </div>

        {/* CTA Button */}
        <div className="hero-anim-cta mt-10 md:mt-14 w-full flex justify-center opacity-0 translate-y-10 px-2">
          <button className="group relative w-full sm:w-auto px-8 py-4 bg-[#D2FF00] text-black font-bold text-xs md:text-sm tracking-[0.15em] uppercase rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Begin Journey
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
});

HeroContent.displayName = 'HeroContent';
export default HeroContent;