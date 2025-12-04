'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Snappy Entrance Animation (Faster)
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(containerRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.3 }
      )
      .fromTo(numberRef.current,
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5 },
        "-=0.1"
      )
      .fromTo(textRef.current?.children || [],
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05 },
        "-=0.3"
      );

      // 2. Subtle Float Animation
      gsap.to(numberRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 3. Mouse Parallax (Desktop Only)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const handleMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const x = (clientX / window.innerWidth - 0.5) * 15;
          const y = (clientY / window.innerHeight - 0.5) * 15;
          
          gsap.to(numberRef.current, {
            x: x,
            y: y,
            duration: 0.5, // Faster follow
            ease: 'power1.out',
            overwrite: 'auto'
          });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-[100dvh] w-full bg-[#050505] overflow-hidden px-4"
    >
      {/* ================= BACKGROUND ================= */}
      {/* Noise - Low Opacity for Performance */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
           backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
           backgroundSize: '80px 80px'
        }}
      />

      {/* Gradient Blobs (Static for performance) */}
      <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#D2FF00] rounded-full blur-[150px] opacity-[0.04]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#D2FF00] rounded-full blur-[150px] opacity-[0.04]" />


      {/* ================= CONTENT ================= */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl">
        
        {/* LOGO */}
        <div className="mb-8 md:mb-12">
          <img
            src="/alcovia-logo.png"
            alt="Alcovia"
            className="h-8 md:h-12 w-auto brightness-0 invert opacity-90"
          />
        </div>

        {/* 404 NUMBER */}
        <div ref={numberRef} className="relative mb-4 md:mb-8">
           {/* Stroke Text */}
           <h1 className="font-display font-black text-[clamp(6rem,22vw,16rem)] leading-[0.85] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.15)] md:[-webkit-text-stroke:3px_rgba(255,255,255,0.15)] select-none">
             404
           </h1>
           {/* Glow/Blur Duplicate */}
           <h1 className="absolute inset-0 font-display font-black text-[clamp(6rem,22vw,16rem)] leading-[0.85] text-[#D2FF00] opacity-5 blur-[2px] select-none pointer-events-none">
             404
           </h1>
        </div>

        {/* TEXT CONTENT */}
        <div ref={textRef} className="flex flex-col items-center gap-4 md:gap-6 px-4">
          <h2 className="text-xl md:text-3xl font-bold text-white uppercase tracking-wider">
            Off Track
          </h2>
          
          <p className="text-white/50 text-xs md:text-base leading-relaxed max-w-xs md:max-w-md">
            The page you are looking for has been moved to the pit lane or doesn't exist on this circuit.
          </p>

          <Link
            href="/"
            className="mt-4 group relative px-6 py-3 md:px-8 md:py-4 bg-[#D2FF00] text-black font-bold uppercase tracking-widest text-[10px] md:text-xs rounded-full overflow-hidden hover:scale-105 transition-transform duration-200"
          >
            <span className="relative z-10 flex items-center gap-2">
              Return Home
              <svg 
                className="w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-25 transition-opacity duration-200" />
          </Link>
        </div>
      </div>

      {/* Footer Text */}
      <div className="absolute bottom-6 md:bottom-8 text-[9px] md:text-[10px] text-white/20 uppercase tracking-[0.2em]">
        Error: 404 // Signal_Lost
      </div>
    </main>
  );
}