import {onPointer,pointer} from './runtime.js'

const DEPTH=[.06,.16,.3,.08]

export function initBackground(){
  const orbs=[...document.querySelectorAll('#bg .o')]
  let sy=0,px=0,py=0,raf=0
  const update=()=>{
    raf=0
    orbs.forEach((o,i)=>o.style.transform=`translate3d(${px*(i+1)*-16}px,${-sy*DEPTH[i]+py*(i+1)*-12}px,0)`)
  }
  const request=()=>{if(!raf)raf=requestAnimationFrame(update)}
  addEventListener('scroll',()=>{sy=scrollY;request()},{passive:true})
  onPointer(()=>{px=pointer.u-.5;py=pointer.v-.5;request()})
}
