const express = require('express');
const { supabase } = require('../db');

const router = express.Router();

/**
 * A push subscription from the browser looks like:
 * {
 *   endpoint: "https://fcm.googleapis.com/...",
 *   keys: { p256dh: "...", auth: "..." }
 * }
 * This checks just enough shape to reject garbage without being overly
 * strict about exact string formats (those vary by browser/push service).
 */
function isValidSubscription(subscription) {
  return (
    subscription &&
    typeof subscription.endpoint === 'string' &&
    subscription.endpoint.startsWith('https://') &&
    subscription.keys &&
    typeof subscription.keys.p256dh === 'string' &&
    typeof subscription.keys.auth === 'string'
  );
}

/**
 * POST /api/subscribe
 * Stores a push subscription. Uses upsert on the unique `endpoint` column
 * so re-subscribing (e.g. after clearing site data) updates the existing
 * row instead of creating a duplicate.
 */
router.post('/subscribe', async (req, res) => {
  const { subscription } = req.body || {};

  if (!isValidSubscription(subscription)) {
    return res.status(400).json({ error: 'Invalid subscription payload' });
  }

  const { error } = await supabase
    .from('push_subscriptions')
    .upsert(
      {
        endpoint: subscription.endpoint,
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'endpoint' }
    );

  if (error) {
    console.error('[subscribe] Supabase error:', error.message);
    return res.status(500).json({ error: 'Could not store subscription' });
  }

  return res.status(201).json({ ok: true });
});

/**
 * POST /api/unsubscribe
 * Removes a subscription by endpoint. Used if you ever add an "unsubscribe"
 * control to the frontend, and by the scheduler (Stage 5) when a push
 * fails because the subscription has expired.
 */
router.post('/unsubscribe', async (req, res) => {
  const { endpoint } = req.body || {};

  if (typeof endpoint !== 'string' || !endpoint.startsWith('https://')) {
    return res.status(400).json({ error: 'Invalid endpoint' });
  }

  const { error } = await supabase
    .from('push_subscriptions')
    .delete()
    .eq('endpoint', endpoint);

  if (error) {
    console.error('[unsubscribe] Supabase error:', error.message);
    return res.status(500).json({ error: 'Could not remove subscription' });
  }

  return res.status(200).json({ ok: true });
});

module.exports = router;
