"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { CertBadge, AvailabilityBadge } from "@/components/ui/Badge";
import { gsap } from "gsap";

const FALLBACK_IMAGE = "/images/product-placeholder.jpg";

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1 text-xs text-stone-500">
      <svg className="w-3.5 h-3.5 text-gold-300 fill-current" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.451 2.778c-.785.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.564 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
      </svg>
      <span className="font-medium text-forest">{rating.toFixed(1)}</span>
    </span>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const coverSrc = product.media?.[0] ?? FALLBACK_IMAGE;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -12;

      gsap.to(card, {
        rotateY: x,
        rotateX: y,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 800,
      });
    };

    const onLeave = () =>
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: "elastic.out(1,0.5)",
      });

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <div ref={cardRef} style={{ transformStyle: "preserve-3d" }}>
      <Link href={`/products/${product.id}`} className="block group h-full">
        <article className="h-full bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-mint-100/60 flex flex-col">

          {/* Image stage — soft gradient backdrop frames the product like studio lighting,
              instead of the photo sitting flat against a plain background */}
          <div className="relative h-52 overflow-hidden product-stage">
            <div className="product-stage-backdrop" aria-hidden="true" />
            <div className="product-stage-ring" aria-hidden="true" />

            <Image
              src={coverSrc}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain p-6 group-hover:scale-[1.04] transition-transform duration-500 relative z-10"
            />

            {product.featured && (
              <span className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-gold-300 text-forest shadow-sm">
                Featured
              </span>
            )}

            <div className="absolute top-3 right-3 z-20">
              <AvailabilityBadge status={product.availability} />
            </div>

            {/* Floating price chip anchored to the image stage — premium "shelf tag" feel */}
            <div className="product-stage-price">
              <span className="product-stage-price-label">From</span>
              <span className="product-stage-price-value">{price}</span>
            </div>
          </div>

          <div className="p-5 flex flex-col flex-1 gap-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-0.5">
                  {product.brand} · {product.sku}
                </p>
                <h3 className="font-display font-semibold text-forest text-base leading-snug group-hover:text-mint-600 transition-colors">
                  {product.name}
                </h3>
              </div>
              <StarRating rating={product.rating} />
            </div>

            <p className="text-sm text-stone-500 leading-relaxed line-clamp-2 flex-1">
              {product.shortDescription}
            </p>

            <div className="flex flex-wrap gap-1">
              {(product.certifications ?? []).map((c) => (
                <CertBadge key={c} cert={c} />
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-mint-100">
              <div>
                <p className="text-[10px] text-stone-400 uppercase tracking-wide">Starting at</p>
                <p className="font-display font-bold text-forest text-lg">{price}</p>
              </div>
              <span className="px-4 py-2 rounded-xl bg-mint-100 text-mint-600 text-xs font-semibold group-hover:bg-forest group-hover:text-white transition-colors">
                View details →
              </span>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}