# FC YOU — Football scores website

A responsive football scores web app built with Next.js 15, TypeScript, Tailwind CSS, API-Football and Firebase. UI languages: Sorani Kurdish, Arabic and English. Brand style: dark navy/black with electric blue accents.

## Features in this project
- Match list, live/upcoming/finished filters, team/league search, league shortcuts and fixture refresh.
- Automatic fixture refresh every 60 seconds while the page is visible (actual update frequency depends on API plan/quota).
- Favourite match IDs saved in the browser's local storage.
- Optional browser notifications for score/status changes in favourite API matches. Requires HTTPS and the user's permission; it works while the site is open, not as a server push when the browser is closed.
- Match details endpoint for fixture information, events/timeline, statistics and lineups where the API plan provides them.
- Standings for selected API-Football leagues/seasons.
- News listing plus secure admin publishing/deletion at `/admin/news`.
- Manual fixture create/delete at `/admin`.
- Firebase Authentication ID-token verification and server-side `ADMIN_UIDS` allowlist for every admin mutation.
- PWA manifest, app icon and basic service-worker offline shell caching.
- API secrets and Firebase Admin credentials stay server-side.

## Requirements
- Node.js 20.9+ recommended
- API-Football API key for real fixture/standings/match detail data
- Firebase project with Email/Password Authentication, Firestore and a service account for admin publishing

## Run locally
1. Install Node.js LTS.
2. Extract the ZIP and open a terminal inside `fc-you`.
3. Run `npm install`.
4. Copy `.env.example` to `.env.local` and fill in the values.
5. In Firebase Console → Authentication → Sign-in method, enable Email/Password and create your admin user.
6. Copy that user's **UID** to `ADMIN_UIDS` in `.env.local` (not the email address).
7. Create a Firebase service account and fill `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY`. Preserve escaped newlines as shown in `.env.example`; never commit this key.
8. Deploy `firestore.rules` to Firebase. Admin API writes use Firebase Admin SDK after UID allowlist verification; direct browser Firestore access is denied.
9. Run `npm run dev` and open `http://localhost:3000`.

## Environment variables
See `.env.example`.
- `API_FOOTBALL_KEY` and Firebase Admin variables are secrets. Never prefix them with `NEXT_PUBLIC_`.
- `NEXT_PUBLIC_FIREBASE_*` values are the Firebase web configuration; authorization is enforced by the server endpoints and Firestore rules.

## Deploy to Vercel
1. Create a private Git repository and push this folder to it.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Add every needed variable from `.env.example` under **Project Settings → Environment Variables** for Production (and Preview if desired). Keep the Firebase private key and API key secret.
4. Deploy, then open the deployed URL and check `/`, `/api/fixtures`, `/api/standings?league=39&season=2026`, `/api/news`, `/admin`, and `/admin/news`.
5. After changing environment variables, redeploy. The first admin sign-in must use the Firebase account whose UID is in `ADMIN_UIDS`.
6. To install as an app on Android, open the HTTPS website in Chrome and choose **Install app** or **Add to Home screen**.

I cannot publish into your Vercel/Firebase accounts without you connecting or authorizing those services. This repository is prepared for that deployment flow, but a real deployment still requires your API key, Firebase project configuration, and Vercel account action.

## API endpoints
- `GET /api/fixtures?date=YYYY-MM-DD` — API-Football fixtures in `Asia/Baghdad`, merged with manual fixtures saved for that date.
- `GET /api/standings?league=39&season=2026` — normalized standings.
- `GET /api/match?id=FIXTURE_ID` — fixture, events, lineups and statistics. This makes up to four upstream API requests; check quota and plan support.
- `GET /api/news` — published articles (demo articles are returned if Firebase Admin is not configured).
- `GET|POST|DELETE /api/admin/matches` — authenticated manual fixture administration.
- `GET|POST|DELETE /api/admin/news` — authenticated news administration.

## Notes / limitations
- Demo fixtures are examples only, not actual current scores. The UI marks preview mode when no API key is configured.
- Automatic polling is a browser-side refresh, not a guaranteed push feed. Browser notifications require the page to be open and permission granted; closed-browser push notifications would need Firebase Cloud Messaging plus service-worker push setup.
- League availability, historical seasons, lineups, statistics, and event coverage depend on the API-Football subscription.
- `npm install`/production build should be run in an environment with package-registry access before launch. The source bundle in this handoff has not been successfully built here because package installation timed out.
