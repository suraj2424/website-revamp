'use client';

import DesktopNav from './navbar/DesktopNav';
import FullScreenMenu from './navbar/FullScreenMenu';
import { useNavbarLogic } from './navbar/useNavbarLogic';

export default function Navbar() {
  const {
    isOpen,
    isScrolled,
    toggle,
    menuContainerRef,
    footerRef,
    bgTextRef,
    setMenuItemRef,
    handleLinkClick
  } = useNavbarLogic();

  return (
    <>
      <DesktopNav 
        isOpen={isOpen} 
        isScrolled={isScrolled} 
        toggleMenu={toggle} 
      />
      
      <FullScreenMenu
        isOpen={isOpen}
        containerRef={menuContainerRef}
        bgTextRef={bgTextRef}
        footerRef={footerRef}
        setMenuItemRef={setMenuItemRef}
        handleLinkClick={handleLinkClick}
      />
    </>
  );
}