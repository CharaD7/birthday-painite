/* ============================================================
   PAINITE BIRTHDAY SITE — main.js
   ============================================================ */

/* ── Year in footer ── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── Detect mobile ── */
const isMobile = window.innerWidth < 768;

/* ============================================================
   1. TSPARTICLES — Stars + floating hearts background
   ============================================================ */
tsParticles.load('tsparticles', {
  fullScreen: { enable: false },
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: !isMobile, mode: 'grab' },
      onClick:  { enable: true,  mode: 'push' },
    },
    modes: {
      grab: { distance: 140, links: { opacity: 0.4 } },
      push: { quantity: 3 },
    },
  },
  particles: {
    number: {
      value: isMobile ? 50 : 110,
      density: { enable: true, area: 900 },
    },
    color: {
      value: ['#ffffff', '#4d8eff', '#d4af37', '#ffe980', '#1a56db'],
    },
    shape: {
      type: ['circle', 'star'],
      options: {
        star: { sides: 5 },
      },
    },
    opacity: {
      value: { min: 0.15, max: 0.85 },
      animation: {
        enable: true,
        speed: 0.8,
        minimumValue: 0.1,
        sync: false,
      },
    },
    size: {
      value: { min: 1, max: isMobile ? 3 : 4 },
      animation: {
        enable: true,
        speed: 2,
        minimumValue: 0.5,
        sync: false,
      },
    },
    links: {
      enable: !isMobile,
      distance: 130,
      color: '#1a56db',
      opacity: 0.12,
      width: 1,
    },
    move: {
      enable: true,
      speed: isMobile ? 0.4 : 0.7,
      direction: 'none',
      random: true,
      straight: false,
      outModes: { default: 'out' },
    },
    twinkle: {
      particles: {
        enable: true,
        frequency: 0.04,
        opacity: 1,
      },
    },
  },
  detectRetina: true,
});

/* ============================================================
   2. GSAP SCROLL ANIMATIONS
   ============================================================ */
gsap.registerPlugin(ScrollTrigger);

/* Initial hero entrance — stagger in sequence */
gsap.utils.toArray('.hero .reveal').forEach((el, i) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.3 + i * 0.18,
    ease: 'power3.out',
  });
});

/* All other sections — scroll-triggered */
gsap.utils.toArray('section:not(.hero) .reveal').forEach((el) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 88%',
      toggleActions: 'play none none none',
    },
  });
});

/* Reason cards — stagger per row */
ScrollTrigger.batch('.reason-card', {
  onEnter: (batch) =>
    gsap.to(batch, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power2.out',
    }),
  start: 'top 90%',
});

/* Timeline items — slide from left */
gsap.utils.toArray('.timeline-item').forEach((item) => {
  gsap.fromTo(
    item,
    { opacity: 0, x: -40 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 88%',
      },
    }
  );
});

/* Hero name glow pulse on load */
gsap.fromTo(
  '.hero-name',
  { textShadow: '0 0 60px rgba(77,142,255,0.5)' },
  {
    textShadow: '0 0 120px rgba(77,142,255,0.9), 0 0 200px rgba(37,99,235,0.4)',
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  }
);

/* ============================================================
   3. CANVAS CONFETTI — hero CTA button
   ============================================================ */
const confettiBtn = document.getElementById('confettiBtn');

function launchConfetti() {
  const colors = ['#1a56db', '#d4af37', '#ffffff', '#4d8eff', '#ffe980'];

  // burst from centre
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors,
    scalar: 1.1,
  });

  // side cannons
  setTimeout(() => {
    confetti({ particleCount: 60, angle: 60,  spread: 55, origin: { x: 0, y: 0.65 }, colors });
    confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1, y: 0.65 }, colors });
  }, 200);

  // hearts burst
  confetti({
    particleCount: 40,
    spread: 60,
    origin: { y: 0.55 },
    shapes: ['circle'],
    colors: ['#ff6eb4', '#ff8fca', '#ffb3d9'],
    scalar: 0.9,
  });
}

confettiBtn.addEventListener('click', launchConfetti);

/* ── Auto-launch confetti on page load after a short delay ── */
window.addEventListener('load', () => {
  setTimeout(launchConfetti, 1800);
});

/* ============================================================
   4. BURST BUTTON — final wish section
   ============================================================ */
const burstBtn = document.getElementById('burstBtn');

burstBtn.addEventListener('click', () => {
  const colors = ['#1a56db', '#d4af37', '#ffffff', '#4d8eff', '#ffe980', '#ff69b4'];

  // Big dramatic burst
  for (let i = 0; i < 4; i++) {
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { x: Math.random(), y: Math.random() * 0.4 + 0.3 },
        colors,
        scalar: 1.2,
      });
    }, i * 150);
  }

  // Falling stars from top
  confetti({
    particleCount: 50,
    startVelocity: 20,
    spread: 360,
    origin: { x: 0.5, y: 0 },
    colors,
    shapes: ['star'],
    scalar: 1.3,
    gravity: 0.4,
  });
});

