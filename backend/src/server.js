// Load .env before anything else touches process.env (db.js reads it at import time).
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const healthRoutes = require('./routes/health');
const subscribeRoutes = require('./routes/subscribe');
const testNotificationRoutes = require('./routes/test-notification');
const schedulerRoutes = require('./routes/scheduler');

const app = express();
const PORT = process.env.PORT || 3000;

// Only the frontend origin(s) listed here may call this API from a browser.
// Comma-separated in .env so you can list both localhost and your deployed
// frontend URL once Stage 8 happens.
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5500')
  .split(',')
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow no-origin requests (curl, health checks) and any listed origin.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
  })
);

app.use(express.json({ limit: '10kb' }));

// Modest rate limit on the subscription endpoints — this site has one
// intended visitor, so anything beyond a handful of requests per minute
// from one IP is almost certainly not her.
const subscribeLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', healthRoutes);
app.use('/api', subscribeLimiter, subscribeRoutes);
app.use('/api', testNotificationRoutes);
app.use('/api', schedulerRoutes);

app.listen(PORT, () => {
  console.log(`[server] Listening on http://localhost:${PORT}`);
  console.log(`[server] Allowed frontend origin(s): ${allowedOrigins.join(', ')}`);
});
