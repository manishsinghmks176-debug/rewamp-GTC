(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initHeroMotion() {
    const gallery = document.querySelector('.gtc-hero-gallery');
    if (!gallery || reduceMotion) return;
    const cards = [...gallery.querySelectorAll('.gtc-hero-card')];
    let tx = 0, ty = 0, cx = 0, cy = 0;
    window.addEventListener('pointermove', e => {
      tx = (e.clientX / window.innerWidth - .5) * 2;
      ty = (e.clientY / window.innerHeight - .5) * 2;
    }, {passive:true});
    function frame(){
      cx += (tx-cx)*.035; cy += (ty-cy)*.035;
      cards.forEach((card,i)=>{
        const depth = (i%5+1)/5;
        card.style.marginLeft = `${cx*depth*12}px`;
        card.style.marginTop = `${cy*depth*7}px`;
      });
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function initShowcaseTilt() {
    const cards = document.querySelectorAll('#personas .cursor-pointer');
    if (reduceMotion) return;
    cards.forEach(card => {
      card.addEventListener('pointermove', e => {
        const r=card.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
        card.style.transform=`perspective(900px) rotateX(${y*-3}deg) rotateY(${x*4}deg) translateY(-4px)`;
      });
      card.addEventListener('pointerleave',()=>{card.style.transform='';});
    });
  }

  function initCanvasGlow() {
    const canvas=document.querySelector('#canvas');
    if(!canvas || reduceMotion) return;
    let x=.5,y=.5,tx=.5,ty=.5;
    canvas.addEventListener('pointermove',e=>{const r=canvas.getBoundingClientRect();tx=(e.clientX-r.left)/r.width;ty=(e.clientY-r.top)/r.height},{passive:true});
    function tick(){x+=(tx-x)*.025;y+=(ty-y)*.025;canvas.style.setProperty('--mouse-x',`${x*100}%`);canvas.style.setProperty('--mouse-y',`${y*100}%`);requestAnimationFrame(tick)}
    tick();
  }
  document.addEventListener('DOMContentLoaded',()=>{initHeroMotion();initShowcaseTilt();initCanvasGlow();});
})();
