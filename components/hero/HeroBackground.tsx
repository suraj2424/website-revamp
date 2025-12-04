// components/hero/HeroBackground.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroBackgroundProps {
  bgRef: React.RefObject<HTMLDivElement | null>;
}

export default function HeroBackground({ bgRef }: HeroBackgroundProps) {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    const orb1 = orb1Ref.current;
    const orb2 = orb2Ref.current;
    const bgElement = bgRef.current;
    
    if (!orb1 || !orb2 || !bgElement) return;

    // Create tweens and store references
    tweensRef.current = [
      gsap.to(orb1, {
        x: 50,
        y: 30,
        duration: 12,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      }),
      gsap.to(orb2, {
        x: -40,
        y: -25,
        duration: 15,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      }),
    ];

    // Pause animations when hero is not visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          tweensRef.current.forEach((tween) => {
            if (entry.isIntersecting) {
              tween.play();
            } else {
              tween.pause(); // ✅ STOP when not visible
            }
          });
        });
      },
      { threshold: 0 }
    );

    observer.observe(bgElement);

    return () => {
      observer.disconnect();
      tweensRef.current.forEach((tween) => tween.kill());
    };
  }, [bgRef]);

  return (
    <div
      ref={bgRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
    >
      {/* Base */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Static Gradient - No animation */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(210, 255, 0, 0.12) 0%, transparent 60%)',
        }}
      />

      {/* Orb 1 */}
      <div
        ref={orb1Ref}
        className="absolute top-[15%] left-[20%] w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(210, 255, 0, 0.2) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Orb 2 */}
      <div
        ref={orb2Ref}
        className="absolute bottom-[20%] right-[15%] w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(210, 255, 0, 0.15) 0%, transparent 60%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Simple grid - no noise texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />
    </div>
  );
}