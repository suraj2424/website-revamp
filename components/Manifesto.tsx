// components/Manifesto.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MANIFESTO_DATA = [
  { text: 'UNPRECEDENTED LEARNINGS', highlight: true },
  { text: ', FAILING REGULARLY, BUILDING WITH FRIENDS, WHILE BEING ON A JOURNEY OF ' },
  { text: 'SELF DISCOVERY', highlight: true },
  { text: '. GET ON A ' },
  { text: 'LEGACY BUILDING JOURNEY', highlight: true, underline: true },
  { text: ' TODAY, TO BUILD THE ' },
  { text: 'FUTURE OF TOMORROW', opacity: 'text-white/40' },
  { text: '.', highlight: true },
];

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('.man-word');
      const blocks = gsap.utils.toArray<HTMLElement>('.man-block');

      // Initial state
      gsap.set('.man-label', { y: 16, opacity: 0 });
      gsap.set(words, { opacity: 0 });
      gsap.set(blocks, { scaleX: 0, transformOrigin: 'left center' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
        defaults: { ease: 'power2.out' },
      });

      // Label in
      tl.to('.man-label', {
        y: 0,
        opacity: 1,
        duration: 0.45,
      });

      // Word wipe + reveal
      tl.add(() => {
        gsap.set(words, { opacity: 1 });
      }, '>-0.1')
        .to(
          blocks,
          {
            scaleX: 1,
            duration: 0.18,
            stagger: 0.012,
            ease: 'power1.out',
          },
          '<'
        )
        .to(blocks, {
          scaleX: 0,
          transformOrigin: 'right center',
          duration: 0.18,
          stagger: 0.012,
          ease: 'power1.in',
        });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative min-h-[80vh] flex flex-col items-center justify-center bg-[#050505] py-20 md:py-24 px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(210,255,0,0.05) 0%, transparent 60%)',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[18vw] font-display font-black tracking-tighter text-white/5 opacity-[0.07] select-none">
            ALCOVIA
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6">
        {/* Label */}
        <div className="man-label text-center mb-8 md:mb-12">
          <span className="inline-flex items-center gap-2 text-[#D2FF00] tracking-[0.28em] uppercase text-[10px] sm:text-xs font-bold px-4 py-2 border border-[#D2FF00]/25 rounded-full bg-[#D2FF00]/5">
            <span className="w-1.5 h-1.5 bg-[#D2FF00] rounded-full" />
            THE MISSION
          </span>
        </div>

        {/* Text Block */}
        <div
          className="flex flex-wrap justify-center text-center"
          style={{
            // Slightly larger, still responsive
            fontSize: 'clamp(1.9rem, 5vw, 3.8rem)',
            lineHeight: 1.18,
          }}
        >
          {MANIFESTO_DATA.map((item, groupIndex) => (
            <span key={groupIndex} className="contents">
              {item.text.split(' ').map((word, wordIndex) => {
                if (!word) {
                  return (
                    <span
                      key={`s-${groupIndex}-${wordIndex}`}
                      className="inline-block w-[0.25em]"
                    />
                  );
                }

                const isHighlight = item.highlight;

                const baseClasses =
                  'man-word relative z-10 block uppercase tracking-tight';

                const textClasses = isHighlight
                  ? `${baseClasses} text-[#D2FF00] font-medium font-serif italic`
                  : `${baseClasses} font-display font-bold ${item.opacity || 'text-white'}`;

                const underlineClasses = item.underline
                  ? 'border-b border-[#D2FF00] md:border-b-2'
                  : '';

                return (
                  <span
                    key={`w-${groupIndex}-${wordIndex}`}
                    className={`relative inline-block mx-[0.14em] mb-[0.15em] ${underlineClasses}`}
                  >
                    <span className={textClasses}>{word}</span>
                    <span className="man-block absolute inset-0 bg-[#D2FF00]" />
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