# 15 Days Until Dhruvi

A small, private digital experience: she visits once, allows notifications,
and then receives one message a day until her birthday on 10 October 2026.

This README grows as we build each stage.

## Where things stand

- [x] Stage 1 — Frontend landing/countdown experience
- [x] Stage 2 — Service worker + notification permission + push subscription
- [x] Stage 3 — Backend subscription storage
- [x] Stage 4 — Real Web Push notifications
- [x] Stage 5 — Daily scheduler
- [x] Stage 6 — Daily interactive pages
- [x] Stage 7 — Birthday finale
- [ ] Stage 8 — Mobile polish, accessibility, security, deployment

## A note on day numbering

Your original spec listed 15 dates (26 Sep → 10 Oct) but described 16
day-labels (Day 15 down to Day 0). Since 26 Sep to 10 Oct is actually
**14 days apart**, I numbered the days 14 → 0 so the label always matches
the real, dynamically-calculated time remaining — "15 Days Until Dhruvi"
stays as the project's name for the 15-date journey, but no notification
claims a day count that doesn't match reality. See `shared/daily-messages.js`
if you want to relabel anything.

## Folder structure so far

```
dhruvi-15-days/
├── frontend/
│   ├── index.html        — the landing/countdown page
│   ├── day/
│   │   ├── 14/index.html — tiny, sets DAY_NUMBER=14, loads the shared renderer
│   │   ├── 13/index.html
│   │   └── ... one folder per day, 14 down to 1
│   ├── birthday/
│   │   └── index.html    — the finale page (10 October)
│   ├── sw.js             — service worker: shows notifications, handles
│   │                        clicks, lives at the root so its scope covers
│   │                        the whole site
│   ├── css/
│   │   ├── style.css     — dark, glassmorphism-adjacent shared styling
│   │   ├── day.css       — styling for every daily-page widget type
│   │   │                    (also reused by the birthday page's gallery,
│   │   │                    timeline, music cards, and flip cards)
│   │   └── birthday.css  — the birthday page's own hero + section styling
│   └── js/
│       ├── config.js          — VAPID public key + backend URL (edit this)
│       ├── particles.js       — shared ambient background, used by both
│       │                         the landing page and the birthday page
│       ├── main.js            — hero text sequence, live countdown
│       ├── subscribe.js       — real permission request, SW registration,
│       │                         push subscription creation
│       ├── days-content.js    — the 14 days' actual content (edit this most)
│       ├── day-page.js        — shared daily-page renderer
│       ├── birthday-content.js — the birthday page's content (edit this too)
│       └── birthday.js         — birthday page renderer + scroll reveal
├── shared/
│   └── daily-messages.js — your editable 15-day message config
│                            (used by the backend scheduler from Stage 5 on)
├── backend/
│   ├── src/
│   │   ├── server.js      — Express app: CORS, JSON parsing, rate limiting
│   │   ├── db.js          — Supabase client (service role key, server-only)
│   │   ├── push.js        — web-push sending logic, shared by the test
│   │   │                     endpoint now and the scheduler in Stage 5
│   │   └── routes/
│   │       ├── health.js            — GET /api/health
│   │       ├── subscribe.js         — POST /api/subscribe, /api/unsubscribe
│   │       ├── test-notification.js — POST /api/test-notification (dev only)
│   │       └── scheduler.js         — POST /api/send-daily (the real daily job)
│   ├── schema.sql         — run once in Supabase to create the tables
│   ├── package.json
│   └── .env.example       — copy to backend/.env and fill in
├── .github/
│   └── workflows/
│       └── daily-notification.yml — GitHub Actions cron, calls /api/send-daily
├── .gitignore
├── .env.example           — overview of every env var across all stages
└── README.md
```

## How Stage 1 works

1. `index.html` loads four "scenes" (hero lines → countdown → explanation →
   confirmation), only one visible at a time.
2. `main.js` reveals the hero lines one by one, then calculates the real
   countdown to **10 October 2026, 00:00 Asia/Kolkata** using the visitor's
   own clock — nothing is hardcoded.
3. A lightweight canvas particle field runs behind everything, and turns
   itself off automatically if the visitor's OS has "reduce motion" set.

## How Stage 2 works

Clicking "Start the countdown ✨" does the real thing:

1. Checks the browser actually supports service workers + push + notifications.
   If not, it says so plainly and hides the button — no dead-end retry loop.
2. Calls `Notification.requestPermission()` and handles all three outcomes:
   - **granted** → registers `sw.js`, creates a push subscription using the
     VAPID public key in `config.js`, and sends it to the backend.
   - **denied** → shows "No worries. The website still works — you'll just
     have to visit manually." No guilt-tripping.
   - **dismissed/default** → invites her to try again, doesn't treat it as a no.
