'use client';

import { useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initialize clip-path for the top layer
      gsap.set(outsideLayerRef.current, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(toggleBgRef.current, { x: "0%" });
      
      // Optional: Add scroll reveal for the title
      gsap.from('.toggle-title-reveal', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%'
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const isOutside = activeState === 'outsideSchool';
    const targetLayer = isOutside ? outsideLayerRef.current : schoolLayerRef.current;
    
    gsap.to(outsideLayerRef.current, {
      clipPath: isOutside ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
      duration: 0.7,
      ease: "power3.inOut",
      overwrite: true
    });

    gsap.to(toggleBgRef.current, {
      x: isOutside ? "100%" : "0%",
      duration: 0.4,
      ease: "power2.out",
      overwrite: true
    });

    if (targetLayer) {
      const elements = targetLayer.querySelectorAll('.feature-card, .text-animate');
      gsap.fromTo(elements,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.03, ease: "power2.out", delay: 0.2 }
      );
    }
  }, [activeState]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#050505] py-12 md:py-20 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      {/* --- ADDED HEADER HERE --- */}
      <div className="text-center mb-10 md:mb-12 relative z-30 px-4 w-full max-w-4xl mx-auto">
        <div className="overflow-hidden mb-4 flex justify-center">
          <span className="toggle-title-reveal inline-flex items-center gap-2 px-3 py-1.5 border border-[#D2FF00]/20 rounded-full bg-[#D2FF00]/5 text-[#D2FF00] tracking-[0.2em] uppercase text-[10px] md:text-xs font-bold">
            <span className="w-1.5 h-1.5 bg-[#D2FF00] rounded-full animate-pulse" />
            Dual Impact System
          </span>
        </div>
        <div className="overflow-hidden">
          <h2 className="toggle-title-reveal text-white font-display text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.9] tracking-tighter">
            Alcovia In <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D2FF00] to-[#ffffff]">Action</span>
          </h2>
        </div>
      </div>

      {/* Toggle Button */}
      <div className="relative z-40 mb-8 w-full max-w-[300px] md:max-w-md mx-auto px-4 md:px-0">
        <div className="relative bg-[#111] border border-white/10 p-1 rounded-full flex shadow-2xl backdrop-blur-sm">
          <div
            ref={toggleBgRef}
            className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] rounded-full z-0 will-change-transform"
            style={{
              background: activeState === 'atSchool' ? '#262626' : '#D2FF00',
              transition: 'background-color 0.3s ease'
            }}
          />
          <button onClick={() => setActiveState('atSchool')} className={`flex-1 relative z-10 py-3 text-[11px] md:text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${activeState === 'atSchool' ? 'text-white' : 'text-gray-500 hover:text-white'}`}>At School</button>
          <button onClick={() => setActiveState('outsideSchool')} className={`flex-1 relative z-10 py-3 text-[11px] md:text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${activeState === 'outsideSchool' ? 'text-black' : 'text-gray-500 hover:text-white'}`}>Outside School</button>
        </div>
      </div>

      {/* 
        MAIN CONTENT CONTAINER 
        Grid Stack Trick: Both layers occupy 'col-start-1 row-start-1'.
        The container height automatically collapses to fit the content.
      */}
      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 perspective-1000">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-[#0A0A0A] grid grid-cols-1">
          
          {/* Layer 1: At School (Bottom Stack) */}
          <div className="col-start-1 row-start-1 w-full h-full">
            <ContentLayer
              ref={schoolLayerRef}
              variant="dark"
              title={<>Ace The <br /><span className="text-[#D2FF00] italic font-serif">Curriculum.</span></>}
              subtitle="How Alcovia helps students ace school through data-driven methodology."
              features={schoolFeatures}
            />
          </div>

          {/* Layer 2: Outside School (Top Stack - Masked) */}
          <div className="col-start-1 row-start-1 w-full h-full z-10 pointer-events-none">
             {/* 
                pointer-events-auto is needed on the child to ensure clicks work when this layer is visible.
                The wrapper is pointer-events-none to prevent it from blocking the layer below when hidden 
                (though clip-path usually handles this, it's a safety measure).
             */}
            <ContentLayer
              ref={outsideLayerRef}
              variant="lime"
              title={<>Build Your <br /><span className="text-white italic font-serif mix-blend-difference">Legacy.</span></>}
              subtitle="How Alcovia fulfills its mission of building differentiation for each Alcovian."
              features={outsideFeatures}
              className="will-change-transform pointer-events-auto" 
            />
          </div>

        </div>
      </div>
    </section>
  );
}