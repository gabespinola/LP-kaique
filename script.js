// ===================== YEAR =====================
document.getElementById('year').textContent = new Date().getFullYear();

// ===================== NAVBAR SHADOW ON SCROLL =====================
const navbar = document.getElementById('navbar');
const onScroll = () => {
  navbar.classList.toggle('scrolled', window.scrollY > 12);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ===================== MOBILE MENU TOGGLE =====================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile menu after clicking a link (and let smooth scroll happen)
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===================== SCROLL REVEAL =====================
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // slight stagger for elements revealed together
        const delay = (index % 3) * 80;
        setTimeout(() => entry.target.classList.add('is-visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach((el) => revealObserver.observe(el));

// ===================== MODAL "SAIBA MAIS" =====================
const saibaMaisBtn = document.getElementById('saibaMaisBtn');
const saibaMaisModal = document.getElementById('saibaMaisModal');
const saibaMaisClose = document.getElementById('saibaMaisClose');
let lastFocusedEl = null;

function openModal() {
  lastFocusedEl = document.activeElement;
  saibaMaisModal.hidden = false;
  // next frame so the transition runs
  requestAnimationFrame(() => saibaMaisModal.classList.add('is-open'));
  document.body.style.overflow = 'hidden';
  saibaMaisClose.focus();
}

function closeModal() {
  saibaMaisModal.classList.remove('is-open');
  document.body.style.overflow = '';
  setTimeout(() => {
    saibaMaisModal.hidden = true;
  }, 300);
  if (lastFocusedEl) lastFocusedEl.focus();
}

if (saibaMaisBtn && saibaMaisModal) {
  saibaMaisBtn.addEventListener('click', openModal);
  saibaMaisClose.addEventListener('click', closeModal);

  // Close when clicking the dark overlay (outside the card)
  saibaMaisModal.addEventListener('click', (e) => {
    if (e.target === saibaMaisModal) closeModal();
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !saibaMaisModal.hidden) closeModal();
  });
}