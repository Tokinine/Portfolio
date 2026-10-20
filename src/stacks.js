import {reveal} from './reveal.js'
import {still} from './runtime.js'

const icons=import.meta.glob('./assets/stacks/*.svg',{eager:true,query:'?url',import:'default'})
const url=k=>icons[`./assets/stacks/${k}.svg`]

// [fichier, nom affiché, options : inv = logo monochrome sombre inversé en blanc sur fond sombre, wide = logo large]
const data=[
  {t:'Langages',s:[['javascript','JavaScript'],['python','Python'],['html5','HTML'],['css3','CSS'],['bash','Shell']]},
  {t:'Back-end',s:[['nodejs','Node.js'],['express','Express','inv'],['socketio','Socket.IO','inv'],['discordjs','discord.js'],['cheerio','cheerio'],['sharp','sharp']]},
  {t:'Front & rendu',s:[['vite','Vite'],['webgl','WebGL','wide'],['chrome','Extensions Chrome']]},
  {t:'Données & services',s:[['supabase','Supabase'],['postgresql','PostgreSQL'],['discord','Discord OAuth'],['cloudflare','Cloudflare Turnstile']]},
  {t:'Infra & outils',s:[['vercel','Vercel','inv'],['render','Render','inv'],['githubactions','GitHub Actions'],['githubpages','GitHub Pages','inv wide'],['pm2','PM2'],['npm','npm']]}
]

export function initStacks(grid){
  data.forEach((d,i)=>{
    const el=document.createElement('article')
    el.className='sk rv'
    el.style.setProperty('--o',i%3)
    el.innerHTML=`<h3>${d.t}</h3><ul>${d.s.map(([k,n,f])=>`<li data-n="${n}"${f?` class="${f}"`:''} tabindex="0"><img src="${url(k)}" alt="${n}" width="40" height="40" loading="lazy" decoding="async"></li>`).join('')}</ul>`
    grid.appendChild(el)
    reveal(el)
  })
  if(still)return
  grid.addEventListener('pointermove',e=>{
    const p=e.target.closest('.sk')
    if(!p)return
    const r=p.getBoundingClientRect()
    p.style.setProperty('--mx',e.clientX-r.left+'px')
    p.style.setProperty('--my',e.clientY-r.top+'px')
  })
}
