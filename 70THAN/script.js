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


// Set your actual anniversary date here (Philippine Time)
const anniversaryDate = new Date("2026-08-23T00:00:00+08:00"); // ← change this

function updateCountdown() {
  const now = new Date();
  const diff = anniversaryDate - now;

  if (diff <= 0) {
    // Anniversary has arrived!
    document.getElementById("days").textContent = "0";
    document.getElementById("hours").textContent = "0";
    document.getElementById("minutes").textContent = "0";
    document.getElementById("seconds").textContent = "0";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

// Update every second
setInterval(updateCountdown, 1000);
updateCountdown(); // run immediately on load
setInterval(updateCountdown, 1000);

// Scroll Reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('revealed'); });
}, { threshold: 0.1 });
document.querySelectorAll('[data-reveal], .mv-card, .svc-card, .tl-item').forEach(el => revealObserver.observe(el));
