/**
 * STILL WELL MED SPA - IN-HOUSE BOOKING ENGINE CONTROLLER
 * 4-Step Progressive Intake Wizard
 */

const SERVICES_DATABASE = [
  // LASER & ENERGY MEDICINE
  {
    id: 'tetra-pro-co2',
    name: 'Cartessa Tetra Pro CO2 Laser Resurfacing',
    dept: 'lasers',
    deptLabel: 'Laser Medicine',
    price: 1200,
    duration: '60 min',
    specs: ['10,600nm Ablative', 'Deka Pulse', 'Deep Wrinkles & Scars'],
    desc: 'Advanced fractional ablative laser delivering targeted thermal energy to erase deep wrinkles, acne scars, and severe photodamage with minimal downtime.'
  },
  {
    id: 'coolpeel',
    name: 'Tetra Pro CoolPeel Laser',
    dept: 'lasers',
    deptLabel: 'Laser Medicine',
    price: 650,
    duration: '45 min',
    specs: ['Sub-Microsecond Pulse', 'Zero Social Downtime', 'Tone & Texture'],
    desc: 'Award-winning H-pulse technology delivering the benefits of a traditional CO2 resurfacing treatment with zero thermal damage to surrounding tissue.'
  },
  {
    id: 'moxi-laser',
    name: 'Sciton MOXI 1927nm Fractional Resurfacing',
    dept: 'lasers',
    deptLabel: 'Laser Medicine',
    price: 750,
    duration: '45 min',
    specs: ['1927nm Non-Ablative', 'Pre-Juvenation', 'Melasma Safe'],
    desc: 'Gentle non-ablative laser designed for all skin types. Corrects initial signs of sun damage, early pigmentation, and uneven skin texture.'
  },
  {
    id: 'bbl-hero',
    name: 'Sciton BBL Hero Photofacial',
    dept: 'lasers',
    deptLabel: 'Laser Medicine',
    price: 550,
    duration: '40 min',
    specs: ['High-Energy Broadband Light', 'Pigment & Redness', 'Body & Face'],
    desc: 'World leading pulsed light system targeting stubborn sunspots, broken capillaries, rosacea, and age-related redness at 4x clinical speed.'
  },
  {
    id: 'hollywood-laser-peel',
    name: 'Lutronic Hollywood Laser Peel',
    dept: 'lasers',
    deptLabel: 'Laser Medicine',
    price: 350,
    duration: '45 min',
    specs: ['Spectra Nd:YAG 1064nm', 'Activated Carbon', 'Instant Red Carpet Glow'],
    desc: 'Celebrity favorite 3-step carbon laser treatment that shrinks enlarged pores, removes active acne bacteria, and leaves skin luminous immediately.'
  },
  {
    id: 'laser-hair-removal',
    name: 'Medical Grade Laser Hair Removal',
    dept: 'lasers',
    deptLabel: 'Laser Medicine',
    price: 300,
    duration: '30 min',
    specs: ['Dual Wavelength Alexandrite + Nd:YAG', 'All Skin Tones', 'Permanent Epilation'],
    desc: 'State-of-the-art contact cooling epilation delivering rapid, permanent follicular clearance across face, underarms, bikini, or body.'
  },

  // AESTHETIC INJECTABLES
  {
    id: 'botox-cosmetic',
    name: 'Botox Cosmetic / Dysport Neuromodulator',
    dept: 'injectables',
    deptLabel: 'Injectables',
    price: 320,
    duration: '30 min',
    specs: ['FDA Cleared', 'Physician Precision', 'Forehead & Crow Feet'],
    desc: 'Purified neuroprotein injected by expert physicians to soften dynamic wrinkles, prevent crease formation, and preserve natural facial expressions.'
  },
  {
    id: 'dermal-fillers',
    name: 'Hyaluronic Acid Dermal Fillers',
    dept: 'injectables',
    deptLabel: 'Injectables',
    price: 750,
    duration: '45 min',
    specs: ['Juvederm / Restylane', 'Cheeks, Lips & Jawline', 'Instant Volume'],
    desc: 'Premium structural hyaluronic acid gel formulated to restore midface volume, define contour borders, and harmonize facial symmetry.'
  },
  {
    id: 'sculptra-aesthetic',
    name: 'Sculptra Aesthetic Biostimulator',
    dept: 'injectables',
    deptLabel: 'Injectables',
    price: 850,
    duration: '45 min',
    specs: ['Poly-L-Lactic Acid (PLLA)', 'Type 1 Collagen Induction', '24-Month Longevity'],
    desc: 'Regenerative biostimulatory injectable that gradually restores deep facial structural volume by stimulating your skin native collagen matrix.'
  },
  {
    id: 'radiesse-remodeling',
    name: 'Radiesse Calcium Hydroxylapatite (CaHA)',
    dept: 'injectables',
    deptLabel: 'Injectables',
    price: 800,
    duration: '45 min',
    specs: ['CaHA Microspheres', 'Skin Tightening', 'Neck, Hands & Jawline'],
    desc: 'Dual action regenerative filler delivering instant physical lift while triggering long-term elastin and collagen scaffolding.'
  },
  {
    id: 'prp-vampire-facial',
    name: 'PRP / PRF Autologous Collagen Activation',
    dept: 'injectables',
    deptLabel: 'Injectables',
    price: 750,
    duration: '60 min',
    specs: ['Autologous Platelet Rich Fibrin', 'High Growth Factor', 'Scalp & Dermis'],
    desc: 'Concentrated autologous growth factors derived from your own blood, infused into the dermis or scalp to accelerate tissue regeneration.'
  },
  {
    id: 'pdo-thread-lifting',
    name: 'PDO Vector Thread Lift',
    dept: 'injectables',
    deptLabel: 'Injectables',
    price: 1400,
    duration: '60 min',
    specs: ['Absorbable Polydioxanone', 'Instant Mechanical Elevation', 'Collagen Tunneling'],
    desc: 'Minimally invasive architectural suspension threads repositioning drooping tissue along the jowls, midface, and brow without surgical incisions.'
  },

  // NON-SURGICAL LIFTING
  {
    id: 'sofwave-facelift',
    name: 'Sofwave Ultrasound Non-Invasive Facelift',
    dept: 'lifting',
    deptLabel: 'Lifting & Contouring',
    price: 2400,
    duration: '60 min',
    specs: ['Synchronous Ultrasound Parallel Beam', 'FDA Cleared Laxity', 'Zero Downtime'],
    desc: 'Breakthrough ultrasound energy delivered at an exact 1.5mm depth in the mid-dermis to lift the eyebrow, submentum, and neck.'
  },
  {
    id: 'genius-rf-microneedling',
    name: 'Lutronic Genius Intelligent RF Microneedling',
    dept: 'lifting',
    deptLabel: 'Lifting & Contouring',
    price: 950,
    duration: '60 min',
    specs: ['Real-Time Impedance Feedback', 'Adjustable 0.5-3.5mm Depth', 'Collagen Tightening'],
    desc: 'Intelligent radiofrequency energy delivered via micro-insulated needles to stimulate profound dermal remodeling for laxity and severe scarring.'
  },

  // LONGEVITY & PAIN MEDICINE
  {
    id: 'emsculpt-neo',
    name: 'Emsculpt NEO Body Sculpting & Fat Reduction',
    dept: 'wellness',
    deptLabel: 'Longevity & Body',
    price: 750,
    duration: '30 min',
    specs: ['Synchronized RF + HIFEM', '30% Fat Reduction', '25% Muscle Gain'],
    desc: 'Simultaneously emits synchronized RF and high-intensity electromagnetic fields to eliminate fat cells while building muscle fibers.'
  },
  {
    id: 'medical-weight-loss',
    name: 'Physician Led Medical Weight Loss Consultation',
    dept: 'wellness',
    deptLabel: 'Longevity & Body',
    price: 220,
    duration: '45 min',
    specs: ['Semaglutide / Tirzepatide Protocols', 'Comprehensive Bloodwork', 'Physician Monitored'],
    desc: 'Personalized metabolic evaluation and clinical GLP-1 program supervised directly by Dr. Anne Marie Stilwell, MD for sustainable weight management.'
  },
  {
    id: 'hormone-replacement',
    name: 'Bioidentical Hormone Replacement Therapy (BHRT)',
    dept: 'wellness',
    deptLabel: 'Longevity & Body',
    price: 250,
    duration: '45 min',
    specs: ['Precision Endocrinology', 'Pellet & Cream Therapies', 'Vitality & Balance'],
    desc: 'In-depth laboratory analysis and tailored bioidentical hormone restoration for fatigue, sleep disruptions, weight resistance, and mood imbalances.'
  },
  {
    id: 'trigger-point-injections',
    name: 'Trigger Point & Myofascial Pain Injections',
    dept: 'wellness',
    deptLabel: 'Longevity & Body',
    price: 275,
    duration: '30 min',
    specs: ['Pain Medicine Specialization', 'Instant Spasm Relief', 'Cervical & Lumbar'],
    desc: 'Targeted medical injections administered by pain specialist Dr. Stilwell to immediately release debilitating muscle knots, tension headaches, and SI joint pain.'
  },
  {
    id: 'iv-hydration-infusion',
    name: 'Cellular Longevity & Immunity IV Infusion',
    dept: 'wellness',
    deptLabel: 'Longevity & Body',
    price: 195,
    duration: '45 min',
    specs: ['High-Dose Glutathione', 'Vitamin B-Complex + C', '100% Bioavailability'],
    desc: 'Direct intravenous hydration infused with master antioxidants, electrolytes, and micronutrients to restore mitochondrial vitality.'
  },

  // MEDICAL FACIALS
  {
    id: 'hydrafacial-syndeo',
    name: 'HydraFacial Syndeo Platinum Medical Session',
    dept: 'facials',
    deptLabel: 'Medical Facials',
    price: 325,
    duration: '60 min',
    specs: ['Vortex-Fusion Technology', 'Lymphatic Drainage', 'Targeted Peptide Booster'],
    desc: 'Deluxe 6-step medical facial featuring deep vortex vacuum extraction, gentle glycolic peel, LED light therapy, and concentrated custom serum infusions.'
  },
  {
    id: 'medical-chemical-peel',
    name: 'Custom Clinical Acid Resurfacing Peel',
    dept: 'facials',
    deptLabel: 'Medical Facials',
    price: 225,
    duration: '45 min',
    specs: ['TCA / Salicylic / Glycolic', 'Cellular Turnover', 'Clearance & Glow'],
    desc: 'Medical grade chemical exfoliants selected specifically for your Fitzpatrick skin type to unblock comedones and stimulate rapid epithelial renewal.'
  }
];

