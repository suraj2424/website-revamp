// components/Hero.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroBackground from './hero/HeroBackground';
import HeroContent from './hero/HeroContent';

gsap.registerPlugin(ScrollTrigger);

const SELECTORS = {
  heading: '.hero-anim-heading',
  sub: '.hero-anim-sub',
  cta: '.hero-anim-cta',
} as const;

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!container || !bg || !content || !scrollIndicator) return;

    const ctx = gsap.context(() => {
      gsap.set(container, { opacity: 1 });

      // Intro animation
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(
        SELECTORS.heading,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          SELECTORS.sub,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        )
        .fromTo(
          SELECTORS.cta,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        )
        .fromTo(
          scrollIndicator,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4 },
          '-=0.2'
        );

      // Scroll animation
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: ({ progress }) => {
          gsap.set(bg, { yPercent: progress * 15 });
          gsap.set(content, { yPercent: progress * -10 });

          if (progress > 0.15) {
            const fadeProgress = (progress - 0.15) / 0.35;
            const opacity = Math.max(0, 1 - fadeProgress);
            gsap.set([SELECTORS.heading, SELECTORS.sub, SELECTORS.cta], {
              opacity,
            });
          }

          gsap.set(scrollIndicator, {
            opacity: Math.max(0, 1 - progress * 8),
          });
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-dvh min-h-[600px] w-full overflow-hidden bg-[#050505]"
      style={{ opacity: 0 }}
    >
      <HeroBackground bgRef={bgRef} />
      
      {/* Content wrapper - properly centered */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-10 flex items-center justify-center pt-16 pb-24 px-6"
      >
        <HeroContent />
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-2">
          <div className="w-1 h-1.5 bg-[#D2FF00] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}