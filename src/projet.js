import './style.css'
import './projet.css'
import {projects,projectUrl} from './projects-data.js'
import {url,stackInfo} from './stacks.js'
import {chromeRing} from './chrome.js'
import {initNav} from './nav.js'
import {initBackground} from './background.js'
import {mercury} from './mercury.js'
import {reveal} from './reveal.js'
import {still} from './runtime.js'

const i=projects.findIndex(p=>p.slug===new URLSearchParams(location.search).get('p'))
if(i<0)location.replace('./#projets')
else render(projects[i],i)

function render(p,i){
  const n=projects.length,prev=projects[(i-1+n)%n],next=projects[(i+1)%n]
  const [src,w,h]=p.hd
  const pad=k=>String(k).padStart(2,'0')
  const stacks=p.stack.map(stackInfo).filter(Boolean)
  document.title=`${p.name} · Toki`

  document.getElementById('projet').innerHTML=`
<section class="ph" id="top"><div class="wrap ph-grid">
 <div class="ph-copy">
  <h1 class="ph-title" style="--len:${p.name.length}"><span class="ln" style="--k:0">${p.name}</span></h1>
  <p class="ph-lede fade" style="--k:2">${p.lede}</p>
  <dl class="ph-meta fade" style="--k:3">
   <div><dt>Type</dt><dd>${p.type}</dd></div>
   <div><dt>Rôle</dt><dd>${p.role}</dd></div>
   ${p.demo?`<div><dt>Capture</dt><dd>Données de démonstration</dd></div>`:''}
   ${stacks.length?`<div><dt>Stack</dt><dd>${stacks.map(s=>s[1]).join(' · ')}</dd></div>`:''}
   <div><dt>Code</dt><dd>${p.link?`<a href="${p.link[1]}" target="_blank" rel="noopener">${p.link[0]} ↗</a>`:p.status}</dd></div>
  </dl>
  <div class="cta fade" style="--k:4"><a class="btn chrome" href="#etude"><span>Lire l’étude ↓</span></a><a class="btn ghost" href="./#projets"><span>← Tous les projets</span></a></div>
 </div>
 <figure class="ph-stage">
  <div class="ph-frame" style="--ar:${w}/${h}"><div class="in"><div class="ph-shot">
   <img src="${src}" width="${w}" height="${h}" alt="Capture de ${p.name}" fetchpriority="high" style="view-transition-name:shot-${p.slug}">
   ${p.pins.map(([x,y],k)=>`<span class="pin" style="left:${x}%;top:${y}%;--d:${k}" aria-hidden="true">${pad(k+1)}</span>`).join('')}
   <span class="ph-tag" aria-hidden="true"></span>
  </div></div></div>
  <figcaption class="ph-legend">
   <ol>${p.pins.map(([,,t],k)=>`<li><button type="button" data-k="${k}"><b>${pad(k+1)}</b>${t}</button></li>`).join('')}</ol>
   <p class="ph-detail" id="detail"></p>
  </figcaption>
 </figure>
</div>
<nav class="wrap ph-steps" aria-label="Autres projets"><a href="${projectUrl(prev)}">← ${prev.name}</a><span>${pad(i+1)} / ${pad(n)}</span><a href="${projectUrl(next)}">${next.name} →</a></nav>
</section>

<div class="band" aria-hidden="true"></div>

<section class="pj-sec" id="etude"><div class="wrap g12">
 <h2 class="pj-h rv">Vue d’ensemble</h2>
 ${p.stats?`<dl class="stats">${p.stats.map(([n,l,d],k)=>`<div class="rv" style="--o:${k}"><dt>${l}</dt><dd><b>${n}</b>${d}</dd></div>`).join('')}</dl>`:''}
 <div class="ov">${p.overview.map((t,k)=>`<p class="rv${k?'':' ov-lead'}" style="--o:${k+1}">${t}</p>`).join('')}</div>
</div></section>

<section class="pj-sec"><div class="wrap g12">
 <h2 class="pj-h rv">Ce qu’il fait</h2>
 <ul class="ft">${p.features.map(([t,d],k)=>`<li class="rv" style="--o:${k%3}"><h3>${t}</h3><p>${d}</p></li>`).join('')}</ul>
</div></section>

${p.flow.length?`<section class="pj-sec"><div class="wrap g12">
 <h2 class="pj-h rv">Comment c’est construit</h2>
 <ol class="flow">${p.flow.map(([t,d],k)=>`<li class="rv" style="--o:${k}"><span class="chrome"><span><b>${t}</b><small>${d}</small></span></span></li>`).join('')}</ol>
</div></section>`:''}

${stacks.length?`<section class="pj-sec"><div class="wrap g12">
 <h2 class="pj-h rv">Stack</h2>
 <ul class="stk rv">${stacks.map(([k,name,f])=>`<li${f?` class="${f}"`:''}><span><img src="${url(k)}" alt="" width="40" height="40" loading="lazy" decoding="async"></span>${name}</li>`).join('')}</ul>
</div></section>`:''}

<section class="pj-sec nx-sec"><div class="wrap">
 <a class="nx rv" href="${projectUrl(next)}"><span class="nx-name">${next.name}</span><span class="nx-line">${next.line}</span><span class="btn chrome nx-go"><span>Voir le projet suivant →</span></span><span class="nx-shot"><img src="${next.img}" alt="" loading="lazy" decoding="async"></span></a>
</div></section>`

  const frame=document.querySelector('.ph-frame')
  chromeRing(frame,i,7,18)
  initLens(p)
  // le contenu est rendu en JS : l'ancre de l'URL n'existait pas au chargement
  if(location.hash)document.querySelector(location.hash)?.scrollIntoView()
}

