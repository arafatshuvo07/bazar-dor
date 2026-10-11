import { getMarketSummary } from "@/lib/market-prices";
import { formatPrice, unitLabels } from "@/lib/product-format";
import type { Product } from "@/types/product";

const statClass = "stat grid content-center gap-1 rounded-box border border-base-300 bg-base-100 p-4 min-h-[102px]";
const valueClass = "stat-value text-2xl leading-8 font-bold";
const captionClass = "stat-desc block text-xs font-normal text-muted";
const headingClass = "mb-3 text-lg leading-7 font-semibold";
const emptyClass = "rounded-box border border-base-300 bg-base-100 p-6 text-sm text-muted";

export function ProductMarketPrices({ product }: { product: Product }) {
  const summary = getMarketSummary(product.markets);
  const unit = unitLabels[product.unit];
  const summaryHeadingId = `market-summary-${product.id}`;
  const marketsHeadingId = `market-prices-${product.id}`;

  return (
    <div className="mt-6 grid min-w-0 gap-6">
      <section className="min-w-0" aria-labelledby={summaryHeadingId}>
        <h2 id={summaryHeadingId} className={headingClass}>দামের সারসংক্ষেপ</h2>
        {summary ? (
          <>
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className={statClass}>
                <dt className="stat-title text-xs text-muted">সর্বনিম্ন দাম</dt>
                <dd className={valueClass}>
                  {formatPrice(summary.minimum)} টাকা
                  <span className={captionClass}>
                    সবচেয়ে কম দামের বাজার
                  </span>
                </dd>
              </div>
              <div className={statClass}>
                <dt className="stat-title text-xs text-muted">সর্বাধিক দাম</dt>
                <dd className={valueClass}>
                  {formatPrice(summary.maximum)} টাকা
                  <span className={captionClass}>
                    সবচেয়ে বেশি দামের বাজার
                  </span>
                </dd>
              </div>
              <div className={statClass}>
                <dt className="stat-title text-xs text-muted">গড় দাম</dt>
                <dd className={valueClass}>
                  {formatPrice(summary.average)} টাকা
                  <span className={captionClass}>
                    প্রতি {unit} হিসাবে
                  </span>
                </dd>
              </div>
            </dl>
            <p className="mt-2.5 text-xs leading-5 text-muted">
              প্রতিটি বাজারের গড় = (সর্বনিম্ন + সর্বাধিক) ÷ ২; এরপর সব বাজারের
              গড়ের গড় হিসাব করা হয়েছে।
            </p>
          </>
        ) : (
          <p className={emptyClass}>
            বাজারভিত্তিক দাম পাওয়া গেলে সারসংক্ষেপ এখানে দেখা যাবে।
          </p>
        )}
      </section>

      <section className="min-w-0" aria-labelledby={marketsHeadingId}>
        <h2 id={marketsHeadingId} className={headingClass}>বাজারভিত্তিক আজকের দাম</h2>
        {summary ? (
          <div
            className="max-w-full overflow-x-auto rounded-box border border-base-300 bg-base-100"
            role="region"
            aria-labelledby={marketsHeadingId}
            tabIndex={0}
          >
            <table className="table table-zebra min-w-[600px] text-sm">
              <caption className="px-4 py-3 text-left text-xs text-muted">
                সব দাম প্রতি {unit} হিসাবে টাকায় দেখানো হয়েছে।
              </caption>
              <thead className="bg-soft text-muted">
                <tr>
                  <th scope="col">বাজার</th>
                  <th scope="col">বিভাগ</th>
                  <th scope="col" className="text-right">সর্বনিম্ন</th>
                  <th scope="col" className="text-right">সর্বাধিক</th>
                  <th scope="col" className="text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((market, index) => (
                  <tr key={`${market.division}-${market.market}-${index}`}>
                    <th scope="row" className="font-medium">{market.market}</th>
                    <td>{market.division}</td>
                    <td className="text-right tabular-nums">
                      {formatPrice(market.min)}
                    </td>
                    <td className="text-right tabular-nums">
                      {formatPrice(market.max)}
                    </td>
                    <td className="text-right font-semibold tabular-nums">
                      {formatPrice((market.min + market.max) / 2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className={emptyClass}>
            এই পণ্যের বাজারভিত্তিক দাম এখন পাওয়া যাচ্ছে না।
          </p>
        )}
      </section>
    </div>
  );
}
