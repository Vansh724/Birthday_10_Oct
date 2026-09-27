const express = require('express');
const router = express.Router();

/**
 * GET /api/health
 * Used by you (and later, uptime checks) to confirm the server is running.
 * Deliberately reveals nothing about the database or secrets.
 */
router.get('/health', (req, res) => {
  res.status(200).json({ ok: true, time: new Date().toISOString() });
});

module.exports = router;
