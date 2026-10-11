export type ProductUnit = "kg" | "litre" | "dozen" | "piece";
export type PriceDirection = "up" | "down" | "flat";

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: ProductUnit;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: PriceDirection; pct: number };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
};
