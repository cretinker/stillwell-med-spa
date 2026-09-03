/**
 * STILL WELL MED SPA - WORLD-CLASS LUXURY SYSTEM
 * Master Frontend Controller & Motion Choreography
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initHeaderScroll();
  initScrollProgressBar();
  initScrollReveals();
  initBeforeAfterSliders();
  initFaqAccordions();
  initTouchRails();
});

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

  // Close when clicking internal links
  const drawerLinks = drawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

/* Sticky Header Scroll Elevation */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* Scroll Progress Bar at Top of Header (PeeSkin Pattern) */
function initScrollProgressBar() {
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/* Scroll-Triggered Reveal Choreography (IntersectionObserver) */
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
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    reveals.forEach(el => el.classList.add('data-seen'));
  }
}

/* Interactive Before / After Split Comparison Sliders */
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

/* FAQ Accordion Component */
function initFaqAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close siblings if desired
      faqItems.forEach(sib => sib.classList.remove('active'));

      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

/* Touch Momentum Rails Drag Support */
function initTouchRails() {
  const rails = document.querySelectorAll('.touch-rail');
  rails.forEach(rail => {
    let isDown = false;
    let startX;
    let scrollLeft;

    rail.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - rail.offsetLeft;
      scrollLeft = rail.scrollLeft;
    });

    rail.addEventListener('mouseleave', () => { isDown = false; });
    rail.addEventListener('mouseup', () => { isDown = false; });

    rail.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - rail.offsetLeft;
      const walk = (x - startX) * 1.5;
      rail.scrollLeft = scrollLeft - walk;
    });
  });
}

/* Global Toast Helper */
window.showToast = function(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✓</span><span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
};
