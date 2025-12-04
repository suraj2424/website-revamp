// components/SocialsSection.tsx
'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { socialImages } from './socials/data';
import SocialCard from './socials/SocialCard';
import SocialLinks from './socials/SocialLinks';

gsap.registerPlugin(ScrollTrigger);

// Config outside component - computed once
const getConfig = () => {
  if (typeof window === 'undefined') return null;
  
  const width = window.innerWidth;
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  return {
    baseSpread: isMobile ? 30 : isTablet ? 40 : 60,
    wideSpread: isMobile ? 50 : isTablet ? 80 : 140,
    baseRotate: isMobile ? 5 : 6,
    wideRotate: isMobile ? 8 : 12,
    yOffset: isMobile ? 5 : 10,
    pushStrength: isMobile ? 20 : 40,
  };
};

// Title characters - computed once
const TITLE_CHARS = {
  top: "WHAT'S".split(''),
  bottom: 'HAPPENING'.split(''),
};

export default function SocialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const configRef = useRef(getConfig());

  const [isHoveringDeck, setIsHoveringDeck] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  // Memoized handlers
  const handleDeckEnter = useCallback(() => setIsHoveringDeck(true), []);
  
  const handleDeckLeave = useCallback(() => {
    setIsHoveringDeck(false);
    setHoveredCardIndex(null);
  }, []);

  const handleCardEnter = useCallback((index: number) => {
    setHoveredCardIndex(index);
  }, []);

  // Initial setup & entrance animation
  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);
    
    if (!section || cards.length === 0) return;

    // Update config on mount (for SSR)
    configRef.current = getConfig();

    // Set initial card states
    gsap.set(cards, { y: 150, opacity: 0, scale: 0.85 });
    gsap.set('.social-title-char', { yPercent: 100, opacity: 0 });

    const ctx = gsap.context(() => {
      // Single ScrollTrigger for all entrance animations
      ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();

          tl.to('.social-title-char', {
            yPercent: 0,
            opacity: 1,
            stagger: 0.03,
            duration: 0.6,
            ease: 'power3.out',
          }).to(
            cards,
            {
              y: 0,
              opacity: 1,
              scale: 1,
              stagger: 0.08,
              duration: 0.8,
              ease: 'power3.out',
            },
            '-=0.3'
          );
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Card physics animation
  useEffect(() => {
    const config = configRef.current;
    const cards = cardsRef.current;
    
    if (!config) return;

    const total = socialImages.length;
    const center = (total - 1) / 2;
    const currentSpread = isHoveringDeck ? config.wideSpread : config.baseSpread;
    const currentRotate = isHoveringDeck ? config.wideRotate : config.baseRotate;

    // Batch all card updates
    cards.forEach((card, index) => {
      if (!card) return;

      let x = (index - center) * currentSpread;
      let rotate = (index - center) * currentRotate;
      let y = Math.abs(index - center) * config.yOffset;
      let scale = 1;
      let zIndex = index + 1;
      let filter = isHoveringDeck
        ? 'grayscale(100%) brightness(1)'
        : 'grayscale(100%) brightness(0.7)';

      // Hovered card effects
      if (isHoveringDeck && hoveredCardIndex !== null) {
        const dist = index - hoveredCardIndex;

        if (dist === 0) {
          y = -60;
          scale = 1.12;
          rotate = 0;
          zIndex = 100;
          filter = 'grayscale(0%) brightness(1.1)';
        } else {
          x += (dist > 0 ? 1 : -1) * config.pushStrength;
          scale = 0.95;
        }
      }

      gsap.to(card, {
        x,
        y,
        rotate,
        scale,
        zIndex,
        filter,
        duration: 0.35,
        ease: hoveredCardIndex === index ? 'back.out(1.2)' : 'power2.out',
        overwrite: 'auto',
      });
    });
  }, [isHoveringDeck, hoveredCardIndex]);

  return (
    <section
      id="socials"
      ref={sectionRef}
      className="relative w-full min-h-[90vh] bg-[#050505] overflow-hidden flex flex-col items-center justify-center py-20"
    >
      {/* Background glow - simplified */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(210,255,0,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Header */}
      <header className="relative z-10 text-center mb-10 md:mb-16 px-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="social-title-char w-2 h-2 bg-[#D2FF00] rounded-full animate-pulse" />
          <span className="social-title-char text-[#D2FF00] text-xs font-bold tracking-[0.3em] uppercase">
            Social Feed
          </span>
        </div>

        <h2 className="text-white font-display text-5xl md:text-8xl uppercase tracking-tighter leading-[0.85]">
          <div className="flex justify-center gap-1 md:gap-2 flex-wrap">
            {TITLE_CHARS.top.map((char, i) => (
              <span key={`w-${i}`} className="social-title-char inline-block">
                {char}
              </span>
            ))}
          </div>
          <div className="flex justify-center gap-1 md:gap-2 text-[#D2FF00] flex-wrap">
            {TITLE_CHARS.bottom.map((char, i) => (
              <span key={`h-${i}`} className="social-title-char inline-block">
                {char}
              </span>
            ))}
          </div>
        </h2>
      </header>

      {/* Cards Deck */}
      <div
        className="relative w-full h-[350px] md:h-[500px] flex items-center justify-center z-20"
        onMouseEnter={handleDeckEnter}
        onMouseLeave={handleDeckLeave}
      >
        {socialImages.map((img, index) => (
          <SocialCard
            key={img.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            img={img}
            onMouseEnter={() => handleCardEnter(index)}
          />
        ))}
      </div>

      {/* Social Links */}
      <SocialLinks />
    </section>
  );
}