3. A real VAPID keypair is already in `config.js` and `.env.example` so you
   can test this today. **Before deploying**, generate your own with
   `npx web-push generate-vapid-keys` — treat the current pair as already
   public, since it was generated in a shared environment while building this.

## How Stage 3 works

A small Express server now stores subscriptions in Supabase (hosted
Postgres, free tier):

- `POST /api/subscribe` — validates the subscription shape, then
  **upserts** it into the `push_subscriptions` table keyed by `endpoint`,
  so re-subscribing updates the existing row instead of duplicating it.
- `POST /api/unsubscribe` — removes a subscription by endpoint.
- `GET /api/health` — a plain "yes, I'm running" check, reveals nothing
  about the database.
- CORS is locked to just your frontend's origin (`CORS_ORIGIN` in `.env`).
- A rate limit caps the subscribe/unsubscribe endpoints at 20 requests per
  minute per IP — generous for one person, useless to a bot.

## Setting up Supabase (one-time)

1. Go to [supabase.com](https://supabase.com), sign up free, create a new
   project (any name/region/password is fine — you won't need the
   database password directly, Supabase manages that).
2. Once it's provisioned, open **SQL Editor** in the left sidebar → **New
   query** → paste the contents of `backend/schema.sql` → **Run**. This
   creates the `push_subscriptions` table.
3. Go to **Settings → API**. You need two values:
   - **Project URL** → `SUPABASE_URL`
   - **service_role key** (not the "anon" key — scroll down, it's
     labeled "secret") → `SUPABASE_SERVICE_ROLE_KEY`

## Running everything locally

You now need **two terminals running at once**.

**Terminal 1 — backend:**
```bash
cd backend
cp .env.example .env
# open .env and paste in your SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY

npm install
npm run dev
```
You should see:
```
[server] Listening on http://localhost:3000
[server] Allowed frontend origin(s): http://localhost:5500
```

**Terminal 2 — frontend:**
```bash
cd frontend
python3 -m http.server 5500
```
Then open `http://localhost:5500` in your browser. (Service workers require
`http://localhost` or `https://`, never a `file://` path.)

## What to test before we move to Stage 4

- [ ] `curl http://localhost:3000/api/health` (or open that URL in a
      browser) returns `{"ok":true,"time":"..."}`
- [ ] With both servers running, go through the Stage 1–2 flow again on
      `http://localhost:5500` and click **Allow**
- [ ] The console should show a clean success (no "backend isn't reachable"
      message this time)
- [ ] Open your Supabase project → **Table Editor** → `push_subscriptions`
      — you should see one row with an `endpoint`, `p256dh`, and `auth`
- [ ] Reload the page and click through again — confirm it does **not**
      create a second row (same endpoint gets upserted, not duplicated)
- [ ] `curl -X POST http://localhost:3000/api/subscribe -H "Content-Type:
      application/json" -d "{}"` should return a 400, not a crash

## How Stage 4 works

`web-push` is now wired up using the VAPID keys already in your `.env`.

- `sendToAllSubscriptions(payload)` in `push.js` loads every stored
  subscription and sends the same payload to each. If a push service
  reports the subscription is dead (404/410 — she uninstalled, blocked,
  or cleared site data), it's automatically deleted from Supabase so
  future sends don't keep failing against it.
- `POST /api/test-notification` lets you trigger a real notification
  right now, without waiting for Stage 5's scheduler. It returns `404`
  whenever `NODE_ENV=production`, so it can never be hit once this is
  actually deployed for the real 15 days.

## Sending yourself a real test notification

With both servers still running (backend on :3000, frontend on :5500) and
your subscription already stored from Stage 3:

```bash
curl -X POST http://localhost:3000/api/test-notification \
  -H "Content-Type: application/json" \
  -d '{"title": "Day 14 🌙", "message": "Testing, testing.", "url": "/day/14"}'
```

A real OS-level notification should pop up within a second or two — this
uses the exact same push infrastructure the real daily messages will use.

## What to test before we move to Stage 5

- [ ] Run the curl command above with your own custom title/message and
      confirm a real notification appears on your device
- [ ] Click the notification — it should open (or focus) the site;
      right now it'll land on `/day/14` which doesn't exist yet
      (that's fine, Stage 6 builds those pages) — for now just confirm
      it navigates rather than doing nothing
- [ ] Try the curl command with no body at all (`-d '{}'`) — it should
      still send, using the default title/message
- [ ] Block notifications for localhost in your browser's site settings,
      then run the curl command again — confirm the backend logs a
      failure for that subscription without crashing, and check Supabase
      to see whether the dead row got cleaned up
- [ ] Confirm `curl -X POST http://localhost:3000/api/test-notification`
      run with `NODE_ENV=production npm run dev` (temporarily) returns a
      404 instead of sending anything — then go back to your normal
      `npm run dev` for continued testing

Once that all feels right, tell me and we'll move to Stage 5: a scheduler
that automatically sends the correct day's message once a day, with no
manual curl command needed.

## How Stage 5 works

`POST /api/send-daily` is the one endpoint a scheduled job calls once a day:

1. Works out **today's date** in `Asia/Kolkata` (configurable via
   `NOTIFICATION_TIMEZONE`), independent of whatever timezone the server
   itself runs in.
2. Looks that date up in `shared/daily-messages.js` — if there's no entry
   (before 26 Sep or after 10 Oct), it does nothing and says so.
3. Checks a `sent_log` table in Supabase to make sure today hasn't already
   been sent — so an accidental double-trigger never sends the same
   message twice. Pass `?force=true` to bypass this while testing.
4. Sends via the same `sendToAllSubscriptions` used in Stage 4, then
   records today in `sent_log`.
5. Requires an `x-scheduler-secret` header matching `SCHEDULER_SECRET` in
   `.env` — without it, the endpoint refuses the request. This is what
   stops anyone else from triggering a send.

**The actual daily trigger** is `.github/workflows/daily-notification.yml`
— a GitHub Actions cron job set for `30 3 * * *` (UTC), which is
**09:00 Asia/Kolkata**. If you change the send time, update that cron
expression to match (`NOTIFICATION_TIME` in `.env` is the source of truth
for what the time *should* be — the cron expression has to be kept in sync
with it by hand, since GitHub Actions can't read your `.env`).

This workflow **can't actually run yet** — it needs the backend deployed
publicly first, which is Stage 8. Right now it exists as scaffolding;
we'll finish connecting it once there's a real URL for it to call. For
now, you trigger sends manually with curl (below) to test the logic.

## Update the database, then re-run the backend

`schema.sql` now also creates a `sent_log` table. Since it uses
`if not exists`, it's safe to run again:

1. Supabase dashboard → **SQL Editor** → paste the full contents of
   `backend/schema.sql` again → **Run**.
2. Add a `SCHEDULER_SECRET` to `backend/.env` — any long random string
   works, e.g. run:
   ```bash
   node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"
   ```
   and paste the result in.
3. Restart the backend (`Ctrl+C`, then `npm run dev`) so it picks up the
   new `.env` value.

## Testing the scheduler manually

```bash
curl -X POST "http://localhost:3000/api/send-daily" \
  -H "x-scheduler-secret: YOUR_SCHEDULER_SECRET_HERE"
```

Since today's real date probably already matches an entry in
`daily-messages.js`, this should send immediately. To keep testing
without waiting a full day between attempts, add `?force=true`:

```bash
curl -X POST "http://localhost:3000/api/send-daily?force=true" \
  -H "x-scheduler-secret: YOUR_SCHEDULER_SECRET_HERE"
```

## What to test before we move to Stage 6

- [ ] Running the curl command above (without `force`) sends a real
      notification matching **today's** entry in `daily-messages.js`
- [ ] Running it again immediately after (still without `force`) returns
      `{"skipped": true, "reason": "Already sent for ..."}` instead of
      sending a second time
- [ ] Adding `?force=true` sends again regardless
- [ ] Check Supabase → Table Editor → `sent_log` — you should see one row
      for today's date
- [ ] Try the request with a wrong or missing `x-scheduler-secret` header
      — should return `401 Unauthorized`, not send anything
- [ ] Temporarily edit `shared/daily-messages.js` to add a fake date far in
      the past, save, restart the backend, then confirm the endpoint
      responds with `{"skipped": true, "reason": "No message configured..."}`
      when there's genuinely no entry for today (you can test this by
      checking what happens for a date outside 26 Sep – 10 Oct, e.g. by
      temporarily changing `NOTIFICATION_TIMEZONE` to something whose
      current date falls outside the range, then changing it back)

Once that all feels right, tell me and we'll move to Stage 6: the daily
interactive pages each notification links to (`/day/14`, `/day/13`, etc).

## How Stage 6 works

Each notification's `url` (from `shared/daily-messages.js`) points at a
folder like `/day/14/` — a tiny `index.html` that just sets one number and
loads two shared files:

```html
<script>window.DAY_NUMBER = 14;</script>
<script src="../../js/days-content.js"></script>
<script src="../../js/day-page.js"></script>
```

**`js/days-content.js`** is the file you'll actually rewrite — it holds all
14 days' content as plain data (a heading, a `type`, and whatever fields
that type needs). Right now every entry is a clearly-labeled placeholder
("Replace this with...") rather than real content, since the specifics
(inside jokes, real memories, a real puzzle answer) are yours to write.

