import { getMarketSummary } from "@/lib/market-prices";
import { formatPrice, unitLabels } from "@/lib/product-format";
import type { Product } from "@/types/product";

export function ProductMarketPrices({ product }: { product: Product }) {
  const summary = getMarketSummary(product.markets);
  const unit = unitLabels[product.unit];
  const summaryHeadingId = `market-summary-${product.id}`;
  const marketsHeadingId = `market-prices-${product.id}`;

  return (
    <div className="product-market-prices">
      <section className="market-summary" aria-labelledby={summaryHeadingId}>
        <h2 id={summaryHeadingId}>দামের সারসংক্ষেপ</h2>
        {summary ? (
          <>
            <dl className="market-summary-grid">
              <div className="market-summary-stat market-summary-stat--minimum">
                <dt>সর্বনিম্ন দাম</dt>
                <dd className="market-summary-value">
                  {formatPrice(summary.minimum)} টাকা
                  <span className="market-summary-caption">
                    সবচেয়ে কম দামের বাজার
                  </span>
                </dd>
              </div>
              <div className="market-summary-stat market-summary-stat--maximum">
                <dt>সর্বাধিক দাম</dt>
                <dd className="market-summary-value">
                  {formatPrice(summary.maximum)} টাকা
                  <span className="market-summary-caption">
                    সবচেয়ে বেশি দামের বাজার
                  </span>
                </dd>
              </div>
              <div className="market-summary-stat market-summary-stat--average">
                <dt>গড় দাম</dt>
                <dd className="market-summary-value">
                  {formatPrice(summary.average)} টাকা
                  <span className="market-summary-caption">
                    প্রতি {unit} হিসাবে
                  </span>
                </dd>
              </div>
            </dl>
            <p className="market-average-note">
              প্রতিটি বাজারের গড় = (সর্বনিম্ন + সর্বাধিক) ÷ ২; এরপর সব বাজারের
              গড়ের গড় হিসাব করা হয়েছে।
            </p>
          </>
        ) : (
          <p className="market-empty-state">
            বাজারভিত্তিক দাম পাওয়া গেলে সারসংক্ষেপ এখানে দেখা যাবে।
          </p>
        )}
      </section>

      <section
        className="market-prices-section"
        aria-labelledby={marketsHeadingId}
      >
        <h2 id={marketsHeadingId}>বাজারভিত্তিক আজকের দাম</h2>
        {summary ? (
          <div
            className="market-table-scroll"
            role="region"
            aria-labelledby={marketsHeadingId}
            tabIndex={0}
          >
            <table className="market-table">
              <caption className="market-table-caption">
                সব দাম প্রতি {unit} হিসাবে টাকায় দেখানো হয়েছে।
              </caption>
              <thead>
                <tr>
                  <th scope="col">বাজার</th>
                  <th scope="col">বিভাগ</th>
                  <th scope="col">সর্বনিম্ন</th>
                  <th scope="col">সর্বাধিক</th>
                  <th scope="col">গড়</th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((market, index) => (
                  <tr key={`${market.division}-${market.market}-${index}`}>
                    <th scope="row">{market.market}</th>
                    <td>{market.division}</td>
                    <td className="market-price-cell">
                      {formatPrice(market.min)}
                    </td>
                    <td className="market-price-cell">
                      {formatPrice(market.max)}
                    </td>
                    <td className="market-price-cell market-midpoint-cell">
                      {formatPrice((market.min + market.max) / 2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="market-empty-state">
            এই পণ্যের বাজারভিত্তিক দাম এখন পাওয়া যাচ্ছে না।
          </p>
        )}
      </section>
    </div>
  );
}
