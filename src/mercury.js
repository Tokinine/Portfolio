import {quad,HEAD,STUDIO} from './gl.js'
import {pointer,still,ui} from './runtime.js'

export const MERCURY_FS=HEAD+`uniform vec2 R,M;uniform float T,Q,P;
#define KK (6.2832/(420.*Q))
`+STUDIO+`float wy(float x){return R.y*.5+R.y*.2*sin(x*KK+T*.55+P)+R.y*.05*sin(x*KK*2.3-T*.8-P*.5);}
vec2 un(vec2 A,vec2 B,float k){float h=clamp(.5+.5*(B.x-A.x)/k,0.,1.);return vec2(mix(B.x,A.x,h)-k*h*(1.-h),mix(B.y,A.y,h));}
vec2 field(vec2 p){
float s=(wy(p.x+1.)-wy(p.x-1.))*.5;
float r0=Q*(3.2+1.3*sin(p.x*KK*.7+T*.5));
vec2 e=vec2(abs(p.y-wy(p.x))/sqrt(1.+s*s)-r0,r0);
for(int i=0;i<6;i++){float fi=float(i);
float bx=fract(fi/6.+T*.006+.04*sin(T*.3+fi*2.))*R.x;
float rb=Q*(5.5+4.5*fract(sin(fi*91.7)*437.5));
e=un(e,vec2(length(p-vec2(bx,wy(bx)))-rb,rb),9.*Q);}
return e;}
vec4 shade(vec2 p){
vec2 f=field(p);float d=f.x;
float al=1.-smoothstep(-.8,.8,d);if(al<=0.)return vec4(0.);
vec2 g=vec2(field(p+vec2(1.,0.)).x-field(p-vec2(1.,0.)).x,field(p+vec2(0.,1.)).x-field(p-vec2(0.,1.)).x);g/=max(length(g),1e-4);
float t=clamp(1.+d/f.y,0.,1.);
vec3 n=normalize(vec3(g*t*1.15,sqrt(max(1.-t*t,.05))));
vec3 r=reflect(vec3(0.,0.,-1.),n);
r=ry(.55*sin(T*.45)+T*.14+M.x*.7)*(rx(.2*cos(T*.33)-M.y*.5)*r);
float fr=pow(1.-n.z,2.);vec3 o=vec3(n.xy,0.)*.12*fr;
vec3 col=vec3(env(normalize(r+o)),env(r),env(normalize(r-o)))*.95+.03;
col=mix(col,col*vec3(.88,.96,1.12),.55*fr+.15);
return vec4(col*al,al);}
void main(){gl_FragColor=shade(gl_FragCoord.xy);}`

export function mercury(host){
  const canvas=document.createElement('canvas')
  canvas.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none'
  host.appendChild(canvas)
  const g=quad(canvas,MERCURY_FS,['R','M','T','Q','P'])
  if(!g){canvas.remove();return}
  const {gl,U}=g
  let q=2,sx=0,sy=0,phase=0,lastY=scrollY,visible=false,raf=0

  const draw=now=>{
    raf=0
    sx+=(pointer.u*2-1-sx)*.05
    sy+=(pointer.v*2-1-sy)*.05
    phase+=(scrollY-lastY)*.004
    lastY=scrollY
    gl.uniform2f(U.R,canvas.width,canvas.height)
    gl.uniform2f(U.M,sx,sy)
    gl.uniform1f(U.T,still?4:now/1000+4)
    gl.uniform1f(U.Q,q*ui.s)
    gl.uniform1f(U.P,phase)
    g.draw()
    if(visible&&!still)raf=requestAnimationFrame(draw)
  }
  const schedule=()=>{if(!raf)raf=requestAnimationFrame(draw)}
  const resize=()=>{
    q=Math.min(Math.max((devicePixelRatio||1)*2,2),3)
    canvas.width=Math.round(canvas.clientWidth*q)
    canvas.height=Math.round(canvas.clientHeight*q)
    gl.viewport(0,0,canvas.width,canvas.height)
    schedule()
  }
  new ResizeObserver(resize).observe(canvas)
  new IntersectionObserver(e=>{
    visible=e[0].isIntersecting
    if(visible)schedule()
  }).observe(canvas)
}
