// app/contact/page.tsx
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const CONTACT_INFO = [
  {
    label: "Sales & Quotes",
    value: "sales@medequip.com",
    sub: "Response within 1 business day",
  },
  {
    label: "Phone",
    value: "+1 (415) 555-0148",
    sub: "Mon–Fri, 8am–6pm EST",
  },
  {
    label: "Headquarters",
    value: "120 Harbor Way, Suite 400",
    sub: "Boston, MA 02110",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="p-24 min-h-screen bg-surface-100">
        <div className="container-page py-10 md:py-14">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">Contact</span>
          </nav>

          <div className="contact-header">
            <p className="text-xs font-mono text-gold-400 uppercase tracking-widest mb-1">
              Get in touch
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-forest mb-4">
              Contact Us
            </h1>
            <p className="text-stone-500 max-w-xl">
              For sales, support, or service inquiries, reach our team directly or
              request a formal quote — we typically respond within one business day.
            </p>
          </div>

          <div className="contact-layout">
            {/* Info column */}
            <div className="contact-info-col">
              {CONTACT_INFO.map((item) => (
                <div key={item.label} className="contact-info-card">
                  <p className="contact-info-label">{item.label}</p>
                  <p className="contact-info-value">{item.value}</p>
                  <p className="contact-info-sub">{item.sub}</p>
                </div>
              ))}

              <Link href="/quote" className="btn-primary contact-quote-btn">
                Request a Quote
              </Link>
            </div>

            {/* Form column */}
            <div className="form-card contact-form-card">
              <form className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Full name</label>
                    <input id="name" type="text" className="form-input" placeholder="Jane Doe" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input id="email" type="email" className="form-input" placeholder="jane@hospital.org" required />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="org">Organization</label>
                  <input id="org" type="text" className="form-input" placeholder="St. Mary's Medical Center" />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea id="message" className="form-textarea" placeholder="Tell us what you're looking for…" required />
                </div>

                <button type="submit" className="form-submit">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}