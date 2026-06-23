export type Category = "imaging" | "monitoring" | "surgical" | "respiratory" | "diagnostic" | "rehabilitation";
export type Certification = "FDA" | "MDR" | "ISO13485" | "CE";
export type Availability = "in-stock" | "lead-time" | "on-request";

export interface Product {
  id: number;
  sku: string;
  name: string;
  brand: string;
  category: Category;
  shortDescription: string;
  description: string;
  price: number;
  currency: "USD";
  availability: Availability;
  leadTimeDays?: number;
  certifications: Certification[];
  specs: Record<string, string | number>;
  media: string[];
  tags: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
}

export interface QuoteRequest {
  productId?: number;
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  phone?: string;
  quantity: number;
  timeframe: string;
  notes?: string;
}