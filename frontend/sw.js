/**
 * Service worker for "15 Days Until Dhruvi".
 *
 * This file does NOT decide when to send a notification — it only reacts
 * to push messages the backend already sent (Stage 4/5 build that side).
 * Living at the frontend root (not inside /js/) so its scope covers the
 * whole site, including /day/N and /birthday pages built in later stages.
 */

self.addEventListener('install', (event) => {
  // Activate this version immediately rather than waiting for old tabs to close.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

/**
 * A push message arrives here as raw data from the backend. We expect
 * JSON shaped like the entries in shared/daily-messages.js:
 *   { title, message, url, icon, badge }
 * but every field is optional-safe below in case a payload is malformed
 * or missing (network issues, an edited config with a typo, etc).
 */
self.addEventListener('push', (event) => {
  let payload = {};

  try {
    payload = event.data ? event.data.json() : {};
  } catch (err) {
    // Payload wasn't valid JSON — fall back to a plain-text body if we can.
    payload = { message: event.data ? event.data.text() : '' };
  }

  const title = payload.title || 'A little something';
  const options = {
    body: payload.message || "There's a new day waiting for you.",
    icon: payload.icon || '/assets/icon-192.png',
    badge: payload.badge || '/assets/badge-72.png',
    data: { url: payload.url || '/' },
    // Keeps the notification visible until she interacts with it,
    // rather than auto-dismissing after a few seconds.
    requireInteraction: false,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

/**
 * Clicking the notification focuses an existing tab if one is already
 * open on this site, otherwise opens a fresh one at the deep link.
 */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = (event.notification.data && event.notification.data.url) || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ('focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});
