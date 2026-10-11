import type { Product } from "@/types/product";

export type MarketSummary = {
  minimum: number;
  maximum: number;
  average: number;
};

export function getMarketSummary(
  markets: Product["markets"],
): MarketSummary | null {
  if (markets.length === 0) {
    return null;
  }

  let minimum = markets[0].min;
  let maximum = markets[0].max;
  let midpointTotal = 0;

  for (const market of markets) {
    minimum = Math.min(minimum, market.min);
    maximum = Math.max(maximum, market.max);
    midpointTotal += (market.min + market.max) / 2;
  }

  return {
    minimum,
    maximum,
    average: midpointTotal / markets.length,
  };
}
