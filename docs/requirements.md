# Assignment checklist

Source: https://github.com/ProgrammingHero1/B14-A7-Bazar-Dor

## কাজের নিয়ম

- একবারে একটি অনুমোদিত ধাপ সম্পূর্ণ করা হবে।
- প্রতিটি ধাপ যাচাই করে meaningful commit ও GitHub push করা হবে।
- মোট অন্তত ৮টি meaningful commit; শুধু সংখ্যা বাড়াতে কাজ ভাগ করা হবে না।
- Design reference, বাংলা copy ও API data অনুসরণ করা হবে।
- Lorem ipsum, কাল্পনিক দাম ও অপ্রাসঙ্গিক marketing copy ব্যবহার করা হবে না।

## প্রথম ধাপ

- [x] Next.js App Router, TypeScript ও Tailwind installation
- [x] Better Auth, toast, component ও icon dependencies
- [x] Project ও route placeholder folders
- [x] Assignment-এর hero ও logo assets
- [x] GitHub repository, setup commit ও push

## Main requirements

- [x] Navbar: logo, বাংলা date, active category, auth buttons ও profile menu
- [x] Design foundation: Hind Siliguri, reference palette ও shared spacing
- [x] Signed-out Navbar: logo, ঢাকা সময়ের বাংলা date, API category ও account links
- [x] Category navigation: pathname অনুযায়ী active link, mobile scrolling ও keyboard focus
- [x] Signed-in Navbar: session, profile menu ও logout
- [x] Infinite price ticker: emoji, নাম, দাম, unit ও পরিবর্তন; pause ও reduced-motion support
- [x] Hero: heading, subtitle, image, একই পেজের সব-পণ্য section-এ anchor CTA
- [x] Home: top 6 risers, top 6 fallers ও সব product cards
- [x] Cards: emoji, নাম, unit, বাংলায় দাম ও change badge
- [x] Category: API filter, heading, icon, skeleton ও empty state
- [x] Protected `/product/[slug]`: summary, category, unit
- [x] Details: minimum, maximum, average ও বাজারভিত্তিক দাম
- [x] `/signin`: email/password login ও Home redirect
- [x] Google/GitHub OAuth wiring ও callback error toast
- [ ] Google/GitHub credentials ও আসল social login যাচাই
- [x] `/signup`: name/email/password ও design অনুযায়ী confirm-password
- [x] Email signup শেষে signin; email signin শেষে home
- [ ] Provider credentials দিয়ে social login শেষে home যাচাই
- [x] Email auth, logout ও validation toast
- [x] Protected redirect toast
- [x] Footer: reference design ও price disclaimer
- [ ] Unknown/invalid route-এর friendly 404 ও home CTA
- [ ] Mobile, tablet ও desktop responsive layout
- [x] Home fetching-এর সময় skeleton; API failure ও empty data-এর আলাদা state
- [x] Category fetching-এর সময় skeleton
- [x] Product details: skeleton, retry, invalid slug ও empty markets

Shared layout, ticker, Hero, Home ও Category cards 320, 390, 768 ও 1440px-এ যাচাই করা হয়েছে। আটটি category URL সরাসরি load, invalid category, keyboard sorting ও category বদলালে default sorting যাচাই করা হয়েছে। Sign In/Sign Up ও Product Details-ও 320, 390, 768 ও 1440px-এ যাচাই করা হয়েছে। My Profile ও update form-এর mobile, tablet ও desktop layout-ও যাচাই করা হয়েছে। Deployment-এর পরে সম্পূর্ণ application আবার যাচাই করতে হবে।

## Challenge

- [x] Default, low-to-high ও high-to-low numeric sorting
- [x] My Profile থেকে আলাদা update route-এ নাম পরিবর্তন
- [x] Better Auth `updateUser` দিয়ে নাম persist
- [x] README: নাম, description, technologies, অন্তত ৫টি features

## Submission

- [x] অন্তত ৮টি meaningful commits
- [ ] Deployment ও Live website link
- [ ] Home, category, details, signin/signup, profile ও protected route checks
- [ ] Dynamic URL reload, API, assets, mobile ও console checks
- [ ] GitHub repository link

Email verification ও forgot password এই assignment-এর অংশ নয়।

## Data mapping

- Product API numeric ID নেয়; product slug থেকে ID resolve করতে হবে।
- Category slug API থেকে নিতে হবে; ডিম-দুধের slug `dim-dui`।
- Sorting numeric price দিয়ে হবে; display-তে বাংলা সংখ্যা থাকবে।
- API failure ও empty category আলাদা state হিসেবে handle করতে হবে।
- Market average: প্রতিটি বাজারের `(min + max) / 2`; summary average হলো সব বাজারের midpoint-এর গড়।
