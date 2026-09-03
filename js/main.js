/**
 * STILL WELL MED SPA & LONGEVITY - MASTER FRONTEND CONTROLLER
 * Robust, zero-failure interactive systems for Luminous Luxury Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
  initIslandNav();
  initMobileDrawer();
  initScrollReveals();
  initBeforeAfterSlider();
  initAccordions();
});

/* 1. Fluid Island Navigation Scroll Elevation */
function initIslandNav() {
  const nav = document.getElementById('islandNav') || document.querySelector('.fluid-island-nav');
  if (!nav) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      nav.classList.add('nav-elevated');
    } else {
      nav.classList.remove('nav-elevated');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* 2. Mobile Drawer Open/Close Controller */
function initMobileDrawer() {
  const openBtn = document.getElementById('mobileDrawerOpen') || document.querySelector('.mobile-nav-toggle');
  const closeBtn = document.getElementById('mobileDrawerClose');
  const drawer = document.getElementById('mobileDrawer') || document.querySelector('.mobile-drawer');

  if (!drawer) return;

  function open() {
    drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    drawer.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);

  // Close on link click
  const links = drawer.querySelectorAll('a');
  links.forEach(a => a.addEventListener('click', close));

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      close();
    }
  });
}

/* 3. Scroll-Triggered Reveal Animation (Resilient Progressive Enhancement) */
function initScrollReveals() {
  const reveals = document.querySelectorAll('[data-reveal]');
  if (!reveals.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          entry.target.classList.add('data-seen');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.05
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback if observer not supported
    reveals.forEach(el => {
      el.classList.add('is-revealed');
      el.classList.add('data-seen');
    });
  }
}

/* 4. Interactive Before/After Split Comparison Slider */
function initBeforeAfterSlider() {
  const slider = document.getElementById('comparisonSlider');
  const beforeWrap = document.getElementById('sliderBeforeWrap');
  const knob = document.getElementById('sliderKnob');

  if (!slider || !beforeWrap || !knob) return;

  let isDragging = false;

  function setSliderPosition(clientX) {
    const rect = slider.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    const percent = (x / rect.width) * 100;
    beforeWrap.style.width = `${percent}%`;
    knob.style.left = `${percent}%`;
  }

  // Mouse drag handlers
  knob.addEventListener('mousedown', (e) => {
    isDragging = true;
    e.preventDefault();
  });

  slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    setSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.clientX);
  });

  // Touch drag handlers
  knob.addEventListener('touchstart', (e) => {
    isDragging = true;
  }, { passive: true });

  slider.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      setSliderPosition(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches || !e.touches[0]) return;
    setSliderPosition(e.touches[0].clientX);
  }, { passive: true });
}

/* 5. Accordions (for FAQ / Treatments) */
function initAccordions() {
  const items = document.querySelectorAll('.faq-item, .accordion-item');
  items.forEach(item => {
    const trigger = item.querySelector('.faq-question, .accordion-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const active = item.classList.contains('active');
      items.forEach(sib => sib.classList.remove('active'));
      if (!active) item.classList.add('active');
    });
  });
}
