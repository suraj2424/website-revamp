// components/ToggleSection.tsx
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContentLayer from './toggle/ContentLayer';
import { schoolFeatures, outsideFeatures } from './toggle/data';

gsap.registerPlugin(ScrollTrigger);

type ToggleState = 'atSchool' | 'outsideSchool';

export default function ToggleSection() {
  const [activeState, setActiveState] = useState<ToggleState>('atSchool');

  const sectionRef = useRef<HTMLElement>(null);
  const schoolLayerRef = useRef<HTMLDivElement>(null);
  const outsideLayerRef = useRef<HTMLDivElement>(null);
  const toggleBgRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  // Initial setup + scroll reveal (runs once)
  useEffect(() => {
    const section = sectionRef.current;
    const outsideLayer = outsideLayerRef.current;
    const toggleBg = toggleBgRef.current;

    if (!section || !outsideLayer || !toggleBg) return;

    // Set initial states
    gsap.set(outsideLayer, { clipPath: 'inset(100% 0% 0% 0%)' });
    gsap.set(toggleBg, { x: '0%' });
    gsap.set('.toggle-title-reveal', { y: 40, opacity: 0 });

    const ctx = gsap.context(() => {
      // Scroll reveal - once only
      ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          gsap.to('.toggle-title-reveal', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Toggle animation (runs on state change)
  useEffect(() => {
    const outsideLayer = outsideLayerRef.current;
    const schoolLayer = schoolLayerRef.current;
    const toggleBg = toggleBgRef.current;

    if (!outsideLayer || !schoolLayer || !toggleBg) return;

    // Skip animation on first render
    if (!hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      return;
    }

    const isOutside = activeState === 'outsideSchool';
    const targetLayer = isOutside ? outsideLayer : schoolLayer;

    // Batch animations in timeline for better performance
    const tl = gsap.timeline({ defaults: { overwrite: true } });

    tl.to(outsideLayer, {
      clipPath: isOutside ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
      duration: 0.6,
      ease: 'power3.inOut',
    })
      .to(
        toggleBg,
        {
          x: isOutside ? '100%' : '0%',
          duration: 0.35,
          ease: 'power2.out',
        },
        0
      )
      .fromTo(
        targetLayer.querySelectorAll('.feature-card, .text-animate'),
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.25,
          stagger: 0.02,
          ease: 'power2.out',
        },
        0.25
      );

    return () => {
      tl.kill();
    };
  }, [activeState]);

  // Memoized handlers
  const setSchool = useCallback(() => setActiveState('atSchool'), []);
  const setOutside = useCallback(() => setActiveState('outsideSchool'), []);

  const isSchool = activeState === 'atSchool';
  const isOutside = activeState === 'outsideSchool';

  return (
    <section
      ref={sectionRef}
      id='toggle'
      className="relative min-h-screen bg-[#050505] py-12 md:py-20 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Header */}
      <div className="text-center mb-10 md:mb-12 relative z-30 px-4 w-full max-w-4xl mx-auto">
        <div className="overflow-hidden mb-4 flex justify-center">
          <span className="toggle-title-reveal inline-flex items-center gap-2 px-3 py-1.5 border border-[#D2FF00]/20 rounded-full bg-[#D2FF00]/5 text-[#D2FF00] tracking-[0.2em] uppercase text-[10px] md:text-xs font-bold">
            <span className="w-1.5 h-1.5 bg-[#D2FF00] rounded-full animate-pulse" />
            Dual Impact System
          </span>
        </div>
        <div className="overflow-hidden">
          <h2 className="toggle-title-reveal text-white font-display text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.9] tracking-tighter">
            Alcovia In{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D2FF00] to-white">
              Action
            </span>
          </h2>
        </div>
      </div>

      {/* Toggle Button */}
      <div className="relative z-40 mb-8 w-full max-w-[300px] md:max-w-md mx-auto px-4 md:px-0">
        <div className="relative bg-[#111] border border-white/10 p-1 rounded-full flex shadow-2xl">
          {/* Sliding background */}
          <div
            ref={toggleBgRef}
            className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] rounded-full will-change-transform"
            style={{ backgroundColor: isSchool ? '#262626' : '#D2FF00' }}
          />

          <button
            onClick={setSchool}
            className={`flex-1 relative z-10 py-3 text-[11px] md:text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
              isSchool ? 'text-white' : 'text-gray-500 hover:text-white'
            }`}
          >
            At School
          </button>

          <button
            onClick={setOutside}
            className={`flex-1 relative z-10 py-3 text-[11px] md:text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
              isOutside ? 'text-black' : 'text-gray-500 hover:text-white'
            }`}
          >
            Outside School
          </button>
        </div>
      </div>

      {/* Content Layers */}
      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-[#0A0A0A] grid">
          {/* Layer 1: At School (Base) */}
          <div className="col-start-1 row-start-1">
            <ContentLayer
              ref={schoolLayerRef}
              variant="dark"
              title={
                <>
                  Ace The <br />
                  <span className="text-[#D2FF00] italic font-serif">
                    Curriculum.
                  </span>
                </>
              }
              subtitle="How Alcovia helps students ace school through data-driven methodology."
              features={schoolFeatures}
            />
          </div>

          {/* Layer 2: Outside School (Overlay) */}
          <div className="col-start-1 row-start-1 z-10">
            <ContentLayer
              ref={outsideLayerRef}
              variant="lime"
              title={
                <>
                  Build Your <br />
                  <span className="text-white italic font-serif mix-blend-difference">
                    Legacy.
                  </span>
                </>
              }
              subtitle="How Alcovia fulfills its mission of building differentiation for each Alcovian."
              features={outsideFeatures}
              className="will-change-[clip-path]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}