**`js/day-page.js`** reads `DAY_NUMBER`, looks up that day's content, and
renders the right interactive widget. There are 14 widget **types** built
already, one per day:

| Day | Type | What it is |
|---|---|---|
| 14 | `intro` | Plain text — the mysterious opening |
| 13 | `memory` | A flip card — tap to reveal a memory |
| 12 | `choice` | Pick one of two options, each gets a different response |
| 11 | `animation` | A small floating glow with a caption |
| 10 | `hidden` | A button reveals hidden text underneath |
| 9 | `gallery` | Placeholder photo grid (drop in real images later) |
| 8 | `appreciation` | A staggered-fade-in numbered list |
| 7 | `puzzle` | A text input checked against an answer you set |
| 6 | `constellation` | Tap stars to reveal words, one at a time |
| 5 | `timeline` | A short vertical relationship timeline |
| 4 | `music` | A "song of the day" card with an optional link |
| 3 | `note` | A single handwritten-style paragraph |
| 2 | `game` | Tap the one emoji that's different among decoys |
| 1 | `locked` | A lock that "unlocks" with an animation, revealing a message |

Adding a 15th type later just means writing one render function in
`day-page.js` and adding it to the `RENDERERS` object at the bottom.

## Running everything locally (unchanged, plus the new day pages)

