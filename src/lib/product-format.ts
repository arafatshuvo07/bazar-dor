import type { PriceDirection, ProductUnit } from "@/types/product";

const priceFormatter = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export const unitLabels: Record<ProductUnit, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export const unitDescriptions: Record<ProductUnit, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

export const changeSymbols: Record<PriceDirection, string> = {
  up: "▲",
  down: "▼",
  flat: "—",
};

export const changeLabels: Record<PriceDirection, string> = {
  up: "দাম বেড়েছে",
  down: "দাম কমেছে",
  flat: "দাম অপরিবর্তিত",
};

export function formatPrice(price: number) {
  return priceFormatter.format(price);
}

export function formatPercent(percent: number) {
  return percentFormatter.format(Math.abs(percent));
}