/* ============================================================
   5. FLOATING HEARTS — wish section background
   ============================================================ */
const heartsContainer = document.getElementById('floatingHearts');
const heartEmojis = ['💙', '💖', '✨', '💫', '🤍', '💛', '💎'];

function createHeart() {
  const heart = document.createElement('span');
  heart.classList.add('heart');
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

  const leftPct = Math.random() * 100;
  const duration = 6 + Math.random() * 8;
  const delay    = Math.random() * 4;
  const size     = 1 + Math.random() * 1.4;

  heart.style.cssText = `
    left: ${leftPct}%;
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
    font-size: ${size}rem;
  `;

  heartsContainer.appendChild(heart);

  // Remove after animation ends to prevent DOM bloat
  setTimeout(() => heart.remove(), (duration + delay + 1) * 1000);
}

// Spawn hearts periodically when wish section is in view
let heartInterval = null;

const wishSection = document.getElementById('wish');
const wishObserver = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      if (!heartInterval) {
        heartInterval = setInterval(createHeart, 600);
      }
    } else {
      clearInterval(heartInterval);
      heartInterval = null;
    }
  },
  { threshold: 0.2 }
);
wishObserver.observe(wishSection);

/* ============================================================
   6. MUSIC PLAYER
   ============================================================ */
const musicToggle = document.getElementById('musicToggle');
const musicIcon   = document.getElementById('musicIcon');
const bgMusic     = document.getElementById('bgMusic');
const musicPlayer = document.getElementById('musicPlayer');
const musicTitle  = document.getElementById('musicTitle');

let isPlaying = false;

// Playlist — actual files in the music/ folder
const playlist = [
  {
    title:  'Swear It Again',
    artist: 'Westlife',
    file:   'music/Westlife - Swear It Again (Official Video).mp3',
  },
  {
    title:  'All of Me',
    artist: 'John Legend',
    file:   'music/John Legend - All of Me (Official Video).mp3',
  },
];
let currentTrack = 0;

function updateMusicMeta() {
  const track = playlist[currentTrack];
  musicTitle.textContent = track.title;
  document.querySelector('.music-artist').textContent = track.artist;
  bgMusic.src = track.file;
}

// Initialise with first track
updateMusicMeta();

function toggleMusic() {
  if (isPlaying) {
    bgMusic.pause();
    musicIcon.textContent = '♪';
    musicPlayer.classList.remove('playing');
    isPlaying = false;
  } else {
    bgMusic.play().catch(() => {
      // Autoplay blocked — show tooltip
      musicTitle.textContent = 'Click ♪ to play';
    });
    musicIcon.textContent = '⏸';
    musicPlayer.classList.add('playing');
    isPlaying = true;
  }
}

musicToggle.addEventListener('click', toggleMusic);

// When a song ends, advance to next track and auto-play it
bgMusic.addEventListener('ended', () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  updateMusicMeta();
  bgMusic.play().catch(() => {});
});

// Try autoplay after first user interaction with the page
document.addEventListener('click', () => {
  if (!isPlaying && bgMusic.paused && bgMusic.readyState >= 2) {
    bgMusic.play().then(() => {
      musicIcon.textContent = '⏸';
      musicPlayer.classList.add('playing');
      isPlaying = true;
    }).catch(() => {});
  }
}, { once: true });

/* ============================================================
   7. SPARKLE CLICK EFFECT — cursor sparkles on tap/click
   ============================================================ */
function spawnSparkle(x, y) {
  const sparkles = ['✨', '💫', '⭐', '💙', '💛'];
  const el = document.createElement('span');
  el.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
  el.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    font-size: ${0.8 + Math.random() * 0.8}rem;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    animation: sparkle-fly 0.9s ease-out forwards;
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 950);
}

// Inject sparkle keyframe once
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
  @keyframes sparkle-fly {
    0%   { opacity: 1; transform: translate(-50%,-50%) scale(1); }
    100% { opacity: 0; transform: translate(calc(-50% + ${Math.random() > 0.5 ? '' : '-'}${20 + Math.random()*30}px), calc(-50% - ${30 + Math.random()*40}px)) scale(0.4); }
  }
`;
document.head.appendChild(sparkleStyle);

document.addEventListener('click', (e) => {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => spawnSparkle(e.clientX + (Math.random() - 0.5) * 20, e.clientY + (Math.random() - 0.5) * 20), i * 80);
  }
});

document.addEventListener('touchstart', (e) => {
  const t = e.touches[0];
  for (let i = 0; i < 3; i++) {
    setTimeout(() => spawnSparkle(t.clientX + (Math.random() - 0.5) * 20, t.clientY + (Math.random() - 0.5) * 20), i * 80);
  }
}, { passive: true });
