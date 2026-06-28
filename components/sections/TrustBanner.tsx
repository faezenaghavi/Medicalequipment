"use client";

import { Building2, BadgeCheck, Globe2, Headset } from "lucide-react";

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
  return (
    <section className="bg-forest py-16">
      <div className="container-page grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {TRUST.map((t) => {
          const Icon = t.icon;
          return (
            <div key={t.title} className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-gold-300" strokeWidth={2} />
              </div>
              <div>
                <p className="font-display font-semibold text-white text-base">{t.title}</p>
                <p className="text-stone-300 text-sm mt-1 leading-relaxed">{t.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}