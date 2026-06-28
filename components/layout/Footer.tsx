import Link from "next/link";

const COLS = [
  {
    title: "Products",
    links: [
      { href: "/products?cat=imaging",        label: "Imaging Systems"    },
      { href: "/products?cat=monitoring",     label: "Patient Monitoring" },
      { href: "/products?cat=surgical",       label: "Surgical Equipment" },
      { href: "/products?cat=respiratory",    label: "Respiratory"        },
      { href: "/products?cat=diagnostic",     label: "Laboratory"         },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About Us"       },
      { href: "#", label: "Certifications" },
      { href: "#", label: "Partners"       },
      { href: "#", label: "Careers"        },
      { href: "#", label: "News"           },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/quote", label: "Request a Quote"   },
      { href: "#",      label: "Technical Support" },
      { href: "#",      label: "Service Contracts" },
      { href: "#",      label: "Documentation"     },
      { href: "#",      label: "Contact Us"        },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">

          {/* Brand column */}
          <div>
            <Link href="/" className="logo" style={{ color: "#fff", marginBottom: "14px", display: "flex" }}>
              <span className="logo-icon">M</span>
              Med<span className="logo-accent">Equip</span>
            </Link>
            <p style={{ fontSize: "13px", lineHeight: 1.7, maxWidth: "240px", color: "rgba(255,255,255,0.65)" }}>
              Premium medical equipment for hospitals, clinics, and research facilities worldwide.
            </p>
          </div>

          {/* Link columns */}
          {COLS.map(col => (
            <div key={col.title} className="footer-col">
              <h4>{col.title}</h4>
              {col.links.map(l => (
                <Link key={l.label} href={l.href} className="footer-link">
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} MedEquip. All rights reserved.</span>
          <div className="footer-certs">
            {["FDA", "CE", "ISO 13485", "MDR"].map(c => (
              <span key={c} className="cert-pill">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}