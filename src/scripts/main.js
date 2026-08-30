/* =============================================
   TIXAR — Main Script
   ============================================= */

/* --- Mobile Navigation --- */
const hamburger = document.querySelector('.nav-hamburger');
const overlay = document.querySelector('.mobile-nav-overlay');
const panel = document.querySelector('.mobile-nav-panel');
const closeBtn = document.querySelector('.mobile-nav-close');
const mobileLinks = panel.querySelectorAll('a');

function openMobileNav() {
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  panel.classList.add('is-open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  panel.classList.remove('is-open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMobileNav);
closeBtn.addEventListener('click', closeMobileNav);
overlay.addEventListener('click', closeMobileNav);
mobileLinks.forEach((link) => link.addEventListener('click', closeMobileNav));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && panel.classList.contains('is-open')) closeMobileNav();
});

/* --- FAQ Accordion --- */
document.querySelectorAll('.faq button').forEach((button) => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    const open = button.getAttribute('aria-expanded') === 'true';

    // Close other open FAQs
    document.querySelectorAll('.faq button[aria-expanded="true"]').forEach((otherBtn) => {
      if (otherBtn !== button) {
        otherBtn.setAttribute('aria-expanded', 'false');
        otherBtn.querySelector('span').textContent = '+';
        const otherAnswer = otherBtn.nextElementSibling;
        otherAnswer.style.maxHeight = '0';
        otherAnswer.classList.remove('is-open');
      }
    });

    button.setAttribute('aria-expanded', String(!open));
    button.querySelector('span').textContent = open ? '+' : '−';

    if (open) {
      answer.style.maxHeight = '0';
      answer.classList.remove('is-open');
    } else {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      answer.classList.add('is-open');
    }
  });
});

/* --- Scroll Reveal (IntersectionObserver) --- */
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  // Fallback: show everything immediately
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

/* --- Video Autoplay on Intersection (hero device) --- */
const heroVideos = document.querySelectorAll('.device-screen video');

if ('IntersectionObserver' in window && heroVideos.length) {
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.play().catch(() => {});
        } else {
          entry.target.pause();
        }
      });
    },
    { threshold: 0.3 }
  );

  heroVideos.forEach((v) => videoObserver.observe(v));
}

/* --- Project Card Video Preview (hover) --- */
const projectCards = document.querySelectorAll('.project-card[data-project]');

projectCards.forEach((card) => {
  const video = card.querySelector('.project-video');
  if (!video) return;

  let hoverTimeout;

  card.addEventListener('mouseenter', () => {
    clearTimeout(hoverTimeout);
    card.classList.add('is-hovered');
    video.currentTime = 0;
    video.play().catch(() => {});
  });

  card.addEventListener('mouseleave', () => {
    hoverTimeout = setTimeout(() => {
      video.pause();
      video.currentTime = 0;
      card.classList.remove('is-hovered');
    }, 200);
  });
});
