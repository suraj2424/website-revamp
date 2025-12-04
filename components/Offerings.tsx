'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OFFERINGS_DATA } from './offerings/offerings-data';
import OfferingCard from './offerings/OfferingCard';
import OfferingsHeader from './offerings/OfferingsHeader';

gsap.registerPlugin(ScrollTrigger);

export default function Offerings() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Header Reveal
      gsap.to('.offerings-header', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // 2. Grid Items Reveal (FIXED)
      // We now target '.offering-wrapper' which is the element that is actually hidden
      ScrollTrigger.batch('.offering-wrapper', {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1, 
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            overwrite: true
          });
        },
        once: true
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="offerings" 
      className="relative min-h-screen bg-[#050505] py-24 px-4 md:px-8 overflow-hidden"
    >
      {/* Background Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />
      
      <OfferingsHeader />

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 auto-rows-[280px] md:auto-rows-[300px]">
        {OFFERINGS_DATA.map((item) => (
          // FIXED: Added 'offering-wrapper' class here so GSAP finds the invisible parent
          <div 
            key={item.id} 
            className={`offering-wrapper opacity-0 translate-y-12 ${item.span || 'md:col-span-1'}`}
          >
            <OfferingCard item={item} />
          </div>
        ))}
      </div>

    </section>
  );
}