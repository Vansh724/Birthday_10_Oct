const webpush = require('web-push');
const { supabase } = require('./db');

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:you@example.com';

if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
  console.warn(
    '[push] VAPID_PUBLIC_KEY or VAPID_PRIVATE_KEY missing from .env — ' +
    'sending notifications will fail until these are set.'
  );
} else {
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

/**
 * Sends one payload to every stored subscription.
 *
 * If a push service reports 404 or 410, that subscription is dead
 * (she uninstalled/blocked/cleared the browser) and we delete it so
 * future sends don't keep failing against it.
 *
 * Returns a small summary rather than throwing, so one bad subscription
 * never stops the rest from being sent to.
 */
async function sendToAllSubscriptions(payload) {
  const { data: subscriptions, error } = await supabase
    .from('push_subscriptions')
    .select('*');

  if (error) {
    throw new Error(`Could not load subscriptions: ${error.message}`);
  }

  const payloadString = JSON.stringify(payload);
  let sent = 0;
  let removed = 0;
  let failed = 0;

  await Promise.all(
    (subscriptions || []).map(async (sub) => {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dh, auth: sub.auth },
          },
          payloadString
        );
        sent += 1;
      } catch (err) {
        const statusCode = err.statusCode;
        if (statusCode === 404 || statusCode === 410) {
          await supabase.from('push_subscriptions').delete().eq('endpoint', sub.endpoint);
          removed += 1;
        } else {
          console.error(`[push] Failed to send to one subscription:`, err.message);
          failed += 1;
        }
      }
    })
  );

  return { total: (subscriptions || []).length, sent, removed, failed };
}

module.exports = { sendToAllSubscriptions };
