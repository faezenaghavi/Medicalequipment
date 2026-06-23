"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "1,200+", label: "Medical Devices" },
  { value: "98 Countries", label: "Worldwide Delivery" },
  { value: "FDA / MDR", label: "Certified Products" },
  { value: "24 h", label: "Expert Support" },
];

const CATEGORIES = [
  { icon: "◎", label: "Imaging",        href: "/products?cat=imaging"        },
  { icon: "♡", label: "Monitoring",     href: "/products?cat=monitoring"     },
  { icon: "✦", label: "Surgical",       href: "/products?cat=surgical"       },
  { icon: "◌", label: "Respiratory",    href: "/products?cat=respiratory"    },
  { icon: "△", label: "Diagnostic",     href: "/products?cat=diagnostic"     },
  { icon: "⊕", label: "Rehabilitation", href: "/products?cat=rehabilitation" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLHeadingElement>(null);
  const blobRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { opacity: 0, y: 12, duration: 0.5 })
        .from(".hero-word",    { opacity: 0, y: 28, stagger: 0.06, duration: 0.65 }, "-=0.2")
        .from(".hero-sub",     { opacity: 0, y: 16, duration: 0.55 }, "-=0.4")
        .from(".hero-cta",     { opacity: 0, y: 12, stagger: 0.07, duration: 0.45 }, "-=0.35")
        .from(".hero-stat",    { opacity: 0, y: 10, stagger: 0.06, duration: 0.4  }, "-=0.3")
        .from(".hero-cat",     { opacity: 0, x: -8, stagger: 0.04, duration: 0.4  }, "-=0.4");

      /* blob parallax */
      gsap.to(blobRef.current, {
        yPercent: 25, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-hero-gradient overflow-hidden flex flex-col justify-center pt-24 pb-16">

      {/* decorative blobs */}
      <div ref={blobRef} className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-mint-100/60 blur-[96px]" aria-hidden="true"/>
      <div className="pointer-events-none absolute -bottom-16 -left-16 w-[400px] h-[400px] rounded-full bg-gold-50/80 blur-[80px]" aria-hidden="true"/>

      <div className="container-page relative z-10">
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-center">

          {/* Copy */}
          <div>
            <span className="hero-eyebrow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mint-100 border border-mint-200 text-mint-600 text-xs font-semibold mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-mint-500 animate-pulse"/>
              1,200+ FDA & MDR Certified Devices
            </span>

            <h1 ref={headRef} className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-forest leading-[1.06] tracking-tight mb-6">
              {"The professional\nmarketplace for\nmedical equipment".split("\n").map((line, li) => (
                <span key={li} className="block">
                  {line.split(" ").map((w, wi) => (
                    <span key={wi} className="hero-word inline-block mr-[0.28em]">{w}</span>
                  ))}
                </span>
              ))}
            </h1>

            <p className="hero-sub text-stone-500 text-lg leading-relaxed max-w-lg mb-8">
              Source imaging systems, ICU monitors, surgical equipment and more — all FDA cleared, MDR compliant, and backed by expert clinical support.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <Link href="/products" className="hero-cta px-6 py-3.5 rounded-xl bg-forest text-white text-sm font-semibold hover:bg-forest-700 active:scale-[0.98] transition-all duration-200 shadow-md">
                Browse Catalogue
              </Link>
              <Link href="/quote" className="hero-cta px-6 py-3.5 rounded-xl bg-white border border-mint-200 text-forest text-sm font-semibold hover:border-mint-400 hover:shadow-card transition-all duration-200">
                Request a Quote
              </Link>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="hero-stat">
                  <p className="font-display font-bold text-forest text-xl">{s.value}</p>
                  <p className="text-stone-400 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Category selector card */}
          <div className="glass rounded-3xl p-6 shadow-card float">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">Browse by category</p>
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.map((cat) => (
                <Link key={cat.label} href={cat.href}
                  className="hero-cat flex items-center gap-3 p-3.5 rounded-2xl bg-white/70 hover:bg-mint-50 border border-mint-100 hover:border-mint-300 group transition-all duration-200"
                >
                  <span className="w-9 h-9 rounded-xl bg-mint-100 text-mint-600 flex items-center justify-center text-lg group-hover:bg-forest group-hover:text-white transition-colors">
                    {cat.icon}
                  </span>
                  <span className="text-sm font-medium text-forest leading-tight">{cat.label}</span>
                </Link>
              ))}
            </div>

            {/* Trust badges */}
            <div className="mt-5 pt-4 border-t border-mint-100 flex items-center justify-center gap-3">
              {["FDA", "MDR", "ISO 13485", "CE"].map((b) => (
                <span key={b} className="text-[10px] font-mono text-stone-400 border border-stone-200 rounded-md px-2 py-0.5">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}