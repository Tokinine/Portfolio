import {chromeRing} from './chrome.js'
import {reveal} from './reveal.js'
import {still} from './runtime.js'
import tokibot from './assets/projects/tokibot.webp'
import jkplm from './assets/projects/jkplm.webp'
import localshield from './assets/projects/localshield.webp'
import localdownload from './assets/projects/localdownload.webp'
import localscan from './assets/projects/localscan.webp'

const projects=[
  {name:'TokiBot',line:'Bots temps réel pour JKLM.fun',img:tokibot},
  {name:'JKPLM',line:'Jeux de mots multijoueur',img:jkplm},
  {name:'Local Shield',line:'Bloqueur de pubs et traqueurs',img:localshield},
  {name:'LocalDownload',line:'Détecteur de médias',img:localdownload},
  {name:'LocalScan',line:'Lecteur de scans local',img:localscan}
]

const createCard=(project,i)=>{
  const card=document.createElement('article')
  card.className='card'
  card.dataset.v=i%3
  card.style.setProperty('--i',i-(projects.length-1)/2)
  card.style.setProperty('--o',i)
  card.innerHTML=`<div class="in"><div class="shot"><img src="${project.img}" alt="Aperçu de ${project.name}" loading="lazy" decoding="async"></div><h3>${project.name}</h3><p>${project.line}</p></div>`
  card.addEventListener('pointermove',e=>{
    const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height
    card.style.setProperty('--mx',x*100+'%')
    card.style.setProperty('--my',y*100+'%')
    if(e.pointerType==='mouse'&&!still){
      card.style.setProperty('--ry',(x-.5)*12+'deg')
      card.style.setProperty('--rx',(.5-y)*10+'deg')
    }
  })
  card.addEventListener('pointerleave',()=>{
    card.style.removeProperty('--mx')
    card.style.removeProperty('--my')
    card.style.removeProperty('--ry')
    card.style.removeProperty('--rx')
  })
  return card
}

export function initProjects(rail){
  rail.style.setProperty('--n',projects.length)
  projects.forEach((project,i)=>{
    const card=createCard(project,i)
    rail.appendChild(card)
    chromeRing(card,i,4.5,16,{lite:true,every:2})
    reveal(card)
  })
}
