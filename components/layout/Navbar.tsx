"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const NAV_LINKS = [
  { href: "/products",                label: "Products"   },
  { href: "/products?cat=imaging",    label: "Imaging"    },
  { href: "/products?cat=monitoring", label: "Monitoring" },
  { href: "/products?cat=surgical",   label: "Surgical"   },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // دریافت مقدار فعلی دسته بندی از URL
  const currentCat = searchParams.get("cat");

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // تابع کمکی برای تشخیص فعال بودن لینک
  const isActive = (href: string) => {
    if (href === "/products") return pathname === "/products" && !currentCat;
    return href.includes(`cat=${currentCat}`);
  };

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-inner">

          {/* Logo */}
          <Link href="/" className="logo">
            <span className="logo-icon">M</span>
            Med<span className="logo-accent">Equip</span>
          </Link>

          {/* Desktop nav */}
          <nav className="nav-links" aria-label="Main navigation">
            {NAV_LINKS.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link${isActive(l.href) ? " active" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="nav-cta-desktop" style={{ flexShrink: 0 }}>
            <Link href="/quote" className="btn-cta">Request Quote</Link>
          </div>

          {/* Hamburger */}
          <button
            className="menu-toggle"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span style={{ transform: open ? "translateY(7px) rotate(45deg)" : undefined, transition: "all 0.25s" }} />
            <span style={{ opacity: open ? 0 : 1, transition: "opacity 0.25s" }} />
            <span style={{ transform: open ? "translateY(-7px) rotate(-45deg)" : undefined, transition: "all 0.25s" }} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(16px)",
          borderTop: "1px solid var(--mint-100)",
          padding: "16px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}>
          {NAV_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-link ${isActive(l.href) ? "active" : ""}`}
              style={{ display: "block", width: "100%", textAlign: "left" }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/quote"
            className="btn-cta"
            style={{ display: "block", width: "100%", textAlign: "center", marginTop: "12px" }}
            onClick={() => setOpen(false)}
          >
            Request Quote
          </Link>
        </div>
      )}
    </header>
  );
}