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

    const ctx = gsap.context(() => {
      const header = section.querySelector('.offerings-header');
      const cards = gsap.utils.toArray<HTMLElement>('.offering-card');

      // Initial state (scoped to this section)
      gsap.set(header, { opacity: 0, y: 24 });
      gsap.set(cards, { opacity: 0, y: 32 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
        defaults: { ease: 'power3.out' },
      });

      tl.to(header, {
        y: 0,
        opacity: 1,
        duration: 0.55,
      }).to(
        cards,
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
        },
        '-=0.25'
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