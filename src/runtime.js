export const still=matchMedia('(prefers-reduced-motion:reduce)').matches
export const pointer={u:.5,v:.5}
export const ui={s:1}
const syncScale=()=>{ui.s=(parseFloat(getComputedStyle(document.documentElement).fontSize)||16)/16}
syncScale()
addEventListener('resize',syncScale,{passive:true})
const handlers=[]
export const onPointer=fn=>handlers.push(fn)
addEventListener('pointermove',e=>{
  pointer.u=e.clientX/innerWidth
  pointer.v=e.clientY/innerHeight
  handlers.forEach(fn=>fn())
},{passive:true})
