const io=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(!e.isIntersecting)return
  e.target.classList.add('on')
  io.unobserve(e.target)
}),{threshold:.15})
export const reveal=el=>io.observe(el)
