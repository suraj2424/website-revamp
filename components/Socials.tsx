// components/SocialsSection.tsx
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { socialImages } from './socials/data';
import SocialCard from './socials/SocialCard';
import SocialLinks from './socials/SocialLinks';

gsap.registerPlugin(ScrollTrigger);

export default function SocialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const [isHoveringDeck, setIsHoveringDeck] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  
  // Ref to track the last hovered card (prevents reset when moving between cards)
  const lastHoveredRef = useRef<number | null>(null);

  // --- HANDLERS ---
  const handleDeckEnter = useCallback(() => {
    setIsHoveringDeck(true);
  }, []);

  const handleDeckLeave = useCallback(() => {
    setIsHoveringDeck(false);
    setHoveredCardIndex(null);
    lastHoveredRef.current = null;
  }, []);

  const handleCardEnter = useCallback((index: number) => {
    lastHoveredRef.current = index;
    setHoveredCardIndex(index);
  }, []);

  // KEY FIX: Don't reset to null immediately - check if we're still in deck
  const handleCardLeave = useCallback(() => {
    // Small delay to allow moving to another card
    setTimeout(() => {
      // Only reset if no new card was hovered
      if (lastHoveredRef.current === hoveredCardIndex) {
        // Don't reset - let deck leave handle full reset
      }
    }, 50);
  }, [hoveredCardIndex]);

  // --- 1. INITIAL SETUP & ENTRANCE ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (card) gsap.set(card, { y: 200, opacity: 0, scale: 0.8 });
      });

      gsap.from('.social-title-char', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        yPercent: 100,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power4.out'
      });

      gsap.to(cardsRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // --- 2. PHYSICS ENGINE ---
  useEffect(() => {
    const total = socialImages.length;
    const center = (total - 1) / 2;
    
    // Responsive config
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const isTablet = typeof window !== 'undefined' && window.innerWidth >= 640 && window.innerWidth < 1024;

    const config = {
      baseSpread: isMobile ? 30 : isTablet ? 40 : 60,
      wideSpread: isMobile ? 50 : isTablet ? 80 : 140,
      baseRotate: isMobile ? 5 : 6,
      wideRotate: isMobile ? 8 : 12,
      yOffset: isMobile ? 5 : 10,
      pushStrength: isMobile ? 20 : 40
    };

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const currentSpread = isHoveringDeck ? config.wideSpread : config.baseSpread;
      const currentRotate = isHoveringDeck ? config.wideRotate : config.baseRotate;

      let targetX = (index - center) * currentSpread;
      let targetR = (index - center) * currentRotate;
      let targetY = Math.abs(index - center) * config.yOffset;
      let targetScale = 1;
      let targetZ = index + 1;
      let targetFilter = isHoveringDeck ? 'grayscale(100%) brightness(1)' : 'grayscale(100%) brightness(0.7)';

      // Only apply card-specific hover effects if deck is being hovered
      if (isHoveringDeck && hoveredCardIndex !== null) {
        const dist = index - hoveredCardIndex;

        if (dist === 0) {
          targetY = -70;
          targetScale = 1.15;
          targetR = 0;
          targetZ = 100;
          targetFilter = 'grayscale(0%) brightness(1.1)';
        } else {
          const pushDir = dist > 0 ? 1 : -1;
          targetX += pushDir * config.pushStrength;
          targetScale = 0.95;
        }
      }

      gsap.to(card, {
        x: targetX,
        y: targetY,
        rotate: targetR,
        scale: targetScale,
        zIndex: targetZ,
        filter: targetFilter,
        duration: 0.4,
        ease: hoveredCardIndex === index ? 'back.out(1.5)' : 'power3.out',
        overwrite: 'auto'
      });
    });
  }, [isHoveringDeck, hoveredCardIndex]);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-[90vh] bg-[#050505] overflow-hidden flex flex-col items-center justify-center py-20"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#D2FF00] rounded-full blur-[400px] opacity-[0.03] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center mb-10 md:mb-16 px-4">
        <div className="flex items-center justify-center gap-3 mb-4 overflow-hidden">
          <span className="social-title-char w-2 h-2 bg-[#D2FF00] rounded-full animate-pulse" />
          <span className="social-title-char text-[#D2FF00] text-xs font-bold tracking-[0.3em] uppercase">Social Feed</span>
        </div>
        
        <h2 className="text-white font-display text-5xl md:text-8xl uppercase tracking-tighter leading-[0.85] overflow-hidden">
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            {"WHAT'S".split('').map((char, i) => (
              <span key={`w-${i}`} className="social-title-char inline-block">{char}</span>
            ))}
          </div>
          <div className="flex justify-center gap-2 md:gap-4 text-[#D2FF00] flex-wrap">
            {"HAPPENING".split('').map((char, i) => (
              <span key={`h-${i}`} className="social-title-char inline-block">{char}</span>
            ))}
          </div>
        </h2>
      </div>

      {/* Cards Deck Container */}
      <div 
        className="relative w-full h-[350px] md:h-[500px] flex items-center justify-center perspective-1000 z-20"
        onMouseEnter={handleDeckEnter}
        onMouseLeave={handleDeckLeave}
      >
        {socialImages.map((img, index) => (
          <SocialCard
            key={img.id}
            ref={(el) => { cardsRef.current[index] = el; }}
            img={img}
            onMouseEnter={() => handleCardEnter(index)}
            // No onMouseLeave on individual cards - deck handles reset
          />
        ))}
      </div>

      {/* Bottom Links */}
      <SocialLinks />
    </section>
  );
}