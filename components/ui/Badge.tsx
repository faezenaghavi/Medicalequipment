/* ── Availability badge ── */
export function AvailabilityBadge({ status }: { status: string }) {
  if (status === "in-stock")
    return <span className="badge badge-available">✓ In Stock</span>;
  if (status === "limited" || status === "lead-time")
    return <span className="badge badge-limited">⚠ Limited Stock</span>;
  return <span className="badge badge-order">↻ Made to Order</span>;
}

/* ── Certification badge ── */
export function CertBadge({ cert }: { cert: string }) {
  return <span className="badge badge-cert">{cert}</span>;
}

/* ── Star rating ── */
export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="product-rating">
      <span className="star">★</span>
      <span>{rating.toFixed(1)}</span>
    </div>
  );
}