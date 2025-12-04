// components/Manifesto.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray('.word-wrapper') as HTMLElement[];
      const label = '.manifesto-label';

      // Initial state
      gsap.set('.word-text', { opacity: 0 });
      gsap.set('.word-block', { scaleX: 0, transformOrigin: 'left center' });

      // Label - simple fade
      gsap.fromTo(label,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          }
        }
      );

      // Words reveal - triggered once when section enters
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;

          // Animate all words with stagger
          const texts = words.map(w => w.querySelector('.word-text'));
          const blocks = words.map(w => w.querySelector('.word-block'));

          gsap.timeline()
            // Block expands left to right
            .to(blocks, {
              scaleX: 1,
              duration: 0.2,
              ease: 'power1.inOut',
              stagger: 0.02,
            })
            // Text appears instantly
            .set(texts, { opacity: 1 })
            // Block shrinks right to left
            .to(blocks, {
              scaleX: 0,
              transformOrigin: 'right center',
              duration: 0.2,
              ease: 'power1.inOut',
              stagger: 0.02,
            });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative min-h-[85vh] flex flex-col items-center justify-center bg-[#050505] py-20 md:py-24 px-4 overflow-hidden"
    >
      {/* Background - Simplified */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Single gradient glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(210, 255, 0, 0.04) 0%, transparent 60%)',
          }}
        />
        
        {/* Watermark - Using CSS opacity */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center select-none">
          <span 
            className="text-[20vw] font-display font-black tracking-tighter"
            style={{ color: 'rgba(255, 255, 255, 0.015)' }}
          >
            ALCOVIA
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-6xl w-full mx-auto relative z-10 px-4 sm:px-6">
        
        {/* Label */}
        <div 
          className="manifesto-label text-center mb-10 md:mb-16"
          style={{ opacity: 0 }}
        >
          <span className="inline-flex items-center gap-2 text-[#D2FF00] tracking-[0.2em] uppercase text-[10px] sm:text-xs font-bold px-4 py-2 border border-[#D2FF00]/20 rounded-full bg-[#D2FF00]/5">
            <span className="w-1.5 h-1.5 bg-[#D2FF00] rounded-full" />
            The Mission
          </span>
        </div>

        {/* Text Block */}
        <div
          className="flex flex-wrap justify-center text-center"
          style={{ 
            fontSize: 'clamp(1.75rem, 5.5vw, 5rem)',
            lineHeight: 1.15,
          }}
        >
          {MANIFESTO_DATA.map((item, groupIndex) => (
            <span key={groupIndex} className="contents">
              {item.text.split(' ').map((word, wordIndex) => {
                if (word === '') {
                  return <span key={`s-${groupIndex}-${wordIndex}`} className="w-[0.25em]" />;
                }

                const isHighlight = item.highlight;
                
                const fontClasses = isHighlight
                  ? 'font-serif italic text-[#D2FF00] font-light'
                  : `font-display font-bold uppercase tracking-tight ${item.opacity || 'text-white'}`;

                const underlineClasses = item.underline
                  ? 'border-b-2 md:border-b-4 border-[#D2FF00]'
                  : '';

                return (
                  <span
                    key={`w-${groupIndex}-${wordIndex}`}
                    className={`word-wrapper relative inline-block mx-[0.1em] overflow-hidden ${underlineClasses}`}
                  >
                    <span className={`word-text block ${fontClasses}`} style={{ opacity: 0 }}>
                      {word}
                    </span>
                    <span className="word-block absolute inset-0 bg-[#D2FF00]" />
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