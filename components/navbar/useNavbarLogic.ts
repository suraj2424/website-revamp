// hooks/useNavbarLogic.ts
import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

export function useNavbarLogic() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuContainerRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLAnchorElement[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Scroll state (no extra renders)
  useEffect(() => {
    let lastIsScrolled = false;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const next = window.scrollY > 50;
        if (next !== lastIsScrolled) {
          lastIsScrolled = next;
          setIsScrolled(next);
        }
        ticking = false;
      });
    };

    handleScroll(); // set initial

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP timeline init (runs once)
  useEffect(() => {
    const container = menuContainerRef.current;
    const bgText = bgTextRef.current;
    const footer = footerRef.current;
    const items = menuItemsRef.current;

    if (!container) return;

    gsap.set(container, { autoAlpha: 0, pointerEvents: 'none' });

    const tl = gsap
      .timeline({ paused: true })
      .to(container, {
        autoAlpha: 1,
        pointerEvents: 'auto',
        duration: 0.25,
        ease: 'power2.out',
      })
      .fromTo(
        bgText,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 0.03, duration: 0.35, ease: 'power2.out' },
        '-=0.1'
      )
      .fromTo(
        items,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.04, ease: 'power3.out' },
        '-=0.15'
      )
      .fromTo(
        footer,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' },
        '-=0.18'
      );

    tlRef.current = tl;
    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, []);

  // Open / close animation (state → GSAP)
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

  // Escape key handling (only when open)
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Toggle / close handlers (stable)
  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Link click handler
  const handleLinkClick = useCallback(
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setIsOpen(false);

      // Wait a bit for close animation (matches tl durations)
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    },
    []
  );

  // Ref helper – stable, no new functions per item render
  const setMenuItemRef = useCallback(
    (index: number) => (el: HTMLAnchorElement | null) => {
      if (el) menuItemsRef.current[index] = el;
    },
    []
  );

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