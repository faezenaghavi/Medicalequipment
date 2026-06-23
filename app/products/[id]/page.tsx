import { notFound } from "next/navigation";
import Link         from "next/link";
import Image        from "next/image";
import Navbar       from "@/components/layout/Navbar";
import Footer       from "@/components/layout/Footer";
import { CertBadge, AvailabilityBadge } from "@/components/ui/Badge";
import { PRODUCTS }  from "@/data/products";

interface Props { params: Promise<{ id: string }> }

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: String(p.id) }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === Number(id));
  if (!product) notFound();

  const price = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(product.price);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-surface-100">
        <div className="container-page py-10">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-stone-400 mb-8">
            <Link href="/" className="hover:text-forest transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-forest transition-colors">Products</Link>
            <span>/</span>
            <span className="text-forest">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">

            {/* Left: image + specs */}
            <div>
              {/* Main image */}
              <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden bg-mint-50 mb-4 border border-mint-100">
                <Image
                  src={product.media[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              </div>

              {/* Thumbnails */}
              {product.media.length > 1 && (
                <div className="flex gap-3 mb-8">
                  {product.media.map((src, i) => (
                    <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-mint-200 shrink-0">
                      <Image src={src} alt={`${product.name} view ${i + 1}`} fill className="object-cover" sizes="80px"/>
                    </div>
                  ))}
                </div>
              )}

              {/* Spec table */}
              <div className="bg-white rounded-2xl border border-mint-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-mint-100">
                  <h2 className="font-display font-semibold text-forest text-lg">Technical Specifications</h2>
                </div>
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.specs).map(([k, v], i) => (
                      <tr key={k} className={i % 2 === 0 ? "bg-surface-100" : "bg-white"}>
                        <td className="px-6 py-3 text-stone-500 font-medium w-48">{k}</td>
                        <td className="px-6 py-3 text-forest font-medium">{String(v)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: info + CTA */}
            <div className="lg:sticky lg:top-28 space-y-5">
              <div>
                <p className="text-xs font-mono text-stone-400 uppercase tracking-wider mb-1">{product.brand} · {product.sku}</p>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-forest leading-snug mb-3">{product.name}</h1>
                <p className="text-stone-500 text-sm leading-relaxed mb-4">{product.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <AvailabilityBadge status={product.availability} />
                  {product.leadTimeDays && (
                    <span className="text-xs text-stone-400">Lead time: {product.leadTimeDays} days</span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {product.certifications.map((c) => <CertBadge key={c} cert={c}/>)}
                </div>
              </div>

              {/* Price */}
              <div className="bg-white rounded-2xl border border-mint-100 p-5">
                <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">Starting from</p>
                <p className="font-display font-bold text-forest text-3xl mb-1">{price}</p>
                <p className="text-xs text-stone-400">Pricing varies by configuration. Contact for volume pricing.</p>
              </div>

              {/* CTAs */}
              <Link
                href={`/quote?product=${product.id}`}
                className="block w-full text-center px-6 py-4 rounded-2xl bg-forest text-white font-semibold hover:bg-forest-700 active:scale-[0.98] transition-all duration-200 shadow-md"
              >
                Request a Quote
              </Link>
              <button className="w-full text-center px-6 py-4 rounded-2xl border-2 border-mint-200 text-forest font-semibold hover:bg-mint-50 hover:border-mint-400 transition-all duration-200">
                Download Datasheet (PDF)
              </button>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {product.tags.map((t) => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-mint-50 text-mint-600 border border-mint-200">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-20">
              <h2 className="font-display font-bold text-forest text-2xl mb-6">Related Products</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p) => (
                  <Link key={p.id} href={`/products/${p.id}`} className="group bg-white rounded-2xl border border-mint-100 hover:border-mint-300 hover:shadow-card p-5 transition-all duration-200 flex items-start gap-4">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-mint-50">
                      <Image src={p.media[0]} alt={p.name} fill className="object-cover" sizes="80px"/>
                    </div>
                    <div>
                      <p className="text-xs text-stone-400 mb-0.5">{p.brand}</p>
                      <p className="font-semibold text-forest text-sm group-hover:text-mint-600 transition-colors">{p.name}</p>
                      <p className="text-xs text-stone-400 mt-1">{p.sku}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
