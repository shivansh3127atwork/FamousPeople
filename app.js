'use strict';

// app.js — reads PEOPLE from data.js (loaded before this script)
// You NEVER need to edit this file — only edit data.js!

// ─── Safety check ─────────────────────────────────────────────────────────
if (typeof PEOPLE === 'undefined' || !Array.isArray(PEOPLE) || PEOPLE.length === 0) {
  document.body.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;height:100vh;
                font-family:sans-serif;color:#f87171;text-align:center;padding:20px;">
      <div>
        <div style="font-size:3rem">⚠️</div>
        <h2>No people found in data.js</h2>
        <p style="color:#94a3b8;margin-top:8px">
          Open <strong>data.js</strong> and add at least one person to the PEOPLE array.
        </p>
      </div>
    </div>`;
  throw new Error('PEOPLE array is empty or missing in data.js');
}

// ─── State ────────────────────────────────────────────────────────────────
let currentIndex = -1;
let toastTimer   = null;

// ─── Pick random, never repeat consecutive ────────────────────────────────
function randomIndex() {
  if (PEOPLE.length === 1) return 0;
  let next;
  do { next = Math.floor(Math.random() * PEOPLE.length); }
  while (next === currentIndex);
  return next;
}

// ─── Render a person ──────────────────────────────────────────────────────
function renderPerson(index, animate) {
  const p = PEOPLE[index];
  if (!p) return;

  const set = () => {
    document.getElementById('emoji').textContent = p.emoji  ?? '🌟';
    document.getElementById('name').textContent  = p.name   ?? 'Unknown';
    document.getElementById('field').textContent = p.field  ?? '';
    document.getElementById('known').textContent = p.known  ?? '';
    document.getElementById('years').textContent = p.years  ?? '';
    document.getElementById('fact').textContent  = p.fact   ?? '';
    document.getElementById('num').textContent   = index + 1;
  };

  if (animate) {
    const card = document.getElementById('card');
    card.classList.add('fading');
    setTimeout(() => { set(); card.classList.remove('fading'); }, 320);
  } else {
    set();
  }
}

// ─── Next person ─────────────────────────────────────────────────────────
function nextPerson() {
  currentIndex = randomIndex();
  renderPerson(currentIndex, true);
}

// ─── Copy to clipboard ────────────────────────────────────────────────────
function copyPerson() {
  const p = PEOPLE[currentIndex];
  const text = `${p.name} (${p.years}) — ${p.field}\nKnown for: ${p.known}\nFact: ${p.fact}`;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(showToast);
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try { document.execCommand('copy'); showToast(); } catch (_) {}
    document.body.removeChild(ta);
  }
}

function showToast() {
  const t = document.getElementById('toast');
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2500);
}

// ─── Keyboard shortcuts ───────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === ' ' || e.key === 'ArrowRight') { e.preventDefault(); nextPerson(); }
  if (e.key === 'c' || e.key === 'C') copyPerson();
});

// ─── Init ─────────────────────────────────────────────────────────────────
document.getElementById('total').textContent = PEOPLE.length;
currentIndex = randomIndex();
renderPerson(currentIndex, false);
