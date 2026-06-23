import { Certification } from "@/types";

const CERT_COLORS: Record<string, string> = {
  FDA:      "bg-blue-50 text-blue-700 border-blue-200",
  MDR:      "bg-violet-50 text-violet-700 border-violet-200",
  ISO13485: "bg-amber-50 text-amber-700 border-amber-200",
  CE:       "bg-green-50 text-green-700 border-green-200",
};

export function CertBadge({ cert }: { cert: Certification }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono font-medium border ${CERT_COLORS[cert] ?? "bg-stone-50 text-stone-600 border-stone-200"}`}>
      {cert}
    </span>
  );
}

export function AvailabilityBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "in-stock":   "bg-mint-100 text-mint-600 border-mint-200",
    "lead-time":  "bg-gold-50 text-gold-500 border-gold-200",
    "on-request": "bg-stone-100 text-stone-500 border-stone-200",
  };
  const label: Record<string, string> = {
    "in-stock":   "In Stock",
    "lead-time":  "Lead Time",
    "on-request": "On Request",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${map[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === "in-stock" ? "bg-mint-500 animate-pulse" : "bg-gold-400"}`}/>
      {label[status] ?? status}
    </span>
  );
}