# Bazar Dor

Track daily essential prices and compare market prices across Bangladesh. Bazar Dor brings current prices, daily changes, category browsing and market comparisons into one Bengali interface.

- [GitHub repository](https://github.com/arafatshuvo07/bazar-dor)
- [Assignment requirements and design resources](https://github.com/ProgrammingHero1/B14-A7-Bazar-Dor)

## Features

- Current prices for rice, lentils, oil, vegetables, fish, meat, dairy and spices from the provided API.
- Six biggest price increases, six biggest decreases and the complete product list on the home page.
- Dynamic category pages with default, ascending and descending price sorting.
- Protected product details with market prices and minimum, maximum and average summaries.
- Better Auth email/password registration, sign-in, persistent sessions and sign-out.
- Google and GitHub OAuth integration, enabled when provider credentials are configured.
- A protected profile with a separate name update form, validation and session refresh.
- Bengali numbers, Dhaka dates, a price ticker, loading skeletons and toast notifications.
- Responsive layouts, visible keyboard focus, reduced-motion support and a ticker pause control.
- Friendly Bengali 404 and error pages with home and retry actions.

## Technologies

Next.js App Router, React, TypeScript, Tailwind CSS, Better Auth, PostgreSQL/SQLite, Radix UI, React Hot Toast and Phosphor Icons. Bengali typography uses Hind Siliguri.

## Local setup

Use Node.js 24 and npm.

```bash
npm ci
cp .env.example .env.local
```

Set `BETTER_AUTH_SECRET` to a random value of at least 32 characters. Generate one with `openssl rand -base64 48`.

```bash
npm run db:migrate
npm run dev -- --port 3001
```

Open http://localhost:3001. Keep `BETTER_AUTH_URL` in `.env.local` equal to the browser origin. Change both settings if you use another port.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `BETTER_AUTH_SECRET` | Server-side session signing secret |
| `BETTER_AUTH_URL` | Full application origin |
| `DATABASE_URL` | Hosted PostgreSQL connection string |
| `DATABASE_PATH` | Local SQLite file when `DATABASE_URL` is empty |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google OAuth credentials |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` | GitHub OAuth credentials |

Secrets and database files are excluded from Git. A configured `DATABASE_URL` selects PostgreSQL; local development falls back to SQLite. Vercel requires a persistent PostgreSQL database. Run the schema migration against the target database before deploying.

## Authentication

Email registration leads to Sign In. Successful sign-in leads to Home. Product details, Profile and Profile Update validate the session on the server. Guests are redirected to Sign In with a Bengali toast.

Register these callback URLs in your provider applications, replacing `<APP_ORIGIN>` with the appropriate local or production origin:

- Google: `<APP_ORIGIN>/api/auth/callback/google`
- GitHub: `<APP_ORIGIN>/api/auth/callback/github`

For Google, also register `<APP_ORIGIN>` as an authorized JavaScript origin. A provider button remains disabled until its credentials are configured. Automated authorization-URL checks do not replace signing in with a real provider account. Email verification and password recovery are outside this assignment's scope.

Profile updates change only the name. Leading and trailing whitespace is removed. Empty names and names longer than 100 characters are rejected by both the client and server. Submitting is disabled while a request is pending or the name is unchanged.

## API and calculations

Primary API: `https://openapi.programming-hero.com/api/bazardor`

Fallback API: `https://api.abcz.workers.dev/api/bazardor`

Endpoints include `/products`, `/products?category=chal`, `/products/1`, `/categories` and `/categories/chal`. Product slugs are resolved to numeric IDs before details are fetched. Category data is cached for one hour and product data for five minutes. Failed primary requests fall back to the alternative endpoint.

The minimum is the lowest market `min`; the maximum is the highest market `max`. Each market midpoint is `(min + max) / 2`, and the summary average is the arithmetic mean of those midpoints. Empty data displays an explanation instead of invented prices.

## Validation

```bash
npm test
npm run lint
npm run build
npm start -- --port 3001
```

Tests cover password hashing, session cookies, invalid credentials, origin checks, revoked sessions, profile persistence, user isolation, product lookup and market calculations. Browser checks cover forms, sorting, protected routes, profile updates, reloads and responsive layouts.

## Deployment

Vercel is configured through `vercel.json`. Set `DATABASE_URL`, `BETTER_AUTH_SECRET`, the public HTTPS `BETTER_AUTH_URL` and both providers' credentials in the production environment. Apply the database migration before deploying.

Check local configuration with `npm run check:deployment`. If production values are stored in a separate ignored `.env.deploy` file:

```bash
node --env-file=.env.deploy scripts/check-deployment.mjs
node --conditions=react-server --env-file=.env.deploy scripts/migrate-auth.mjs
```

After deployment, verify Home, Category, Product Details, Sign In/Sign Up, Profile, both social providers and direct URL reloads. The [requirement checklist](docs/requirements.md) records verification status.
