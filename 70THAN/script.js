// Particles Generation
(function() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;animation-duration:${Math.random() * 14 + 10}s;animation-delay:${Math.random() * 12}s;opacity:0;`;
    container.appendChild(p);
  }
})();

// Hamburger Menu Toggle
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('#navLinks a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});

// Countdown Timer — Target: August 23, 2026 (Philippine Time)
const targetDate = new Date('2026-08-23T00:00:00+08:00');
let countdownEnded = false;

function showAnniversaryMessage() {
  const countdown = document.getElementById('countdown');

  // Fade out the countdown
  countdown.style.transition = 'opacity 1.5s ease';
  countdown.style.opacity = '0';

  setTimeout(() => {
    // Swap content while invisible
    countdown.innerHTML = `
      <div style="
        color: var(--gold);
        font-size: 1.4rem;
        font-weight: 700;
        padding: 24px 20px;
        text-align: center;
        flex: 1;
        letter-spacing: 1px;
        animation: cdPulse 2s ease-in-out infinite;
      ">🎉 The Anniversary is Here!</div>
    `;

    // Add pulse keyframe if not already added
    if (!document.getElementById('cd-pulse-style')) {
      const style = document.createElement('style');
      style.id = 'cd-pulse-style';
      style.textContent = `
        @keyframes cdPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.04); }
        }
      `;
      document.head.appendChild(style);
    }

    // Fade back in
    countdown.style.opacity = '1';
  }, 1500);
}

function updateCountdown() {
  if (countdownEnded) return;

  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    countdownEnded = true;
    showAnniversaryMessage();
    return;
  }

  const days    = Math.floor(diff / 86400000);
  const hours   = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  document.getElementById('cd-d').textContent = String(days).padStart(2, '0');
  document.getElementById('cd-h').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-m').textContent = String(minutes).padStart(2, '0');
  document.getElementById('cd-s').textContent = String(seconds).padStart(2, '0');
}

updateCountdown(); // run immediately
setInterval(updateCountdown, 1000);

// Image Upload Handler
window.loadImg = function(event, wrapperId) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    const wrap = document.getElementById(wrapperId);
    wrap.innerHTML = '';
    const img = document.createElement('img');
    img.src = ev.target.result;
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
    wrap.appendChild(img);
  };
  reader.readAsDataURL(file);
};

// Form Submit Handler
window.handleSubmit = function() {
  const firstName = document.getElementById('firstName')?.value || '';
  const lastName  = document.getElementById('lastName')?.value || '';
  const email     = document.getElementById('emailContact')?.value || '';
  const message   = document.getElementById('messageText')?.value || '';
  const toast     = document.getElementById('toast');

  if (!firstName || !lastName || !email || !message) {
    toast.textContent = '⚠️ Please fill in all required fields.';
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
      toast.textContent = "✅ Message sent! We'll be in touch soon.";
    }, 2800);
    return;
  }

  toast.textContent = "✅ Message sent! We'll be in touch soon.";
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3600);

  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value = '';
  document.getElementById('emailContact').value = '';
  if (document.getElementById('topicSelect')) document.getElementById('topicSelect').value = '';
  document.getElementById('messageText').value = '';
};

// Scroll Reveal Observer
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('revealed');
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-reveal], .mv-card, .svc-card, .tl-item').forEach(el => {
  revealObserver.observe(el);
});