Same two terminals as before (backend on :3000, frontend on :5500). Once
both are running, you can jump straight to any day without waiting for its
notification: `http://localhost:5500/day/14/`, `http://localhost:5500/day/9/`,
and so on through `/day/1/`.

## What to test before we move to Stage 7

- [ ] Visit `http://localhost:5500/day/14/` directly and confirm it loads
      (not a 404) and shows the intro text
- [ ] Click through every day, `/day/14/` down to `/day/1/` — confirm each
      widget actually works: the flip card flips, the choice buttons
      respond, the hidden text reveals, the puzzle checks your answer
      (try both a wrong guess and the exact placeholder answer
      `REPLACE ME`), the game reacts to both a wrong and the correct emoji,
      the lock animates open
- [ ] On your phone (or narrow browser width), confirm nothing overflows
      horizontally on any of the 14 pages
- [ ] Click `← back` on a couple of day pages — confirm it returns to the
      homepage
- [ ] Run the Stage 4 test-notification curl command with a day's real
      `url` (e.g. `"url": "/day/9"`) and confirm clicking the resulting
      notification actually opens that page, not just the homepage
- [ ] Skim through `days-content.js` once, just to see the shape of it —
      you'll be rewriting most of this file's actual wording before the
      real 15 days start, but the structure shouldn't need to change

Once that all feels right, tell me and we'll move to Stage 7: the birthday
finale page itself.

## How Stage 7 works

`/birthday/` is a single long scrolling page rather than another "scene"
page — it deliberately feels different and bigger than the daily pages:

1. **Hero** — "Happy Birthday, Dhruvi." fades in over a soft radial glow
   bloom (pure CSS, no images), with a thin pulsing scroll cue at the
   bottom.
2. **From me, to you** — your long personal message, from
   `birthday-content.js`. This is the section worth spending real time on.
3. **A few memories** — a photo grid (reuses the same placeholder-box
   style as Day 9; drop real images into `frontend/assets/` and reference
   them in `birthday-content.js` to replace the placeholders).
4. **Our story** — a longer version of Day 5's timeline.
5. **The soundtrack** — a small "mixtape" of song cards.
6. **Just us** — inside jokes as flip cards, same interaction as Day 13's
   memory card.
7. **One more thing** — a final button that reveals whatever surprise
   you write into `finalSurprise` in `birthday-content.js`.

Each section fades in as she scrolls to it (`IntersectionObserver`, and
skipped entirely — everything just shows immediately — if reduced motion
is on). The particle background is now shared between this page and the
landing page via `js/particles.js`, so there's one copy of that code
instead of two.

## What to test before we move to Stage 8

- [ ] Visit `http://localhost:5500/birthday/` directly
- [ ] Confirm the hero text fades in with the glow animation, and the
      thin scroll-cue line appears a couple seconds later
- [ ] Scroll slowly through the whole page — each section should fade in
      as it comes into view, not all appear at once
- [ ] Click "One more thing" at the bottom and confirm the final message
      appears and the button disappears
