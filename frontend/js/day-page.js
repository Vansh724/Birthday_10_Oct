/**
 * Renders whichever day's content into #day-content, based on the
 * DAY_NUMBER global set by that day's tiny index.html.
 *
 * Adding a new content type: write a render function below with the
 * signature (content, mount) => void, then add it to RENDERERS.
 */

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderIntro(content, mount) {
  mount.innerHTML = `<p class="day-body">${escapeHtml(content.body)}</p>`;
}

function renderMemory(content, mount) {
  mount.innerHTML = `
    <p class="day-prompt">${escapeHtml(content.prompt)}</p>
    <div class="flip-card" tabindex="0" role="button" aria-label="Reveal memory">
      <div class="flip-card-inner">
        <div class="flip-face flip-front">✦</div>
        <div class="flip-face flip-back">${escapeHtml(content.memory)}</div>
      </div>
    </div>
  `;
  const card = mount.querySelector('.flip-card');
  const flip = () => card.classList.toggle('flipped');
  card.addEventListener('click', flip);
  card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } });
}

function renderChoice(content, mount) {
  mount.innerHTML = `
    <p class="day-prompt">${escapeHtml(content.question)}</p>
    <div class="choice-buttons">
      ${content.options.map((opt, i) => `<button class="choice-btn" data-i="${i}">${escapeHtml(opt.label)}</button>`).join('')}
    </div>
    <p class="choice-response hidden" id="choice-response"></p>
  `;
  mount.querySelectorAll('.choice-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const opt = content.options[Number(btn.dataset.i)];
      const responseEl = mount.querySelector('#choice-response');
      responseEl.textContent = opt.response;
      responseEl.classList.remove('hidden');
      mount.querySelectorAll('.choice-btn').forEach((b) => (b.disabled = true));
      btn.classList.add('choice-selected');
    });
  });
}

function renderAnimation(content, mount) {
  mount.innerHTML = `
    <div class="floating-orb" aria-hidden="true"></div>
    <p class="day-caption">${escapeHtml(content.caption)}</p>
  `;
}

function renderHidden(content, mount) {
  mount.innerHTML = `
    <button class="reveal-btn" id="reveal-btn">${escapeHtml(content.teaser)}</button>
    <p class="hidden-text hidden" id="hidden-text">${escapeHtml(content.reveal)}</p>
  `;
  mount.querySelector('#reveal-btn').addEventListener('click', (e) => {
    mount.querySelector('#hidden-text').classList.remove('hidden');
    e.target.style.display = 'none';
  });
}

