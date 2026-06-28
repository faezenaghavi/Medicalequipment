"use client";

import React, { useState, useEffect } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";

export const Hero = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-sans text-stone-500">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md border-b border-mint-100" : "bg-transparent"}`}>
        <div className="max-w-[1180px] mx-auto px-6 h-[68px] flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-syne text-[18px] font-bold text-forest">
            <div className="w-9 h-9 rounded-[10px] bg-mint-300 flex items-center justify-center font-extrabold text-[15px] text-forest">M</div>
            Med<span className="text-gold-300">Equip</span>
          </a>
          
          <div className="hidden md:flex items-center gap-1">
            {["Products", "Imaging", "Monitoring", "Quote"].map((item) => (
              <a key={item} href={`/${item.toLowerCase()}`} className="px-4 py-2 rounded-xl text-sm font-medium text-stone-500 hover:text-forest hover:bg-mint-50 transition-all">
                {item}
              </a>
            ))}
          </div>

          <button className="px-5 py-2.5 rounded-xl bg-forest text-white text-sm font-semibold hover:bg-[#0a3d2e] transition-all">
            Request Quote
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen pt-[68px] bg-gradient-to-br from-[#0d4f3c] via-[#1a7a5a] to-[#0a3d2e] flex items-center relative overflow-hidden">
        {/* Aurora Background Overlay */}
        <div className="absolute inset-0 opacity-40">
           <AuroraBackground showRadialGradient={true}>
             <div />
           </AuroraBackground>
        </div>

        <div className="max-w-[1180px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10 py-20">
          <div>
            <div className="inline-flex items-center gap-2 bg-[rgba(110,205,168,0.2)] border border-[rgba(110,205,168,0.35)] rounded-full px-4 py-1.5 text-[11px] font-semibold text-mint-300 uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-mint-400"></span>
              Trusted by 800 hospitals worldwide
            </div>
            <h1 className="font-syne text-[clamp(36px,5vw,60px)] font-extrabold text-white leading-[1.08] mb-6">
              Medical Equipment <br />
              <span className="text-gold-300">Built for</span> Precision Care
            </h1>
            <p className="text-[16px] text-white/70 leading-relaxed mb-10 max-w-[440px]">
              From advanced imaging systems to critical care monitors — certified, reliable, and ready for your facility’s demands.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 rounded-2xl bg-gold-300 text-forest font-bold text-[15px] hover:bg-gold-400 transition-all shadow-lg shadow-gold-300/20">
                Browse Catalogue
              </button>
              <button className="px-8 py-4 rounded-2xl border border-white/30 text-white font-semibold text-[15px] hover:bg-white/10 transition-all">
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};