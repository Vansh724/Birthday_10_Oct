const express = require('express');
const { supabase } = require('../db');
const { sendToAllSubscriptions } = require('../push');
const { DAILY_MESSAGES } = require('../../../shared/daily-messages');

const router = express.Router();

/**
 * Today's date as YYYY-MM-DD in the configured timezone (default
 * Asia/Kolkata), regardless of what timezone the server itself runs in
 * (most hosts run UTC). This is the single source of truth for "what day
 * is it" throughout this file.
 */
function getTodayInTimezone() {
  const timeZone = process.env.NOTIFICATION_TIMEZONE || 'Asia/Kolkata';
  // en-CA locale formats dates as YYYY-MM-DD, which matches the `date`
  // field format in shared/daily-messages.js and the `sent_log` table.
  return new Intl.DateTimeFormat('en-CA', { timeZone }).format(new Date());
}

/**
 * POST /api/send-daily
 * Meant to be called once a day by a scheduled job (GitHub Actions —
 * see .github/workflows/daily-notification.yml). Requires the
 * x-scheduler-secret header to match SCHEDULER_SECRET in .env, so nobody
 * else can trigger a send.
 *
 * Idempotent by default: if today's message was already sent, calling
 * this again just reports that and does nothing further. Pass
 * ?force=true to resend anyway (handy for manual testing).
 */
router.post('/send-daily', async (req, res) => {
  const providedSecret = req.get('x-scheduler-secret');

  if (!process.env.SCHEDULER_SECRET || providedSecret !== process.env.SCHEDULER_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const today = getTodayInTimezone();
  const entry = DAILY_MESSAGES.find((m) => m.date === today);

  if (!entry) {
    return res.status(200).json({ skipped: true, reason: `No message configured for ${today}` });
  }

  const force = req.query.force === 'true';

  if (!force) {
    const { data: alreadySent, error: lookupError } = await supabase
      .from('sent_log')
      .select('date')
      .eq('date', today)
      .maybeSingle();

    if (lookupError) {
      console.error('[scheduler] Could not check sent_log:', lookupError.message);
      return res.status(500).json({ error: 'Could not verify send history' });
    }

    if (alreadySent) {
      return res.status(200).json({ skipped: true, reason: `Already sent for ${today}` });
    }
  }

  try {
    const result = await sendToAllSubscriptions({
      title: entry.title,
      message: entry.message,
      url: entry.url,
    });

    const { error: logError } = await supabase
      .from('sent_log')
      .upsert({ date: today, sent_at: new Date().toISOString() }, { onConflict: 'date' });

    if (logError) {
      // The push already went out — this only affects idempotency for
      // *next* time, so log it but don't fail the request.
      console.error('[scheduler] Sent successfully but failed to record sent_log:', logError.message);
    }

    return res.status(200).json({ date: today, dayNumber: entry.dayNumber, ...result });
  } catch (err) {
    console.error('[scheduler] Failed to send daily notification:', err.message);
    return res.status(500).json({ error: 'Failed to send daily notification' });
  }
});

module.exports = router;
