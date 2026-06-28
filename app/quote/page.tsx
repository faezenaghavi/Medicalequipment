"use client";
import { useState } from "react";
import { Suspense }  from "react";
import { useSearchParams } from "next/navigation";
import Navbar  from "@/components/layout/Navbar";
import Footer  from "@/components/layout/Footer";
import { PRODUCTS } from "@/data/products";
import { quotesApi } from "@/lib/api";

type Status = "idle" | "loading" | "success" | "error";

const STEPS = ["Contact", "Project", "Review"];

function QuoteForm() {
  const searchParams = useSearchParams();
  const preselected  = Number(searchParams.get("product") ?? 0);

  const [step,   setStep]   = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [refId,  setRefId]  = useState("");

  const [first,    setFirst]    = useState("");
  const [last,     setLast]     = useState("");
  const [email,    setEmail]    = useState("");
  const [org,      setOrg]      = useState("");
  const [phone,    setPhone]    = useState("");
  const [product,  setProduct]  = useState(preselected || "");
  const [qty,      setQty]      = useState(1);
  const [timeframe,setTimeframe]= useState("");
  const [notes,    setNotes]    = useState("");
  const [error,    setError]    = useState("");

  const INPUT = "w-full px-4 py-3 rounded-xl border border-mint-200 bg-white text-forest text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-mint-300 transition-all";
  const LABEL = "block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5";

  const validateStep = () => {
    if (step === 0 && (!first.trim() || !last.trim() || !email.trim() || !org.trim())) {
      setError("Please fill in all required fields."); return false;
    }
    if (step === 1 && (!product || !timeframe)) {
      setError("Please complete all project details."); return false;
    }
    setError(""); return true;
  };

  const next = () => { if (validateStep()) setStep((s) => s + 1); };
  const back = () => { setError(""); setStep((s) => s - 1); };

  const handleSubmit = async () => {
    setStatus("loading");
    try {
      const res = await quotesApi.submit({
        productId: Number(product) || undefined,
        firstName: first, lastName: last, email, organization: org,
        phone: phone || undefined, quantity: qty, timeframe, notes,
      });
      setRefId(res.id);
      setStatus("success");
    } catch {
      setError("Submission failed. Please try again."); setStatus("error");
    }
  };

  const selectedProduct = PRODUCTS.find((p) => p.id === Number(product));

  if (status === "success") {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-16 h-16 rounded-full bg-mint-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-mint-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h2 className="font-display font-bold text-forest text-3xl mb-3">Quote Request Received!</h2>
        <p className="text-stone-500 mb-2">Reference: <span className="font-mono font-medium text-forest">{refId}</span></p>
        <p className="text-stone-500 text-sm leading-relaxed max-w-sm mx-auto">
          Our clinical sales team will contact you at <strong>{email}</strong> within 24 hours with a personalized quote.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-10">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-3 flex-1 last:flex-none">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${i <= step ? "bg-forest text-white" : "bg-mint-100 text-stone-400"}`}>
              {i < step ? "✓" : i + 1}
            </div>
            <span className={`text-sm font-medium hidden sm:block ${i === step ? "text-forest" : "text-stone-400"}`}>{s}</span>
            {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 ${i < step ? "bg-forest" : "bg-mint-100"}`}/>}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-mint-100 p-8 shadow-card">

        {/* Step 0: Contact */}
        {step === 0 && (
          <div className="space-y-5">
            <h2 className="font-display font-bold text-forest text-2xl mb-6">Contact Information</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div><label className={LABEL}>First Name *</label><input className={INPUT} placeholder="Jane" value={first} onChange={(e) => setFirst(e.target.value)}/></div>
              <div><label className={LABEL}>Last Name *</label><input className={INPUT} placeholder="Smith" value={last} onChange={(e) => setLast(e.target.value)}/></div>
            </div>
            <div><label className={LABEL}>Work Email *</label><input type="email" className={INPUT} placeholder="jane@hospital.org" value={email} onChange={(e) => setEmail(e.target.value)}/></div>
            <div><label className={LABEL}>Organization *</label><input className={INPUT} placeholder="City General Hospital" value={org} onChange={(e) => setOrg(e.target.value)}/></div>
            <div><label className={LABEL}>Phone (Optional)</label><input type="tel" className={INPUT} placeholder="+1 555 000 0000" value={phone} onChange={(e) => setPhone(e.target.value)}/></div>
          </div>
        )}

        {/* Step 1: Project */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="font-display font-bold text-forest text-2xl mb-6">Project Details</h2>
            <div>
              <label className={LABEL}>Product of Interest</label>
              <select className={INPUT} value={product} onChange={(e) => setProduct(e.target.value)}>
                <option value="">Select a product (optional)</option>
                {PRODUCTS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className={LABEL}>Quantity *</label>
              <input type="number" min={1} className={INPUT} value={qty} onChange={(e) => setQty(Number(e.target.value))}/>
            </div>
            <div>
              <label className={LABEL}>Required Timeframe *</label>
              <select className={INPUT} value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
                <option value="">Select timeframe</option>
                <option value="asap">ASAP / Urgent</option>
                <option value="1m">Within 1 month</option>
                <option value="3m">1–3 months</option>
                <option value="6m">3–6 months</option>
                <option value="planning">Planning stage</option>
              </select>
            </div>
            <div>
              <label className={LABEL}>Additional Notes</label>
              <textarea rows={4} className={`${INPUT} resize-none`} placeholder="Describe your specific requirements, installation site, budget range, or any clinical constraints…" value={notes} onChange={(e) => setNotes(e.target.value)}/>
            </div>
          </div>
        )}

        {/* Step 2: Review */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="font-display font-bold text-forest text-2xl mb-6">Review & Submit</h2>
            <div className="bg-surface-100 rounded-2xl p-5 space-y-3 text-sm">
              {[
                ["Name",         `${first} ${last}`],
                ["Email",        email],
                ["Organization", org],
                ["Product",      selectedProduct?.name ?? "Not specified"],
                ["Quantity",     qty],
                ["Timeframe",    timeframe],
              ].map(([k, v]) => (
                <div key={String(k)} className="flex gap-3">
                  <span className="text-stone-400 w-28 shrink-0">{k}</span>
                  <span className="text-forest font-medium">{String(v)}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              By submitting, you agree that MedEquip may contact you regarding this inquiry. Your data is processed in accordance with our Privacy Policy.
            </p>
          </div>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-500 border-l-2 border-red-400 pl-3">{error}</p>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-mint-100">
          <button onClick={back} disabled={step === 0}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-stone border border-stone-200 hover:bg-stone-50 disabled:opacity-0 transition-all"
          >
            ← Back
          </button>

          {step < STEPS.length - 1 ? (
            <button onClick={next}
              className="px-6 py-3 rounded-xl bg-forest text-white text-sm font-semibold hover:bg-forest-700 active:scale-[0.98] transition-all shadow-md"
            >
              Continue →
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={status === "loading"}
              className="px-6 py-3 rounded-xl bg-gold-300 text-forest text-sm font-bold hover:bg-gold-400 active:scale-[0.98] disabled:opacity-60 transition-all shadow-gold"
            >
              {status === "loading" ? "Submitting…" : "Submit Quote Request"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function QuotePage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-surface-100">
        <div className="container-page py-10">
          <div className="text-center mb-12">
            <p className="text-xs font-mono text-gold-400 uppercase tracking-widest mb-2">Get Pricing</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-forest mb-3">Request a Quote</h1>
            <p className="text-stone-500 max-w-md mx-auto text-sm leading-relaxed">
              Complete the form below and our clinical sales team will provide a personalised quote within 24 hours.
            </p>
          </div>
          <Suspense>
            <QuoteForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}