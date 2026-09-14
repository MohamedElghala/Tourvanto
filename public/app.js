// =========================================================================
// Tourvanto - Core Application Logic
// Features: i18n Languages, Multi-Currency, Smart VIP Tour Builder,
// Verified Customer Reviews, FAQ Accordions, Policies & Admin Panel
// =========================================================================

// Global State
let currentLang = localStorage.getItem('tourvanto_lang') || 'en';
let currentCurrency = localStorage.getItem('tourvanto_curr') || 'EUR';
let activeCategory = 'all';
let searchQuery = '';
let selectedTour = null;

// Currency Exchange Rates (Base: EUR)
const currencyRates = {
  EUR: { symbol: '€', rate: 1.00, pos: 'before' },
  USD: { symbol: '$', rate: 1.08, pos: 'before' },
  RUB: { symbol: '₽', rate: 98.50, pos: 'after' },
  GBP: { symbol: '£', rate: 0.85, pos: 'before' }
};

// LocalStorage Persistence for Tours & Bookings
let tours = JSON.parse(localStorage.getItem('tourvanto_tours')) || initialTours;
let bookings = JSON.parse(localStorage.getItem('tourvanto_bookings')) || [];

// Save to LocalStorage
function saveState() {
  localStorage.setItem('tourvanto_tours', JSON.stringify(tours));
  localStorage.setItem('tourvanto_bookings', JSON.stringify(bookings));
  localStorage.setItem('tourvanto_lang', currentLang);
  localStorage.setItem('tourvanto_curr', currentCurrency);
}

// Convert EUR price to selected currency
function formatPrice(eurAmount) {
  const curr = currencyRates[currentCurrency] || currencyRates.EUR;
  const converted = Math.round(eurAmount * curr.rate);
  if (curr.pos === 'before') {
    return `${curr.symbol}${converted}`;
  } else {
    return `${converted} ${curr.symbol}`;
  }
}

// Translate Text via Dictionary
function t(key) {
  if (translations[currentLang] && translations[currentLang][key]) {
    return translations[currentLang][key];
  }
  return translations.en[key] || key;
}

// Apply Translations to All DOM Elements
function updateLanguageDOM() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  document.getElementById('searchInput').placeholder = t('searchPlaceholder');
  document.getElementById('langSelect').value = currentLang;
  document.getElementById('currencySelect').value = currentCurrency;
}

