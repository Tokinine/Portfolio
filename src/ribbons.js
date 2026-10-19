import {ui} from './runtime.js'
const POINTS=50,DETAIL=4,SAMPLES=(POINTS-1)*DETAIL+1,STRIDE=6,STEP=1/120
const THICKNESS=14,SPREAD=7,IDLE_MS=3500
const SPRING=.03*4**(2*.97-1)
const ZETA=Math.min(Math.max(.3**(2*.04),.05),1)
const FOLLOW=1-.183**(60*STEP/.75)

const VERTEX=`#version 300 es
in vec2 a_position;in vec4 a_shape;uniform vec2 u_resolution;out vec4 v_shape;
void main(){v_shape=a_shape;vec2 clip=a_position/u_resolution*2.0-1.0;gl_Position=vec4(clip.x,-clip.y,0.0,1.0);}`
const FRAGMENT=`#version 300 es
precision highp float;uniform vec3 u_color;in vec4 v_shape;out vec4 outColor;
void main(){float halfWidth=v_shape.y;float dist=abs(v_shape.x)*v_shape.z;float edge=max(halfWidth,0.5);float soft=0.5*edge;
float alpha=1.0-smoothstep(edge-soft-0.6,edge+0.6,dist);alpha*=clamp(halfWidth/0.5,0.0,1.0);
alpha*=1.0-smoothstep(0.0,1.0,v_shape.w);alpha*=0.95;if(alpha<=0.002)discard;outColor=vec4(u_color*alpha,alpha);}`

const clamp=(v,a,b)=>Math.min(Math.max(v,a),b)
const smoothstep=(e0,e1,v)=>{const t=clamp((v-e0)/(e1-e0),0,1);return t*t*(3-2*t)}
const hash=v=>{const s=Math.sin(v*127.1+311.7)*43758.5453;return s-Math.floor(s)}
const hex=h=>[1,3,5].map(i=>parseInt(h.substr(i,2),16)/255)
const profile=u=>(1-u)**1.2*Math.sqrt(smoothstep(0,.1,u))
const COLORS=['#ffffff','#b9bfcc','#6b7080'].map(hex)

const compile=(gl,type,src)=>{
  const s=gl.createShader(type)
  gl.shaderSource(s,src)
  gl.compileShader(s)
  return gl.getShaderParameter(s,gl.COMPILE_STATUS)?s:null
}

const createRibbon=(i,x,y)=>{
  const points=new Float32Array(POINTS*2)
  for(let k=0;k<POINTS;k++){points[k*2]=x;points[k*2+1]=y}
  const pull=.35+1.3*hash(i+3),drag=.9+.2*hash(i+5)
  return{x,y,vx:0,vy:0,points,
    k:3600*SPRING*pull,
    dm:2*ZETA*60*Math.sqrt(SPRING)*drag,
    width:.95+.1*hash(i+7),
    lift:hash(i+13)-.5,
    nudge:hash(i+17)-.5}
}

