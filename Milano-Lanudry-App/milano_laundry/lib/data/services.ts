// lib/data/services.ts
export type Service = {
  id: string;
  name: string;
  slug: string;
  short: string;
  price: number; // base price
  durationMins?: number;
};

export const services: Service[] = [
  {
    id: "wash-fold",
    name: "Wash & Fold",
    slug: "wash-fold",
    short: "Everyday garments, quick turnaround",
    price: 12,
    durationMins: 48 * 60, // 48 hours (example)
  },
  {
    id: "dry-cleaning",
    name: "Dry Cleaning",
    slug: "dry-cleaning",
    short: "Delicate items and suits",
    price: 25,
    durationMins: 72 * 60,
  },
  {
    id: "express",
    name: "Express (Same-day)",
    slug: "express",
    short: "Same-day service for urgent orders",
    price: 35,
    durationMins: 8 * 60,
  },
];

export function getServiceBySlug(slug?: string) {
  return services.find((s) => s.slug === slug);
}
