'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Data Structure
const MANIFESTO_DATA = [
  { text: "Unprecedented Learnings", highlight: true },
  { text: ", Failing regularly, building with friends, while being on a journey of " },
  { text: "self discovery", highlight: true },
  { text: ". Get on a " },
  { text: "legacy building journey", highlight: true, underline: true },
  { text: " today, to build the " },
  { text: "future of tomorrow", opacity: "text-white/40" },
  { text: ".", highlight: true },
];

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Selectors
      const wrappers = gsap.utils.toArray('.word-wrapper') as HTMLElement[];
      const label = '.manifesto-label';

      // 0. Initial Setup
      // Hide text, Set block to start from left
      gsap.set('.word-text', { opacity: 0 });
      gsap.set('.word-block', { scaleX: 0, transformOrigin: "left center" });

      // 1. Label Reveal
      gsap.to(label, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        }
      });

      // 2. LEFT-TO-RIGHT WIPE REVEAL
      // We use 'batch' to trigger elements as they enter the viewport
      ScrollTrigger.batch(wrappers, {
        start: "top 90%", // Start immediately when entering viewport
        onEnter: (batch) => {
          const tl = gsap.timeline();
          
          // Step 1: Block grows from Left -> Right (Covering space)
          tl.to(batch.map(w => (w as HTMLElement).querySelector('.word-block')), {
            scaleX: 1,
            transformOrigin: "left center",
            duration: 0.25,
            ease: "power2.inOut",
            stagger: 0.03
          })
          
          // Step 2: Text turns visible (Hidden behind block)
          .set(batch.map(w => (w as HTMLElement).querySelector('.word-text')), {
            opacity: 1
          })
          
          // Step 3: Block shrinks Left -> Right (Revealing text)
          .to(batch.map(w => (w as HTMLElement).querySelector('.word-block')), {
            scaleX: 0,
            transformOrigin: "right center", // Switch origin to right
            duration: 0.25,
            ease: "power2.inOut",
            stagger: 0.03
          });
        },
        // Ensure it stays visible once revealed
        once: true 
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative min-h-[90vh] flex flex-col items-center justify-center bg-[#050505] py-24 px-4 overflow-hidden"
    >
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Noise */}
        <div className="absolute inset-0 z-20 opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#D2FF00] rounded-full blur-[250px] opacity-[0.03] z-0" />
        
        {/* Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0">
           <span className="text-[18vw] font-display font-black text-white/[0.02] select-none tracking-tighter">
              ALCOVIA
           </span>
        </div>
      </div>
      
      {/* --- CONTENT --- */}
      <div className="max-w-7xl w-full mx-auto relative z-10 px-4">
        
        {/* Label */}
        <div className="manifesto-label text-center mb-12 md:mb-20 overflow-hidden opacity-0 translate-y-10">
          <span className="inline-block text-[#D2FF00] tracking-[0.3em] uppercase text-xs font-bold px-4 py-2 border border-[#D2FF00]/20 rounded-full bg-[#D2FF00]/5 backdrop-blur-sm">
            The Mission
          </span>
        </div>

        {/* Text Block */}
        <div
          className="flex flex-wrap justify-center text-center leading-[1.15]"
          style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6.5rem)' }}
        >
          {MANIFESTO_DATA.map((item, groupIndex) => (
            <span key={groupIndex} className="contents">
              {item.text.split(" ").map((word, wordIndex) => {
                if (word === "") return <span key={`space-${groupIndex}-${wordIndex}`} className="w-[0.3em] inline-block" />;

                const isHighlight = item.highlight;
                
                // Styles
                const fontClasses = isHighlight
                  ? "font-serif italic text-[#D2FF00] font-light tracking-normal"
                  : `font-display font-bold uppercase tracking-tighter ${item.opacity || 'text-white'}`;

                const underlineClasses = item.underline
                  ? "border-b-2 md:border-b-[5px] border-[#D2FF00]"
                  : "";

                return (
                  <span
                    key={`word-${groupIndex}-${wordIndex}`}
                    className={`word-wrapper relative inline-block mr-[0.25em] align-top overflow-hidden ${underlineClasses}`}
                  >
                    {/* Layer 1: Text */}
                    <span className={`word-text block ${fontClasses} opacity-0`}>
                      {word}
                    </span>

                    {/* Layer 2: Neon Block Overlay */}
                    <span 
                      className="word-block absolute inset-0 bg-[#D2FF00] z-10 will-change-transform"
                    />
                  </span>
                );
              })}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}