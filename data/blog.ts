// data/blog.ts — اضافه کردن فیلد content به interface و به هر پست
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[]; // ← جدید: هر آیتم یک پاراگراف
  category: "procurement" | "compliance" | "maintenance" | "facility-ops" | "industry-news";
  author: string;
  authorRole: string; // ← جدید: برای کارت نویسنده
  date: string;
  readMinutes: number;
  featured?: boolean;
}

export const BLOG_CATEGORIES = [
  { value: "all", label: "All Articles" },
  { value: "procurement", label: "Procurement" },
  { value: "compliance", label: "Compliance" },
  { value: "maintenance", label: "Maintenance" },
  { value: "facility-ops", label: "Facility Ops" },
  { value: "industry-news", label: "Industry News" },
] as const;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "capital-equipment-budgeting-2026",
    title: "How Hospitals Should Budget for Capital Equipment in 2026",
    excerpt:
      "Reimbursement shifts and supply chain volatility are reshaping how facilities plan multi-year equipment purchases. Here's a practical framework.",
    content: [
      "Capital equipment budgeting has historically followed a simple five-year replacement cycle: depreciate, request, replace. That model is breaking down. Reimbursement structures are shifting faster than depreciation schedules, and lead times on high-value imaging and surgical systems have stretched well past their pre-pandemic baselines.",
      "The facilities handling this best have moved to a rolling three-tier framework instead of a fixed annual budget. Tier one covers equipment with active service contracts nearing expiration — these get evaluated first, since the cost of an extended warranty often signals when replacement is cheaper than repair. Tier two covers utilization-driven upgrades, where usage data rather than age determines priority. Tier three is opportunistic: equipment that becomes available below market value through trade-in programs or refurbished channels.",
      "One pattern worth highlighting: facilities that loop biomedical engineering into the budgeting conversation early — rather than after a purchase order is already drafted — consistently report fewer unplanned capital requests mid-year. Maintenance teams see failure patterns procurement teams don't.",
      "The other major shift is financing structure. More systems are moving toward equipment-as-a-service arrangements for high-turnover categories like patient monitors, while reserving traditional capital purchases for long-lifecycle imaging systems. The math only works if your procurement team is tracking total cost of ownership, not just sticker price.",
      "None of this requires new software or a consulting engagement. It requires treating the budget as a living document reviewed quarterly against actual service and utilization data, rather than a once-a-year exercise built on last year's spreadsheet.",
    ],
    category: "procurement",
    author: "Dana Whitfield",
    authorRole: "Director of Procurement Strategy",
    date: "2026-06-18",
    readMinutes: 7,
    featured: true,
  },
  {
    slug: "iso-13485-checklist",
    title: "An ISO 13485 Checklist for Equipment Buyers, Not Manufacturers",
    excerpt:
      "Most compliance guides are written for device makers. This one is for the procurement team deciding what to actually buy.",
    content: [
      "Search for ISO 13485 guidance and almost everything you find is written for manufacturers building a quality management system from scratch. If you're on the buying side, deciding which vendors to trust, that's the wrong document. What you actually need is a much shorter list of things to verify before a purchase order goes out.",
      "Start with certification scope, not just the certificate itself. A valid ISO 13485 certificate can cover a narrow product category — confirm the specific equipment you're buying falls within the certified scope, not just the manufacturer's general quality system.",
      "Next, ask for the certificate's issuing body and cross-check it against an accredited registrar list. Self-issued or unaccredited certifications are more common than buyers expect, particularly with newer entrants to a product category.",
      "Third, request post-market surveillance documentation, not just design history. ISO 13485 compliance is ongoing, not a one-time gate. A manufacturer that can produce recent complaint-handling and corrective-action records is demonstrating an active system, not a framed certificate.",
      "Finally, build certification expiry dates directly into your asset management system, the same way you'd track a warranty. Certifications lapse. The equipment doesn't stop working when they do, but your audit trail does.",
    ],
    category: "compliance",
    author: "Marcus Chen",
    authorRole: "Head of Regulatory Affairs",
    date: "2026-06-02",
    readMinutes: 6,
  },
  {
    slug: "preventive-maintenance-roi",
    title: "The ROI of Preventive Maintenance Contracts",
    excerpt:
      "We modeled five years of service data across MRI, monitoring, and surgical fleets. The breakeven point surprised us.",
    content: [
      "Preventive maintenance contracts are usually sold on risk reduction, not return on investment. That framing undersells them. Across five years of service data spanning MRI systems, patient monitoring fleets, and surgical equipment, the facilities with comprehensive PM contracts showed a measurably different cost curve than those running reactive maintenance only.",
      "For MRI and other high-value imaging systems, the breakeven point arrived faster than expected — typically within 18 months — driven almost entirely by avoided unplanned downtime rather than reduced repair costs. A single unplanned coil failure on a 1.5T system can cost more in lost scan revenue over two weeks than an annual PM contract costs outright.",
      "Patient monitoring told a different story. Individual unit failures are cheap and fast to resolve, so PM contracts on monitors showed a much longer breakeven horizon — often past three years. The math there favors a hybrid approach: PM coverage on central station infrastructure, reactive repair on individual bedside units.",
      "Surgical equipment sat in between, with breakeven driven less by repair cost and more by case cancellation risk. A failed anaesthesia workstation on the morning of a scheduled procedure carries costs far beyond the device itself.",
      "The practical takeaway: don't apply a blanket PM strategy across an entire fleet. Match contract intensity to the actual cost of downtime for each equipment category, not just its purchase price.",
    ],
    category: "maintenance",
    author: "Priya Nair",
    authorRole: "Clinical Engineering Lead",
    date: "2026-05-21",
    readMinutes: 9,
  },
  {
    slug: "or-room-turnover-equipment",
    title: "Cutting OR Turnover Time Through Better Equipment Layout",
    excerpt:
      "Small changes to anaesthesia cart placement and monitor positioning shaved nine minutes off average turnover at three pilot sites.",
    content: [
      "Operating room turnover time gets attributed to staffing and scheduling far more often than it gets attributed to equipment layout. Across three pilot sites, repositioning just two pieces of equipment — the anaesthesia cart and the primary patient monitor — produced a measurable nine-minute average reduction in turnover, without any change to staffing levels.",
      "The core issue was cable management, not floor space. Monitors positioned to optimize sightlines during a procedure were frequently in the wrong position for the cleaning and re-setup that happens between cases, forcing staff to route around fixed cabling rather than working a clean, repeatable path.",
      "The fix was a dual-position mounting approach: a procedure position and a turnover position, marked on the floor, with cable management that supports both without disconnection. It sounds minor. Across a high-volume OR running eight to ten cases a day, nine minutes per turnover compounds into roughly an extra case slot per week.",
      "None of the three pilot sites required new equipment purchases. This was entirely a layout and workflow change applied to equipment already in use, which is part of why it's underreported — it doesn't show up as a line item anyone budgets for.",
    ],
    category: "facility-ops",
    author: "Dana Whitfield",
    authorRole: "Director of Procurement Strategy",
    date: "2026-05-09",
    readMinutes: 5,
  },
  {
    slug: "fda-mdr-changes",
    title: "What the Latest FDA Guidance Means for Imaging Equipment Buyers",
    excerpt:
      "A plain-language breakdown of recent regulatory updates and what they actually change for hospital procurement teams.",
    content: [
      "Regulatory guidance updates tend to get summarized in language written for legal and regulatory teams, which leaves procurement staff either ignoring them entirely or over-reacting to changes that don't actually affect a purchasing decision. Here's what the latest round of guidance on imaging equipment actually changes for buyers, in plain terms.",
      "The most relevant shift is around software-as-a-medical-device components bundled with imaging hardware. AI-assisted detection features that ship alongside a scanner now fall under separate clearance pathways from the hardware itself, which means a system's overall FDA status can be more layered than a single clearance number suggests.",
      "For buyers, the practical step is to request clearance documentation for each distinct software component, not just the parent system, particularly for anything marketed as diagnostic-assist rather than purely image-acquisition.",
      "The second change worth tracking concerns post-market data reporting timelines, which have tightened. This doesn't change what you need to do at purchase time, but it does mean manufacturer responsiveness to field issues is now a more reliable signal of vendor quality than it was two years ago — slow responses are now also a compliance gap, not just a service complaint.",
    ],
    category: "industry-news",
    author: "Marcus Chen",
    authorRole: "Head of Regulatory Affairs",
    date: "2026-04-27",
    readMinutes: 8,
  },
  {
    slug: "refurbished-vs-new-mri",
    title: "Refurbished vs. New: A Honest Cost Comparison for MRI Systems",
    excerpt:
      "Refurbished units can save 40% upfront. We break down where that math holds up and where it quietly falls apart.",
    content: [
      "A 40% upfront discount on a refurbished 1.5T system is a real and verifiable number. What's less often discussed is how that number behaves over a full ownership cycle, where the comparison gets considerably more situational.",
      "Refurbished systems generally hold up well on gradient and RF hardware, which tends to be the most expensive component to replace and the most reliably reconditioned by quality refurbishers. Where the savings erode fastest is in software licensing and coil compatibility — refurbished units are frequently sold with an older software baseline, and bringing them current can mean licensing costs that weren't part of the original quote.",
      "Service contract pricing is the other variable that shifts the math. Refurbished units, particularly those past a manufacturer's standard support window, often carry meaningfully higher annual service costs, which can offset a significant portion of the upfront savings over a five-year hold.",
      "The honest conclusion: refurbished makes the strongest financial case for facilities replacing an aging system with predictable case volume and no near-term plans for advanced sequence upgrades. It makes a weaker case for a first imaging suite in a growing facility, where software currency and warranty coverage carry more weight than upfront price.",
    ],
    category: "procurement",
    author: "Priya Nair",
    authorRole: "Clinical Engineering Lead",
    date: "2026-04-11",
    readMinutes: 6,
  },
  {
    slug: "ventilator-fleet-tracking",
    title: "Building a Ventilator Fleet Tracking System That Actually Gets Used",
    excerpt:
      "Most asset-tracking rollouts fail in the first quarter. Here's what made ours stick across 14 facilities.",
    content: [
      "Asset-tracking systems for ventilator fleets fail for a predictable reason: they're designed around the asset, not around the person who has to scan it during a code or a rapid transfer. Across 14 facilities, the rollouts that survived past the first quarter shared one decision in common — tracking compliance was never made a manual step that competed with patient care.",
      "The systems that stuck used passive RFID rather than barcode scanning, specifically because it didn't require a clinician to stop and aim a scanner during a high-stress handoff. The tracking happened as a byproduct of the equipment moving through doorways already instrumented with readers, not as an additional task.",
      "The second factor was data ownership. Facilities that handed fleet visibility data to clinical engineering, rather than only to a central supply chain dashboard, saw far higher day-to-day engagement, because the people closest to equipment failures were also the people who could act on the data immediately.",
      "The least successful rollouts treated tracking as a compliance project with a launch date. The ones that stuck treated it as an ongoing clinical engineering tool, reviewed weekly rather than audited annually.",
    ],
    category: "facility-ops",
    author: "Dana Whitfield",
    authorRole: "Director of Procurement Strategy",
    date: "2026-03-30",
    readMinutes: 7,
  },
];