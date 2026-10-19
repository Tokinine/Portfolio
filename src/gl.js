export const HEAD=`#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
`
export const STUDIO=`mat3 rx(float a){float c=cos(a),s=sin(a);return mat3(1.,0.,0.,0.,c,-s,0.,s,c);}
mat3 ry(float a){float c=cos(a),s=sin(a);return mat3(c,0.,s,0.,1.,0.,-s,0.,c);}
float env(vec3 r){float up=smoothstep(-.15,.35,r.y);float v=.02+.3*up+.35*up*up*max(r.y,0.);
v+=pow(max(dot(r,normalize(vec3(-.5,.8,.45))),0.),16.)*2.6;
v+=smoothstep(.93,.985,dot(r,normalize(vec3(.9,.3,-.2))))*3.2;
v+=smoothstep(.95,.99,dot(r,normalize(vec3(-.8,-.15,.55))))*2.6;
v+=smoothstep(.96,.99,dot(r,normalize(vec3(.15,-.55,.8))))*1.6;
v+=smoothstep(.97,.995,dot(r,normalize(vec3(.35,.5,.8))))*2.2;
v+=.5*smoothstep(.15,.95,r.z)*(.55+.45*sin(r.y*7.+r.x*4.+1.));
v*=.6+.4*smoothstep(-.9,.2,r.y);return v;}
`
const VERTEX='attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}'
const compile=(gl,type,src)=>{
  const s=gl.createShader(type)
  gl.shaderSource(s,src)
  gl.compileShader(s)
  return s
}
export function quad(canvas,fragment,uniforms){
  const gl=canvas.getContext('webgl',{alpha:true,premultipliedAlpha:true,antialias:false})
  if(!gl)return null
  const program=gl.createProgram()
  gl.attachShader(program,compile(gl,gl.VERTEX_SHADER,VERTEX))
  gl.attachShader(program,compile(gl,gl.FRAGMENT_SHADER,fragment))
  gl.linkProgram(program)
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))return null
  gl.useProgram(program)
  gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW)
  const attr=gl.getAttribLocation(program,'a')
  gl.enableVertexAttribArray(attr)
  gl.vertexAttribPointer(attr,2,gl.FLOAT,false,0,0)
  const U={}
  uniforms.forEach(n=>U[n]=gl.getUniformLocation(program,n))
  return{gl,U,draw(){
    gl.clearColor(0,0,0,0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES,0,3)
  }}
}
