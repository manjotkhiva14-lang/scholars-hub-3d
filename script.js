// ============================================================
// Page-load entrance — adds `.loaded` to <body> once the DOM
// is ready. CSS handles the actual staggered animation; a tiny
// timeout ensures the browser paints the "before" state first
// so the transition actually fires instead of snapping instantly.
// ============================================================

window.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.body.classList.add('loaded');
    }, 80);
  });
});

// ============================================================
// Scroll-triggered reveals — elements are set to a tilted/hidden
// state in CSS by default, and get `.in-view` added once they
// cross into the viewport. The actual animation is CSS transitions;
// this script only toggles the class.
// ============================================================

const revealTargets = document.querySelectorAll(
  '.facility-card, .catalog-card, .section-title, .section-sub, .contact-inner'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target); // animate once, not every scroll pass
    }
  });
}, {
  threshold: 0.2,
  rootMargin: '0px 0px -60px 0px'
});

revealTargets.forEach((el) => revealObserver.observe(el));

// ============================================================
// Hero parallax — the lamp glow shifts as the user scrolls
// past the hero. Floating cards run their own continuous CSS
// orbit animation (see style.css) independent of scroll.
// ============================================================

{
  const heroSection = document.querySelector('.hero');
  const lampGlow = document.querySelector('.lamp-glow');

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    const heroHeight = heroSection ? heroSection.offsetHeight : 0;

    if (scrollY < heroHeight && lampGlow) {
      lampGlow.style.transform = `translateY(${scrollY * 0.25}px)`;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}