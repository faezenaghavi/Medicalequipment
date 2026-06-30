"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

const CATEGORIES = [
  { icon: "◎", label: "Imaging", blurb: "MRI, CT, X-ray systems", href: "/products?cat=imaging" },
  { icon: "♡", label: "Monitoring", blurb: "ICU & bedside monitors", href: "/products?cat=monitoring" },
  { icon: "✦", label: "Surgical", blurb: "OR-ready equipment", href: "/products?cat=surgical" },
  { icon: "△", label: "Diagnostic", blurb: "Lab & analysis systems", href: "/products?cat=diagnostic" },
  { icon: "◌", label: "Respiratory", blurb: "Ventilators & support", href: "/products?cat=respiratory" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".neon-badge", { opacity: 0, y: 12, duration: 0.45 })
        .from(".neon-word", { opacity: 0, y: 28, stagger: 0.045, duration: 0.7 }, "-=0.25")
        .from(".neon-sub", { opacity: 0, y: 16, duration: 0.45 }, "-=0.5")
        .from(".neon-cta", { opacity: 0, y: 12, stagger: 0.06, duration: 0.42 }, "-=0.35")
        .from(".neon-feature", { opacity: 0, y: 18, stagger: 0.06, duration: 0.48 }, "-=0.3")
        .from(".neon-terminal", { opacity: 0, duration: 0.6 }, "-=0.25");

      gsap.to(glowRef.current, {
        scale: 1.115,
        opacity: 0.86,
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#04060d] py-20 sm:py-24 lg:py-28"
      aria-label="Intro"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,240,0.14),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(92,108,255,0.10),_transparent_45%),linear-gradient(to_bottom,_rgba(255,255,255,0.03),_transparent_18%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.08]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(18,28,50,0.1),rgba(4,6,13,0.85)_68%,rgba(4,6,13,1)_100%)]"
      />

      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,240,255,0.22)_0%,rgba(0,240,255,0.10)_18%,rgba(92,108,255,0.06)_38%,transparent_68%)] blur-3xl"
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <span className="neon-badge inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-white/5 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-cyan-100/90 shadow-[0_0_30px_rgba(0,240,255,0.10)] backdrop-blur-md sm:text-xs">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.95)]" />
            SYSTEM: FLEET MONITOR <span className="text-emerald-300">ONLINE</span>
          </span>

          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
            <span className="block">
              {"The professional".split(" ").map((w, i) => (
                <span
                  key={i}
                  className="neon-word inline-block mr-[0.26em] bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(103,232,249,0.20)]"
                >
                  {w}
                </span>
              ))}
            </span>

            <span className="mt-2 block">
              <span className="neon-word neon-word-accent inline-block mr-[0.26em] bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-200 bg-clip-text text-transparent drop-shadow-[0_0_22px_rgba(45,212,191,0.30)]">
                backend
              </span>
              {"for hospital equipment".split(" ").map((w, i) => (
                <span
                  key={i}
                  className="neon-word inline-block mr-[0.26em] bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent"
                >
                  {w}
                </span>
              ))}
            </span>
          </h1>

          <p className="neon-sub mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Source, certify, and track every device from a single trusted catalogue — built for procurement teams who can&apos;t afford guesswork.
          </p>

          <div className="neon-cta-row mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="neon-cta neon-cta-primary inline-flex items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.35)] transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-200 hover:shadow-[0_0_40px_rgba(34,211,238,0.55)]"
            >
              Browse catalogue
            </Link>
            <Link
              href="/quote"
              className="neon-cta neon-cta-outline inline-flex items-center justify-center rounded-xl border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/10 hover:text-cyan-100"
            >
              Request a quote
            </Link>
          </div>

          <div className="neon-feature-row mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {CATEGORIES.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="neon-feature group rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(34,211,238,0.10)]"
              >
                <span className="neon-feature-icon mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-lg text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.18)] transition group-hover:scale-105 group-hover:bg-cyan-300/15">
                  {c.icon}
                </span>
                <div className="neon-feature-label text-sm font-semibold tracking-wide text-white">
                  {c.label}
                </div>
                <div className="neon-feature-blurb mt-1 text-sm leading-6 text-slate-400">
                  {c.blurb}
                </div>
              </Link>
            ))}
          </div>

          <div className="neon-terminal mt-10 inline-flex max-w-full items-center gap-2 rounded-xl border border-white/10 bg-[#07111f]/80 px-4 py-3 font-mono text-[13px] text-cyan-100/90 shadow-[0_0_30px_rgba(0,0,0,0.35)] backdrop-blur-md">
            <span className="neon-terminal-prompt text-cyan-300">$</span>
            <span className="truncate">medequip status --fleet</span>
            <span
              ref={cursorRef}
              className="neon-terminal-cursor inline-block h-[1.05em] w-[10px] bg-cyan-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}