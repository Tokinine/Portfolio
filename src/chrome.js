import {quad,whenNear,HEAD,STUDIO} from './gl.js'
import {pointer,still,ui} from './runtime.js'

const AA2='(shade(p+vec2(.25,.25))+shade(p+vec2(-.25,-.25)))*.5'
const AA4='(shade(p+vec2(.125,.375))+shade(p+vec2(-.375,.125))+shade(p+vec2(-.125,-.375))+shade(p+vec2(.375,-.125)))*.25'

export const ringShader=aa4=>HEAD+`uniform vec2 R,B,M;uniform float T,RR,TH;
const float PI=3.14159265;
`+STUDIO+`float sdRB(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
float bulge(float a,float t,float ph){float s=0.;for(int k=0;k<6;k++){float fk=float(k);float ak=fk*1.0472+ph+.55*sin(t*.21+fk*1.9);float da=abs(mod(a-ak+PI,2.*PI)-PI);s+=exp(-da*da*(5.+3.*sin(fk*2.7)));}return s;}
float ang(vec2 p){return atan(p.y*B.x,p.x*B.y);}
float sdf(vec2 p){float a=ang(p);float w=TH*.16*sin(a*3.+T*.6)+TH*.07*sin(a*7.-T*.9);return sdRB(p,B*.5,RR)+w;}
vec4 shade(vec2 p){
float d=sdf(p);
float th=TH*(.6+1.0*clamp(bulge(ang(p),T,.3),0.,1.25));
float al=1.-smoothstep(-.7,.7,abs(d)-th);
if(al<=0.)return vec4(0.);
float t=clamp(d/th,-1.,1.);float e=1.5;
vec2 g=vec2(sdf(p+vec2(e,0.))-sdf(p-vec2(e,0.)),sdf(p+vec2(0.,e))-sdf(p-vec2(0.,e)));g/=max(length(g),1e-4);
vec3 n=normalize(vec3(g*t*1.15,sqrt(max(1.-t*t,.05))));
n=normalize(n+vec3(.1*sin(p.y*.015+T*1.4),.1*cos(p.x*.015-T*1.2),0.));
vec3 r=reflect(vec3(0.,0.,-1.),n);
r=ry(.55*sin(T*.45)+T*.14+M.x*.7)*(rx(.2*cos(T*.33)-M.y*.5)*r);
float f=pow(1.-n.z,2.);vec3 o=vec3(n.xy,0.)*.12*f;
vec3 col=vec3(env(normalize(r+o)),env(r),env(normalize(r-o)))*1.12+.03;
col=mix(col,col*vec3(.88,.96,1.12),.55*f+.15);
return vec4(col*al,al);}
void main(){vec2 p=gl_FragCoord.xy-.5*R;
gl_FragColor=${aa4?AA4:AA2};}`

const UNIFORMS=['R','B','M','T','RR','TH']
const rings=new Map()
const visible=new Set()
const t0=performance.now()
let sx=0,sy=0,raf=0,tick=0

const frame=now=>{
  sx+=(pointer.u*2-1-sx)*.04
  sy+=(pointer.v*2-1-sy)*.04
  const t=still?4:(now-t0)/1000+4
  tick++
  visible.forEach(r=>{if(tick%r.every===0)r.draw(t)})
  raf=visible.size?requestAnimationFrame(frame):0
}

const start=()=>{
  if(raf)return
  sx=pointer.u*2-1
  sy=pointer.v*2-1
  raf=requestAnimationFrame(frame)
}

const io=new IntersectionObserver(entries=>entries.forEach(e=>{
  const ring=rings.get(e.target)
  if(e.isIntersecting){visible.add(ring);start()}else visible.delete(ring)
}))
const ro=new ResizeObserver(entries=>entries.forEach(e=>rings.get(e.target).resize()))

export const chromeRing=(host,...args)=>whenNear(host,()=>init(host,...args))

async function init(host,index=0,thickness=4.5,pad=16,opts={}){
  const canvas=document.createElement('canvas')
  canvas.style.cssText=`position:absolute;inset:-${pad/16}rem;width:calc(100% + ${pad/8}rem);height:calc(100% + ${pad/8}rem);pointer-events:none`
  host.appendChild(canvas)
  const g=await quad(canvas,ringShader(opts.aa4),UNIFORMS)
  if(!g){canvas.remove();return}
  const {gl,U}=g
  let q=1
  const ring={
    every:opts.every||1,
    draw(t){
      const P=pad*ui.s,w=canvas.width-2*P*q,h=canvas.height-2*P*q
      gl.uniform2f(U.R,canvas.width,canvas.height)
      gl.uniform2f(U.B,w,h)
      gl.uniform2f(U.M,sx,sy)
      gl.uniform1f(U.T,t+index*1.7)
      gl.uniform1f(U.RR,opts.capsule?h/2:22*ui.s*q)
      gl.uniform1f(U.TH,thickness*ui.s*q)
      g.draw()
    },
    resize(){
      q=opts.q||(opts.lite?Math.min(Math.max((devicePixelRatio||1)*1.5,2),3):Math.min(Math.max((devicePixelRatio||1)*2,3.5),4))
      canvas.width=Math.round(canvas.clientWidth*q)
      canvas.height=Math.round(canvas.clientHeight*q)
      gl.viewport(0,0,canvas.width,canvas.height)
    }
  }
  rings.set(canvas,ring)
  ring.resize()
  ro.observe(canvas)
  io.observe(canvas)
}
