gsap.registerPlugin(ScrollTrigger);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* build barcode bars */
const barcode = document.getElementById('barcode');
const widths = [3,1,2,4,1,1,3,2,1,4,2,1,3,1,2,1,4,1,2,3];
widths.forEach(w => {
  const bar = document.createElement('span');
  bar.style.width = w + 'px';
  bar.style.height = (16 + w*4) + '%';
  barcode.appendChild(bar);
});

/* ---- hero load animation: boxes stack in, stamp lands ---- */
if(!reduceMotion){
  gsap.set('.box-back', {opacity:0, x:-30, y:20, rotate:-16});
  gsap.set('.box-mid', {opacity:0, x:-16, y:10, rotate:-2});
  gsap.set('.box-front', {opacity:0, y:26});
  gsap.set('#stamp', {opacity:0, scale:0.3, rotate:26});
  gsap.set('.eyebrow, .hero h1, .hero .pitch, .spec-row, .hero-ctas', {opacity:0, y:14});

  const tl = gsap.timeline({defaults:{ease:'power3.out'}, delay:0.1});
  tl.to('.box-back', {opacity:0.55, x:0, y:0, rotate:-6, duration:0.55})
    .to('.box-mid', {opacity:0.8, x:0, y:0, rotate:3, duration:0.5}, '-=0.35')
    .to('.box-front', {opacity:1, y:0, duration:0.5}, '-=0.3')
    .to('#stamp', {opacity:1, scale:1, rotate:-12, duration:0.5, ease:'back.out(2.2)'}, '-=0.15')
    .to('.eyebrow', {opacity:1, y:0, duration:0.4}, 0.15)
    .to('.hero h1', {opacity:1, y:0, duration:0.55}, 0.25)
    .to('.hero .pitch', {opacity:1, y:0, duration:0.45}, 0.4)
    .to('.spec-row', {opacity:1, y:0, duration:0.4, stagger:0.06}, 0.5)
    .to('.hero-ctas', {opacity:1, y:0, duration:0.4}, 0.75);
} else {
  gsap.set('#stamp', {rotate:-12});
}

/* ---- scroll: catalog items reveal like a receipt printing down ---- */
gsap.utils.toArray('.item').forEach(item => {
  if(reduceMotion) return;
  gsap.fromTo(item,
    {ClipPathY:0},
    {}
  );
  gsap.set(item, {clipPath:'inset(0 0 100% 0)'});
  gsap.to(item, {
    clipPath: 'inset(0 0 0% 0)',
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: { trigger: item, start: 'top 85%' }
  });
});

/* item numbers tick up on view */
document.querySelectorAll('.item-no').forEach((el, i) => {
  if(reduceMotion) return;
  const finalText = el.textContent;
  const num = String(i+1).padStart(2,'0');
  gsap.fromTo(el, {opacity:0}, {
    opacity:1, duration:0.3,
    scrollTrigger:{ trigger: el, start:'top 90%' },
    onStart(){ el.textContent = 'ITEM ' + num; }
  });
});
