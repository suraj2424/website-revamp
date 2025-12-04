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
  const coreGlowRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    const bgElement = bgRef.current;
    const orb1 = orb1Ref.current;
    const orb2 = orb2Ref.current;
    const coreGlow = coreGlowRef.current;
    const sweep = sweepRef.current;

    if (!bgElement || !orb1 || !orb2 || !coreGlow || !sweep) return;

    let observer: IntersectionObserver | undefined;

    const ctx = gsap.context(() => {
      // Core glow breathing
      const coreTween = gsap.to(coreGlow, {
        scale: 1.08,
        opacity: 0.22,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Orbs drifting
      const orbTween1 = gsap.to(orb1, {
        x: 60,
        y: 40,
        duration: 16,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      const orbTween2 = gsap.to(orb2, {
        x: -70,
        y: -30,
        duration: 18,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Soft diagonal sweep
      const sweepTween = gsap.to(sweep, {
        xPercent: 20,
        duration: 10,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      tweensRef.current = [coreTween, orbTween1, orbTween2, sweepTween];

      // Pause/resume based on visibility
      observer = new IntersectionObserver(
        (entries) => {
          const isVisible = entries.some((entry) => entry.isIntersecting);
          tweensRef.current.forEach((tween) => {
            if (isVisible) tween.resume();
            else tween.pause();
          });
        },
        { threshold: 0 }
      );

      observer.observe(bgElement);
    }, bgElement);

    return () => {
      // Kill tweens & observer in one place
      tweensRef.current.forEach((tween) => tween.kill());
      observer?.disconnect();
      ctx.revert();
    };
  }, []); // no deps → runs only once on mount

  return (
    <div
      ref={bgRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden"
    >
      {/* Base */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.9) 100%)',
        }}
      />

      {/* Core glow */}
      <div
        ref={coreGlowRef}
        className="absolute top-1/2 left-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(210,255,0,0.25) 0%, rgba(210,255,0,0.08) 40%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: 0.18,
          transformOrigin: 'center',
        }}
      />

      {/* Orb 1 – top left */}
      <div
        ref={orb1Ref}
        className="absolute top-[18%] left-[18%] w-[260px] h-[260px] md:w-[380px] md:h-[380px] rounded-full will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(210,255,0,0.22) 0%, rgba(210,255,0,0.06) 45%, transparent 70%)',
          filter: 'blur(55px)',
        }}
      />

      {/* Orb 2 – bottom right */}
      <div
        ref={orb2Ref}
        className="absolute bottom-[18%] right-[18%] w-[260px] h-[260px] md:w-[360px] md:h-[360px] rounded-full will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(210,255,0,0.18) 0%, rgba(210,255,0,0.05) 40%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Soft diagonal light sweep */}
      <div
        ref={sweepRef}
        className="absolute inset-y-[10%] -left-1/3 w-2/3"
        style={{
          background:
            'linear-gradient(120deg, transparent 0%, rgba(210,255,0,0.06) 40%, transparent 80%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
    </div>
  );
}