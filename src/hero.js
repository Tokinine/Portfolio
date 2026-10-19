import {onPointer,pointer,still} from './runtime.js'

export function initHero(){
  if(still)return
  const title=document.querySelector('.hero h1')
  let raf=0
  onPointer(()=>{
    if(raf||scrollY>=innerHeight)return
    raf=requestAnimationFrame(()=>{
      raf=0
      title.style.setProperty('--sw',pointer.u*100+'%')
    })
  })
}
