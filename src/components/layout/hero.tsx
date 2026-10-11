import Image from "next/image";
import { connection } from "next/server";
import { getBangladeshDate } from "@/lib/bangladesh-date";

function HeroContent({ dateLabel, dateTime }: { dateLabel?: string; dateTime?: string }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        {dateLabel ? (
          <time className="hero-eyebrow" dateTime={dateTime}>{dateLabel}</time>
        ) : <span className="hero-eyebrow hero-date-placeholder" aria-hidden="true" />}
        <h1 id="hero-title">আজকের বাজারের দাম এক নজরে</h1>
        <p>
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
          গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <a href="#সব-পণ্য" className="button button-primary button-sm">সব পণ্য দেখুন</a>
      </div>
      <Image
        className="hero-image"
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
