/**
 * "15 Days Until Dhruvi" — Stage 1 + 2
 * Handles: the opening line-by-line reveal, the live countdown
 * (calculated dynamically, never hardcoded), and scene transitions.
 *
 * The "Start the countdown" button's actual behavior (permission
 * request, service worker registration, push subscription) lives in
 * subscribe.js, loaded after this file.
 */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Birthday target (Asia/Kolkata) ---------- */
// 10 October 2026, 00:00 IST. IST is UTC+5:30, expressed explicitly
// below so this is correct regardless of the visitor's own timezone.
const BIRTHDAY_IST = new Date('2026-10-10T00:00:00+05:30');

/* ---------- Scene 1: hero line reveal ---------- */
function playHeroSequence() {
  const lines = document.querySelectorAll('.hero-line');
  const delayBetween = prefersReducedMotion ? 120 : 1400;
  const holdBeforeAdvance = prefersReducedMotion ? 300 : 2200;

  lines.forEach((line, i) => {
    setTimeout(() => line.classList.add('visible'), i * delayBetween);
  });

  const totalTime = lines.length * delayBetween + holdBeforeAdvance;
  setTimeout(() => transitionTo('scene-hero', 'scene-countdown'), totalTime);
}

/* ---------- Scene transitions ---------- */
function transitionTo(fromId, toId) {
  const from = document.getElementById(fromId);
  const to = document.getElementById(toId);

  from.classList.add('fade-out');
  setTimeout(() => {
    from.classList.add('hidden');
    from.classList.remove('fade-out');
    to.classList.remove('hidden');
    // force reflow so the fade-in transition plays
    void to.offsetWidth;
  }, prefersReducedMotion ? 50 : 700);
}

/* ---------- Scene 2: countdown ---------- */
function startCountdown() {
  const els = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    minutes: document.getElementById('cd-minutes'),
    seconds: document.getElementById('cd-seconds'),
  };

  function tick() {
    const now = new Date();
    let diff = BIRTHDAY_IST.getTime() - now.getTime();
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    els.days.textContent = String(days).padStart(2, '0');
    els.hours.textContent = String(hours).padStart(2, '0');
    els.minutes.textContent = String(minutes).padStart(2, '0');
    els.seconds.textContent = String(seconds).padStart(2, '0');
  }

  tick();
  setInterval(tick, 1000);
}

/* ---------- Wire up buttons ---------- */
// Note: the "Start the countdown" button's click handler is registered
// separately in subscribe.js, since it now does real permission/subscription
// work rather than a simple scene transition.
function wireButtons() {
  document.getElementById('continue-btn').addEventListener('click', () => {
    transitionTo('scene-countdown', 'scene-explain');
  });
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initParticles('particles');
  wireButtons();
  startCountdown();
  playHeroSequence();
});
