/**
 * STILL WELL MED SPA - 2026 LUXURY FRONTEND CONTROLLER
 * Motion Choreography, Island Navigation & Interactive Hardware
 */

document.addEventListener('DOMContentLoaded', () => {
  initIslandNav();
  initMobileDrawer();
  initScrollReveals();
  initBeforeAfterSliders();
  initAccordions();
});

/* Fluid Island Nav Scroll Elevation */
function initIslandNav() {
  const nav = document.querySelector('.fluid-island-nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* Mobile Fullscreen Drawer Navigation */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('[data-drawer-toggle]');
  const closeBtn = document.querySelector('[data-drawer-close]');
  const drawer = document.querySelector('[data-mobile-drawer]');

  if (!drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  const drawerLinks = drawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* Scroll-Triggered Reveal Choreography */
function initScrollReveals() {
  const reveals = document.querySelectorAll('[data-reveal]');
  if (!reveals.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('data-seen');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.08
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('data-seen'));
  }
}

/* Interactive Before / After Split Comparison Slider */
function initBeforeAfterSliders() {
  const sliders = document.querySelectorAll('.ba-slider-container');

  sliders.forEach(container => {
    const afterLayer = container.querySelector('.ba-after');
    const handle = container.querySelector('.ba-handle');
    if (!afterLayer || !handle) return;

    let isDragging = false;

    function updateSlider(clientX) {
      const rect = container.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      afterLayer.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
    }

    handle.addEventListener('mousedown', () => { isDragging = true; });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSlider(e.clientX);
    });

    // Touch support for mobile phones
    handle.addEventListener('touchstart', () => { isDragging = true; }, { passive: true });
    window.addEventListener('touchend', () => { isDragging = false; });
    window.addEventListener('touchmove', (e) => {
      if (!isDragging || !e.touches[0]) return;
      updateSlider(e.touches[0].clientX);
    }, { passive: true });
  });
}

/* Accordion Component */
function initAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach(sib => sib.classList.remove('active'));
      if (!isOpen) item.classList.add('active');
    });
  });
}
