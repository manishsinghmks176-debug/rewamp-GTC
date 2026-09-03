(() => {
  'use strict';
  const WA='https://wa.me/918140804662';
  const wa=(msg)=>window.open(`${WA}?text=${encodeURIComponent(msg)}`,'_blank','noopener');

  function initHeader(){
    const menu=document.querySelector('header button[aria-label="Menu"]');
    const nav=menu?.closest('nav');
    if(!menu||!nav)return;
    const drawer=document.createElement('div');
    drawer.className='gtc-mobile-drawer';
    drawer.innerHTML=`<a href="#canvas">Services</a><a href="#personas">Work</a><a href="#models">Engineering</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a><a href="#contact">Contact</a>`;
    nav.appendChild(drawer);
    menu.addEventListener('click',()=>{
      const open=nav.classList.toggle('gtc-menu-open');
      menu.setAttribute('aria-expanded',String(open));
      menu.setAttribute('data-state',open?'open':'closed');
      drawer.setAttribute('aria-hidden',String(!open));
    });
    drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('gtc-menu-open')));
  }

  function initPrompt(){
    const input=document.querySelector('.gtc-hero-prompt');
    const btn=document.querySelector('.gtc-prompt-submit');
    if(btn)btn.addEventListener('click',()=>wa(`Hi Gujarat Tech Consultants,\n\n${input?.value.trim()||'I would like to discuss a premium website for my business.'}`));
    input?.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();btn?.click()}});
  }

  function initShowcase(){
    const tabs=[...document.querySelectorAll('nav[aria-label="Showcase sections"] button')];
    const ids=['canvas-showcase-advertising','canvas-showcase-e-commerce','canvas-showcase-filmmaking','canvas-showcase-fashion','canvas-showcase-branding'];
    tabs.forEach((tab,i)=>tab.addEventListener('click',()=>document.getElementById(ids[i])?.scrollIntoView({behavior:'smooth',block:'center'})));
  }

  function initPricing(){
    const toggle=document.querySelector('#pricing button[aria-label="Switch to monthly billing"]');
    const creator=document.querySelector('[data-plan-key="creator"]');
    const growth=document.querySelector('[data-plan-key="growth"]');
    const pro=document.querySelector('[data-plan-key="professional"]');
    if(!toggle)return;
    let retainer=false;
    const prices={creator:['₹7,200','₹2,500/mo'],growth:['₹9,480','₹4,500/mo'],professional:['₹12,400','₹7,500/mo']};
    function setPrice(card,key){
      if(!card)return;
      const spans=card.querySelectorAll('.t-price span');
      const target=prices[key][retainer?1:0];
      if(spans.length) spans[0].textContent=target;
      else { const all=card.querySelectorAll('span'); [...all].forEach(s=>{if(/^₹/.test(s.textContent.trim()))s.textContent=target;}); }
    }
    toggle.addEventListener('click',e=>{e.preventDefault();retainer=!retainer;setPrice(creator,'creator');setPrice(growth,'growth');setPrice(pro,'professional');});
  }

  function initCTAs(){
    document.querySelectorAll('a,button').forEach(el=>{
      const t=el.textContent.trim();
      if(/Choose Essential/.test(t)){el.addEventListener('click',e=>{e.preventDefault();wa('Hi GTC, I would like to discuss the Essential website package (₹7,200 launch rate).')});}
      else if(/Choose Most Selling/.test(t)){el.addEventListener('click',e=>{e.preventDefault();wa('Hi GTC, I would like to discuss the Most Selling package with NFC Smart Card (₹9,480 launch rate).')});}
      else if(/Choose Launch/.test(t)){el.addEventListener('click',e=>{e.preventDefault();wa('Hi GTC, I would like to discuss the Launch package with Google Business and Verified Digital Presence (₹12,400 launch rate).')});}
      else if(/Contact Sales/.test(t)){el.addEventListener('click',e=>{e.preventDefault();wa('Hi GTC, I would like to discuss a bespoke digital architecture.')} )}
    });
  }

  function initFAQ(){
    const items=[...document.querySelectorAll('#faq [data-slot="accordion-item"]')];
    items.forEach(item=>{
      const trigger=item.querySelector('[data-slot="accordion-trigger"]');
      const content=item.querySelector('[data-slot="accordion-content"]');
      if(!trigger||!content)return;
      trigger.addEventListener('click',()=>{
        const open=item.getAttribute('data-state')==='open';
        items.forEach(i=>{i.setAttribute('data-state','closed');const c=i.querySelector('[data-slot="accordion-content"]');const b=i.querySelector('[data-slot="accordion-trigger"]');c?.setAttribute('data-state','closed');if(c)c.hidden=true;b?.setAttribute('aria-expanded','false');});
        if(!open){item.setAttribute('data-state','open');content.hidden=false;content.setAttribute('data-state','open');trigger.setAttribute('aria-expanded','true');}
      });
    });
  }

  function initNewsletter(){
    const form=document.getElementById('newsletter-form');
    form?.addEventListener('submit',e=>{e.preventDefault();const input=form.querySelector('input');if(input?.value)wa(`Hi GTC, please add ${input.value} to your workshop updates.`);});
  }
  document.addEventListener('DOMContentLoaded',()=>{initHeader();initPrompt();initShowcase();initPricing();initCTAs();initFAQ();initNewsletter();});
})();
