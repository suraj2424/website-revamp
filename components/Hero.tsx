'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroBackground from './hero/HeroBackground';
import HeroContent from './hero/HeroContent';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Selectors
      const heading = '.hero-anim-heading';
      const badge = '.hero-anim-badge';
      const sub = '.hero-anim-sub';
      const cta = '.hero-anim-cta';

      // ============================================
      // 1. INTRO ANIMATION (Enter Viewport)
      // ============================================
      const introTl = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      // Force initial visible state logic for the intro
      introTl
        .to(containerRef.current, { opacity: 1, duration: 0.1 })
        .to(badge, { opacity: 1, y: 0, duration: 0.8 }, 0.2)
        .to(heading, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power4.out" }, 0.3)
        .to(sub, { opacity: 1, y: 0, duration: 0.8 }, 0.6)
        .to(cta, { opacity: 1, y: 0, duration: 0.8 }, 0.8)
        .to(scrollIndicatorRef.current, { opacity: 1, y: 0, duration: 0.8 }, 1.0);


      // ============================================
      // 2. PARALLAX EFFECT (Background)
      // ============================================
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0
        }
      });

      // Content moves UP faster
      gsap.to(contentRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0
        }
      });


      // ============================================
      // 3. EXIT ANIMATION (The Fix)
      // ============================================
      
      // FIX: Use .fromTo() to explicitly define the "Start" state as fully visible (opacity: 1).
      // immediateRender: false ensures this doesn't run until the scroll actually happens.
      gsap.fromTo([heading, sub, cta], 
        { 
          opacity: 1, 
          scale: 1, 
          filter: 'blur(0px)' 
        },
        {
          opacity: 0,
          scale: 0.95,
          filter: 'blur(8px)',
          stagger: 0.05,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "100px top", // Start fading only after scrolling 100px down
            end: "60% top",
            scrub: true,
            immediateRender: false 
          }
        }
      );

      // FIX: Same logic for Scroll Indicator
      gsap.fromTo(scrollIndicatorRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: 20,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "10px top", // Start immediately upon scroll
            end: "150px top",
            scrub: true,
            immediateRender: false
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-[100dvh] min-h-[600px] w-full overflow-hidden bg-[#050505] opacity-0 invisible"
      style={{ visibility: 'visible' }}
    >
      
      {/* 1. Background Component */}
      <HeroBackground bgRef={bgRef} />

      {/* 2. Content Component */}
      <HeroContent ref={contentRef} />

      {/* 3. Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30 pointer-events-none opacity-0 translate-y-10"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-gray-500 font-medium opacity-80">
            Scroll
          </span>
          <div className="relative w-[18px] h-[28px] md:w-[20px] md:h-[32px] rounded-full border border-gray-600/50 flex items-start justify-center p-1">
            <div className="w-1 h-1.5 bg-[#D2FF00] rounded-full animate-bounce" />
          </div>
        </div>
      </div>

    </section>
  );
}