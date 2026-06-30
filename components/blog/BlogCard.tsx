// components/blog/BlogCard.tsx
import Link from "next/link";
import type { BlogPost } from "@/data/blog";

const CATEGORY_LABELS: Record<BlogPost["category"], string> = {
  procurement: "Procurement",
  compliance: "Compliance",
  maintenance: "Maintenance",
  "facility-ops": "Facility Ops",
  "industry-news": "Industry News",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group h-full">
      <article className="h-full bg-white rounded-2xl overflow-hidden border border-mint-100/70 hover:border-mint-300 hover:shadow-card-hover transition-all duration-300 flex flex-col">
        <div className="relative h-40 blog-card-stage flex items-center justify-center">
          <span className="blog-card-tag">{CATEGORY_LABELS[post.category]}</span>
        </div>
        <div className="p-5 flex flex-col flex-1 gap-3">
          <p className="text-[11px] font-mono text-stone-400 uppercase tracking-wider">
            {formatDate(post.date)} · {post.readMinutes} min read
          </p>
          <h3 className="font-display font-semibold text-forest text-base leading-snug group-hover:text-mint-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-stone-500 leading-relaxed line-clamp-2 flex-1">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-mint-100">
            <span className="text-xs font-medium text-stone-500">{post.author}</span>
            <span className="text-xs font-semibold text-mint-600 group-hover:text-forest transition-colors">
              Read article →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}