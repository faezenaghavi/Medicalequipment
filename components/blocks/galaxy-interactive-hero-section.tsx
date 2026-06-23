"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

function HeroSplineBackground() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      pointerEvents: 'auto',
      overflow: 'hidden',
    }}>
      <Spline
        style={{
          width: '100%',
          height: '100vh',
          pointerEvents: 'auto',
        }}
        scene="https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode"
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: `
            linear-gradient(to right, rgba(26, 46, 36, 0.7), transparent 30%, transparent 70%, rgba(26, 46, 36, 0.7)),
            linear-gradient(to bottom, transparent 50%, rgba(26, 46, 36, 0.8))
          `,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

function ScreenshotSection({ screenshotRef }: { screenshotRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <section className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 mt-11 md:mt-12">
      <div ref={screenshotRef} className="bg-white/10 rounded-xl overflow-hidden shadow-2xl border border-mint-200/30 w-full md:w-[80%] lg:w-[70%] mx-auto backdrop-blur-md">
        <div>
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&h=1080"
            alt="Medical Equipment Dashboard"
            className="w-full h-auto block rounded-lg mx-auto"
          />
        </div>
      </div>
    </section>
  );
}

function HeroContent() {
  return (
    <div className="text-left text-white pt-16 sm:pt-24 md:pt-32 px-4 max-w-3xl">
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight tracking-wide">
        Elevate your <br className="sm:hidden" />medical procurement<br className="sm:hidden" />to an art form.
      </h1>
      <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-80 max-w-xl">
        Source FDA & MDR certified equipment — MRI systems, ICU monitors, surgical tools, and more — all on a single secure platform with expert clinical support.
      </p>
      <div className="flex pointer-events-auto flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-3">
        <a href="/products" className="bg-mint-200/20 hover:bg-mint-200/30 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-full transition duration-300 w-full sm:w-auto border border-mint-200/50" style={{ backdropFilter: 'blur(8px)' }}>
          Browse Catalogue
        </a>
        <a href="/quote" className="pointer-events-auto bg-white/10 border border-mint-200/50 hover:border-mint-200 text-white font-medium py-2 sm:py-3 px-6 sm:px-8 rounded-full transition duration-300 flex items-center justify-center w-full sm:w-auto">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          Request Quote
        </a>
      </div>
    </div>
  );
}

function Navbar() {
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({
    features: false,
    enterprise: false,
    resources: false,
  });

  const handleMouseEnterNavItem = (item: string) => setHoveredNavItem(item);
  const handleMouseLeaveNavItem = () => setHoveredNavItem(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setMobileDropdowns({ features: false, enterprise: false, resources: false });
    }
  };

  const toggleMobileDropdown = (key: keyof typeof mobileDropdowns) => {
    setMobileDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const navLinkClass = (itemName: string, extraClasses = '') => {
    const isCurrentItemHovered = hoveredNavItem === itemName;
    const isAnotherItemHovered = hoveredNavItem !== null && !isCurrentItemHovered;

    const colorClass = isCurrentItemHovered
      ? 'text-white'
      : isAnotherItemHovered
        ? 'text-stone-400'
        : 'text-stone-300';

     return `text-sm transition duration-150 ${colorClass} ${extraClasses}`;
  };

   useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
         setMobileDropdowns({ features: false, enterprise: false, resources: false });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-20" style={{ backgroundColor: 'rgba(26, 46, 36, 0.3)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: '0 0 15px 15px' }}>
      <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-6 lg:space-x-8">
          <a href="/" className="flex items-center gap-2.5 shrink-0">
            <span className="w-8 h-8 rounded-lg bg-mint-200 flex items-center justify-center text-forest font-bold text-sm">M</span>
            <span className="font-display font-700 text-white text-lg tracking-tight">Med<span className="text-gold-300">Equip</span></span>
          </a>

          <div className="hidden lg:flex items-center space-x-6">
            <a href="/products" className={navLinkClass('products')} onMouseEnter={() => handleMouseEnterNavItem('products')} onMouseLeave={handleMouseLeaveNavItem}>
              Products
            </a>
            <a href="/products?cat=imaging" className={navLinkClass('imaging')} onMouseEnter={() => handleMouseEnterNavItem('imaging')} onMouseLeave={handleMouseLeaveNavItem}>
              Imaging
            </a>
            <a href="/products?cat=monitoring" className={navLinkClass('monitoring')} onMouseEnter={() => handleMouseEnterNavItem('monitoring')} onMouseLeave={handleMouseLeaveNavItem}>
              Monitoring
            </a>
            <a href="/quote" className={navLinkClass('quote')} onMouseEnter={() => handleMouseEnterNavItem('quote')} onMouseLeave={handleMouseLeaveNavItem}>
              Get a Quote
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
          <a href="/quote" className="hidden md:block bg-mint-200/20 hover:bg-mint-200/30 text-white font-semibold py-2 px-5 rounded-full text-sm md:text-base border border-mint-200/50" style={{ backdropFilter: 'blur(8px)' }}>
            Request Quote
          </a>
          <button className="lg:hidden text-white p-2" onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
        </div>
      </div>

      <div className={`lg:hidden bg-forest/90 border-t border-mint-200/30 absolute top-full left-0 right-0 z-30
           overflow-hidden transition-all duration-300 ease-in-out
           ${isMobileMenuOpen ? 'max-h-screen opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'}
           `}>
        <div className="px-4 py-6 flex flex-col space-y-4">
          <a href="/products" className="text-white text-sm py-2" onClick={toggleMobileMenu}>Products</a>
          <a href="/products?cat=imaging" className="text-white text-sm py-2" onClick={toggleMobileMenu}>Imaging</a>
          <a href="/products?cat=monitoring" className="text-white text-sm py-2" onClick={toggleMobileMenu}>Monitoring</a>
          <a href="/quote" className="text-white text-sm py-2" onClick={toggleMobileMenu}>Get a Quote</a>
        </div>
      </div>
    </nav>
  );
}

export const HeroSection = () => {
  const screenshotRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (screenshotRef.current && heroContentRef.current) {
        requestAnimationFrame(() => {
          const scrollPosition = window.pageYOffset;
          if (screenshotRef.current) {
            screenshotRef.current.style.transform = `translateY(-${scrollPosition * 0.5}px)`;
          }

          const maxScroll = 400;
          const opacity = 1 - Math.min(scrollPosition / maxScroll, 1);
          if (heroContentRef.current) {
            heroContentRef.current.style.opacity = opacity.toString();
          }
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      <Navbar />

      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <HeroSplineBackground />
        </div>

        <div ref={heroContentRef} style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh',
          display: 'flex', justifyContent: 'flex-start', alignItems: 'center', zIndex: 10, pointerEvents: 'none'
        }}>
          <div className="container mx-auto">
            <HeroContent />
          </div>
        </div>
      </div>

      <div className="bg-forest relative z-10" style={{ marginTop: '-10vh' }}>
        <ScreenshotSection screenshotRef={screenshotRef} />
        <div className="container mx-auto px-4 py-16 text-white">
            <h2 className="text-4xl font-bold text-center mb-8">Featured Medical Equipment</h2>
             <p className="text-center max-w-xl mx-auto opacity-80">Browse our curated selection of FDA & MDR certified devices.</p>
        </div>
      </div>
    </div>
  );
};