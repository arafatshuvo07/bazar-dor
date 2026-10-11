export default function ProfileLoading() {
  return (
    <div className="mx-auto grid w-full max-w-3xl content-start gap-6 px-4 pt-8 pb-12 min-[480px]:pt-10" role="status" aria-label="প্রোফাইল লোড হচ্ছে…">
      <div aria-hidden="true"><div className="skeleton h-8 w-1/2" /></div>
      <div className="card card-border flex-row flex-wrap items-center gap-3 border-base-300 bg-base-100 p-5 min-[480px]:flex-nowrap min-[480px]:gap-4 min-[480px]:p-6" aria-hidden="true">
        <span className="skeleton h-14 w-14 shrink-0 rounded-box min-[480px]:h-[70px] min-[480px]:w-20" /><div className="min-w-0 flex-1"><div className="skeleton h-8 w-1/2" /></div>
      </div>
      <div className="card card-border min-w-0 border-base-300 bg-base-100 p-5" aria-hidden="true">
        <div className="grid gap-4"><span className="skeleton block h-11" /><span className="skeleton block h-11" /></div>
      </div>
    </div>
  );
}
