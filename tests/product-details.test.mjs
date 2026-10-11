import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);
function loadModule(path, mocks, globals = {}) {
  const testModule = { exports: {} };
  const source = readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 } });
  vm.runInNewContext(outputText, { module: testModule, exports: testModule.exports, require: (name) => name in mocks ? mocks[name] : require(name), URL, AbortSignal, ...globals });
  return testModule.exports;
}

const product = {
  id: 17, slug: "test-rice", nameBn: "পরীক্ষার চাল", category: "chal", categoryNameBn: "চাল", categoryIcon: "🍚", image: "🍚", unit: "kg",
  today: 120, yesterday: 100, lastWeek: 90, lastMonth: 80, change: { dir: "up", pct: 20 },
  markets: [{ market: "প্রথম বাজার", division: "ঢাকা", min: 90, max: 110 }],
};
const response = (data, status = 200) => ({ status, ok: status === 200, json: async () => data });
const loadProducts = (fetch) => loadModule("src/lib/products.ts", { "server-only": {}, react: { cache: (fn) => fn }, "next/cache": { cacheLife: () => {} } }, { fetch });

test("slug lookup requests the numeric detail endpoint", async () => {
  const calls = [];
  const { getProductBySlug } = loadProducts(async (url) => { calls.push(String(url)); return response(calls.length === 1 ? [product] : product); });
  assert.equal((await getProductBySlug(product.slug)).id, 17);
  assert(calls[1].endsWith("/products/17"));
});
test("unknown slug stops after catalog lookup", async () => {
  let calls = 0;
  const { getProductBySlug } = loadProducts(async () => { calls++; return response([product]); });
  assert.equal(await getProductBySlug("unknown"), null);
  assert.equal(calls, 1);
});
test("a mismatched detail response falls back rather than rendering another product", async () => {
  let calls = 0;
  const { getProductBySlug } = loadProducts(async () => response(++calls === 1 ? [product] : calls === 2 ? { ...product, slug: "another-product" } : product));
  assert.equal((await getProductBySlug(product.slug)).slug, product.slug);
  assert.equal(calls, 3);
});
test("two detail 404s mean missing, but an outage is an error", async () => {
  for (const status of [404, 503]) {
    let calls = 0;
    const { getProductBySlug } = loadProducts(async () => ++calls === 1 ? response([product]) : response({}, status));
    if (status === 404) assert.equal(await getProductBySlug(product.slug), null);
    else await assert.rejects(getProductBySlug(product.slug), /unavailable/);
  }
});
test("empty market data remains a valid product", async () => {
  let calls = 0;
  const { getProductBySlug } = loadProducts(async () => response(++calls === 1 ? [product] : { ...product, markets: [] }));
  assert.equal((await getProductBySlug(product.slug)).markets.length, 0);
});
test("protected page validates the session before loading any product", async () => {
  let session = null, productCalls = 0;
  const { default: page } = loadModule("src/app/product/[slug]/page.tsx", {
    "next/link": { default: () => null },
    "next/headers": { headers: async () => ({}) },
    "next/navigation": { redirect: (url) => { throw new Error(`REDIRECT:${url}`); }, notFound: () => { throw new Error("NOT_FOUND"); } },
    "@/lib/auth": { auth: { api: { getSession: async () => session } } },
    "@/lib/products": { getProductBySlug: async () => { productCalls++; return product; } },
    "@/components/products/product-summary": { ProductSummary: () => null },
    "@/components/products/market-prices": { ProductMarketPrices: () => null },
  });
  await assert.rejects(page({ params: Promise.resolve({ slug: product.slug }) }), /REDIRECT:\/signin\?reason=login-required/);
  assert.equal(productCalls, 0);
  session = { user: { id: "signed-in-user" } };
  assert(await page({ params: Promise.resolve({ slug: product.slug }) }));
  assert.equal(productCalls, 1);
});

test("market summary uses all market ranges, not the product headline price", () => {
  const { getMarketSummary } = loadModule("src/lib/market-prices.ts", {});
  const markets = [
    { market: "ক", division: "ঢাকা", min: 80, max: 100 },
    { market: "খ", division: "ঢাকা", min: 100, max: 130 },
    { market: "গ", division: "চট্টগ্রাম", min: 90, max: 110 },
  ];
  const result = getMarketSummary(markets);
  assert.equal(result.minimum, 80);
  assert.equal(result.maximum, 130);
  assert.equal(result.average, (90 + 115 + 100) / 3);
  assert.equal(getMarketSummary([]), null);
  assert.equal(getMarketSummary([{ ...markets[0], min: 0, max: 0 }]).average, 0);
});

test("market table renders every market, correct units and an honest empty state", () => {
  const helpers = loadModule("src/lib/market-prices.ts", {});
  const formatters = loadModule("src/lib/product-format.ts", {});
  const { ProductMarketPrices } = loadModule("src/components/products/market-prices.tsx", {
    "@/lib/market-prices": helpers, "@/lib/product-format": formatters,
  });
  const { renderToStaticMarkup } = require("react-dom/server");
  const html = renderToStaticMarkup(ProductMarketPrices({ product: { ...product, unit: "litre" } }));
  assert(html.includes("প্রতি লিটার"));
  assert(html.includes("প্রথম বাজার"));
  assert(html.includes('scope="row"'));
  assert(html.includes("১০০"));
  const empty = renderToStaticMarkup(ProductMarketPrices({ product: { ...product, markets: [] } }));
  assert(empty.includes("বাজারভিত্তিক দাম এখন পাওয়া যাচ্ছে না"));
  assert(!empty.includes("<table"));
  assert(!empty.includes("NaN") && !empty.includes("Infinity"));
});
