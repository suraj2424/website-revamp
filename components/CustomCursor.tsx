// components/CustomCursor.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const wingLeftRef = useRef<HTMLDivElement>(null);
  const wingRightRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const wingLeft = wingLeftRef.current;
    const wingRight = wingRightRef.current;
    const glow = glowRef.current;

    if (!cursor || !wingLeft || !wingRight || !glow) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let prevX = mouseX;
    let prevY = mouseY;
    let velocityX = 0;
    let velocityY = 0;
    let wingFlapAngle = 0;
    let isMoving = false;
    let idleTimer: NodeJS.Timeout;

    // Set initial position
    gsap.set(cursor, { x: mouseX, y: mouseY });
    gsap.set(glow, { x: mouseX, y: mouseY });

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMoving = true;

      // Clear idle timer and set new one
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isMoving = false;
      }, 100);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Main animation loop
    const animate = () => {
      // Calculate velocity
      velocityX = mouseX - prevX;
      velocityY = mouseY - prevY;
      const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);

      // Smooth cursor following
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.12;

      // Apply cursor position
      gsap.set(cursor, {
        x: currentX,
        y: currentY,
      });

      // Glow follows with more delay
      gsap.to(glow, {
        x: mouseX,
        y: mouseY,
        duration: 0.6,
        ease: "power2.out",
        overwrite: true
      });

      // Calculate tilt based on movement direction
      const tiltX = velocityY * 0.5; // Tilt forward/backward
      const tiltY = -velocityX * 0.3; // Tilt left/right

      // Apply body rotation
      gsap.to(cursor, {
        rotationX: Math.max(-20, Math.min(20, tiltX)),
        rotationY: Math.max(-20, Math.min(20, tiltY)),
        duration: 0.3,
        ease: "power2.out"
      });

      // Wing flapping animation based on speed
      if (speed > 2) {
        // Fast flapping when moving
        wingFlapAngle += speed * 0.8;
        const flapAmount = Math.sin(wingFlapAngle * 0.3) * (15 + speed * 2);

        gsap.to(wingLeft, {
          rotationY: -30 - flapAmount,
          rotationZ: -10 + Math.sin(wingFlapAngle * 0.2) * 5,
          scaleX: 1 + speed * 0.02,
          duration: 0.1,
          ease: "none"
        });

        gsap.to(wingRight, {
          rotationY: 30 + flapAmount,
          rotationZ: 10 - Math.sin(wingFlapAngle * 0.2) * 5,
          scaleX: 1 + speed * 0.02,
          duration: 0.1,
          ease: "none"
        });
      } else {
        // Gentle idle flutter
        wingFlapAngle += 0.08;
        const idleFlap = Math.sin(wingFlapAngle) * 8;

        gsap.to(wingLeft, {
          rotationY: -20 - idleFlap,
          rotationZ: -5,
          scaleX: 1,
          duration: 0.3,
          ease: "power2.out"
        });

        gsap.to(wingRight, {
          rotationY: 20 + idleFlap,
          rotationZ: 5,
          scaleX: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }

      prevX = mouseX;
      prevY = mouseY;

      requestAnimationFrame(animate);
    };

    // Handle hover states
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, [data-cursor-hover], [role="button"]'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });

      return () => {
        interactiveElements.forEach((el) => {
          el.removeEventListener('mouseenter', () => setIsHovering(true));
          el.removeEventListener('mouseleave', () => setIsHovering(false));
        });
      };
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const cleanupHover = addHoverListeners();

    // Start animation
    const animationId = requestAnimationFrame(animate);

    // Re-add hover listeners when DOM changes
    const observer = new MutationObserver(() => {
      addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationId);
      clearTimeout(idleTimer);
      observer.disconnect();
      cleanupHover();
    };
  }, []);

  // Handle hover/click state animations
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (isClicking) {
      gsap.to(cursor, { scale: 0.8, duration: 0.1 });
    } else if (isHovering) {
      gsap.to(cursor, { scale: 1.3, duration: 0.3, ease: "back.out(1.7)" });
    } else {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
    }
  }, [isHovering, isClicking]);

  return (
    <>
      {/* Glow effect */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-9998 hidden md:block mix-blend-screen"
        style={{
          transform: 'translate(-50%, -50%)',
          willChange: 'transform'
        }}
      >
        <div
          className={`w-32 h-32 rounded-full transition-all duration-300 glow-effect ${isHovering
              ? 'bg-[#D2FF00]/20 scale-150'
              : 'bg-[#D2FF00]/10 scale-100'
            }`}
        />
      </div>

      {/* Main Alcovian Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-9999 hidden md:block"
        style={{
          transform: 'translate(-50%, -50%)',
          transformStyle: 'preserve-3d',
          perspective: '500px',
          willChange: 'transform'
        }}
      >
        <div
          className="relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Left Wing */}
          <div
            ref={wingLeftRef}
            className="absolute top-1/2 right-full -translate-y-1/2 origin-right"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateY(-20deg)'
            }}
          >
            <svg
              width="28"
              height="24"
              viewBox="0 0 28 24"
              fill="none"
              className="drop-shadow-lg wing-shadow"
            >
              {/* Wing shape */}
              <path
                d="M28 12C28 12 24 4 18 2C12 0 6 1 2 4C0 6 0 8 1 10C2 12 4 13 6 13C10 13 14 11 18 10C22 9 26 10 28 12Z"
                fill="#D2FF00"
              />
              <path
                d="M28 12C28 12 24 20 18 22C12 24 6 23 2 20C0 18 0 16 1 14C2 12 4 11 6 11C10 11 14 13 18 14C22 15 26 14 28 12Z"
                fill="#B4E000"
              />
              {/* Wing details */}
              <path
                d="M26 12C22 10 16 9 10 11"
                stroke="rgba(0,0,0,0.2)"
                strokeWidth="0.5"
              />
              <path
                d="M26 12C22 14 16 15 10 13"
                stroke="rgba(0,0,0,0.2)"
                strokeWidth="0.5"
              />
            </svg>
          </div>

          {/* Right Wing */}
          <div
            ref={wingRightRef}
            className="absolute top-1/2 left-full -translate-y-1/2 origin-left"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateY(20deg) scaleX(-1)'
            }}
          >
            <svg
              width="28"
              height="24"
              viewBox="0 0 28 24"
              fill="none"
              className="drop-shadow-lg"

            >
              <path
                d="M28 12C28 12 24 4 18 2C12 0 6 1 2 4C0 6 0 8 1 10C2 12 4 13 6 13C10 13 14 11 18 10C22 9 26 10 28 12Z"
                fill="#D2FF00"
              />
              <path
                d="M28 12C28 12 24 20 18 22C12 24 6 23 2 20C0 18 0 16 1 14C2 12 4 11 6 11C10 11 14 13 18 14C22 15 26 14 28 12Z"
                fill="#B4E000"
              />
              <path
                d="M26 12C22 10 16 9 10 11"
                stroke="rgba(0,0,0,0.2)"
                strokeWidth="0.5"
              />
              <path
                d="M26 12C22 14 16 15 10 13"
                stroke="rgba(0,0,0,0.2)"
                strokeWidth="0.5"
              />
            </svg>
          </div>

          {/* Alcovian Body */}
          <div
            className={`relative w-8 h-8 transition-all duration-150 ${isHovering ? 'scale-110' : 'scale-100'
              }`}
          >
            {/* Outer glow ring */}
            <div
              className={`absolute -inset-1 rounded-full transition-all duration-300 ${isHovering
                  ? 'bg-[#D2FF00] opacity-40'
                  : 'bg-[#D2FF00] opacity-20'
                } glow-ring`}
            />

            {/* Main body */}
            <div
              className="absolute inset-0 rounded-full bg-linear-to-br from-[#D2FF00] via-[#c4f000] to-[#a8cc00] shadow-lg cursor-body"
            />

            {/* Face container */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Eyes */}
              <div className="relative flex gap-2 -mt-0.5">
                {/* Left eye */}
                <div className="relative">
                  <div className="w-2 h-2.5 bg-[#1a1a1a] rounded-full" />
                  <div
                    className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full opacity-80"
                  />
                </div>
                {/* Right eye */}
                <div className="relative">
                  <div className="w-2 h-2.5 bg-[#1a1a1a] rounded-full" />
                  <div
                    className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full opacity-80"
                  />
                </div>
              </div>
            </div>

            {/* Cheek blush */}
            <div
              className="absolute bottom-2 left-0.5 w-1.5 h-1 rounded-full bg-[#ffb800] opacity-40"
            />
            <div
              className="absolute bottom-2 right-0.5 w-1.5 h-1 rounded-full bg-[#ffb800] opacity-40"
            />

            {/* Shine highlight */}
            <div
              className="absolute top-1 left-1 w-3 h-2 rounded-full bg-white opacity-30 rotate-[-20deg]"
            />
          </div>

          {/* Hover indicator text */}
          {isHovering && (
            <div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-bold tracking-wider text-[#D2FF00] uppercase animate-pulse"
            >
              Click
            </div>
          )}
        </div>
      </div>
    </>
  );
}
