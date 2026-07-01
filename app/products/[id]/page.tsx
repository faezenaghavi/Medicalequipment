import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CertBadge, AvailabilityBadge } from "@/components/ui/Badge";
import { PRODUCTS } from "@/data/products";

interface Props {
  params: Promise<{ id: string }>;
}

const FALLBACK_IMAGE = "/images/product-placeholder.jpg";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: String(p.id) }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === Number(id));
  if (!product) notFound();

  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const media = product.media ?? [];
  const mainImage = media[0] ?? FALLBACK_IMAGE;

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-[radial-gradient(circle_at_top,_rgba(214,240,228,0.9),_transparent_28%),linear-gradient(180deg,_#f7fbf8_0%,_#f2f7f3_45%,_#eef5f1_100%)]">
        <div className="container-page py-10">
          <nav className="mb-8 flex items-center gap-2 rounded-full border border-mint-100 bg-white/70 px-4 py-2 text-xs text-stone-500 shadow-sm backdrop-blur">
            <Link href="/" className="hover:text-forest transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-forest transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-forest">{product.name}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_400px] items-start">
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-[28px] border border-mint-100 bg-white shadow-[0_20px_60px_rgba(16,41,28,0.08)]">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.35),transparent_40%)] pointer-events-none" />
                <div className="relative h-72 md:h-[34rem]">
                  <Image
                    src={mainImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                </div>
              </div>

              {media.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {media.map((src, i) => (
                    <button
                      key={i}
                      type="button"
                      className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-mint-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400"
                      aria-label={`${product.name} view ${i + 1}`}
                    >
                      <Image
                        src={src}
                        alt={`${product.name} view ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}

              <section className="overflow-hidden rounded-[28px] border border-mint-100 bg-white shadow-[0_20px_60px_rgba(16,41,28,0.08)]">
                <div className="flex items-center justify-between border-b border-mint-100 px-6 py-4">
                  <h2 className="font-display text-lg font-semibold text-forest">
                    Technical Specifications
                  </h2>
                  <span className="rounded-full bg-mint-50 px-3 py-1 text-xs font-medium text-mint-700">
                    Verified data
                  </span>
                </div>

                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.specs).map(([k, v], i) => (
                      <tr
                        key={k}
                        className={i % 2 === 0 ? "bg-surface-100/70" : "bg-white"}
                      >
                        <td className="w-52 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-stone-500">
                          {k}
                        </td>
                        <td className="px-6 py-4 text-forest font-medium">
                          {String(v)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </div>

            <aside className="lg:sticky lg:top-28 space-y-4 rounded-[28px] border border-mint-100 bg-white/90 p-5 shadow-[0_24px_70px_rgba(16,41,28,0.10)] backdrop-blur">
              <div className="rounded-2xl bg-[linear-gradient(180deg,#ffffff,#f6fbf7)] p-1">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-stone-400">
                  {product.brand} · {product.sku}
                </p>
                <h1 className="mt-2 font-display text-2xl font-bold text-forest leading-snug">
                  {product.name}
                </h1>
                <p className="mt-3 text-sm leading-7 text-stone-500">
                  {product.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <AvailabilityBadge status={product.availability} />
                {product.leadTimeDays && (
                  <span className="rounded-full border border-mint-200 bg-mint-50 px-3 py-1 text-xs font-medium text-mint-700">
                    Lead time: {product.leadTimeDays} days
                  </span>
                )}
              </div>

              <div className="rounded-2xl border border-gold-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),#fff8e8)] p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                  Starting from
                </p>
                <p className="mt-2 font-display text-4xl font-bold text-forest">
                  {price}
                </p>
                <p className="mt-2 text-xs leading-6 text-stone-500">
                  Pricing varies by configuration. Contact for volume pricing.
                </p>
              </div>

              <Link
                href={`/quote?product=${product.id}`}
                className="block w-full rounded-2xl bg-forest px-6 py-4 text-center font-semibold text-white shadow-[0_14px_30px_rgba(26,61,41,0.25)] transition hover:bg-forest-700 hover:shadow-[0_18px_38px_rgba(26,61,41,0.3)] active:scale-[0.99]"
              >
                Request a Quote
              </Link>

              <button className="w-full rounded-2xl border border-mint-200 bg-white px-6 py-4 text-center font-semibold text-forest shadow-sm transition hover:border-mint-300 hover:bg-mint-50">
                Download Datasheet (PDF)
              </button>

              <div className="flex flex-wrap gap-2 pt-2">
                {(product.tags ?? []).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-mint-200 bg-mint-50 px-3 py-1 text-xs font-medium text-mint-700"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {(product.certifications ?? []).map((c) => (
                  <CertBadge key={c} cert={c} />
                ))}
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <section className="mt-20">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold text-forest">
                    Related Products
                  </h2>
                  <p className="mt-1 text-sm text-stone-500">
                    Similar devices from the same category.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => {
                  const relatedImage = p.media?.[0] ?? FALLBACK_IMAGE;

                  return (
                    <Link
                      key={p.id}
                      href={`/products/${p.id}`}
                      className="group flex items-start gap-4 rounded-2xl border border-mint-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-mint-300 hover:shadow-[0_16px_36px_rgba(16,41,28,0.10)]"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-mint-50">
                        <Image
                          src={relatedImage}
                          alt={p.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-mono uppercase tracking-wide text-stone-400">
                          {p.brand}
                        </p>
                        <p className="mt-1 truncate font-semibold text-forest text-sm group-hover:text-mint-600 transition-colors">
                          {p.name}
                        </p>
                        <p className="mt-1 text-xs text-stone-400">{p.sku}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}