const dishes=[
 {n:"Nigiri Toro Braseado",d:"Atún toro, soplete y sal maldon. 2 piezas.",p:24,img:"https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=800&auto=format&fit=crop",t:"Nigiri"},
 {n:"Roll Osaka Volcano",d:"Cangrejo, spicy mayo y tobiko naranja.",p:20,img:"https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop",t:"Rolls"},
 {n:"Sashimi Hamachi",d:"Servido sobre hielo, yuzu y shiso fresco.",p:26,img:"https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?q=80&w=800&auto=format&fit=crop",t:"Sashimi"},
 {n:"Maki Cucumber Vegan",d:"Pepino, aguacate y ajonjolí tostado.",p:14,img:"https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800&auto=format&fit=crop",t:"Veggie"},
 {n:"Nigiri Salmón Real",d:"Salmón fresco, eneldo y lima confitada.",p:18,img:"https://images.unsplash.com/photo-1583623025817-d180a2221d0a?q=80&w=800&auto=format&fit=crop",t:"Nigiri"},
 {n:"Roll Shibuya Crunch",d:"Tempura de camarón y aguacate crujiente.",p:21,img:"https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop",t:"Rolls"},
];
const h=document.getElementById('hscroll');
h.innerHTML=dishes.map(x=>`<article class="dish"><div class="dish-img"><img src="${x.img}" alt="${x.n}"><span class="dish-tag">${x.t}</span></div><div class="dish-body"><h4>${x.n}</h4><p>${x.d}</p><div class="price-row"><span class="price">$${x.p}</span><button class="add-btn" data-name="${x.n}">+</button></div></div></article>`).join('');

const mq=document.getElementById('marquee');
const txt="TOKYO DASH ✦ SUSHI DELIVERED ✦ ALTA COCINA ✦ 25 MIN ✦ ";
mq.innerHTML=`<span>${txt.repeat(4)}</span><span>${txt.repeat(4)}</span>`;

const introScreen=document.getElementById('introScreen');
window.addEventListener('load',()=>{
  setTimeout(()=>{
    introScreen.classList.add('hidden');
  },1700);
});

// Nav scroll
addEventListener('scroll',()=>{document.getElementById('nav').classList.toggle('scrolled',scrollY>40);const max=document.documentElement.scrollHeight-window.innerHeight;const progress=(scrollY/max)*100;document.getElementById('scrollProgress').style.transform=`scaleX(${Math.min(Math.max(progress/100,0),1)})`;});

// Section highlight in nav
const navLinks=[...document.querySelectorAll('.nav-links a')];
const navToggle=document.getElementById('navToggle');
const navLinksPanel=document.getElementById('navLinks');
function closeMobileNav(){
 navLinksPanel.classList.remove('open');
 navToggle.classList.remove('open');
 navToggle.setAttribute('aria-expanded','false');
 navToggle.setAttribute('aria-label','Abrir menú de navegación');
}
navToggle.addEventListener('click',()=>{
 const isOpen=navToggle.getAttribute('aria-expanded')==='true';
 navToggle.setAttribute('aria-expanded',String(!isOpen));
 navToggle.setAttribute('aria-label',isOpen?'Abrir menú de navegación':'Cerrar menú de navegación');
 navToggle.classList.toggle('open',!isOpen);
 navLinksPanel.classList.toggle('open',!isOpen);
});
navLinks.forEach(link=>link.addEventListener('click',closeMobileNav));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMobileNav()});
const sections=navLinks.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
const sectionObserver=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{
   if(!entry.isIntersecting)return;
   const id=entry.target.id;
   navLinks.forEach(link=>link.classList.toggle('active', link.getAttribute('href')==='#'+id));
 });
},{rootMargin:'-18% 0px -55% 0px',threshold:0.15});
sections.forEach(section=>sectionObserver.observe(section));

// Reveal
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Counters
const cio=new IntersectionObserver(e=>e.forEach(x=>{if(!x.isIntersecting)return;const el=x.target;const target=+el.dataset.count;let c=0;const step=Math.max(1,Math.round(target/40));const t=setInterval(()=>{c+=step;if(c>=target){c=target;clearInterval(t)}el.innerHTML=c+el.innerHTML.replace(/^\d+/,'')},35);cio.unobserve(el)}),{threshold:.6});
document.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));

// Cart
let count=0;const oc=document.getElementById('orderCount'),toast=document.getElementById('toast');
function addToOrder(name){count++;oc.textContent=count;document.getElementById('toastMsg').textContent=name+' añadido al pedido';toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2600)}
document.addEventListener('click',e=>{if(e.target.classList.contains('add-btn'))addToOrder(e.target.dataset.name)});

// Pills filter
document.getElementById('pills').addEventListener('click',e=>{
 if(!e.target.classList.contains('pill'))return;
 document.querySelectorAll('.pill').forEach(p=>p.classList.remove('active'));e.target.classList.add('active');
 const f=e.target.textContent.trim();
 const cards=[...h.querySelectorAll('.dish')];
 cards.forEach((c,i)=>{
   const show=f==='Todos'||dishes[i].t===f|| (f==='Veggie'&&dishes[i].t==='Veggie');
   c.style.display=show?'':'none';
 });
});

// Drag to scroll
let down=false,sx=0,sl=0;
h.addEventListener('pointerdown',e=>{down=true;sx=e.clientX;sl=h.scrollLeft;h.setPointerCapture(e.pointerId)});
h.addEventListener('pointermove',e=>{if(down)h.scrollLeft=sl-(e.clientX-sx)});
['pointerup','pointerleave'].forEach(ev=>h.addEventListener(ev,()=>down=false));

// Hero parallax
const hv=document.getElementById('heroVisual');
document.getElementById('hero').addEventListener('mousemove',e=>{
 const r=hv.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
 const dx=(e.clientX-cx)/cx,dy=(e.clientY-cy)/cy;
 hv.querySelectorAll('[data-depth]').forEach(el=>{const d=+el.dataset.depth;el.style.transform=`translate(${dx*d}px,${dy*d}px)`});
 hv.querySelector('.hero-img').style.transform=`translate(-50%,-50%) translate(${dx*-8}px,${dy*-8}px) scale(1.02)`;
});

document.getElementById('reserveForm').addEventListener('submit',e=>{e.preventDefault();document.getElementById('toastMsg').textContent='Reserva confirmada · Nos vemos pronto';toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),3000);e.target.reset()});
document.querySelectorAll('.magnetic').forEach(b=>b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.18}px)`}));
document.querySelectorAll('.magnetic').forEach(b=>b.addEventListener('mouseleave',()=>b.style.transform=''));
