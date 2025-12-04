// components/Offerings.tsx
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
    const section = sectionRef.current;
    if (!section) return;

    // Set initial states with GSAP (not Tailwind)
    gsap.set('.offerings-header', { opacity: 0, y: 30 });
    gsap.set('.offering-card', { opacity: 0, y: 40 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      });

      tl.to('.offerings-header', {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
      }).to(
        '.offering-card',
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
        },
        '-=0.3'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="offerings"
      className="relative min-h-screen bg-[#050505] py-24 px-4 md:px-8"
    >
      <OfferingsHeader />

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 auto-rows-[280px] md:auto-rows-[300px]">
        {OFFERINGS_DATA.map((item) => (
          <div
            key={item.id}
            className={`offering-card ${item.span || ''}`}
          >
            <OfferingCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}