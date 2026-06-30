// components/layout/Navbar.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/data/products";

const PRODUCT_CATS = CATEGORIES.filter((c) => c.value !== "all");

const MAIN_LINKS = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCat = searchParams.get("cat");

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll);
    document.addEventListener("mousedown", onClickOutside);
    onScroll();
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  const isProductsActive = pathname === "/products";
  const isCatActive = (cat: string) => isProductsActive && currentCat === cat;

  return (
    <header className={`navbar${scrolled ? " navbar-scrolled" : ""}`}>
      <div className="container">
        <div className="navbar-inner">
          <Link href="/" className="logo">
            <span className="logo-icon">M</span>
            Med<span className="logo-accent">Equip</span>
          </Link>

          <nav className="nav-links" aria-label="Main navigation">
            <div className="nav-dropdown" ref={dropdownRef}>
              <button
                type="button"
                className={`nav-link nav-dropdown-trigger${isProductsActive ? " active" : ""}`}
                onClick={() => setProductsOpen((o) => !o)}
                aria-expanded={productsOpen}
              >
                Products
                <svg width="12" height="12" viewBox="0 0 12 12" style={{ transform: productsOpen ? "rotate(180deg)" : undefined, transition: "transform .2s" }}>
                  <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {productsOpen && (
                <div className="nav-dropdown-panel">
                  <Link
                    href="/products"
                    className={`nav-dropdown-item${isProductsActive && !currentCat ? " active" : ""}`}
                    onClick={() => setProductsOpen(false)}
                  >
                    All products
                  </Link>
                  {PRODUCT_CATS.map((c) => (
                    <Link
                      key={c.value}
                      href={`/products?cat=${c.value}`}
                      className={`nav-dropdown-item${isCatActive(c.value) ? " active" : ""}`}
                      onClick={() => setProductsOpen(false)}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {MAIN_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link${pathname === l.href ? " active" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="nav-cta-desktop" style={{ flexShrink: 0 }}>
            <Link href="/quote" className="btn-cta">Request Quote</Link>
          </div>

          <button
            className="menu-toggle"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span style={{ transform: open ? "translateY(7px) rotate(45deg)" : undefined, transition: "all .25s" }} />
            <span style={{ opacity: open ? 0 : 1, transition: "opacity .25s" }} />
            <span style={{ transform: open ? "translateY(-7px) rotate(-45deg)" : undefined, transition: "all .25s" }} />
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-drawer">
          <p className="mobile-drawer-label">Products</p>
          <Link href="/products" className="nav-link" onClick={() => setOpen(false)}>All products</Link>
          {PRODUCT_CATS.map((c) => (
            <Link key={c.value} href={`/products?cat=${c.value}`} className="nav-link" onClick={() => setOpen(false)}>
              {c.label}
            </Link>
          ))}
          <p className="mobile-drawer-label mobile-drawer-label-top">Company</p>
          {MAIN_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/quote" className="btn-cta mobile-cta" onClick={() => setOpen(false)}>
            Request Quote
          </Link>
        </div>
      )}
    </header>
  );
}