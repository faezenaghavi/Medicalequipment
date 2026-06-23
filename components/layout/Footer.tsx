import Link from "next/link";

const COLS = [
  {
    title: "Products",
    links: [
      { href: "/products?cat=imaging",        label: "Imaging Systems"    },
      { href: "/products?cat=monitoring",     label: "Patient Monitoring" },
      { href: "/products?cat=surgical",       label: "Surgical"           },
      { href: "/products?cat=respiratory",    label: "Respiratory"        },
      { href: "/products?cat=diagnostic",     label: "Diagnostic"         },
      { href: "/products?cat=rehabilitation", label: "Rehabilitation"     },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About MedEquip" },
      { href: "#", label: "Certifications" },
      { href: "#", label: "Regulatory"     },
      { href: "#", label: "Careers"        },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/quote",  label: "Request Quote" },
      { href: "#",       label: "Documentation" },
      { href: "#",       label: "Training"      },
      { href: "#",       label: "Contact Us"    },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-forest text-surface-100">
      <div className="container-page py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 rounded-lg bg-mint-200 flex items-center justify-center text-forest font-bold text-sm">M</span>
            <span className="font-display font-bold text-lg">Med<span className="text-gold-300">Equip</span></span>
          </div>
          <p className="text-stone-300 text-sm leading-relaxed max-w-xs">
            Premium medical equipment for healthcare institutions worldwide. FDA cleared · MDR compliant.
          </p>
          <div className="flex gap-2 mt-6">
            {["FDA", "MDR", "ISO"].map((b) => (
              <span key={b} className="text-[10px] font-mono font-medium px-2 py-1 rounded-md bg-mint-200/10 text-mint-200 border border-mint-200/20">
                {b}
              </span>
            ))}
          </div>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-surface-100 mb-4 uppercase tracking-widest">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-stone-300 hover:text-mint-200 text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-400 text-xs">
          <p>© {new Date().getFullYear()} MedEquip Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-mint-200 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-mint-200 transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}