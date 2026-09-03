/**
 * STILL WELL MED SPA & LONGEVITY - MASTER FRONTEND CONTROLLER
 * Ultra-High Polish Interaction Engine (60fps Hardware Acceleration)
 */

document.addEventListener('DOMContentLoaded', () => {
  initSiteHeader();
  initMobileDrawer();
  initConcernMatrix();
  initBeforeAfterSlider();
  initScrollReveals();
  initAccordions();
});

/* 1. Grand Architectural Header Scroll Elevation */
function initSiteHeader() {
  const header = document.getElementById('siteHeader') || document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
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

/* 3. Interactive Diagnostic Concern Matrix Tab Switcher */
function initConcernMatrix() {
  const tabs = document.querySelectorAll('.matrix-tab-btn');
  const panels = document.querySelectorAll('.matrix-panel');
  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');
      if (!targetId) return;

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* 4. Interactive Before/After Split Comparison Slider */
function initBeforeAfterSlider() {
  const slider = document.getElementById('comparisonSlider');
  const beforeWrap = document.getElementById('sliderBeforeWrap');
  const knob = document.getElementById('sliderKnob');

  if (!slider || !beforeWrap || !knob) return;

  let isDragging = false;

  function updateSlider(clientX) {
    const rect = slider.getBoundingClientRect();
    let x = clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    const percent = (x / rect.width) * 100;

    beforeWrap.style.width = percent + '%';
    knob.style.left = percent + '%';
  }

  function onPointerDown(e) {
    isDragging = true;
    updateSlider(e.clientX || (e.touches && e.touches[0].clientX));
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    if (clientX !== undefined) {
      updateSlider(clientX);
    }
  }

  function onPointerUp() {
    isDragging = false;
  }

  // Mouse events
  slider.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  // Touch events
  slider.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);
}

/* 5. Scroll-Triggered Reveal Animation */
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
    reveals.forEach(el => {
      el.classList.add('is-revealed');
      el.classList.add('data-seen');
    });
  }
}

/* 6. Accordions */
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      if (item) {
        item.classList.toggle('is-open');
      }
    });
  });
}
