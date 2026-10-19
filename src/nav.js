import {chromeRing} from './chrome.js'

const TOP=40,SENSITIVITY=12

export function initNav(){
  const nav=document.querySelector('.nav')
  chromeRing(nav,5,3.2,12,{capsule:true,q:4,aa4:true})

  let hidden=false,anchor=scrollY
  const setHidden=h=>{
    if(h===hidden)return
    hidden=h
    nav.classList.toggle('hide',h)
  }
  const update=()=>{
    const y=scrollY
    if(y<=TOP){setHidden(false);anchor=y}
    else if(y>anchor+SENSITIVITY){setHidden(true);anchor=y}
    else if(y<anchor-SENSITIVITY){setHidden(false);anchor=y}
  }

  addEventListener('scroll',update,{passive:true})
  nav.addEventListener('focusin',()=>setHidden(false))
  setHidden(scrollY>TOP)
}
