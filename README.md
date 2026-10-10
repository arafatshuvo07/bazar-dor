# বাজার দর | Bazar Dor

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দাম, দামের পরিবর্তন এবং বাজারভিত্তিক তথ্য দেখার Next.js application।

Assignment: [B14-A7-Bazar-Dor](https://github.com/ProgrammingHero1/B14-A7-Bazar-Dor)

## বর্তমান অবস্থা

প্রথম ধাপ: project setup, dependencies এবং folder structure তৈরি হয়েছে। Application features পরবর্তী ধাপে তৈরি হবে। Home page এখন Next.js starter page।

## প্রযুক্তি

Next.js App Router, React, TypeScript, Tailwind CSS, Radix UI, Better Auth, React Hot Toast ও Phosphor Icons।

## পরিকল্পিত features

1. API থেকে পণ্যের দাম ও category দেখানো।
2. সবচেয়ে বেশি দাম বাড়া এবং কমা পণ্যের তালিকা।
3. Category filter এবং numeric price sorting।
4. Email/password, Google ও GitHub authentication।
5. Login করা ব্যবহারকারীর জন্য বাজারভিত্তিক product details।
6. My Profile থেকে নাম update।
7. Responsive layout, loading, empty ও error states।

## চালানোর নিয়ম

Node.js 22 বা নতুন সংস্করণ এবং npm ব্যবহার করুন।

```bash
npm ci
npm run dev
```

Local address: http://localhost:3000

```bash
npm run lint
npm run build
npm start
```

## Folder structure

```text
bazar-dor/
├── docs/requirements.md
├── public/images/
├── src/
│   ├── app/
│   │   ├── api/auth/[...all]/
│   │   ├── category/[slug]/
│   │   ├── product/[slug]/
│   │   ├── signin/
│   │   ├── signup/
│   │   └── my-profile/update/
│   ├── components/
│   │   ├── auth/
│   │   ├── layout/
│   │   ├── products/
│   │   └── ui/
│   ├── lib/
│   ├── providers/
│   └── types/
├── package.json
└── package-lock.json
```

Empty folders-এ `.gitkeep` আছে। এগুলো এখনো route বা feature implement করে না।

## API

Primary: `https://openapi.programming-hero.com/api/bazardor`

Alternative: `https://api.abcz.workers.dev/api/bazardor`

Endpoints: `/products`, `/products?category=chal`, `/products/1`, `/categories`, `/categories/chal`।

## Development

প্রতিটি সম্পূর্ণ কাজের ধাপের পরে meaningful commit করা হবে। Assignment অনুযায়ী অন্তত ৮টি meaningful commit প্রয়োজন। [Requirement checklist](docs/requirements.md)

Live website link deployment-এর পরে যোগ করা হবে।

## Dependency check

Setup-এর সময় `npm audit --omit=dev`-এ কোনো vulnerability পাওয়া যায়নি। Full audit-এ ESLint-এর transitive dependency chain-এ ৫টি high advisory এসেছে; সংশ্লিষ্ট `braces` package-এর patched release এখনো npm-এ পাওয়া যায়নি। Framework downgrade করে automatic force-fix প্রয়োগ করা হয়নি।
