/**
 * GUJARAT TECH CONSULTANTS (GTC) — APPLICATION CONTROLLER
 * Pricing Calculator • 3D NFC Simulator • Benchmark Gauge • WhatsApp Lead Flow
 */

(function () {
  'use strict';

  // -------------------------------------------------------------
  // 1. Navigation & Scroll Spy
  // -------------------------------------------------------------
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('active');
      if (isOpen) {
        mobileDrawer.classList.remove('active');
      } else {
        mobileDrawer.classList.add('active');
      }
    });
  }

  // -------------------------------------------------------------
  // 2. Pricing Calculator & Retainer Switcher
  // -------------------------------------------------------------
  const PRICING_DATA = {
    onetime: {
      essential: { price: '₹7,200', base: '₹10,000', discount: '-₹1,800 (18%)', subsidy: '-₹1,000 MSME', subtext: 'One-time subsidized build' },
      selling: { price: '₹9,480', base: '₹14,000', discount: '-₹2,520 (18%)', subsidy: '-₹2,000 MSME', subtext: 'One-time + NFC Smart Card included' },
      launch: { price: '₹12,400', base: '₹20,000', discount: '-₹3,600 (18%)', subsidy: '-₹4,000 MSME', subtext: 'One-time + Google 360 + Verified Badge' }
    },
    retainer: {
      essential: { price: '₹2,500/mo', base: '₹3,500/mo', discount: '-₹500 (Retainer)', subsidy: '-₹500 MSME Support', subtext: 'Full hosting + 2 free monthly edits' },
      selling: { price: '₹4,500/mo', base: '₹6,000/mo', discount: '-₹800 (Retainer)', subsidy: '-₹700 MSME Support', subtext: 'Hosting + NFC updates + Google SEO' },
      launch: { price: '₹7,500/mo', base: '₹10,000/mo', discount: '-₹1,500 (Retainer)', subsidy: '-₹1,000 MSME Support', subtext: 'Dedicated engineer + weekly updates + CDN' }
    }
  };

  let currentBillingMode = 'onetime';

  window.setBillingMode = function (mode) {
    currentBillingMode = mode;
    const btnOnetime = document.getElementById('btn-billing-onetime');
    const btnRetainer = document.getElementById('btn-billing-retainer');

    if (mode === 'onetime') {
      btnOnetime?.classList.remove('btn-secondary');
      btnOnetime?.classList.add('btn-primary');
      btnRetainer?.classList.remove('btn-primary');
      btnRetainer?.classList.add('btn-secondary');
    } else {
      btnRetainer?.classList.remove('btn-secondary');
      btnRetainer?.classList.add('btn-primary');
      btnOnetime?.classList.remove('btn-primary');
      btnOnetime?.classList.add('btn-secondary');
    }

    const data = PRICING_DATA[mode];
    // Update Essential
    updatePriceCard('essential', data.essential);
    updatePriceCard('selling', data.selling);
    updatePriceCard('launch', data.launch);
  };

  function updatePriceCard(key, info) {
    const priceEl = document.getElementById(`price-${key}`);
    const baseEl = document.getElementById(`base-${key}`);
    const discEl = document.getElementById(`disc-${key}`);
    const subEl = document.getElementById(`subsidy-${key}`);
    const subtextEl = document.getElementById(`subtext-${key}`);

    if (priceEl) priceEl.textContent = info.price;
    if (baseEl) baseEl.textContent = info.base;
    if (discEl) discEl.textContent = info.discount;
    if (subEl) subEl.textContent = info.subsidy;
    if (subtextEl) subtextEl.textContent = info.subtext;
  }

  // -------------------------------------------------------------
  // 3. 3D NFC Smart Card Simulator
  // -------------------------------------------------------------
  const nfcCard = document.getElementById('nfc-3d-card');
  if (nfcCard) {
    nfcCard.addEventListener('click', () => {
      nfcCard.classList.toggle('flipped');
    });
  }

  window.simulateNfcTap = function () {
    const tapModal = document.getElementById('nfc-tap-simulation-modal');
    if (!tapModal) return;

    tapModal.classList.add('active');

    // Simulate sound vibration
    if (navigator.vibrate) {
      navigator.vibrate([40, 60, 80]);
    }
  };

  window.closeNfcTapModal = function () {
    const tapModal = document.getElementById('nfc-tap-simulation-modal');
    tapModal?.classList.remove('active');
  };

  // -------------------------------------------------------------
  // 4. Core Web Vitals Live Benchmark Tool
  // -------------------------------------------------------------
  const BENCHMARKS = {
    gtc: {
      lcp: '0.78s',
      lcpScore: 'OPTIMAL (Top 1%)',
      ttfb: '24ms',
      tbt: '0ms',
      lighthouse: '100 / 100',
      grade: 'A+ Elite',
      tech: 'Next.js 15 Edge SSR • Cloudflare Anycast • Brotli 11',
      summary: 'Loads before the user even finishes lifting their finger. Instant authority.'
    },
    wordpress: {
      lcp: '4.82s',
      lcpScore: 'POOR (Loses 53% users)',
      ttfb: '1,420ms',
      tbt: '840ms',
      lighthouse: '41 / 100',
      grade: 'D Failure',
      tech: 'Bloated Apache • 38 Plugins • Uncompressed Assets',
      summary: 'Heavy server lag, layout shifts, high bounce rate, hurting Google Ads ranking.'
    }
  };

  window.switchBenchmark = function (type) {
    const btnGtc = document.getElementById('benchmark-btn-gtc');
    const btnWp = document.getElementById('benchmark-btn-wp');
    const data = BENCHMARKS[type];

    if (type === 'gtc') {
      btnGtc?.classList.remove('btn-secondary');
      btnGtc?.classList.add('btn-primary');
      btnWp?.classList.remove('btn-primary');
      btnWp?.classList.add('btn-secondary');
    } else {
      btnWp?.classList.remove('btn-secondary');
      btnWp?.classList.add('btn-primary');
      btnGtc?.classList.remove('btn-primary');
      btnGtc?.classList.add('btn-secondary');
    }

    const lcpEl = document.getElementById('metric-lcp');
    const ttfbEl = document.getElementById('metric-ttfb');
    const tbtEl = document.getElementById('metric-tbt');
    const scoreEl = document.getElementById('metric-score');
    const techEl = document.getElementById('metric-tech');
    const summaryEl = document.getElementById('metric-summary');

    if (lcpEl) lcpEl.textContent = data.lcp;
    if (ttfbEl) ttfbEl.textContent = data.ttfb;
    if (tbtEl) tbtEl.textContent = data.tbt;
    if (scoreEl) scoreEl.textContent = data.lighthouse;
    if (techEl) techEl.textContent = data.tech;
    if (summaryEl) summaryEl.textContent = data.summary;
  };

  // -------------------------------------------------------------
  // 5. Interactive Project Scope Estimator & WhatsApp Lead Flow
  // -------------------------------------------------------------
  window.openEstimateModal = function (prefilledIdea) {
    const modal = document.getElementById('estimator-modal');
    const ideaInput = document.getElementById('estimate-project-desc');
    if (ideaInput && prefilledIdea && typeof prefilledIdea === 'string') {
      ideaInput.value = prefilledIdea;
    }
    modal?.classList.add('active');
    calculateEstimate();
  };

  window.closeEstimateModal = function () {
    const modal = document.getElementById('estimator-modal');
    modal?.classList.remove('active');
  };

  window.calculateEstimate = function () {
    const planSelect = document.getElementById('estimate-plan')?.value || 'selling';
    const nfcAddon = document.getElementById('addon-nfc')?.checked;
    const photoAddon = document.getElementById('addon-photo')?.checked;
    const multiLangAddon = document.getElementById('addon-multilang')?.checked;

    let baseTotal = 14000;
    let msmeSubsidy = 2000;
    let flatDiscount = 2520;

    if (planSelect === 'essential') {
      baseTotal = 10000;
      msmeSubsidy = 1000;
      flatDiscount = 1800;
    } else if (planSelect === 'launch') {
      baseTotal = 20000;
      msmeSubsidy = 4000;
      flatDiscount = 3600;
    }

    let addonTotal = 0;
    if (nfcAddon && planSelect === 'essential') addonTotal += 2500;
    if (photoAddon) addonTotal += 3500;
    if (multiLangAddon) addonTotal += 2000;

    const totalBeforeSubsidy = baseTotal + addonTotal;
    const netPayable = Math.max(totalBeforeSubsidy - flatDiscount - msmeSubsidy, 5000);

    const netEl = document.getElementById('estimate-net-total');
    const subsidyEl = document.getElementById('estimate-subsidy-savings');
    if (netEl) netEl.textContent = `₹${netPayable.toLocaleString('en-IN')}`;
    if (subsidyEl) subsidyEl.textContent = `₹${(flatDiscount + msmeSubsidy).toLocaleString('en-IN')} Saved via MSME Scheme`;
  };

  window.dispatchWhatsAppEstimate = function () {
    const businessName = document.getElementById('estimate-business-name')?.value.trim() || 'My Business';
    const planSelect = document.getElementById('estimate-plan')?.value || 'Most Selling';
    const idea = document.getElementById('estimate-project-desc')?.value.trim() || 'Website Revamp';
    const netPayable = document.getElementById('estimate-net-total')?.textContent || '₹9,480';

    const msg = `Hi Gujarat Tech Consultants,\n\nI'm exploring a high-performance website build under the MSME scheme for *${businessName}*.\n\n• Selected Tier: *${planSelect.toUpperCase()}*\n• Project Scope: ${idea}\n• Estimated Cost: ${netPayable}\n\nCould we schedule a 10-minute strategy call to review the technical architecture?`;

    const encoded = encodeURIComponent(msg);
    const waUrl = `https://wa.me/918140804662?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  // -------------------------------------------------------------
  // 6. Accordion FAQs
  // -------------------------------------------------------------
  window.initFaqs = function () {
    const items = document.querySelectorAll('.accordion-item');
    items.forEach((item) => {
      const trigger = item.querySelector('.accordion-trigger');
      trigger?.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        items.forEach((i) => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  };

  // -------------------------------------------------------------
  // 7. Hero Prompt Input
  // -------------------------------------------------------------
  window.handleHeroPrompt = function () {
    const input = document.getElementById('hero-prompt-input');
    const text = input ? input.value.trim() : '';
    openEstimateModal(text || 'High-performance website architecture for my Gujarat enterprise');
  };

  document.addEventListener('DOMContentLoaded', () => {
    window.initFaqs();
  });
})();
