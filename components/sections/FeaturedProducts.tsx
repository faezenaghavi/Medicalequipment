"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProducts() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feat-card", {
        opacity: 0, y: 40, stagger: 0.1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const featured = PRODUCTS.filter((p) => p.featured);

  return (
    <section ref={ref} className="section bg-surface-100">
      <div className="container-page">
        <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
          <div>
            <p className="text-xs font-mono text-gold-400 uppercase tracking-widest mb-2">Highlighted</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-forest leading-tight">Featured Equipment</h2>
          </div>
          <Link href="/products" className="text-sm font-semibold text-mint-600 hover:text-forest transition-colors inline-flex items-center gap-1">
            View all products <span>→</span>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <div key={p.id} className="feat-card">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}