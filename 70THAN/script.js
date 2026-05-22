// Particles
(function() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;animation-duration:${Math.random()*14+10}s;animation-delay:${Math.random()*12}s;opacity:0;`;
    container.appendChild(p);
  }
})();

// Hamburger
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('#navLinks a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});

// Countdown (Target: August 23, 2026)
const targetDate = new Date('2026-08-23T10:00:00');
function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;
  if (diff <= 0) {
    document.getElementById('countdown').innerHTML = '<div style="color:var(--gold);font-size:1.2rem;font-weight:700;padding:20px;text-align:center;flex:1;">🎉 The Anniversary is Here!</div>';
    return;
  }
  const days    = Math.floor(diff / 86400000);
  const hours   = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  document.getElementById('cd-d').textContent = String(days).padStart(2,'0');
  document.getElementById('cd-h').textContent = String(hours).padStart(2,'0');
  document.getElementById('cd-m').textContent = String(minutes).padStart(2,'0');
  document.getElementById('cd-s').textContent = String(seconds).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Scroll Reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('revealed'); });
}, { threshold: 0.1 });
document.querySelectorAll('[data-reveal], .mv-card, .svc-card, .tl-item').forEach(el => revealObserver.observe(el));