// Booking State
const bookingState = {
  currentStep: 1,
  selectedDepartment: 'all',
  selectedService: null,
  selectedDate: null,
  selectedTime: null,
  selectedClinician: 'Dr. Anne Marie Stilwell, MD (Lead Physician)',
  guestInfo: {
    fullName: '',
    phone: '',
    email: '',
    notes: '',
    consentMedical: false
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initBookingWizard();
});

function initBookingWizard() {
  renderServicesList('all');
  initDepartmentChips();
  initCalendar();
  initStepButtons();
  checkUrlPreFill();
  updateSummaryCard();
}

/* Parse Deep Linking Parameters */
function checkUrlPreFill() {
  const params = new URLSearchParams(window.location.search);
  const dept = params.get('dept');
  const serviceId = params.get('service');

  if (dept) {
    const chip = document.querySelector(`[data-dept="${dept}"]`);
    if (chip) {
      document.querySelectorAll('.dept-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      bookingState.selectedDepartment = dept;
      renderServicesList(dept);
    }
  }

  if (serviceId) {
    const found = SERVICES_DATABASE.find(s => s.id === serviceId);
    if (found) {
      selectService(found);
    }
  }
}

/* Department Filter Rail */
function initDepartmentChips() {
  const chips = document.querySelectorAll('.dept-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const dept = chip.getAttribute('data-dept');
      bookingState.selectedDepartment = dept;
      renderServicesList(dept);
    });
  });
}

