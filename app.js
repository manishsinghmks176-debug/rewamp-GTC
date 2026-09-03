(function () {
  'use strict';

  const qs = (s, root = document) => root.querySelector(s);
  const qsa = (s, root = document) => Array.from(root.querySelectorAll(s));

  document.addEventListener('DOMContentLoaded', () => {
    initHeaderMenu();
    initHeroPrompt();
    initCanvasShowcase();
    initPricingToggle();
    initAccordions();
    initReveal();
    initImageFallbacks();
    initPersonaTilt();
  });

  function initHeaderMenu() {
    const trigger = qs('header [aria-label="Menu"]');
    if (!trigger) return;
    const content = trigger.closest('[data-slot="accordion-item"]')?.querySelector('[data-slot="accordion-content"]');
    const item = trigger.closest('[data-slot="accordion-item"]');
    if (!content || !item) return;

    trigger.addEventListener('click', () => {
      const open = item.getAttribute('data-state') === 'open';
      item.setAttribute('data-state', open ? 'closed' : 'open');
      trigger.setAttribute('aria-expanded', String(!open));
      content.hidden = open;
      content.innerHTML = open ? '' : `
        <div style="display:flex;flex-direction:column;padding:4px 12px 14px;gap:2px">
          <a href="#canvas" class="gtc-menu-link">Services</a>
          <a href="#personas" class="gtc-menu-link">Work</a>
          <a href="#models" class="gtc-menu-link">Engineering</a>
          <a href="#pricing" class="gtc-menu-link">Pricing</a>
          <a href="#faq" class="gtc-menu-link">FAQ</a>
          <a href="#contact" class="gtc-menu-link">Start a Project</a>
        </div>`;
      qsa('.gtc-menu-link', content).forEach(a => a.addEventListener('click', () => {
        item.setAttribute('data-state', 'closed');
        trigger.setAttribute('aria-expanded', 'false');
        content.hidden = true;
      }));
    });

    const style = document.createElement('style');
    style.textContent = `.gtc-menu-link{display:block;padding:9px 4px;color:#fff;text-decoration:none;font:500 12px/1.2 var(--font-fg-futurist),Arial,sans-serif}.gtc-menu-link:hover{color:var(--color-orange)}`;
    document.head.appendChild(style);
  }

  function initHeroPrompt() {
    const input = qs('#hero-prompt-slot textarea');
    const button = qs('#hero-prompt-slot button');
    if (!input || !button) return;
    button.addEventListener('click', () => {
      const text = input.value.trim();
      const contact = qs('#contact');
      if (contact) {
        const target = qs('.gtc-contact-inner p', contact);
        if (target && text) target.textContent = `You told us: “${text}” We will turn that into a clear digital plan. No slide deck. No discovery fee.`;
        contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  function initCanvasShowcase() {
    const buttons = qsa('#canvas nav[aria-label="Showcase sections"] button');
    const scenes = qsa('#canvas [id^="canvas-showcase-"]');
    if (!buttons.length) return;

    const names = ['advertising','filmmaking','fashion','branding','ecommerce'];
    const sceneMap = new Map();
    scenes.forEach(scene => sceneMap.set(scene.id.replace('canvas-showcase-',''), scene));

    // The source snapshot contains five real Melius-style scenes. Reveal them in a
    // scroll sequence and use the tabs as a manual focus control.
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        buttons.forEach(b => {
          b.removeAttribute('aria-current');
          b.classList.remove('text-white');
          b.classList.add('text-gray-light-3');
        });
        button.setAttribute('aria-current', 'true');
        button.classList.remove('text-gray-light-3');
        button.classList.add('text-white');
        const key = names[index] || names[0];
        const scene = sceneMap.get(key);
        if (scene) scene.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });

    // Make the static server snapshot behave like the animated client render.
    qsa('#canvas [style*="opacity:0"][style*="translateY(16px)"]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.classList.add('gtc-canvas-node-ready');
    });
    qsa('#canvas svg path[opacity="0"]').forEach(path => {
      path.style.opacity = '.72';
      path.style.strokeDasharray = '1 0';
    });
    qsa('#canvas svg g[opacity="0"]').forEach(g => {
      g.style.opacity = '1';
    });
  }

  function initPricingToggle() {
    const toggle = qs('#pricing button[aria-label*="Switch to monthly"]');
    if (!toggle) return;
    let retainer = false;
    const oneTime = { essential:['₹7,200','₹10,000'], selling:['₹9,480','₹14,000'], launch:['₹12,400','₹20,000'] };
    const monthly = { essential:['₹2,500/mo','₹3,500/mo'], selling:['₹4,500/mo','₹6,000/mo'], launch:['₹7,500/mo','₹10,000/mo'] };
    toggle.addEventListener('click', () => {
      retainer = !retainer;
      toggle.setAttribute('aria-label', retainer ? 'Switch to one-time billing' : 'Switch to monthly billing');
      const data = retainer ? monthly : oneTime;
      const cards = qsa('#pricing [data-plan-key]');
      const keys = ['essential','selling','launch'];
      cards.forEach((card, i) => {
        const price = qs('[data-gtc-price]', card) || qs('.t-h-2--sans', card) || qs('.t-h-2', card);
        const base = qs('[data-gtc-base]', card);
        const key = card.dataset.planKey || keys[i];
        if (price && data[key]) price.textContent = data[key][0];
        if (base && data[key]) base.textContent = data[key][1];
      });
      document.body.classList.toggle('gtc-retainer', retainer);
    });
  }

  function initAccordions() {
    qsa('[data-slot="accordion-item"] button[aria-controls]').forEach(trigger => {
      if (trigger.closest('header')) return;
      trigger.addEventListener('click', () => {
        const id = trigger.getAttribute('aria-controls');
        const content = id ? document.getElementById(id) : null;
        const item = trigger.closest('[data-slot="accordion-item"]');
        if (!content || !item) return;
        const currentlyOpen = trigger.getAttribute('aria-expanded') === 'true';
        qsa('#faq [data-slot="accordion-item"] button[aria-controls]').forEach(other => {
          const otherItem = other.closest('[data-slot="accordion-item"]');
          const otherId = other.getAttribute('aria-controls');
          const otherContent = otherId ? document.getElementById(otherId) : null;
          if (other !== trigger) {
            other.setAttribute('aria-expanded','false');
            otherItem?.setAttribute('data-state','closed');
            otherContent?.setAttribute('hidden','');
          }
        });
        trigger.setAttribute('aria-expanded', String(!currentlyOpen));
        item.setAttribute('data-state', currentlyOpen ? 'closed' : 'open');
        if (currentlyOpen) content.setAttribute('hidden','');
        else content.removeAttribute('hidden');
      });
    });
  }

  function initReveal() {
    const candidates = qsa('#personas h2, #models h2, #pricing h2, #faq h2, .gtc-contact-inner, .gtc-footer-panel');
    candidates.forEach(el => el.classList.add('gtc-reveal'));
    if (!('IntersectionObserver' in window)) {
      candidates.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold:.12, rootMargin:'0px 0px -8% 0px' });
    candidates.forEach(el => io.observe(el));
  }

  function initImageFallbacks() {
    qsa('img[src]').forEach(img => {
      img.addEventListener('error', () => {
        img.style.display = 'none';
        const parent = img.parentElement;
        if (parent) {
          parent.style.background = 'linear-gradient(135deg,#d7d3cc 0%,#aaa59d 48%,#67625e 100%)';
        }
      }, { once:true });
    });
  }

  function initPersonaTilt() {
    qsa('#personas > .relative.z-20 > div').forEach(card => {
      card.addEventListener('pointermove', e => {
        if (window.innerWidth < 900) return;
        const r = card.getBoundingClientRect();
        const x = (e.clientX-r.left)/r.width-.5;
        const y = (e.clientY-r.top)/r.height-.5;
        card.style.transform = `perspective(900px) rotateX(${y*-3}deg) rotateY(${x*4}deg) translateZ(0)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform=''; });
    });
  }
})();
