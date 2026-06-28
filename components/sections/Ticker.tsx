"use client";

const ITEMS = ["Imaging Systems","Patient Monitoring","Surgical Equipment","Respiratory Care","Diagnostic Labs","Rehabilitation","FDA Cleared","MDR Compliant","ISO 13485","Global Delivery","Clinical Support","98 Countries"];

function TickerItem({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-4 mx-6">
      <span className="w-1.5 h-1.5 rounded-full bg-gold-300 shrink-0"/>
      <span className="text-sm font-medium text-stone-500 whitespace-nowrap">{label}</span>
    </span>
  );
}

export default function Ticker() {
  const items = [...ITEMS, ...ITEMS];
  
  return (
    <div className="border-y border-mint-100 bg-white py-4 overflow-hidden" aria-hidden="true">
      <div 
        className="ticker-track flex w-max"
        style={{
          animation: 'ticker 20s linear infinite',
          willChange: 'transform',
        }}
      >
        {items.map((s, i) => <TickerItem key={i} label={s}/>)}
      </div>
      
      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .ticker-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}