// components/sections/PrecisionInMotion.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";

const PARTNERS = [
  "Siemens Healthineers", "FDA Cleared", "Philips Healthcare", "ISO 13485",
  "GE Healthcare", "CE Marked", "Roche Diagnostics", "MDR Compliant",
];

function LiveTelemetryCard() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();

    // یک قطعه‌ی کوتاه (پالس نور) که روی کل مسیر می‌چرخه
    const pulse = length * 0.22;
    const gap = length - pulse;
    gsap.set(path, { strokeDasharray: `${pulse} ${gap}`, strokeDashoffset: 0 });

    // هر دور دقیقاً یک طول کامل مسیره، پس هیچ پرشی بین دورها دیده نمی‌شه
    const tween = gsap.to(path, {
      strokeDashoffset: -length,
      duration: 2.4,
      ease: "none",
      repeat: -1,
    });

    return () => { tween.kill(); };
  }, []);

  return (
    <div className="precision-card precision-card-wide">
      <p className="precision-eyebrow">Live fleet telemetry</p>
      <h3>12,406 devices online right now</h3>
      <svg className="precision-ekg" viewBox="0 0 400 80" preserveAspectRatio="none" aria-hidden="true">
        <path
          ref={pathRef}
          d="M0 40 H110 L125 10 L140 70 L155 40 H210 L222 22 L234 58 L246 40 H400"
          fill="none"
          stroke="var(--mint-400)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="precision-sub">
        Every monitor, scanner, and ventilator we ship reports status back to our service network —
        so a fault is flagged before your team notices one.
      </p>
    </div>
  );
}

function MaintenanceStats() {
  const ref = useRef<HTMLDivElement>(null);
  const uptimeRef = useRef<HTMLSpanElement>(null);
  const responseRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !done) {
        setDone(true);
        const uptime = { val: 0 };
        const response = { val: 12 };
        gsap.to(uptime, {
          val: 99.2, duration: 1.6, ease: "power2.out",
          onUpdate: () => { if (uptimeRef.current) uptimeRef.current.textContent = uptime.val.toFixed(1); },
        });
        gsap.to(response, {
          val: 4, duration: 1.6, ease: "power2.out",
          onUpdate: () => { if (responseRef.current) responseRef.current.textContent = Math.round(response.val).toString(); },
        });
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [done]);

  return (
    <div ref={ref} className="precision-card">
      <p className="precision-eyebrow">Predictive maintenance</p>
      <h3>Service before it&apos;s urgent</h3>
      <div className="precision-stats-row">
        <div className="precision-stat">
          <span ref={uptimeRef}>0.0</span>%
          <p>Fleet uptime</p>
        </div>
        <div className="precision-stat">
          {"< "}<span ref={responseRef}>12</span>h
          <p>Avg. response time</p>
        </div>
      </div>
      <Link href="/quote" className="skill-magnetic-btn precision-btn">
        Book a live demo
      </Link>
    </div>
  );
}

function ComplianceSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    ref.current!.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current!.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={onMove} className="precision-card precision-spotlight">
      <p className="precision-eyebrow precision-eyebrow-light">Compliance at a glance</p>
      <h3 className="precision-spotlight-title">Every unit, fully traceable</h3>
      <div className="precision-cert-row">
        {["FDA", "CE", "ISO 13485", "MDR"].map((c) => (
          <span key={c} className="cert-pill precision-cert-pill">{c}</span>
        ))}
      </div>
      <p className="precision-sub precision-sub-light">
        Certification history, calibration records, and service logs are tied to every
        serial number we sell — move your cursor to see it light up.
      </p>
    </div>
  );
}

export default function PrecisionInMotion() {
  return (
    <section className="section skill-showcase">
      <div className="container">
        <div className="section-header centered">
          <p className="section-label">Behind every device</p>
          <h2 className="section-title">Precision you can see in real time</h2>
          <p className="section-desc">
            MedEquip isn&apos;t just a catalogue — it&apos;s a service layer that keeps every
            machine we sell accountable, traceable, and ready.
          </p>
        </div>

        <div className="precision-grid">
          <LiveTelemetryCard />
          <MaintenanceStats />
          <ComplianceSpotlight />
        </div>

        <div className="skill-marquee" aria-hidden="true">
          <div className="skill-marquee-track">
            {[...PARTNERS, ...PARTNERS].map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}