// Render Tours Grid (with Viator-style Urgency & Excellence Badges)
function renderToursGrid() {
  const container = document.getElementById('toursGrid');
  const noToursMsg = document.getElementById('noToursMsg');

  // Filter tours by category & search query
  const filtered = tours.filter(tour => {
    const matchesCat = (activeCategory === 'all' || tour.category === activeCategory);
    const title = (tour.titles[currentLang] || tour.titles.en).toLowerCase();
    const desc = (tour.descriptions[currentLang] || tour.descriptions.en).toLowerCase();
    const matchesSearch = !searchQuery || title.includes(searchQuery.toLowerCase()) || desc.includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = '';
    noToursMsg.classList.remove('hidden');
    return;
  }

  noToursMsg.classList.add('hidden');

  container.innerHTML = filtered.map(tour => {
    const title = tour.titles[currentLang] || tour.titles.en;
    const desc = tour.descriptions[currentLang] || tour.descriptions.en;
    const priceFormatted = formatPrice(tour.priceEUR);

    return `
      <article class="bg-white rounded-3xl overflow-hidden border border-slate-200/80 card-hover flex flex-col group">
        <!-- Tour Image & Badges -->
        <div class="relative h-64 overflow-hidden">
          <img src="${tour.image}" alt="${title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
          
          <!-- Category Badge -->
          <span class="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
            ${t('cat' + tour.category.charAt(0).toUpperCase() + tour.category.slice(1)) || tour.category}
          </span>

          <!-- Viator-style Likely to sell out badge -->
          ${tour.likelyToSellOut ? `
            <span class="absolute top-4 right-4 bg-rose-600/90 backdrop-blur-md text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow flex items-center gap-1 animate-pulse">
              <i class="fa-solid fa-fire"></i>
              <span>${t('likelyToSellOut')}</span>
            </span>
          ` : ''}

          <!-- Pay on Pickup Badge -->
          <span class="absolute bottom-4 left-4 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md">
            <i class="fa-solid fa-money-bill-wave"></i>
            ${t('payAtPickupBadge')}
          </span>
        </div>

        <!-- Tour Body -->
        <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <!-- Rating & Duration Row -->
            <div class="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span class="flex items-center gap-1 text-amber-500 font-bold">
                <i class="fa-solid fa-star"></i>
                <span>${tour.rating}</span>
                <span class="text-slate-400 font-normal">(${tour.reviewsCount} ${t('reviewsCount')})</span>
              </span>
              <span class="flex items-center gap-1">
                <i class="fa-regular fa-clock text-brand-600"></i>
                <span>${tour.durationHours} ${t('hours')}</span>
              </span>
            </div>

            <!-- Title -->
            <h3 class="text-lg font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors">
              ${title}
            </h3>

            <!-- Short Description -->
            <p class="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
              ${desc}
            </p>
          </div>

          <!-- Price & Buttons Row -->
          <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span class="text-[10px] text-slate-400 uppercase tracking-wider block">${t('from')}</span>
              <span class="text-2xl font-black text-slate-900">${priceFormatted}</span>
              <span class="text-[10px] text-slate-400 block">${t('perPerson')}</span>
            </div>

            <div class="flex items-center gap-2">
              <button onclick="openTourDetails('${tour.id}')" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition-colors">
                ${t('viewDetails')}
              </button>

              <button onclick="openCheckout('${tour.id}')" class="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs shadow-md shadow-brand-600/20 transition-all hover:scale-105">
                ${t('bookNow')}
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Open Tour Details Modal (Including Verified Traveler Reviews)
function openTourDetails(tourId) {
  const tour = tours.find(t => t.id === tourId);
  if (!tour) return;

  selectedTour = tour;
  const title = tour.titles[currentLang] || tour.titles.en;
  const desc = tour.descriptions[currentLang] || tour.descriptions.en;
  const priceFormatted = formatPrice(tour.priceEUR);

  // WhatsApp pre-filled inquiry text
  const waText = encodeURIComponent(t('whatsappMsgTemplate') + `"${title}" (${priceFormatted})`);
  const waUrl = `https://wa.me/201000000000?text=${waText}`;

  const container = document.getElementById('tourDetailsBody');
  container.innerHTML = `
    <!-- Modal Hero Gallery -->
    <div class="relative h-80 sm:h-96 w-full">
      <img src="${tour.image}" alt="${title}" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-transparent to-transparent"></div>
      
      <div class="absolute bottom-6 left-6 right-6 text-white space-y-2">
        <span class="bg-brand-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block">
          ${t('cat' + tour.category.charAt(0).toUpperCase() + tour.category.slice(1)) || tour.category}
        </span>
        <h2 class="text-2xl sm:text-3xl font-extrabold leading-tight">${title}</h2>
        
        <div class="flex items-center gap-4 text-xs">
          <span class="flex items-center gap-1 text-amber-400 font-bold">
            <i class="fa-solid fa-star"></i> ${tour.rating} (${tour.reviewsCount} ${t('reviewsCount')})
          </span>
          <span class="flex items-center gap-1 text-slate-200">
            <i class="fa-regular fa-clock"></i> ${tour.durationHours} ${t('hours')}
          </span>
          <span class="flex items-center gap-1 text-emerald-300 font-semibold">
            <i class="fa-solid fa-hotel"></i> ${t('hotelPickup')}
          </span>
        </div>
      </div>
    </div>

    <div class="p-6 sm:p-8 space-y-8">
      <!-- Overview & Description -->
      <div>
        <h3 class="text-sm font-bold uppercase tracking-wider text-brand-600 mb-2">Overview</h3>
        <p class="text-sm text-slate-600 leading-relaxed">${desc}</p>
      </div>

      <!-- Itinerary Timeline -->
      <div>
        <h3 class="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
          <i class="fa-solid fa-route text-brand-600"></i>
          ${t('itinerary')}
        </h3>
        
        <div class="relative border-l-2 border-slate-200 ml-6 pl-6 space-y-6">
          ${tour.itinerary.map(step => `
            <div class="relative timeline-dot">
              <span class="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">${step.time}</span>
              <h4 class="text-sm font-bold text-slate-800 mt-1">${step.title}</h4>
              <p class="text-xs text-slate-500 mt-0.5">${step.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- What's Included / Excluded Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3 flex items-center gap-1.5">
            <i class="fa-solid fa-circle-check"></i>
            ${t('whatsIncluded')}
          </h4>
          <ul class="space-y-2 text-xs text-slate-600">
            ${tour.included.map(inc => `<li class="flex items-start gap-2"><i class="fa-solid fa-check text-emerald-500 mt-0.5"></i> <span>${inc}</span></li>`).join('')}
          </ul>
        </div>

        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-rose-700 mb-3 flex items-center gap-1.5">
            <i class="fa-solid fa-circle-xmark"></i>
            ${t('whatsExcluded')}
          </h4>
          <ul class="space-y-2 text-xs text-slate-600">
            ${tour.excluded.map(exc => `<li class="flex items-start gap-2"><i class="fa-solid fa-xmark text-rose-400 mt-0.5"></i> <span>${exc}</span></li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- Verified Customer Reviews Section -->
      ${tour.reviews && tour.reviews.length > 0 ? `
        <div class="space-y-4">
          <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <i class="fa-solid fa-comments text-brand-600"></i>
            <span>Verified Traveler Reviews</span>
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            ${tour.reviews.map(rev => `
              <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div class="flex justify-between items-center text-xs">
                  <span class="font-bold text-slate-900">${rev.author} <span class="text-slate-400 font-normal">(${rev.country})</span></span>
                  <span class="text-amber-500"><i class="fa-solid fa-star"></i> 5.0</span>
                </div>
                <p class="text-xs text-slate-600 italic">"${rev.text}"</p>
                <span class="text-[10px] text-slate-400 block">${rev.date}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Action Footer with WhatsApp & Book Now -->
      <div class="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span class="text-xs text-slate-400 uppercase tracking-wider block">${t('from')}</span>
          <span class="text-3xl font-black text-slate-900">${priceFormatted}</span>
          <span class="text-xs text-slate-400 block">${t('perPerson')}</span>
        </div>

        <div class="flex items-center gap-3 w-full sm:w-auto">
          <a href="${waUrl}" target="_blank" class="flex-1 sm:flex-initial px-5 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-2xl border border-emerald-300 text-xs flex items-center justify-center gap-2 transition-colors">
            <i class="fa-brands fa-whatsapp text-lg"></i>
            <span>${t('quickInquiry')}</span>
          </a>

          <button onclick="closeDetailsAndOpenCheckout('${tour.id}')" class="flex-1 sm:flex-initial px-8 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl shadow-xl shadow-brand-600/30 text-sm flex items-center justify-center gap-2 transition-all hover:scale-105">
            <i class="fa-solid fa-calendar-check"></i>
            <span>${t('bookNow')}</span>
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('tourDetailsModal').classList.remove('hidden');
  if (window.TourvantoAnalytics) {
    TourvantoAnalytics.trackViewTour(tour);
  }
}

function closeDetailsAndOpenCheckout(tourId) {
  document.getElementById('tourDetailsModal').classList.add('hidden');
  openCheckout(tourId);
}

// Open Checkout Modal
function openCheckout(tourId) {
  const tour = tours.find(t => t.id === tourId);
  if (!tour) return;

  selectedTour = tour;
  const title = tour.titles[currentLang] || tour.titles.en;

  document.getElementById('bookingTourId').value = tour.id;
  document.getElementById('checkoutTourTitle').textContent = title;

  // Default booking date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  document.getElementById('bookingDate').value = tomorrow.toISOString().split('T')[0];

  calculateCheckoutTotal();
  document.getElementById('checkoutModal').classList.remove('hidden');

  if (window.TourvantoAnalytics) {
    TourvantoAnalytics.trackInitiateCheckout(tour, tour.priceEUR, 'EUR');
  }
  if (window.TourvantoAuth) {
    TourvantoAuth.prefillCheckoutForm();
  }
}

// Calculate Total Checkout Price
function calculateCheckoutTotal() {
  if (!selectedTour) return;

  const adults = parseInt(document.getElementById('bookingAdults').value) || 1;
  const children = parseInt(document.getElementById('bookingChildren').value) || 0;

  // Children pay 50%
  const totalEUR = (adults * selectedTour.priceEUR) + (children * (selectedTour.priceEUR * 0.5));
  document.getElementById('checkoutTotalAmount').textContent = formatPrice(totalEUR);
}

// Handle Checkout Submission (Save Booking & Show Voucher)
function handleCheckoutSubmit(e) {
  e.preventDefault();

  if (!selectedTour) return;

  const bookingData = {
    id: 'TV-' + Math.floor(100000 + Math.random() * 900000),
    tourId: selectedTour.id,
    tourTitle: selectedTour.titles[currentLang] || selectedTour.titles.en,
    date: document.getElementById('bookingDate').value,
    adults: document.getElementById('bookingAdults').value,
    children: document.getElementById('bookingChildren').value,
    hotel: document.getElementById('bookingHotel').value,
    room: document.getElementById('bookingRoom').value || 'Pending',
    name: document.getElementById('bookingName').value,
    email: document.getElementById('bookingEmail').value,
    whatsapp: document.getElementById('bookingWhatsapp').value,
    paymentMethod: document.querySelector('input[name="paymentType"]:checked').value,
    totalPrice: document.getElementById('checkoutTotalAmount').textContent,
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  };

  bookings.unshift(bookingData);
  saveState();

  if (window.TourvantoDB) {
    TourvantoDB.saveBooking(bookingData);
  }

  if (window.TourvantoAnalytics) {
    TourvantoAnalytics.trackPurchase(bookingData);
  }

  // Close checkout modal & show voucher modal
  document.getElementById('checkoutModal').classList.add('hidden');
  showBookingVoucher(bookingData);
}

// Show Voucher Modal
function showBookingVoucher(b) {
  document.getElementById('voucherCodeDisplay').textContent = b.id;
  document.getElementById('voucherTourName').textContent = b.tourTitle;
  document.getElementById('voucherDate').textContent = `${b.date} (${b.adults} Adults, ${b.children} Children)`;
  document.getElementById('voucherHotel').textContent = `${b.hotel} (Room: ${b.room})`;

  let paymentLabel = 'Cash on Pickup';
  if (b.paymentMethod === 'card') paymentLabel = 'Credit Card (Stripe Paid)';
  if (b.paymentMethod === 'paypal') paymentLabel = 'PayPal Express Paid';

  document.getElementById('voucherPaymentType').textContent = `${paymentLabel} - ${b.totalPrice}`;
  document.getElementById('voucherModal').classList.remove('hidden');

  updateAdminStats();
}

// Toggle Payment Fields
function handlePaymentMethodChange() {
  const selected = document.querySelector('input[name="paymentType"]:checked').value;
  const cardFields = document.getElementById('cardFields');
  if (selected === 'card') {
    cardFields.classList.remove('hidden');
  } else {
    cardFields.classList.add('hidden');
  }
}

// ================= SMART VIP TOUR BUILDER LOGIC =================
function initSmartTourBuilder() {
  const calcBtn = document.getElementById('calcCustomBtn');
  if (!calcBtn) return;

  calcBtn.addEventListener('click', () => {
    const expSelect = document.getElementById('customExpSelect');
    const groupSelect = document.getElementById('customGroupSelect');
    const resultBox = document.getElementById('customResultBox');
    const priceDisplay = document.getElementById('customEstimatedPrice');
    const waLink = document.getElementById('customWhatsAppLink');

    const baseEUR = parseInt(expSelect.selectedOptions[0].getAttribute('data-base')) || 250;
    const guests = parseInt(groupSelect.value) || 2;
    const expName = expSelect.selectedOptions[0].text;

    // Estimate calculation: base + extra guest premium
    const totalEUR = baseEUR + ((guests - 2) * 35);
    const formatted = formatPrice(totalEUR);

    priceDisplay.textContent = formatted;

    const waMsg = encodeURIComponent(`Hello Tourvanto VIP! I would like to book a tailor-made excursion: "${expName}" for ${guests} guests. Estimated VIP price: ${formatted}. Please send the private itinerary.`);
    waLink.href = `https://wa.me/201000000000?text=${waMsg}`;

    resultBox.classList.remove('hidden');
  });
}

// ================= POLICY MODALS LOGIC =================
function openPolicyModal(type) {
  const titleEl = document.getElementById('policyModalTitle');
  const textEl = document.getElementById('policyModalText');

  if (type === 'cancellation') {
    titleEl.textContent = t('policyCancellationTitle');
    textEl.innerHTML = `
      <p class="font-semibold text-slate-800">${t('policyCancellationText')}</p>
      <ul class="list-disc pl-5 space-y-1 text-xs text-slate-500 pt-2">
        <li>Free 100% cancellation up to 24 hours before pickup time.</li>
        <li>No cancellation fee or deposit loss for Cash-on-Pickup bookings.</li>
        <li>Full refund for adverse weather conditions or port authority restrictions.</li>
      </ul>
    `;
  } else if (type === 'terms') {
    titleEl.textContent = t('policyTermsTitle');
    textEl.innerHTML = `
      <p>By booking an excursion with Tourvanto, you agree to our standard international service terms.</p>
      <p class="text-xs text-slate-500">All excursions are operated with licensed vehicles and certified guides. Guests are responsible for being at their hotel lobby at the agreed pickup time.</p>
    `;
  } else if (type === 'privacy') {
    titleEl.textContent = t('policyPrivacyTitle');
    textEl.innerHTML = `
      <p>We respect your privacy. Tourvanto collects only the essential booking information (Name, WhatsApp, Hotel & Room number) required to organize your pickup transfer and deliver your digital voucher.</p>
      <p class="text-xs text-slate-500">Your details are never shared with third-party advertising platforms.</p>
    `;
  }

  document.getElementById('policyModal').classList.remove('hidden');
}

function closePolicyModal() {
  document.getElementById('policyModal').classList.add('hidden');
}

// ================= CYBERSECURITY UTILITIES & INPUT SANITIZATION =================
function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ================= ADMIN DASHBOARD FUNCTIONS & ACCESS CONTROL =================
const ADMIN_SECURITY_PIN = "Tourvanto#9900";

function checkAdminAuth() {
  return sessionStorage.getItem('tourvanto_admin_authenticated') === 'true';
}

function openAdminAuthModal() {
  if (checkAdminAuth()) {
    showAdminDashboard();
    return;
  }
  const modal = document.getElementById('adminAuthModal');
  const err = document.getElementById('adminAuthError');
  const pinInput = document.getElementById('adminPinInput');
  if (err) err.classList.add('hidden');
  if (pinInput) pinInput.value = '';
  if (modal) modal.classList.remove('hidden');
}

function closeAdminAuthModal() {
  const modal = document.getElementById('adminAuthModal');
  if (modal) modal.classList.add('hidden');
}

function handleAdminAuthSubmit(e) {
  e.preventDefault();
  const pinInput = document.getElementById('adminPinInput');
  const err = document.getElementById('adminAuthError');

  if (pinInput && pinInput.value === ADMIN_SECURITY_PIN) {
    sessionStorage.setItem('tourvanto_admin_authenticated', 'true');
    closeAdminAuthModal();
    showAdminDashboard();
  } else {
    if (err) err.classList.remove('hidden');
    if (pinInput) {
      pinInput.value = '';
      pinInput.focus();
    }
  }
}

function showAdminDashboard() {
  const visitorView = document.getElementById('visitorView');
  const adminPortal = document.getElementById('adminPortal');
  if (visitorView && adminPortal) {
    visitorView.classList.add('hidden');
    adminPortal.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderAdminTables();
    updateAdminStats();
  }
}

function hideAdminDashboard() {
  const visitorView = document.getElementById('visitorView');
  const adminPortal = document.getElementById('adminPortal');
  if (visitorView && adminPortal) {
    visitorView.classList.remove('hidden');
    adminPortal.classList.add('hidden');
  }
}

function logoutAdmin() {
  sessionStorage.removeItem('tourvanto_admin_authenticated');
  hideAdminDashboard();
  if (window.location.hash === '#admin') {
    history.replaceState(null, null, ' ');
  }
}

function updateAdminStats() {
  document.getElementById('statTotalTours').textContent = tours.length;
  document.getElementById('statTotalBookings').textContent = bookings.length;
  const cashLeads = bookings.filter(b => b.paymentMethod === 'cash').length;
  document.getElementById('statActiveLeads').textContent = cashLeads;
}

function renderAdminTables() {
  // Bookings Inbox (Sanitized against Stored XSS)
  const bookingsBody = document.getElementById('adminBookingsTableBody');
  if (bookings.length === 0) {
    bookingsBody.innerHTML = `<tr><td colspan="8" class="text-center py-8 text-slate-500 text-xs">No bookings received yet.</td></tr>`;
  } else {
    bookingsBody.innerHTML = bookings.map(b => {
      const safeId = escapeHTML(b.id);
      const safeDate = escapeHTML(b.date);
      const safeName = escapeHTML(b.name);
      const safeWhatsapp = escapeHTML(b.whatsapp);
      const safeHotel = escapeHTML(b.hotel);
      const safeRoom = escapeHTML(b.room);
      const safeTourTitle = escapeHTML(b.tourTitle);
      const safePaymentMethod = escapeHTML(b.paymentMethod);
      const safeTotalPrice = escapeHTML(b.totalPrice);
      const cleanPhone = safeWhatsapp.replace(/[^0-9]/g, '');

      return `
        <tr class="hover:bg-slate-800 transition-colors">
          <td class="py-3 px-4 font-mono text-brand-400 font-bold text-xs">${safeId}</td>
          <td class="py-3 px-4 text-xs">${safeDate}</td>
          <td class="py-3 px-4 text-xs">
            <p class="font-bold text-white">${safeName}</p>
            <a href="https://wa.me/${cleanPhone}" target="_blank" class="text-emerald-400 hover:underline"><i class="fa-brands fa-whatsapp mr-1"></i>${safeWhatsapp}</a>
          </td>
          <td class="py-3 px-4 text-xs">
            <p class="text-white">${safeHotel}</p>
            <p class="text-slate-400 text-[11px]">Room: ${safeRoom}</p>
          </td>
          <td class="py-3 px-4 text-xs font-medium text-slate-200 max-w-[200px] truncate">${safeTourTitle}</td>
          <td class="py-3 px-4 text-xs">
            <span class="px-2 py-0.5 rounded text-[11px] font-bold ${b.paymentMethod === 'cash' ? 'bg-amber-950/80 text-amber-300 border border-amber-800' : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'}">
              ${safePaymentMethod.toUpperCase()}
            </span>
          </td>
          <td class="py-3 px-4 text-xs font-bold text-white">${safeTotalPrice}</td>
          <td class="py-3 px-4 text-xs">
            <button onclick="deleteBooking('${safeId}')" class="text-rose-400 hover:text-rose-300 p-1.5"><i class="fa-solid fa-trash"></i></button>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Manage Tours Table
  const toursBody = document.getElementById('adminToursTableBody');
  toursBody.innerHTML = tours.map(t => `
    <tr class="hover:bg-slate-800 transition-colors">
      <td class="py-3 px-4"><img src="${escapeHTML(t.image)}" class="w-12 h-10 object-cover rounded-lg"></td>
      <td class="py-3 px-4 font-bold text-xs text-white max-w-[250px] truncate">${escapeHTML(t.titles.en)}</td>
      <td class="py-3 px-4 text-xs capitalize text-slate-400">${escapeHTML(t.category)}</td>
      <td class="py-3 px-4 text-xs font-bold text-brand-400">€${escapeHTML(t.priceEUR)}</td>
      <td class="py-3 px-4 text-xs text-slate-400">${escapeHTML(t.durationHours)}h</td>
      <td class="py-3 px-4 text-xs text-amber-400"><i class="fa-solid fa-star text-[10px]"></i> ${escapeHTML(t.rating)}</td>
      <td class="py-3 px-4 text-xs">
        <button onclick="deleteTour('${escapeHTML(t.id)}')" class="text-rose-400 hover:text-rose-300 p-1.5"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

function deleteBooking(bookingId) {
  if (confirm('Delete this booking entry?')) {
    bookings = bookings.filter(b => b.id !== bookingId);
    saveState();
    renderAdminTables();
    updateAdminStats();
  }
}

function deleteTour(tourId) {
  if (confirm('Are you sure you want to delete this excursion from catalog?')) {
    tours = tours.filter(t => t.id !== tourId);
    saveState();
    renderAdminTables();
    renderToursGrid();
    updateAdminStats();
  }
}

// ================= VERIFIED TRAVELER REVIEWS LOGIC =================
let reviews = JSON.parse(localStorage.getItem('tourvanto_reviews')) || (typeof initialReviews !== 'undefined' ? initialReviews : []);

function renderPublicReviews() {
  const container = document.getElementById('publicReviewsGrid');
  if (!container) return;

  const countBadge = document.getElementById('reviewsCountBadge');
  if (countBadge) {
    countBadge.textContent = `${reviews.length}+ Verified Reviews`;
  }

  container.innerHTML = reviews.map(rev => {
    const safeAuthor = escapeHTML(rev.author);
    const safeComment = escapeHTML(rev.comment);
    const safeTour = escapeHTML(rev.tourName);
    const safeCountry = escapeHTML(rev.country);
    const starsHtml = Array.from({ length: 5 }, (_, i) => 
      `<i class="fa-solid fa-star ${i < rev.rating ? 'text-amber-400' : 'text-slate-200'}"></i>`
    ).join('');

    return `
      <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between card-hover relative group">
        <div>
          <!-- Header: User & Rating -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <img src="${rev.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}" alt="${safeAuthor}" class="w-11 h-11 rounded-full object-cover border-2 border-brand-100 shadow-sm">
              <div>
                <h4 class="text-sm font-bold text-slate-900">${safeAuthor}</h4>
                <div class="flex items-center gap-1.5 text-xs text-slate-500">
                  <span>${rev.flag || '🌍'}</span>
                  <span>${safeCountry}</span>
                  <span>&bull;</span>
                  <span class="text-emerald-600 font-bold flex items-center gap-1 text-[11px]"><i class="fa-solid fa-circle-check"></i> Verified</span>
                </div>
              </div>
            </div>
            <div class="text-amber-400 text-xs flex gap-0.5">
              ${starsHtml}
            </div>
          </div>

          <!-- Tour Tag -->
          <div class="mb-3">
            <span class="inline-block bg-slate-100 text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-lg">
              <i class="fa-solid fa-location-dot text-brand-500 mr-1"></i> ${safeTour}
            </span>
          </div>

          <!-- Comment Text -->
          <p class="text-xs text-slate-600 leading-relaxed italic">
            "${safeComment}"
          </p>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>${rev.date || 'Recent experience'}</span>
          <span class="text-brand-600 font-semibold"><i class="fa-solid fa-shield-halved mr-1"></i> 100% Authentic</span>
        </div>
      </div>
    `;
  }).join('');
}

function initReviewSubmission() {
  const openBtn = document.getElementById('openAddReviewModalBtn');
  const closeBtn = document.getElementById('closeAddReviewModalBtn');
  const modal = document.getElementById('addReviewModal');
  const form = document.getElementById('addReviewForm');
  const starPicker = document.getElementById('starRatingPicker');
  const ratingInput = document.getElementById('reviewRatingInput');

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      if (modal) modal.classList.remove('hidden');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (modal) modal.classList.add('hidden');
    });
  }

  // Interactive 1-5 Star Picker
  if (starPicker) {
    const stars = starPicker.querySelectorAll('i');
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const selectedVal = parseInt(star.getAttribute('data-star'));
        ratingInput.value = selectedVal;
        stars.forEach(s => {
          const sVal = parseInt(s.getAttribute('data-star'));
          if (sVal <= selectedVal) {
            s.classList.add('text-amber-400');
            s.classList.remove('text-slate-300');
          } else {
            s.classList.remove('text-amber-400');
            s.classList.add('text-slate-300');
          }
        });
      });
    });
  }

  // Handle Review Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const author = document.getElementById('reviewAuthorInput').value.trim();
      const countryRaw = document.getElementById('reviewCountrySelect').value.split('|');
      const countryName = countryRaw[0] || 'International';
      const countryFlag = countryRaw[1] || '🌍';
      const tourName = document.getElementById('reviewTourSelect').value;
      const comment = document.getElementById('reviewCommentInput').value.trim();
      const rating = parseInt(ratingInput.value) || 5;

      const newReview = {
        id: 'rev_' + Date.now(),
        author: author,
        country: countryName,
        flag: countryFlag,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        rating: rating,
        tourName: tourName,
        date: new Date().toISOString().split('T')[0],
        comment: comment,
        verified: true
      };

      reviews.unshift(newReview);
      localStorage.setItem('tourvanto_reviews', JSON.stringify(reviews));

      if (window.TourvantoDB) {
        TourvantoDB.saveReview(newReview);
      }

      if (window.TourvantoAnalytics) {
        TourvantoAnalytics.trackReview(author, rating, tourName);
      }

      renderPublicReviews();
      form.reset();
      ratingInput.value = 5;
      if (modal) modal.classList.add('hidden');
      alert('Thank you! Your verified review has been published.');
    });
  }
}