/* Render Services */
function renderServicesList(dept) {
  const container = document.getElementById('services-list-container');
  if (!container) return;

  const filtered = (dept === 'all')
    ? SERVICES_DATABASE
    : SERVICES_DATABASE.filter(s => s.dept === dept);

  container.innerHTML = '';

  filtered.forEach(service => {
    const isSelected = bookingState.selectedService && bookingState.selectedService.id === service.id;
    const card = document.createElement('div');
    card.className = `service-pick-card ${isSelected ? 'selected' : ''}`;
    card.setAttribute('data-id', service.id);

    const specsHtml = service.specs.map(spec => `<span class="spec-chip">${spec}</span>`).join('');

    card.innerHTML = `
      <div class="service-card-top">
        <div>
          <div class="mono-tag" style="color: var(--laser-blue); margin-bottom: 4px;">${service.deptLabel}</div>
          <h3 class="service-name">${service.name}</h3>
        </div>
        <div class="service-pricing">
          <div class="service-price">$${service.price}</div>
          <div class="service-duration">${service.duration}</div>
        </div>
      </div>
      <p class="service-desc">${service.desc}</p>
      <div class="service-specs">${specsHtml}</div>
    `;

    card.addEventListener('click', () => {
      selectService(service);
    });

    container.appendChild(card);
  });
}

