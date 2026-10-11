# বাজার দর | Bazar Dor

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দাম, দামের পরিবর্তন এবং বাজারভিত্তিক তথ্য দেখার Next.js application।

Assignment: [B14-A7-Bazar-Dor](https://github.com/ProgrammingHero1/B14-A7-Bazar-Dor)

## বর্তমান অবস্থা

Project setup-এর পরে shared layout তৈরি হয়েছে: Hind Siliguri font, reference-এর রং ও spacing, responsive Navbar এবং Footer। Navbar-এ ঢাকা সময় অনুযায়ী বাংলা তারিখ, API থেকে category এবং সাইন ইন/সাইন আপ links আছে। ছোট screen-এ category তালিকা পাশাপাশি scroll করা যায়।

Home page-এ supplied design-এর hero, সবচেয়ে বেশি দাম বাড়া/কমা পণ্য এবং সব পণ্যের তালিকা তৈরি হয়েছে। Navbar-এর নিচে API data দিয়ে চলমান price ticker আছে।

Category page-এ API থেকে নির্দিষ্ট ক্যাটাগরির পণ্য, শিরোনাম ও সংখ্যা দেখানো হয়। ভুল বা ফাঁকা ক্যাটাগরিতে হোমে ফেরার link এবং সংযোগের সমস্যায় retry আছে। Email/password authentication, Sign In/Sign Up, session অনুযায়ী Navbar ও logout তৈরি হয়েছে। Google/GitHub OAuth wiring আছে; provider credentials যোগ করা ও আসল social login যাচাই বাকি। Protected product details-এ server session যাচাই, product summary, category link, বাজারভিত্তিক table এবং সর্বনিম্ন/সর্বাধিক/গড় দাম আছে। Protected My Profile-এ বর্তমান নাম, ইমেইল ও sign out আছে; নাম update-এর কাজ পরের ধাপে।

## প্রযুক্তি

Next.js App Router, React, TypeScript, Tailwind CSS, Radix UI, Better Auth, React Hot Toast ও Phosphor Icons।

## তৈরি হয়েছে

1. API থেকে সব পণ্যের বর্তমান দাম ও category দেখানো।
2. পরিবর্তনের শতাংশ অনুযায়ী শীর্ষ ছয়টি দাম বাড়া এবং কমা পণ্য।
3. বাংলা সংখ্যা, একক এবং দামের পরিবর্তনসহ responsive product cards।
4. চলমান price ticker, pause control ও reduced-motion support।
5. Hero থেকে একই পেজের সব পণ্যের তালিকায় যাওয়ার button।
6. Home-এর loading skeleton, empty state এবং error হলে retry।
7. Dynamic category route, API filtering ও loading skeleton।
8. Category page-এ default, কম থেকে বেশি ও বেশি থেকে কম দামে সাজানো।
9. Better Auth email signup/login, persistent session ও logout।
10. Form validation, password visibility, বাংলা toast এবং account dropdown।
11. Protected product details, বাজারের দাম ও সর্বনিম্ন/সর্বাধিক/গড় summary।
12. Reference অনুযায়ী protected My Profile, নাম/ইমেইল ও sign out।

## পরবর্তী কাজ

Google/GitHub credentials ও end-to-end social login verification, My Profile থেকে নাম update ও deployment।

## চালানোর নিয়ম

Node.js 22.18 বা নতুন সংস্করণ এবং npm ব্যবহার করুন।

```bash
npm ci
cp .env.example .env.local
# .env.local-এ BETTER_AUTH_SECRET এবং BETTER_AUTH_URL বসান
npm run db:migrate
npm run dev -- --port 3001
```

Default local address: http://localhost:3000। Port ব্যবহৃত থাকলে terminal-এ দেখানো address ব্যবহার করুন।

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

Navbar-এর category data এক ঘণ্টা cache করা হয়। Primary API ব্যর্থ হলে alternative API থেকে চেষ্টা করা হয়; কোনো endpoint থেকেই data না এলে Navbar-এ বাংলায় error message দেখায়।

Category page-এ `/products?category=slug` থেকে data আসে। Sort control সংখ্যাগত দাম দিয়ে সাজায়; ডিফল্টে API-এর মূল ক্রম ফিরে আসে এবং category বদলালে sorting reset হয়।

Product data পাঁচ মিনিট cache করা হয়। Home ও ticker একই request-এর data ব্যবহার করে। দাম কমার শতাংশ API-তে negative হলেও display-তে `▼` চিহ্নের পরে absolute value দেখায়।

## Development

প্রতিটি সম্পূর্ণ কাজের ধাপের পরে meaningful commit করা হবে। Assignment অনুযায়ী অন্তত ৮টি meaningful commit প্রয়োজন। [Requirement checklist](docs/requirements.md)

Live website link deployment-এর পরে যোগ করা হবে।

## Dependency check

Setup-এর সময় `npm audit --omit=dev`-এ কোনো vulnerability পাওয়া যায়নি। Full audit-এ ESLint-এর transitive dependency chain-এ ৫টি high advisory এসেছে; সংশ্লিষ্ট `braces` package-এর patched release এখনো npm-এ পাওয়া যায়নি। Framework downgrade করে automatic force-fix প্রয়োগ করা হয়নি।

## Authentication setup

Better Auth-এর email/password server, session API এবং database migration যুক্ত হয়েছে। `BETTER_AUTH_SECRET`-এ অন্তত ৩২ অক্ষরের random secret দিন (`openssl rand -base64 48`)। `BETTER_AUTH_URL` browser-এর origin-এর সঙ্গে মিলতে হবে; local setup-এ `http://localhost:3001`।

SQLite database `DATABASE_PATH`-এ স্থায়ীভাবে সংরক্ষণ হয়। `.env.local`, database ও journal files Git-এ রাখা হয় না। Schema তৈরি/পরিবর্তনের জন্য `npm run db:migrate`; authentication পরীক্ষা করতে `npm run test:auth`।

Google OAuth app-এর redirect URI: `<BETTER_AUTH_URL>/api/auth/callback/google`। GitHub OAuth app-এর callback: `<BETTER_AUTH_URL>/api/auth/callback/github`। নিজস্ব provider app-এর client ID ও secret `.env.local`-এর সংশ্লিষ্ট চারটি variable-এ বসাতে হবে। Credentials না থাকলে সংশ্লিষ্ট social button বন্ধ থাকে।

বর্তমান SQLite setup local বা persistent disk-সহ Node hosting-এর জন্য। Vercel/Netlify-এর ephemeral filesystem-এ এই database deploy করা যাবে না; deployment ধাপে persistent hosted database যুক্ত করতে হবে।

Email signup-এর পরে Sign In, login-এর পরে Home-এ যাওয়া হয়। Better Auth-এর `autoSignIn: false` duplicate email-এর ক্ষেত্রেও একই signup response দেয়; UI কোনো নতুন account তৈরি হওয়ার মিথ্যা নিশ্চয়তা দেয় না।

`npm run test:auth` password hashing, session cookie, ভুল password, logout revocation, origin checking এবং দুই provider-এর authorize URL যাচাই করে। Browser-এ signup, password mismatch, login, reload-এ session এবং logout যাচাই করা হয়েছে। Provider authorize URL পরীক্ষা আসল Google/GitHub account দিয়ে login পরীক্ষার বিকল্প নয়।

Product URL-এ session যাচাইয়ের পরে slug থেকে numeric ID resolve করে `/products/{id}` ব্যবহার করা হয়। অজানা product-এ friendly 404; সাময়িক সমস্যায় retry দেখায়। Signed-out user toast-সহ Sign In-এ যায়; সফল login-এর গন্তব্য Home। `npm run test:products` দিয়ে data lookup ও route guard যাচাই করা যায়।

## বাজারভিত্তিক হিসাব

সর্বনিম্ন দাম সব বাজারের `min`-এর সর্বনিম্ন মান; সর্বাধিক দাম সব `max`-এর সর্বোচ্চ মান। প্রতিটি বাজারের গড় `(min + max) / 2`; summary-তে এই গড়গুলোর arithmetic mean দেখানো হয়। Display-তে সর্বোচ্চ দুই decimal ব্যবহার করা হয়। বাজারের data ফাঁকা থাকলে দাম বানিয়ে দেখানো হয় না।

Product details-এ 320, 390, 768 ও 1440px layout, keyboard table scrolling, direct URL reload, invalid slug, guest/forged/revoked session এবং logout-এর পর Back navigation যাচাই করা হয়েছে। Profile page, hosted database/deployment এবং credential-সহ social login যাচাই বাকি।