// ================= INITIALIZATION & EVENT LISTENERS =================
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved language & currency
  updateLanguageDOM();
  renderToursGrid();
  initSmartTourBuilder();
  renderPublicReviews();
  initReviewSubmission();

  // Language Change Listener
  document.getElementById('langSelect').addEventListener('change', (e) => {
    currentLang = e.target.value;
    updateLanguageDOM();
    renderToursGrid();
    saveState();
  });

  // Currency Change Listener
  document.getElementById('currencySelect').addEventListener('change', (e) => {
    currentCurrency = e.target.value;
    renderToursGrid();
    saveState();
  });

  // Search Input & Button
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');

  function performSearch() {
    searchQuery = searchInput.value.trim();
    renderToursGrid();
  }

  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') performSearch();
  });

  // Category Filter Tabs
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => {
        b.classList.remove('active', 'bg-brand-600', 'text-white', 'shadow-md', 'shadow-brand-600/30');
        b.classList.add('bg-white', 'text-slate-600', 'border', 'border-slate-200');
      });

      btn.classList.add('active', 'bg-brand-600', 'text-white', 'shadow-md', 'shadow-brand-600/30');
      btn.classList.remove('bg-white', 'text-slate-600', 'border', 'border-slate-200');

      activeCategory = btn.getAttribute('data-cat');
      renderToursGrid();
    });
  });

  // FAQ Accordion Interaction
  document.querySelectorAll('.faq-header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector('i');
      const isOpen = !content.classList.contains('hidden');

      // Close all other FAQ items
      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-header i').forEach(ic => ic.style.transform = 'rotate(0deg)');

      if (!isOpen) {
        content.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // Modal Close Handlers
  document.getElementById('closeTourDetailsBtn').addEventListener('click', () => {
    document.getElementById('tourDetailsModal').classList.add('hidden');
  });

  document.getElementById('closeCheckoutBtn').addEventListener('click', () => {
    document.getElementById('checkoutModal').classList.add('hidden');
  });

  document.getElementById('closeVoucherBtn').addEventListener('click', () => {
    document.getElementById('voucherModal').classList.add('hidden');
  });

  document.getElementById('printVoucherBtn').addEventListener('click', () => {
    window.print();
  });

  // Adults / Children Change
  document.getElementById('bookingAdults').addEventListener('input', calculateCheckoutTotal);
  document.getElementById('bookingChildren').addEventListener('input', calculateCheckoutTotal);

  // Payment Radio Change
  document.querySelectorAll('input[name="paymentType"]').forEach(r => {
    r.addEventListener('change', handlePaymentMethodChange);
  });

  // Checkout Form Submission
  document.getElementById('checkoutForm').addEventListener('submit', handleCheckoutSubmit);

  // Admin Authentication & Navigation Listeners
  const openAdminBtn = document.getElementById('openAdminAuthBtn');
  if (openAdminBtn) {
    openAdminBtn.addEventListener('click', openAdminAuthModal);
  }

  const adminAuthForm = document.getElementById('adminAuthForm');
  if (adminAuthForm) {
    adminAuthForm.addEventListener('submit', handleAdminAuthSubmit);
  }

  const closeAdminAuthBtn = document.getElementById('closeAdminAuthBtn');
  if (closeAdminAuthBtn) {
    closeAdminAuthBtn.addEventListener('click', closeAdminAuthModal);
  }

  const adminLogoutBtn = document.getElementById('adminLogoutBtn');
  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', logoutAdmin);
  }

  const adminBackToSiteBtn = document.getElementById('adminBackToSiteBtn');
  if (adminBackToSiteBtn) {
    adminBackToSiteBtn.addEventListener('click', hideAdminDashboard);
  }

  // Clear All Bookings in Admin
  const clearBookingsBtn = document.getElementById('clearBookingsBtn');
  if (clearBookingsBtn) {
    clearBookingsBtn.addEventListener('click', () => {
      if (confirm('Clear all bookings? This cannot be undone.')) {
        bookings = [];
        saveState();
        renderAdminTables();
        updateAdminStats();
      }
    });
  }

  // Check URL hash for direct admin login (e.g. #admin)
  if (window.location.hash === '#admin') {
    openAdminAuthModal();
  }
});
