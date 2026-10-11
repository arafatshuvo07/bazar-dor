import Image from "next/image";
import { connection } from "next/server";
import { getBangladeshDate } from "@/lib/bangladesh-date";

function HeroContent({ dateLabel, dateTime }: { dateLabel?: string; dateTime?: string }) {
  return (
    <section
      className="grid min-h-[283px] items-center gap-4 rounded-3xl border border-base-300 bg-base-100 p-5 min-[480px]:p-6 md:grid-cols-[minmax(0,1fr)_260px] md:gap-5 lg:grid-cols-[minmax(0,1fr)_315px] lg:gap-8 lg:py-2.5"
      aria-labelledby="hero-title"
    >
      <div>
        {dateLabel ? (
          <time className="badge badge-accent mb-2 h-7 rounded-full px-3 text-sm font-medium" dateTime={dateTime}>
            {dateLabel}
          </time>
        ) : <span className="skeleton mb-2 block h-7 w-48 rounded-full" aria-hidden="true" />}
        <h1 id="hero-title" className="mb-2 text-[28px] leading-9 font-bold md:text-3xl md:leading-10 lg:text-4xl lg:leading-[45px]">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="mb-4 max-w-[680px] text-[#3c4e40]">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
          গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <a href="#সব-পণ্য" className="btn btn-primary btn-sm sm:btn-md">সব পণ্য দেখুন</a>
      </div>
      <Image
        className="h-auto w-60 justify-self-center md:w-[260px] lg:w-[315px]"
        src="/images/bazar-hero.png"
        width={315}
        height={263}
        alt="তাজা ফলের ঝুড়ি"
        preload
        sizes="(max-width: 767px) 240px, 315px"
      />
    </section>
  );
}

export async function Hero() {
  await connection();
  const date = getBangladeshDate(new Date());
  return <HeroContent dateLabel={date.label} dateTime={date.dateTime} />;
}

export function HeroSkeleton() {
  return <HeroContent />;
}
