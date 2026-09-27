/**
 * Stage 2 config.
 *
 * VAPID_PUBLIC_KEY: generate a real keypair once we reach Stage 3/4 with
 *   `npx web-push generate-vapid-keys` — paste the PUBLIC key here, and
 *   keep the PRIVATE key only in the backend's .env (never in this file,
 *   never committed to git).
 *
 * API_BASE_URL: points at your backend once it exists (Stage 3). Until
 *   then, subscribe.js will simply log that the backend isn't up yet
 *   instead of failing loudly — that's expected at this stage.
 */
const CONFIG = {
  VAPID_PUBLIC_KEY: 'BCqxS9x0Bk15_jeUnVlOK19ieXFcSTRcko9GZmhK-XbW5pBkjP4C_inGWJDeAxMPY96rXdJ4j_0mkykFC_wSBJ0',
  // Update this once your backend is deployed (Stage 8) — e.g.
  // 'https://your-app.onrender.com'. Keep it as localhost until then.
  API_BASE_URL: 'http://tenth-of-october.onrender.com',
};
