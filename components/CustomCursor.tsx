// components/CustomCursor.tsx
'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices
    if (typeof window === 'undefined') return;
    if ('ontouchstart' in window) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const render = () => {
      // Simple lerp for smooth follow
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

      requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove);
    requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      style={{ willChange: 'transform' }}
    >
      {/* Offset to center the cursor */}
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        
        {/* Left Wing - Static */}
        <svg
          className="absolute top-1/2 right-full -translate-y-1/2 mr-[-2px]"
          width="20"
          height="16"
          viewBox="0 0 20 16"
          fill="none"
        >
          <path
            d="M20 8C20 8 16 2 12 1C8 0 4 1 1 3C0 5 0 7 1 8C3 10 7 10 11 9C15 8 18 8 20 8Z"
            fill="#D2FF00"
          />
          <path
            d="M20 8C20 8 16 14 12 15C8 16 4 15 1 13C0 11 0 9 1 8C3 6 7 6 11 7C15 8 18 8 20 8Z"
            fill="#A8CC00"
          />
        </svg>

        {/* Right Wing - Static */}
        <svg
          className="absolute top-1/2 left-full -translate-y-1/2 ml-[-2px] scale-x-[-1]"
          width="20"
          height="16"
          viewBox="0 0 20 16"
          fill="none"
        >
          <path
            d="M20 8C20 8 16 2 12 1C8 0 4 1 1 3C0 5 0 7 1 8C3 10 7 10 11 9C15 8 18 8 20 8Z"
            fill="#D2FF00"
          />
          <path
            d="M20 8C20 8 16 14 12 15C8 16 4 15 1 13C0 11 0 9 1 8C3 6 7 6 11 7C15 8 18 8 20 8Z"
            fill="#A8CC00"
          />
        </svg>

        {/* Alcovian Body */}
        <div className="relative w-8 h-8">
          {/* Glow */}
          <div className="absolute -inset-2 rounded-full bg-[#D2FF00]/20 blur-md" />
          
          {/* Main Body */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D2FF00] to-[#9ABF00] shadow-lg shadow-[#D2FF00]/30" />
          
          {/* Eyes */}
          <div className="absolute inset-0 flex items-center justify-center gap-[6px]">
            {/* Left Eye */}
            <div className="relative w-[5px] h-[7px] bg-[#111] rounded-full">
              <div className="absolute top-[1px] left-[1px] w-[2px] h-[2px] bg-white rounded-full" />
            </div>
            {/* Right Eye */}
            <div className="relative w-[5px] h-[7px] bg-[#111] rounded-full">
              <div className="absolute top-[1px] left-[1px] w-[2px] h-[2px] bg-white rounded-full" />
            </div>
          </div>
          
          {/* Highlight */}
          <div className="absolute top-[3px] left-[4px] w-[10px] h-[5px] bg-white/40 rounded-full -rotate-12" />
        </div>
      </div>
    </div>
  );
}