function selectService(service) {
  bookingState.selectedService = service;

  // Update DOM selection styling
  document.querySelectorAll('.service-pick-card').forEach(c => {
    if (c.getAttribute('data-id') === service.id) {
      c.classList.add('selected');
    } else {
      c.classList.remove('selected');
    }
  });

  updateSummaryCard();
  const btnNext = document.getElementById('btn-step-1-next');
  if (btnNext) btnNext.removeAttribute('disabled');
}

/* Calendar Generator */
function initCalendar() {
  const grid = document.getElementById('calendar-days-grid');
  if (!grid) return;

  grid.innerHTML = '';

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  daysOfWeek.forEach(d => {
    const header = document.createElement('div');
    header.className = 'calendar-day-header';
    header.textContent = d;
    grid.appendChild(header);
  });

  const now = new Date();
  // Start from tomorrow
  const startDate = new Date();
  startDate.setDate(now.getDate() + 1);

  // Generate 28 booking days
  for (let i = 0; i < 28; i++) {
    const date = new Date();
    date.setDate(startDate.getDate() + i);

    const isSunday = date.getDay() === 0;
    const cell = document.createElement('div');
    cell.className = `calendar-day-cell ${isSunday ? 'disabled' : ''}`;

    const dateFormatted = date.toISOString().split('T')[0];
    const displayNum = date.getDate();

    cell.innerHTML = `<span>${displayNum}</span>`;

    if (!isSunday) {
      cell.addEventListener('click', () => {
        document.querySelectorAll('.calendar-day-cell').forEach(c => c.classList.remove('selected'));
        cell.classList.add('selected');

        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        bookingState.selectedDate = date.toLocaleDateString('en-US', options);

        renderTimeSlots();
        updateSummaryCard();
        validateStep2();
      });
    }

    grid.appendChild(cell);
  }
}

/* Time Slots */
function renderTimeSlots() {
  const slotsContainer = document.getElementById('time-slots-container');
  if (!slotsContainer) return;

  const slots = [
    '09:30 AM', '10:15 AM', '11:00 AM', '11:45 AM',
    '01:15 PM', '02:00 PM', '02:45 PM', '03:30 PM',
    '04:15 PM', '05:00 PM'
  ];

  slotsContainer.innerHTML = '';
  slots.forEach(slot => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'time-slot-btn';
    btn.textContent = slot;

    btn.addEventListener('click', () => {
      document.querySelectorAll('.time-slot-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      bookingState.selectedTime = slot;
      updateSummaryCard();
      validateStep2();
    });

    slotsContainer.appendChild(btn);
  });
}

function validateStep2() {
  const btnNext = document.getElementById('btn-step-2-next');
  if (btnNext) {
    if (bookingState.selectedDate && bookingState.selectedTime) {
      btnNext.removeAttribute('disabled');
    } else {
      btnNext.setAttribute('disabled', 'true');
    }
  }
}