function renderGallery(content, mount) {
  mount.innerHTML = `
    <p class="day-intro">${escapeHtml(content.intro)}</p>
    <div class="gallery-grid">
      ${content.items.map((item) => `
        <div class="gallery-item">
          ${item.src
            ? `<img class="gallery-img" src="${escapeHtml(item.src)}" alt="${escapeHtml(item.caption)}" loading="lazy">`
            : `<div class="gallery-placeholder">✦</div>`}
          <p class="gallery-caption">${escapeHtml(item.caption)}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function renderAppreciation(content, mount) {
  mount.innerHTML = `
    <p class="day-intro">${escapeHtml(content.intro)}</p>
    <ol class="appreciation-list">
      ${content.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
    </ol>
  `;
  mount.querySelectorAll('.appreciation-list li').forEach((li, i) => {
    li.style.animationDelay = `${i * 0.12}s`;
  });
}

function renderPuzzle(content, mount) {
  mount.innerHTML = `
    <p class="day-prompt">${escapeHtml(content.prompt)}</p>
    <p class="day-riddle">${escapeHtml(content.riddle)}</p>
    <div class="puzzle-form">
      <input type="text" id="puzzle-input" class="puzzle-input" aria-label="Your answer" autocomplete="off" />
      <button class="puzzle-check" id="puzzle-check">Check</button>
    </div>
    <p class="puzzle-feedback hidden" id="puzzle-feedback"></p>
  `;
  const check = () => {
    const value = mount.querySelector('#puzzle-input').value.trim().toLowerCase();
    const feedback = mount.querySelector('#puzzle-feedback');
    feedback.classList.remove('hidden');
    if (value === content.answer.trim().toLowerCase()) {
      feedback.textContent = content.successMessage;
      feedback.classList.add('puzzle-correct');
    } else {
      feedback.textContent = 'Not quite — try again.';
    }
  };
  mount.querySelector('#puzzle-check').addEventListener('click', check);
  mount.querySelector('#puzzle-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
}

function renderConstellation(content, mount) {
  const positions = [
    [15, 30], [70, 15], [35, 60], [85, 55], [55, 80], [10, 75],
  ];
  mount.innerHTML = `
    <p class="day-intro">${escapeHtml(content.intro)}</p>
    <div class="constellation" id="constellation">
      ${content.words.map((word, i) => {
        const [x, y] = positions[i % positions.length];
        return `<button class="star" style="left:${x}%; top:${y}%" data-word="${escapeHtml(word)}" aria-label="Reveal a word">★</button>`;
      }).join('')}
    </div>
    <p class="constellation-word" id="constellation-word">&nbsp;</p>
  `;
  mount.querySelectorAll('.star').forEach((star) => {
    star.addEventListener('click', () => {
      mount.querySelector('#constellation-word').textContent = star.dataset.word;
      star.classList.add('star-lit');
    });
  });
}

function renderTimeline(content, mount) {
  mount.innerHTML = `
    <p class="day-intro">${escapeHtml(content.intro)}</p>
    <div class="timeline">
      ${content.milestones.map((m) => `
        <div class="timeline-item">
          <span class="timeline-dot"></span>
          <div>
            <p class="timeline-label">${escapeHtml(m.label)}</p>
            <p class="timeline-detail">${escapeHtml(m.detail)}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderMusic(content, mount) {
  const linkHtml = content.link
    ? `<a class="music-link" href="${escapeHtml(content.link)}" target="_blank" rel="noopener noreferrer">Listen</a>`
    : '';
  mount.innerHTML = `
    <p class="day-intro">${escapeHtml(content.intro)}</p>
    <div class="music-card">
      <p class="music-title">${escapeHtml(content.songTitle)}</p>
      <p class="music-artist">${escapeHtml(content.songArtist)}</p>
      <p class="music-note">${escapeHtml(content.note)}</p>
      ${linkHtml}
    </div>
  `;
}

function renderNote(content, mount) {
  mount.innerHTML = `<p class="handwritten-note">${escapeHtml(content.note)}</p>`;
}

function renderGame(content, mount) {
  mount.innerHTML = `
    <p class="day-prompt">${escapeHtml(content.prompt)}</p>
    <div class="game-grid">
      ${content.items.map((emoji, i) => `<button class="game-item" data-i="${i}">${emoji}</button>`).join('')}
    </div>
    <p class="game-feedback hidden" id="game-feedback"></p>
  `;
  mount.querySelectorAll('.game-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const feedback = mount.querySelector('#game-feedback');
      if (Number(btn.dataset.i) === content.correctIndex) {
        feedback.textContent = content.successMessage;
        feedback.classList.remove('hidden');
        feedback.classList.add('game-correct');
        mount.querySelectorAll('.game-item').forEach((b) => (b.disabled = true));
        btn.classList.add('game-item-correct');
      } else {
        btn.classList.add('game-item-wrong');
        setTimeout(() => btn.classList.remove('game-item-wrong'), 400);
      }
    });
  });
}

function renderLocked(content, mount) {
  mount.innerHTML = `
    <button class="lock-btn" id="lock-btn" aria-label="Unlock message">
      <span class="lock-icon">🔒</span>
      <span>${escapeHtml(content.lockedHint)}</span>
    </button>
    <p class="locked-message hidden" id="locked-message">${escapeHtml(content.message)}</p>
  `;
  mount.querySelector('#lock-btn').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    btn.querySelector('.lock-icon').textContent = '🔓';
    setTimeout(() => {
      btn.style.display = 'none';
      mount.querySelector('#locked-message').classList.remove('hidden');
    }, 500);
  });
}

const RENDERERS = {
  intro: renderIntro,
  memory: renderMemory,
  choice: renderChoice,
  animation: renderAnimation,
  hidden: renderHidden,
  gallery: renderGallery,
  appreciation: renderAppreciation,
  puzzle: renderPuzzle,
  constellation: renderConstellation,
  timeline: renderTimeline,
  music: renderMusic,
  note: renderNote,
  game: renderGame,
  locked: renderLocked,
};

document.addEventListener('DOMContentLoaded', () => {
  const content = DAY_CONTENT[window.DAY_NUMBER];
  const mount = document.getElementById('day-content');
  const heading = document.getElementById('day-heading');

  if (!content) {
    heading.textContent = 'Nothing here yet';
    mount.innerHTML = '<p class="day-body">This day hasn\'t been written yet.</p>';
    return;
  }

  heading.textContent = content.heading;
  const renderer = RENDERERS[content.type];
  if (renderer) {
    renderer(content, mount);
  } else {
    mount.innerHTML = `<p class="day-body">Unknown content type: ${escapeHtml(content.type)}</p>`;
  }
});