- [ ] Turn on "reduce motion" in your OS settings, reload — every section
      should just be visible immediately, no fade/glow animation
- [ ] On phone width, confirm the photo grid, timeline, and song cards
      all stay readable with nothing overflowing
- [ ] Run the Stage 4 test-notification curl with `"url": "/birthday"`
      and confirm clicking the notification opens this page
- [ ] Skim `birthday-content.js` — like `days-content.js`, everything in
      here is a placeholder you'll rewrite, especially `longMessage` and
      `finalSurprise`

Once that all feels right, tell me and we'll move to Stage 8: mobile
polish, accessibility pass, a security review, and actually deploying
this somewhere Dhruvi can reach it.

## Stage 8: Deploying

You're deploying two separate things: the **backend** (Render) and the
**frontend** (Vercel). Do them in this order, since the frontend needs to
know the backend's URL.

### 0. Push this project to GitHub

Both Render and Vercel deploy from a GitHub repo. Create a **private**
repo (this is personal), then from the project root:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/dhruvi-15-days.git
git push -u origin main
```

`.gitignore` already excludes `.env` and `node_modules`, so no secrets get
pushed.

### 1. Deploy the backend to Render

1. Go to [render.com](https://render.com), sign up free, **New +** →
   **Web Service** → connect your GitHub repo.
2. Set **Root Directory** to `backend`.
3. **Build Command**: `npm install`  **Start Command**: `npm start`
4. Under **Environment**, add every variable from `backend/.env` — same
   names, same values — **except**:
   - `NODE_ENV` → set to `production` (this disables `/api/test-notification`)
   - `CORS_ORIGIN` → leave as `http://localhost:5500` for now, you'll
     update it in step 3 once you have your Vercel URL
   - Don't set `PORT` — Render sets this automatically
5. Deploy. Once it's live, copy the URL Render gives you (something like
   `https://dhruvi-15-days.onrender.com`) — you'll need it next.
6. Confirm it works: open `https://YOUR-RENDER-URL/api/health` in a
   browser — should return `{"ok":true,...}`.

### 2. Deploy the frontend to Vercel

1. Before deploying, edit `frontend/js/config.js`:
   ```js
   API_BASE_URL: 'https://YOUR-RENDER-URL',   // no trailing slash
   ```
2. Commit and push that change.
3. Go to [vercel.com](https://vercel.com), sign up free, **Add New** →
   **Project** → import the same GitHub repo.
4. Set **Root Directory** to `frontend`. Framework preset: **Other**
   (it's static files, no build step needed).
5. Deploy. Copy the URL Vercel gives you (something like
   `https://dhruvi-15-days.vercel.app`).

### 3. Connect them

Go back to Render → your service → **Environment** → update:
```
CORS_ORIGIN=https://YOUR-VERCEL-URL
```
Save — Render redeploys automatically with the new value.

### 4. Finish wiring the scheduler

In your GitHub repo → **Settings → Secrets and variables → Actions** →
add two repository secrets:
```
BACKEND_URL       = https://YOUR-RENDER-URL
SCHEDULER_SECRET  = the same value as SCHEDULER_SECRET in Render's env vars
```
The daily cron in `.github/workflows/daily-notification.yml` will now
actually work — it runs at 09:00 Asia/Kolkata every day automatically.

### A note on the local subscription you already made

Your local test subscription (from Stage 2–5 testing) was created with the
old VAPID key pair and won't work against the new keys now in
`config.js`/`backend/.env`. That's expected — once you subscribe again on
the **deployed** site, it'll create a fresh, correctly-matched subscription
in the same Supabase table. You can ignore or delete the old row.

## What to test after deploying

- [ ] Visit your Vercel URL and click through the full Stage 1–2 flow,
      allowing notifications on the **real, deployed** site
- [ ] Check Supabase → `push_subscriptions` — a new row should appear
- [ ] From your repo's **Actions** tab, manually run the "Daily
      Notification" workflow (it has `workflow_dispatch` enabled for
      exactly this) and confirm you receive a real notification
- [ ] Click that notification and confirm it opens the correct page on
      your **live** Vercel URL, not localhost
- [ ] Wait for tomorrow's automatic 09:00 IST run (or check the Actions
      tab tomorrow) to confirm the cron itself fires without you doing
      anything
- [ ] Try opening `https://YOUR-RENDER-URL/api/test-notification` — since
      `NODE_ENV=production`, this should now return 404

Once the deployed site is confirmed working end to end, you're set to
finish personalizing `daily-messages.js`, `days-content.js`, and
`birthday-content.js` at your own pace — just remember to `git push` after
editing them, since Vercel redeploys automatically on every push to `main`.