export function initRibbons(){
  if(!matchMedia('(hover:hover) and (pointer:fine)').matches||matchMedia('(prefers-reduced-motion:reduce)').matches)return

  const box=document.createElement('div')
  box.style.cssText='position:fixed;inset:0;z-index:200;pointer-events:none'
  const canvas=document.createElement('canvas')
  canvas.style.cssText='display:block;width:100%;height:100%'
  box.appendChild(canvas)
  const dot=document.createElement('div')
  dot.style.cssText='position:absolute;left:-.1875rem;top:-.1875rem;width:.375rem;height:.375rem;border-radius:50%;background:#fff;mix-blend-mode:difference;will-change:transform;transform:translate3d(-50px,-50px,0)'
  box.appendChild(dot)

  const gl=canvas.getContext('webgl2',{alpha:true,premultipliedAlpha:true,antialias:false})
  if(!gl)return
  const vs=compile(gl,gl.VERTEX_SHADER,VERTEX),fs=compile(gl,gl.FRAGMENT_SHADER,FRAGMENT),program=gl.createProgram()
  if(!vs||!fs)return
  gl.attachShader(program,vs)
  gl.attachShader(program,fs)
  gl.linkProgram(program)
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))return
  gl.useProgram(program)
  document.body.appendChild(box)
  document.documentElement.classList.add('no-cursor')

  const uResolution=gl.getUniformLocation(program,'u_resolution'),uColor=gl.getUniformLocation(program,'u_color')
  const vao=gl.createVertexArray(),buffer=gl.createBuffer()
  gl.bindVertexArray(vao)
  gl.bindBuffer(gl.ARRAY_BUFFER,buffer)
  const pos=gl.getAttribLocation(program,'a_position'),shape=gl.getAttribLocation(program,'a_shape')
  gl.enableVertexAttribArray(pos)
  gl.vertexAttribPointer(pos,2,gl.FLOAT,false,STRIDE*4,0)
  gl.enableVertexAttribArray(shape)
  gl.vertexAttribPointer(shape,4,gl.FLOAT,false,STRIDE*4,8)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA)

  const pX=new Float32Array(POINTS),pY=new Float32Array(POINTS),sp=new Float32Array(POINTS)
  const sX=new Float32Array(SAMPLES),sY=new Float32Array(SAMPLES),sS=new Float32Array(SAMPLES)
  const vertices=new Float32Array(COLORS.length*SAMPLES*2*STRIDE)
  const ribbons=[]
  let w=1,h=1,mx=0,my=0,placed=false,acc=0,last=0,moved=0,raf=0

  const resize=()=>{
    const r=Math.min(devicePixelRatio||1,2)
    w=Math.max(1,box.clientWidth)
    h=Math.max(1,box.clientHeight)
    if(!placed){mx=w/2;my=h/2}
    const pw=Math.round(w*r),ph=Math.round(h*r)
    if(canvas.width!==pw||canvas.height!==ph){canvas.width=pw;canvas.height=ph}
  }

  const simulate=()=>{
    const n=ribbons.length,c=(n-1)/2
    for(let i=0;i<n;i++){
      const r=ribbons[i],tx=mx+(i-c+r.nudge*.2)*SPREAD*ui.s,ty=my+r.lift*SPREAD*ui.s
      r.vx+=(r.k*(tx-r.x)-r.dm*r.vx)*STEP
      r.vy+=(r.k*(ty-r.y)-r.dm*r.vy)*STEP
      r.x+=r.vx*STEP
      r.y+=r.vy*STEP
      const p=r.points
      p[0]=r.x
      p[1]=r.y
      for(let j=1;j<POINTS;j++){
        const k=j*2
        p[k]+=(p[k-2]-p[k])*FOLLOW
        p[k+1]+=(p[k-1]-p[k+1])*FOLLOW
      }
    }
  }

  const build=(r,out,offset)=>{
    const p=r.points
    let total=0
    for(let j=0;j<POINTS;j++){
      pX[j]=p[j*2]
      pY[j]=p[j*2+1]
      if(j>0)total+=Math.hypot(pX[j]-pX[j-1],pY[j]-pY[j-1])
    }
    if(total<.5)return 0
    for(let j=0;j<POINTS;j++){
      const a=Math.max(j-1,0),b=Math.min(j+1,POINTS-1)
      sp[j]=Math.hypot(pX[b]-pX[a],pY[b]-pY[a])
    }
    let k=0
    for(let j=0;j<POINTS-1;j++){
      const a=Math.max(j-1,0),b=j,c=j+1,d=Math.min(j+2,POINTS-1)
      for(let step=0;step<DETAIL;step++){
        const t=step/DETAIL,t2=t*t,t3=t2*t
        sX[k]=.5*(2*pX[b]+(pX[c]-pX[a])*t+(2*pX[a]-5*pX[b]+4*pX[c]-pX[d])*t2+(3*pX[b]-pX[a]-3*pX[c]+pX[d])*t3)
        sY[k]=.5*(2*pY[b]+(pY[c]-pY[a])*t+(2*pY[a]-5*pY[b]+4*pY[c]-pY[d])*t2+(3*pY[b]-pY[a]-3*pY[c]+pY[d])*t3)
        sS[k]=sp[j]+(sp[j+1]-sp[j])*t
        k++
      }
    }
    sX[k]=pX[POINTS-1]
    sY[k]=pY[POINTS-1]
    sS[k]=sp[POINTS-1]
    const T=THICKNESS*ui.s,half=T*.5*r.width*smoothstep(0,T*1.5,total)
    let nx=0,ny=1,cur=offset
    for(let i=SAMPLES-1;i>=0;i--){
      const a=Math.max(i-1,0),b=Math.min(i+1,SAMPLES-1),dx=sX[b]-sX[a],dy=sY[b]-sY[a],len=Math.hypot(dx,dy)
      if(len>1e-4){nx=-dy/len;ny=dx/len}
      const u=i/(SAMPLES-1),wd=half*profile(u)*smoothstep(0,1.5,sS[i]),reach=wd+1.5
      for(let side=-1;side<=1;side+=2){
        out[cur++]=sX[i]+nx*reach*side
        out[cur++]=sY[i]+ny*reach*side
        out[cur++]=side
        out[cur++]=wd
        out[cur++]=reach
        out[cur++]=u
      }
    }
    return SAMPLES*2
  }

  const draw=()=>{
    resize()
    gl.viewport(0,0,canvas.width,canvas.height)
    gl.clearColor(0,0,0,0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    const n=ribbons.length,need=n*SAMPLES*2*STRIDE
    const ranges=[]
    for(let i=0;i<n;i++){
      const off=i*SAMPLES*2*STRIDE
      ranges.push([off/STRIDE,build(ribbons[i],vertices,off)])
    }
    gl.bindVertexArray(vao)
    gl.bindBuffer(gl.ARRAY_BUFFER,buffer)
    gl.bufferData(gl.ARRAY_BUFFER,vertices.subarray(0,need),gl.DYNAMIC_DRAW)
    gl.uniform2f(uResolution,w,h)
    for(let i=0;i<n;i++){
      const [first,size]=ranges[i]
      if(!size)continue
      gl.uniform3fv(uColor,COLORS[i])
      gl.drawArrays(gl.TRIANGLE_STRIP,first,size)
    }
  }

  const frame=now=>{
    raf=0
    const dt=last?Math.min(.05,(now-last)/1000):1/60
    last=now
    acc+=dt
    while(acc>=STEP){simulate();acc-=STEP}
    draw()
    if(now-moved<IDLE_MS)raf=requestAnimationFrame(frame)
    else last=0
  }
  const wake=()=>{if(!raf&&!document.hidden)raf=requestAnimationFrame(frame)}
  const onMove=e=>{
    mx=e.clientX
    my=e.clientY
    placed=true
    moved=performance.now()
    dot.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0)`
    wake()
  }

  addEventListener('pointermove',onMove,{passive:true})
  addEventListener('pointerdown',onMove,{passive:true})
  document.addEventListener('mouseleave',()=>dot.style.transform='translate3d(-50px,-50px,0)')
  new ResizeObserver(()=>{resize();draw()}).observe(box)
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(raf)})

  resize()
  COLORS.forEach((_,i)=>{
    const a=ribbons[i-1]
    ribbons.push(createRibbon(i,a?a.x:mx,a?a.y:my))
  })
}
