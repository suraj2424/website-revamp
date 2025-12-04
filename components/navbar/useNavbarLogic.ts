// hooks/useNavbarLogic.ts
import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

export function useNavbarLogic() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Refs
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLAnchorElement[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Scroll Handler - optimized
  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;

    const handleScroll = () => {
      if (ticking) return;
      
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        
        // Only update state if threshold crossed
        if ((scrollY > 50) !== (lastScrollY > 50)) {
          setIsScrolled(scrollY > 50);
        }
        
        lastScrollY = scrollY;
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Timeline Init
  useEffect(() => {
    const container = menuContainerRef.current;
    const bgText = bgTextRef.current;
    const footer = footerRef.current;
    const menuItems = menuItemsRef.current;

    if (!container) return;

    gsap.set(container, { autoAlpha: 0, pointerEvents: 'none' });

    tlRef.current = gsap.timeline({ paused: true })
      .to(container, {
        autoAlpha: 1,
        pointerEvents: 'auto',
        duration: 0.3,
        ease: 'power2.out',
      })
      .fromTo(bgText,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 0.03, duration: 0.4, ease: 'power2.out' },
        '-=0.1'
      )
      .fromTo(menuItems,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.04, ease: 'power3.out' },
        '-=0.2'
      )
      .fromTo(footer,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' },
        '-=0.15'
      );

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  // Open/Close Animation
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      tl.timeScale(1).play();
    } else {
      document.body.style.overflow = '';
      tl.timeScale(1.5).reverse();
    }
  }, [isOpen]);

  // Escape Key Handler - only add when open
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Toggle function
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  // Close function
  const close = useCallback(() => setIsOpen(false), []);

  // Click Handler
  const handleLinkClick = useCallback((href: string) => {
    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setIsOpen(false);

      // Use timeline completion instead of fixed timeout
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    };
  }, []);

  // Ref Helper - memoized
  const setMenuItemRef = useCallback((index: number) => {
    return (el: HTMLAnchorElement | null) => {
      if (el) menuItemsRef.current[index] = el;
    };
  }, []);

  return {
    isOpen,
    isScrolled,
    toggle,
    close,
    menuContainerRef,
    footerRef,
    bgTextRef,
    setMenuItemRef,
    handleLinkClick,
  };
}