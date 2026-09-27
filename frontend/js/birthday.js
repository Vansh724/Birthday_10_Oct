/**
 * Birthday finale page.
 * Renders BIRTHDAY_CONTENT into the page, handles the scroll-in reveal
 * for each section, and the final "one more thing" surprise.
 */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderHero() {
  document.getElementById('hero-line').textContent = BIRTHDAY_CONTENT.heroLine;
}

function renderMessage() {
  const mount = document.getElementById('bday-message');
  mount.innerHTML = BIRTHDAY_CONTENT.longMessage
    .map((para) => `<p class="bday-message-para">${escapeHtml(para)}</p>`)
    .join('');
}

function renderPhotos() {
  const mount = document.getElementById('bday-photos');
  mount.innerHTML = BIRTHDAY_CONTENT.photos.map((photo) => `
    <div class="gallery-item">
      ${photo.src
        ? `<img class="gallery-photo" src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.caption)}" loading="lazy" />`
        : `<div class="gallery-placeholder">✦</div>`}
      <p class="gallery-caption">${escapeHtml(photo.caption)}</p>
    </div>
  `).join('');
}

function renderTimeline() {
  const mount = document.getElementById('bday-timeline');
  mount.innerHTML = BIRTHDAY_CONTENT.timeline.map((item) => `
    <div class="timeline-item">
      <span class="timeline-dot"></span>
      <div>
        <p class="timeline-label">${escapeHtml(item.label)}</p>
        <p class="timeline-detail">${escapeHtml(item.detail)}</p>
      </div>
    </div>
  `).join('');
}

function renderSongs() {
  const mount = document.getElementById('bday-songs');
  mount.innerHTML = BIRTHDAY_CONTENT.songs.map((song) => `
    <div class="music-card bday-song-card">
      <p class="music-title">${escapeHtml(song.title)}</p>
      <p class="music-artist">${escapeHtml(song.artist)}</p>
      <p class="music-note">${escapeHtml(song.note)}</p>
      ${song.link ? `<a class="music-link" href="${escapeHtml(song.link)}" target="_blank" rel="noopener noreferrer">Listen</a>` : ''}
    </div>
  `).join('');
}

function renderJokes() {
  const mount = document.getElementById('bday-jokes');
  mount.innerHTML = BIRTHDAY_CONTENT.insideJokes.map((joke) => `
    <div class="flip-card bday-joke-card" tabindex="0" role="button" aria-label="Reveal inside joke">
      <div class="flip-card-inner">
        <div class="flip-face flip-front">✦</div>
        <div class="flip-face flip-back">${escapeHtml(joke)}</div>
      </div>
    </div>
  `).join('');
  mount.querySelectorAll('.bday-joke-card').forEach((card) => {
    const flip = () => card.classList.toggle('flipped');
    card.addEventListener('click', flip);
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } });
  });
}

function wireFinalSurprise() {
  const btn = document.getElementById('final-surprise-btn');
  const message = document.getElementById('final-surprise-message');
  btn.textContent = BIRTHDAY_CONTENT.finalSurprise.buttonLabel;
  btn.addEventListener('click', () => {
    message.textContent = BIRTHDAY_CONTENT.finalSurprise.message;
    message.classList.remove('hidden');
    btn.style.display = 'none';
  });
}

function setupScrollReveal() {
  const sections = document.querySelectorAll('[data-reveal]');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    sections.forEach((s) => s.classList.add('revealed'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  sections.forEach((s) => observer.observe(s));
}

document.addEventListener('DOMContentLoaded', () => {
  initParticles('particles');
  renderHero();
  renderMessage();
  renderPhotos();
  renderTimeline();
  renderSongs();
  renderJokes();
  wireFinalSurprise();
  setupScrollReveal();
});