function initLens(p){
  const shot=document.querySelector('.ph-shot'),tag=shot.querySelector('.ph-tag')
  const pins=[...shot.querySelectorAll('.pin')],buttons=[...document.querySelectorAll('.ph-legend button')]
  const detail=document.getElementById('detail'),stage=document.querySelector('.ph-stage'),frame=stage.querySelector('.ph-frame')
  let cur={x:p.pins[0][0]/100,y:p.pins[0][1]/100},to={...cur},raf=0,active=-1,hover=false,visible=true,timer=0


  const draw=()=>{
    const W=shot.offsetWidth,H=shot.offsetHeight,D=40
    const lx=Math.min(Math.max(cur.x*W,D/2),W-D/2),ly=Math.min(Math.max(cur.y*H,D/2),H-D/2)
    // étiquette sous la loupe, sinon au-dessus, sinon à côté : jamais hors capture ni sur un autre repère
    const T=tag.offsetWidth,th=tag.offsetHeight,tx=Math.min(Math.max(lx-T/2,8),W-T-8)
    const below=ly+D/2,up=ly-D/2-th-24,covers=(x,y)=>p.pins.some(([px,py],k)=>k!==active&&px/100*W>x-20&&px/100*W<x+T+20&&py/100*H>y-8&&py/100*H<y+th+32)
    const spots=[[tx,below],[tx,up],[Math.min(lx+D/2+12,W-T-8),ly-th/2],[Math.max(lx-D/2-T-12,8),ly-th/2]].filter(([,y])=>y>=8&&y+th+20<=H)
    const [sx,sy]=spots.find(([x,y])=>!covers(x,y))||spots[0]||[tx,Math.min(below,H-th-20)]
    tag.style.translate=`${sx}px ${sy}px`
  }
  const tick=()=>{
    raf=0
    const k=still?1:.14
    cur.x+=(to.x-cur.x)*k
    cur.y+=(to.y-cur.y)*k
    draw()
    if(Math.abs(to.x-cur.x)+Math.abs(to.y-cur.y)>.0005)raf=requestAnimationFrame(tick)
  }
  const go=(x,y)=>{to={x,y};if(!raf)raf=requestAnimationFrame(tick)}
  const select=k=>{
    if(k===active)return
    active=k
    pins.forEach((el,j)=>el.classList.toggle('on',j===k))
    buttons.forEach((el,j)=>el.setAttribute('aria-pressed',j===k))
    detail.textContent=p.pins[k][3]
    tag.textContent=`${String(k+1).padStart(2,'0')} · ${p.pins[k][2]}`
    go(p.pins[k][0]/100,p.pins[k][1]/100)
  }
  const tour=()=>{
    clearTimeout(timer)
    if(still||hover||!visible)return
    timer=setTimeout(()=>{select((active+1)%pins.length);tour()},3600)
  }

  shot.addEventListener('pointermove',e=>{
    const r=shot.getBoundingClientRect()
    const x=Math.min(1,Math.max(0,(e.clientX-r.left)/r.width)),y=Math.min(1,Math.max(0,(e.clientY-r.top)/r.height))
    go(x,y)
    // repère le plus proche du pointeur
    let best=0,bd=Infinity
    p.pins.forEach(([px,py],j)=>{const d=(px/100-x)**2+(py/100-y)**2;if(d<bd){bd=d;best=j}})
    tag.classList.toggle('off',bd>=.012)
    if(bd<.012)select(best)
  })
  stage.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hover=true;frame.classList.add('live');clearTimeout(timer)}})
  stage.addEventListener('pointerleave',()=>{hover=false;tag.classList.remove('off');frame.classList.remove('live');frame.style.removeProperty('--ry');frame.style.removeProperty('--rx');const k=active;active=-1;select(k);tour()})
  stage.addEventListener('pointermove',e=>{
    if(e.pointerType!=='mouse'||still)return
    const r=stage.getBoundingClientRect()
    frame.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*6+'deg')
    frame.style.setProperty('--rx',(.5-(e.clientY-r.top)/r.height)*4+'deg')
  })
  buttons.forEach(b=>{
    b.addEventListener('click',()=>{select(+b.dataset.k);tour()})
    b.addEventListener('pointerenter',()=>select(+b.dataset.k))
  })
  new IntersectionObserver(([e])=>{visible=e.isIntersecting;visible?tour():clearTimeout(timer)}).observe(shot)
  new ResizeObserver(draw).observe(shot)
  select(0)
  tour()
}

initNav()
initBackground()
document.querySelectorAll('.rv').forEach(el=>reveal(el))
document.querySelectorAll('.band').forEach(el=>mercury(el))
const idle=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('idle',!e.isIntersecting)))
document.querySelectorAll('.chrome').forEach(el=>idle.observe(el))
