const express = require('express');
const { sendToAllSubscriptions } = require('../push');

const router = express.Router();

/**
 * POST /api/test-notification
 * Sends one notification, right now, to every stored subscription.
 * DEVELOPMENT ONLY — returns 404 in production so this can never become
 * a public "send anything to Dhruvi's phone" endpoint once deployed.
 *
 * Body (all optional):
 *   { "title": "...", "message": "...", "url": "/day/14" }
 */
router.post('/test-notification', async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).end();
  }

  const { title, message, url } = req.body || {};

  try {
    const result = await sendToAllSubscriptions({
      title: title || 'Test notification 🔔',
      message: message || 'This is a test push from your own backend.',
      url: url || '/',
    });
    return res.status(200).json(result);
  } catch (err) {
    console.error('[test-notification] Failed:', err.message);
    return res.status(500).json({ error: 'Could not send test notification' });
  }
});

module.exports = router;