/* Step Navigation Controls */
function initStepButtons() {
  // Step 1 Next
  const btn1Next = document.getElementById('btn-step-1-next');
  if (btn1Next) {
    btn1Next.addEventListener('click', () => {
      if (bookingState.selectedService) {
        goToStep(2);
      }
    });
  }

  // Step 2 Back & Next
  const btn2Back = document.getElementById('btn-step-2-back');
  if (btn2Back) btn2Back.addEventListener('click', () => goToStep(1));

  const btn2Next = document.getElementById('btn-step-2-next');
  if (btn2Next) {
    btn2Next.addEventListener('click', () => {
      if (bookingState.selectedDate && bookingState.selectedTime) {
        goToStep(3);
      }
    });
  }

  // Step 3 Back & Submit
  const btn3Back = document.getElementById('btn-step-3-back');
  if (btn3Back) btn3Back.addEventListener('click', () => goToStep(2));

  const intakeForm = document.getElementById('intake-booking-form');
  if (intakeForm) {
    intakeForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('guest-name').value.trim();
      const phone = document.getElementById('guest-phone').value.trim();
      const email = document.getElementById('guest-email').value.trim();
      const clinician = document.getElementById('guest-clinician').value;
      const notes = document.getElementById('guest-notes').value.trim();

      if (!name || !phone || !email) {
        alert('Please provide your full name, phone number, and email address.');
        return;
      }

      bookingState.guestInfo = { fullName: name, phone, email, notes, clinician };
      bookingState.selectedClinician = clinician;

      finishBooking();
    });
  }
}

function goToStep(stepNumber) {
  bookingState.currentStep = stepNumber;

  // Update panels
  document.querySelectorAll('.wizard-panel').forEach((panel, idx) => {
    if (idx + 1 === stepNumber) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });

  // Update indicators
  document.querySelectorAll('.step-indicator').forEach((ind, idx) => {
    const stepIdx = idx + 1;
    if (stepIdx === stepNumber) {
      ind.classList.add('active');
      ind.classList.remove('completed');
    } else if (stepIdx < stepNumber) {
      ind.classList.remove('active');
      ind.classList.add('completed');
    } else {
      ind.classList.remove('active');
      ind.classList.remove('completed');
    }
  });

  const progressBar = document.getElementById('wizard-progress-fill');
  if (progressBar) {
    const pct = ((stepNumber - 1) / 3) * 100;
    progressBar.style.width = `${pct}%`;
  }

  window.scrollTo({ top: 120, behavior: 'smooth' });
}

function updateSummaryCard() {
  const serviceVal = document.getElementById('summary-service-name');
  const dateVal = document.getElementById('summary-date');
  const timeVal = document.getElementById('summary-time');
  const clinicianVal = document.getElementById('summary-clinician');
  const priceVal = document.getElementById('summary-price');

  if (serviceVal) serviceVal.textContent = bookingState.selectedService ? bookingState.selectedService.name : 'Select a Treatment';
  if (dateVal) dateVal.textContent = bookingState.selectedDate || 'Select Date';
  if (timeVal) timeVal.textContent = bookingState.selectedTime || 'Select Time';
  if (clinicianVal) clinicianVal.textContent = bookingState.selectedClinician;
  if (priceVal) priceVal.textContent = bookingState.selectedService ? `$${bookingState.selectedService.price}` : '$0';
}

function finishBooking() {
  goToStep(4);

  const confService = document.getElementById('conf-service');
  const confDateTime = document.getElementById('conf-datetime');
  const confClinician = document.getElementById('conf-clinician');
  const confName = document.getElementById('conf-name');
  const confId = document.getElementById('conf-booking-id');

  const randomId = 'SWM-' + Math.floor(100000 + Math.random() * 900000);

  if (confService) confService.textContent = bookingState.selectedService.name;
  if (confDateTime) confDateTime.textContent = `${bookingState.selectedDate} at ${bookingState.selectedTime}`;
  if (confClinician) confClinician.textContent = bookingState.selectedClinician;
  if (confName) confName.textContent = bookingState.guestInfo.fullName;
  if (confId) confId.textContent = randomId;

  // Build WhatsApp Sync Button
  const waBtn = document.getElementById('btn-whatsapp-sync');
  if (waBtn) {
    const textMsg = encodeURIComponent(
      `Hello Still Well Med Spa VIP Concierge, I just completed my in-house reservation #${randomId} for ${bookingState.selectedService.name} on ${bookingState.selectedDate} at ${bookingState.selectedTime}. Guest Name: ${bookingState.guestInfo.fullName} (Phone: ${bookingState.guestInfo.phone}). Please confirm my appointment deposit and intake protocol.`
    );
    waBtn.href = `https://wa.me/17184486373?text=${textMsg}`;
  }

  if (window.showToast) {
    window.showToast('Reservation confirmed! Our concierge will sync shortly.');
  }
}
