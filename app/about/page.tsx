import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ShieldCheck, Globe2, Users, Award } from "lucide-react";

const STATS = [
  { icon: Users,       value: "800+", label: "Hospital Partners"   },
  { icon: Globe2,      value: "60+",  label: "Countries Served"    },
  { icon: Award,       value: "15yr", label: "Industry Experience" },
  { icon: ShieldCheck, value: "100%", label: "Certified Inventory" },
];

const CERTS = ["FDA Registered", "CE Marked", "ISO 13485:2016", "EU MDR Compliant", "ANVISA Listed"];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-surface-100">
        <div className="page-header" style={{ marginTop: 0, paddingTop: "40px" }}>
          <div className="container">
            <nav className="breadcrumb">
              <Link href="/">Home</Link>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-current">About</span>
            </nav>
            <p className="section-label">Our Story</p>
            <h1 className="section-title" style={{ marginBottom: 0 }}>About MedEquip</h1>
          </div>
        </div>

        <div className="container" style={{ maxWidth: 800, paddingTop: 48, paddingBottom: 80 }}>
          <p style={{ fontSize: 16, color: "var(--stone-500)", lineHeight: 1.8, marginBottom: 24 }}>
            Founded in 2009, MedEquip was built on a simple belief: healthcare professionals
            deserve access to world-class equipment without the complexity of international
            procurement. We started by connecting hospitals in the Middle East with European
            imaging systems, and have grown into a global platform serving over 800 facilities
            across 60+ countries.
          </p>
          <p style={{ fontSize: 16, color: "var(--stone-500)", lineHeight: 1.8, marginBottom: 40 }}>
            Every product in our catalogue is independently verified for regulatory compliance —
            FDA, CE, ISO 13485 — before listing. We don&apos;t just sell equipment: we manage
            logistics, installation coordination, staff training, and long-term maintenance contracts.
          </p>

          <div className="features-grid" style={{ marginBottom: 48 }}>
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="feature-card" style={{ textAlign: "center" }}>
                <div className="feature-icon" style={{ margin: "0 auto 16px" }}>
                  <Icon className="w-6 h-6" />
                </div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 30, fontWeight: 800, color: "var(--forest)" }}>{value}</div>
                <div style={{ fontSize: 13, color: "var(--stone-400)" }}>{label}</div>
              </div>
            ))}
          </div>

          <h2 className="section-title" style={{ fontSize: 24, marginBottom: 16 }}>Our Certifications</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 40 }}>
            {CERTS.map(c => (
              <span key={c} className="badge badge-cert" style={{ fontSize: 14, padding: "8px 18px" }}>{c}</span>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/quote" className="btn-primary">Work With Us</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}