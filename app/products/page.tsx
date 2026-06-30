"use client";
import { useState,useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Navbar       from "@/components/layout/Navbar";
import Footer       from "@/components/layout/Footer";
import ProductCard  from "@/components/product/ProductCard";
import { PRODUCTS, CATEGORIES } from "@/data/products";


function CatalogContent() {
  const searchParams = useSearchParams();
  const catFromUrl = searchParams.get("cat") ?? "all";
const [activeCat, setActiveCat] = useState(catFromUrl);
  const [search,    setSearch]    = useState("");
  const [sort,      setSort]      = useState("name");

  const filtered = useMemo(() => {
    let items = [...PRODUCTS];
    if (activeCat !== "all") items = items.filter((p) => p.category === activeCat);
    if (search)              items = items.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())));
    if (sort === "price-asc")  items.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") items.sort((a, b) => b.price - a.price);
    if (sort === "name")       items.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "rating")     items.sort((a, b) => b.rating - a.rating);
    return items;
  }, [activeCat, search, sort]);

  useEffect(() => {
  setActiveCat(catFromUrl);
}, [catFromUrl]);

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-surface-100">
        <div className="container-page py-10">

          {/* Header */}
          <div className="mb-8">
            <p className="text-xs font-mono text-gold-400 uppercase tracking-widest mb-1">Catalogue</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-forest">Medical Equipment</h1>
          </div>

          {/* Search + sort bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="search"
                placeholder="Search equipment, brand, tags…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-mint-200 bg-white text-sm text-forest placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-mint-300"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-mint-200 bg-white text-sm text-forest focus:outline-none focus:ring-2 focus:ring-mint-300"
            >
              <option value="name">Sort: Name A–Z</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="price-asc">Sort: Price ↑</option>
              <option value="price-desc">Sort: Price ↓</option>
            </select>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
  {CATEGORIES.map((cat) => {
    const Icon = cat.icon;

    return (
      <button
        key={cat.value}
        onClick={() => setActiveCat(cat.value)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
          activeCat === cat.value
            ? "bg-forest text-white border-forest shadow-sm"
            : "bg-white text-stone border-mint-200 hover:border-mint-400 hover:bg-mint-50"
        }`}
      >
        <Icon className="h-4 w-4" />
        {cat.label}
      </button>
    );
  })}
</div>

          {/* Results */}
          <p className="text-sm text-stone-400 mb-5">{filtered.length} product{filtered.length !== 1 ? "s" : ""} found</p>

          {filtered.length === 0 ? (
            <div className="py-20 text-center text-stone-400">
              <p className="text-2xl mb-2">No results</p>
              <p className="text-sm">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense>
      <CatalogContent />
    </Suspense>
  );
}