import './style.css'
import './projet.css'
import {projects,projectUrl} from './projects-data.js'
import {url,stackInfo} from './stacks.js'
import {chromeRing} from './chrome.js'
import {initNav} from './nav.js'
import {initBackground} from './background.js'
import {initRibbons} from './ribbons.js'
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
  </div></div></div>
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
  initTilt()
  // le contenu est rendu en JS : l'ancre de l'URL n'existait pas au chargement
  if(location.hash)document.querySelector(location.hash)?.scrollIntoView()
}

function initTilt(){
  const frame=document.querySelector('.ph-frame'),shot=frame.querySelector('.ph-shot')
  if(still||!matchMedia('(hover:hover)').matches)return
  // inclinaison lissée image par image plutôt qu'une transition CSS relancée à chaque mouvement
  const rest={x:3,y:-8}
  let cur={...rest},to={...rest},raf=0
  const tick=()=>{
    cur.x+=(to.x-cur.x)*.08
    cur.y+=(to.y-cur.y)*.08
    frame.style.transform=`rotateY(${cur.y}deg) rotateX(${cur.x}deg)`
    raf=Math.abs(to.x-cur.x)+Math.abs(to.y-cur.y)>.01?requestAnimationFrame(tick):0
  }
  const go=t=>{to=t;if(!raf)raf=requestAnimationFrame(tick)}
  frame.addEventListener('animationend',()=>{
    shot.addEventListener('pointermove',e=>{
      const r=shot.getBoundingClientRect()
      go({x:(.5-(e.clientY-r.top)/r.height)*5,y:((e.clientX-r.left)/r.width-.5)*7})
    })
    shot.addEventListener('pointerleave',()=>go(rest))
  },{once:true})
}

initNav()
initBackground()
initRibbons()
document.querySelectorAll('.rv').forEach(el=>reveal(el))
document.querySelectorAll('.band').forEach(el=>mercury(el))
const idle=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('idle',!e.isIntersecting)))
document.querySelectorAll('.chrome').forEach(el=>idle.observe(el))
