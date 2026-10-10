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

- [ ] Navbar: logo, বাংলা date, active category, auth buttons ও profile menu
- [ ] Infinite price ticker: emoji, নাম, দাম, unit ও পরিবর্তন
- [ ] Hero: heading, subtitle, image, একই পেজের সব-পণ্য section-এ anchor CTA
- [ ] Home: top 6 risers, top 6 fallers ও সব product cards
- [ ] Cards: emoji, নাম, unit, বাংলায় দাম ও change badge
- [ ] Category: API filter, heading, icon, skeleton ও empty state
- [ ] Protected `/product/[slug]`: summary, category, unit
- [ ] Details: minimum, maximum, average ও বাজারভিত্তিক দাম
- [ ] `/signin`: email/password, Google ও GitHub login
- [ ] `/signup`: name/email/password ও design অনুযায়ী confirm-password
- [ ] Email signup শেষে signin; signin ও social login শেষে home
- [ ] Auth, logout, validation ও protected redirect toast
- [ ] Footer: reference design ও price disclaimer
- [ ] Unknown/invalid route-এর friendly 404 ও home CTA
- [ ] Mobile, tablet ও desktop responsive layout
- [ ] Home/category fetching-এর সময় skeleton

## Challenge

- [ ] Default, low-to-high ও high-to-low numeric sorting
- [ ] My Profile থেকে আলাদা update route-এ নাম পরিবর্তন
- [ ] Better Auth `updateUser` দিয়ে নাম persist
- [ ] README: নাম, description, technologies, অন্তত ৫টি features

## Submission

- [ ] অন্তত ৮টি meaningful commits
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
- Market average-এর calculation implementation-এর সময় নির্ধারণ করতে হবে।
