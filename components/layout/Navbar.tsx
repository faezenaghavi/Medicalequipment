"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/products",          label: "Products"   },
  { href: "/products?cat=imaging", label: "Imaging" },
  { href: "/products?cat=monitoring", label: "Monitoring" },
  { href: "/quote",             label: "Get a Quote" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-card" : "bg-transparent"}`}>
      <div className="container-page h-16 md:h-20 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="w-8 h-8 rounded-lg bg-mint-200 flex items-center justify-center text-forest font-bold text-sm">M</span>
          <span className="font-display font-700 text-forest text-lg tracking-tight">Med<span className="text-gold-300">Equip</span></span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}
              className="px-4 py-2 rounded-xl text-sm font-medium text-stone-500 hover:text-forest hover:bg-mint-50 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/quote"
            className="px-5 py-2.5 rounded-xl bg-forest text-surface-50 text-sm font-semibold hover:bg-forest-700 active:scale-[0.98] transition-all duration-200"
          >
            Request Quote
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-forest transition-transform ${open ? "rotate-45 translate-y-2" : ""}`}/>
          <span className={`block w-6 h-0.5 bg-forest transition-opacity ${open ? "opacity-0" : ""}`}/>
          <span className={`block w-6 h-0.5 bg-forest transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`}/>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-mint-100 py-4 px-5 space-y-1">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-medium text-stone hover:bg-mint-50 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/quote" onClick={() => setOpen(false)}
            className="block mt-2 px-4 py-3 rounded-xl text-sm font-semibold text-center bg-forest text-white"
          >
            Request Quote
          </Link>
        </div>
      )}
    </header>
  );
}