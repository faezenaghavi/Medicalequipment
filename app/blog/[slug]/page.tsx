// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const categoryLabel = BLOG_CATEGORIES.find((c) => c.value === post.category)?.label ?? post.category;

  const related = BLOG_POSTS.filter(
    (p) => p.category === post.category && p.slug !== post.slug
  ).slice(0, 3);

  const initials = post.author.split(" ").map((n) => n[0]).join("");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-surface-100">
        {/* Article hero */}
        <section className="article-hero">
          <div className="hero-grain" aria-hidden="true" />
          <div className="container relative z-10 py-20">
            <nav className="article-breadcrumb">
              <Link href="/blog">Blog</Link>
              <span>/</span>
              <span>{categoryLabel}</span>
            </nav>

            <span className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              {categoryLabel}
            </span>

            <h1 className="article-title">{post.title}</h1>

            <div className="article-meta">
              <div className="article-meta-author">
                <span className="author-avatar article-avatar">{initials}</span>
                <div>
                  <p className="author-name article-author-name">{post.author}</p>
                  <p className="author-role article-author-role">{post.authorRole}</p>
                </div>
              </div>
              <span className="article-meta-divider" />
              <span className="article-meta-item">{formatDate(post.date)}</span>
              <span className="article-meta-divider" />
              <span className="article-meta-item">{post.readMinutes} min read</span>
            </div>
          </div>
        </section>

        <div className="container-page py-12">
          <div className="article-layout">
            <article className="article-body">
              {post.content.map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              <div className="article-tags">
                <span className="tag">{categoryLabel}</span>
                <span className="tag">Medical Equipment</span>
                <span className="tag">Facility Operations</span>
              </div>

              <div className="article-share">
                <span>Share this article</span>
                <div className="article-share-icons">
                  {["LinkedIn", "X", "Email"].map((s) => (
                    <button key={s} type="button" className="article-share-btn">{s}</button>
                  ))}
                </div>
              </div>
            </article>

            <aside className="article-sidebar">
              <div className="article-sidebar-card">
                <p className="article-sidebar-label">Written by</p>
                <div className="article-meta-author" style={{ marginBottom: 0 }}>
                  <span className="author-avatar article-avatar">{initials}</span>
                  <div>
                    <p className="author-name article-author-name">{post.author}</p>
                    <p className="author-role article-author-role">{post.authorRole}</p>
                  </div>
                </div>
              </div>

              <div className="article-sidebar-card article-sidebar-cta">
                <p className="article-sidebar-label">Need equipment?</p>
                <p className="article-sidebar-cta-text">
                  Browse our certified catalogue or request a tailored quote for your facility.
                </p>
                <Link href="/quote" className="btn-cta article-sidebar-btn">Request a quote</Link>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <section className="mt-20">
              <h2 className="font-display font-bold text-forest text-2xl mb-6">
                More on {categoryLabel}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p) => <BlogCard key={p.slug} post={p} />)}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}