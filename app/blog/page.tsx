// app/blog/page.tsx
"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blog";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function BlogPage() {
  const [activeCat, setActiveCat] = useState("all");
  const [search, setSearch] = useState("");

  const featured = BLOG_POSTS.find((p) => p.featured);

  const filtered = useMemo(() => {
    let items = BLOG_POSTS.filter((p) => !p.featured);
    if (activeCat !== "all") items = items.filter((p) => p.category === activeCat);
    if (search) {
      const q = search.toLowerCase();
      items = items.filter((p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
    }
    return items;
  }, [activeCat, search]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-surface-100">
        {/* Blog hero */}
<section className="blog-hero">
  <div className="hero-grain" aria-hidden="true" />
  <div className="container relative z-10 pt-8">
    <nav className="breadcrumb breadcrumb-on-dark">
      <Link href="/">Home</Link>
      <span className="breadcrumb-sep">/</span>
      <span className="breadcrumb-current">Blog</span>
    </nav>
  </div>

  <div className="container relative z-10 pb-24 pt-8 text-center">
    <span className="hero-eyebrow" style={{ justifyContent: "center" }}>
      <span className="hero-eyebrow-dot" />
      Insights &amp; resources
    </span>
    <h1 className="font-display font-extrabold text-white mt-5 mb-4" style={{ fontSize: "clamp(32px,4.4vw,52px)", lineHeight: 1.1 }}>
      Procurement, compliance, and<br className="hidden md:block" />
      <span className="hero-gradient-text">facility operations</span>, explained.
    </h1>
    <p className="text-white/70 max-w-xl mx-auto mb-8" style={{ fontSize: 16, lineHeight: 1.7 }}>
      Practical guidance from people who buy, certify, and maintain medical equipment
      for a living — not marketing copy.
    </p>
    <div className="max-w-md mx-auto relative">
      <svg className="absolute left-[70px] top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="search"
        placeholder="Search articles…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="blog-search-input"
      />
    </div>
  </div>
</section>

        <div className="container-page py-12">
          {/* Featured post */}
          {featured && !search && activeCat === "all" && (
            <Link href={`/blog/${featured.slug}`} className="block group mb-12">
              <article className="featured-post">
                <div className="featured-post-stage">
                  <span className="blog-card-tag">Featured</span>
                </div>
                <div className="featured-post-body">
                  <p className="text-[11px] font-mono text-gold-400 uppercase tracking-widest mb-2">
                    {formatDate(featured.date)} · {featured.readMinutes} min read
                  </p>
                  <h2 className="font-display font-bold text-forest text-2xl md:text-3xl leading-snug mb-3 group-hover:text-mint-600 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-stone-500 text-sm leading-relaxed mb-5 max-w-lg">
                    {featured.excerpt}
                  </p>
                  <span className="text-sm font-semibold text-forest inline-flex items-center gap-2">
                    Read the full article
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </div>
              </article>
            </Link>
          )}

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCat(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  activeCat === cat.value
                    ? "bg-forest text-white border-forest shadow-sm"
                    : "bg-white text-stone-500 border-mint-200 hover:border-mint-400 hover:bg-mint-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <p className="text-sm text-stone-400 mb-5">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
          </p>

          {filtered.length === 0 ? (
            <div className="py-20 text-center text-stone-400">
              <p className="text-2xl mb-2">No articles found</p>
              <p className="text-sm">Try a different category or search term.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {filtered.map((p) => <BlogCard key={p.slug} post={p} />)}
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="cta-banner">
            <h2>Get insights delivered monthly</h2>
            <p>One email a month covering procurement trends, compliance updates, and maintenance best practices.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" required placeholder="you@hospital.org" className="newsletter-input" />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}   