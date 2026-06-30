// components/blocks/Hero.tsx
"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

const STATS = [
  { num: "1,200+", label: "Devices Deployed" },
  { num: "98.4%", label: "Uptime SLA" },
  { num: "40+", label: "Countries Served" },
];

const VISUAL_TAGS = [
  { label: "FDA Cleared", top: "14%", left: "8%" },
  { label: "ISO 13485", top: "62%", left: "4%" },
  { label: "CE Marked", top: "38%", left: "82%" },
];

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { y: 16, opacity: 0, duration: 0.6 })
        .from(".hero-line", { y: 36, opacity: 0, duration: 0.8, stagger: 0.08 }, "-=0.3")
        .from(".hero-desc", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".hero-actions a, .hero-actions button", { y: 16, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.3")
        .from(".hero-stat", { y: 20, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.2")
        .from(".hero-tag", { scale: 0.8, opacity: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.6")
        .from(".hero-disc", { scale: 0.85, opacity: 0, duration: 0.9, ease: "power2.out" }, "-=0.7");
    }, rootRef);

    // Ambient pointer-reactive gradient drift (cheap, GPU-friendly)
    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 24;
      const y = (e.clientY / innerHeight - 0.5) * 24;
      gsap.to(blobRef.current, { x, y, duration: 1.2, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section ref={rootRef} className="hero-premium" aria-label="Intro">
      <div className="hero-grain" aria-hidden="true" />
      <div ref={blobRef} className="hero-blob" aria-hidden="true" />

      <div className="container hero-premium-grid">
        <div>
          <span className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            Trusted by 500+ healthcare facilities worldwide
          </span>

          <h1 className="hero-premium-title">
            <span className="hero-line">Medical equipment,</span>
            <span className="hero-line">
              engineered for <span className="hero-gradient-text">absolute trust.</span>
            </span>
          </h1>

          <p className="hero-desc">
            Every device on MedEquip is sourced, certified, and serviced to hospital-grade
            standards — so your team can focus on patient care, not procurement risk.
          </p>

          <div className="hero-actions">
            <Link href="/products" className="btn-primary">
              Browse the catalogue
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <Link href="/quote" className="btn-outline-hero">Request a quote</Link>
          </div>

          <div className="hero-stats">
            {STATS.map((s) => (
              <div key={s.label} className="stat-card hero-stat">
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual-premium">
          <div className="hero-disc">
            <div className="hero-disc-ring" />
            <div className="hero-disc-ring hero-disc-ring-2" />
            <div className="hero-disc-core">
              <span className="hero-disc-icon">M</span>
            </div>
          </div>
          {VISUAL_TAGS.map((t) => (
            <span key={t.label} className="hero-tag" style={{ top: t.top, left: t.left }}>
              {t.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}