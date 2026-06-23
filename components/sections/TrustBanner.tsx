const TRUST = [
  { icon: "🏥", title: "2,400+ Institutions",  sub: "Hospitals & clinics trust MedEquip" },
  { icon: "✅", title: "FDA & MDR Certified",   sub: "All products meet strict regulatory standards" },
  { icon: "🌍", title: "Global Delivery",        sub: "98 countries, 72-hour express available" },
  { icon: "🔧", title: "Clinical Support",       sub: "Dedicated biomedical engineers, 24 h SLA" },
];

export default function TrustBanner() {
  return (
    <section className="bg-forest py-16">
      <div className="container-page grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {TRUST.map((t) => (
          <div key={t.title} className="flex items-start gap-4">
            <span className="text-3xl shrink-0">{t.icon}</span>
            <div>
              <p className="font-display font-semibold text-white text-base">{t.title}</p>
              <p className="text-stone-300 text-sm mt-1 leading-relaxed">{t.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}