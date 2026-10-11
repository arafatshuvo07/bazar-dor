export default function ProductLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-6 pb-12" aria-busy="true">
      <p className="sr-only" role="status">পণ্যের বিস্তারিত লোড হচ্ছে…</p>
      <div className="flex min-h-[174px] flex-col items-start justify-between gap-6 rounded-box border border-base-300 bg-base-100 p-5 md:flex-row md:items-center" aria-hidden="true">
        <span className="skeleton size-12 rounded-xl" /><span className="skeleton h-8 w-1/2" /><span className="skeleton h-8 w-2/5" />
      </div>
      <div className="mt-6 grid gap-6" aria-hidden="true">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="grid min-h-[102px] content-center gap-2 rounded-box border border-base-300 bg-base-100 p-4">
              <span className="skeleton h-8 w-1/2" /><span className="skeleton h-8 w-2/5" />
            </div>
          ))}
        </div>
        <div className="grid gap-3 rounded-box border border-base-300 bg-base-100 p-4">
          {Array.from({ length: 5 }, (_, index) => <span key={index} className="skeleton h-8" />)}
        </div>
      </div>
    </div>
  );
}
