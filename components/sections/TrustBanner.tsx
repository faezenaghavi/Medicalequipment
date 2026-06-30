"use client";

import { useEffect, useRef } from "react";
import { Building2, BadgeCheck, Globe2, Headset } from "lucide-react";
import { gsap } from "gsap";

const TRUST = [
  {
    icon: Building2,
    title: "2,400+ Institutions",
    sub: "Hospitals & clinics trust MedEquip",
  },
  {
    icon: BadgeCheck,
    title: "FDA & MDR Certified",
    sub: "All products meet strict regulatory standards",
  },
  {
    icon: Globe2,
    title: "Global Delivery",
    sub: "98 countries, 72-hour express available",
  },
  {
    icon: Headset,
    title: "Clinical Support",
    sub: "Dedicated biomedical engineers, 24 h SLA",
  },
];

export default function TrustBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, y: 28, rotateX: -18, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.15,
          transformPerspective: 1000,
        }
      );

      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        gsap.to(item, {
          y: index % 2 === 0 ? -6 : 6,
          duration: 2.8 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-forest py-16 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(246,214,120,0.18),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_35%)]" />
      <div className="container-page grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {TRUST.map((t, index) => {
          const Icon = t.icon;
          return (
            <div
              key={t.title}
              ref={(el) => {
                if (el) itemsRef.current[index] = el;
              }}
              className="group flex items-start gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:bg-white/8 hover:border-white/20"
            >
              <div className="w-11 h-11 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center shrink-0 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-5 h-5 text-gold-300" strokeWidth={2} />
              </div>
              <div>
                <p className="font-display font-semibold text-black text-base">
                  {t.title}
                </p>
                <p className="text-stone-700 text-sm mt-1 leading-relaxed">
                  {t.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}