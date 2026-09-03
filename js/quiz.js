/**
 * STILL WELL MED SPA - 4-STEP CONCERN DIAGNOSTIC QUIZ
 * Interactive intake engine for concerns.html
 */

document.addEventListener('DOMContentLoaded', () => {
  initConcernQuiz();
});

function initConcernQuiz() {
  const quizForm = document.getElementById('concern-quiz-form');
  if (!quizForm) return;

  const steps = quizForm.querySelectorAll('.quiz-step');
  const nextBtns = quizForm.querySelectorAll('[data-quiz-next]');
  const prevBtns = quizForm.querySelectorAll('[data-quiz-prev]');
  const resultCard = document.getElementById('quiz-result-card');

  const quizState = {
    step: 1,
    priority: '',
    downtime: '',
    skinType: ''
  };

  // Option select
  quizForm.querySelectorAll('.quiz-option-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = btn.closest('.quiz-options-group');
      parent.querySelectorAll('.quiz-option-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      const field = btn.getAttribute('data-field');
      const val = btn.getAttribute('data-value');
      quizState[field] = val;

      const currentStepEl = btn.closest('.quiz-step');
      const nextBtn = currentStepEl.querySelector('[data-quiz-next]');
      if (nextBtn) nextBtn.removeAttribute('disabled');
    });
  });

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (quizState.step < 3) {
        quizState.step++;
        showStep(quizState.step);
      } else {
        calculateResult();
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (quizState.step > 1) {
        quizState.step--;
        showStep(quizState.step);
      }
    });
  });

  function showStep(num) {
    steps.forEach((stepEl, idx) => {
      if (idx + 1 === num) {
        stepEl.classList.add('active');
      } else {
        stepEl.classList.remove('active');
      }
    });

    const progressEl = document.getElementById('quiz-progress-text');
    if (progressEl) progressEl.textContent = `Step ${num} of 3`;
  }

  function calculateResult() {
    quizForm.style.display = 'none';
    if (resultCard) {
      resultCard.style.display = 'block';

      let title = 'Custom Clinical Protocol';
      let device = 'Cartessa Tetra Pro CoolPeel';
      let serviceParam = 'coolpeel';
      let sessions = '3 to 4 monthly sessions';
      let reason = 'A gentle yet transformative laser approach that purges discoloration and tightens pores without interrupting your daily schedule.';

      if (quizState.priority === 'laxity') {
        title = 'Sofwave Ultrasound Tightening + Sculptra Biostimulation';
        device = 'Sofwave Parallel Ultrasound';
        serviceParam = 'sofwave-facelift';
        sessions = '1 single deep ultrasound treatment + 2 collagen boost vials';
        reason = 'Direct non-invasive contraction of the mid-dermal collagen layer (1.5mm) lifting the brow, jawline, and submentum with zero incisions.';
      } else if (quizState.priority === 'pigment') {
        title = 'Sciton BBL Hero + MOXI Hybrid Laser Therapy';
        device = 'Sciton Dual Modality BBL + Moxi';
        serviceParam = 'moxi-laser';
        sessions = '3 sessions spaced 4 weeks apart';
        reason = 'High-speed broadband light shatters vascular redness and pigmented sun spots, while 1927nm fractionated laser resurfaces skin tone.';
      } else if (quizState.priority === 'acne-scars') {
        title = 'Tetra Pro Fractional CO2 + Genius RF Microneedling';
        device = 'Cartessa Tetra Pro CO2 Ablative Laser';
        serviceParam = 'tetra-pro-co2';
        sessions = '2 to 3 targeted clinical sessions';
        reason = 'Thermal coagulation columns break fibrous scar tethering and trigger intense dermal reorganization for permanent smoothing.';
      } else if (quizState.priority === 'body') {
        title = 'Emsculpt NEO Core & Flank Contouring Protocol';
        device = 'Emsculpt NEO Synchronized RF + HIFEM';
        serviceParam = 'emsculpt-neo';
        sessions = '4 sessions scheduled 5 to 10 days apart';
        reason = 'Simultaneously triggers supra-maximal muscle contractions while delivering radiofrequency heat to permanently destroy 30% of fat cells.';
      } else if (quizState.priority === 'tension') {
        title = 'Targeted Myofascial Trigger Point Injections';
        device = 'Ultrasound Guided Physician Injections';
        serviceParam = 'trigger-point-injections';
        sessions = '1 to 2 targeted sessions with Dr. Stilwell';
        reason = 'Immediate sustained release of debilitating spasm knots, tension headaches, and myofascial referred pain by a board-certified pain physician.';
      } else if (quizState.priority === 'hair') {
        title = 'Dual Wavelength Laser Epilation & Follicular Reset';
        device = 'Contact Cooled Laser Epilation';
        serviceParam = 'laser-hair-removal';
        sessions = '6 sessions spaced 6 weeks apart';
        reason = 'Completely disables hair follicles at the root to eradicate stubborn ingrown hairs, folliculitis, and hyperpigmentation.';
      }

      document.getElementById('res-protocol-title').textContent = title;
      document.getElementById('res-device').textContent = device;
      document.getElementById('res-sessions').textContent = sessions;
      document.getElementById('res-reason').textContent = reason;

      const bookBtn = document.getElementById('res-book-btn');
      if (bookBtn) {
        bookBtn.href = `book.html?service=${serviceParam}`;
      }
    }
  }
}
