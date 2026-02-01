export const VERTEX_SHADER = `#version 300 es
precision highp float;
in vec2 position;
out vec2 fragCoord;
void main() {
  fragCoord = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

export const CLOUD_VERTEX_SHADER = `#version 300 es
precision highp float;
in vec2 position;
out vec2 fragCoord;
void main() {
  fragCoord = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

export const CLOUD_FRAGMENT_SHADER = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform sampler2D iChannel0;
in vec2 fragCoord;
out vec4 fragColor;
float fTurbulence = 0.35;
vec3 vNightColor   = vec3(.15, 0.3, 0.6);
vec3 vHorizonColor = vec3(0.6, 0.3, 0.4);
vec3 vDayColor     = vec3(0.7,0.8,1);
vec3 vSunColor     = vec3(1.0,0.8,0.6);
vec3 vSunRimColor  = vec3(1.0,0.66,0.33);
float noise( in vec3 x ){
  vec3 p = floor(x);
  vec3 f = fract(x);
  f = f*f*f*(3.0-2.0*f);
  vec2 uv = (p.xy+vec2(37.0,17.0)*p.z) + f.xy;
  vec4 rg = texture( iChannel0, (uv+ 0.5)/256.0, -100.0 );
  return (-1.0+2.0*mix( rg.g, rg.r, f.z ));
}
vec4 render( in vec3 ro, in vec3 rd ){
  float fSunSpeed = 0.35 * iTime;
  vec3 sundir = normalize( vec3(cos(fSunSpeed),sin(fSunSpeed),0.0) );
  float sun = clamp( dot(sundir,rd), 0.0, 1.0 );
  float fSunHeight = sundir.y;
  float fNightHeight = -0.8;
  float fDayHeight   = 0.3;
  float fHorizonLength = fDayHeight - fNightHeight;
  float fInverseHL = 1.0 / fHorizonLength;
  float fHalfHorizonLength = fHorizonLength / 2.0;
  float fInverseHHL = 1.0 / fHalfHorizonLength;
  float fMidPoint = fNightHeight + fHalfHorizonLength;
  float fNightContrib = clamp((fSunHeight - fMidPoint) * (-fInverseHHL), 0.0, 1.0);
  float fHorizonContrib = -clamp(abs((fSunHeight - fMidPoint) * (-fInverseHHL)), 0.0, 1.0) + 1.0;
  float fDayContrib = clamp((fSunHeight - fMidPoint) * ( fInverseHHL), 0.0, 1.0);
  vec3 vSkyColor = vec3(0.0);
  vSkyColor += mix(vec3(0.0),   vNightColor, fNightContrib);
  vSkyColor += mix(vec3(0.0), vHorizonColor, fHorizonContrib);
  vSkyColor += mix(vec3(0.0),     vDayColor, fDayContrib);
  vec3 col = vSkyColor;
  col -= clamp(rd.y, 0.0, 0.5);
  col += 0.4 * vSunRimColor * pow( sun,    4.0 );
  col += 1.0 * vSunColor    * pow( sun, 2000.0 );
  float fStarSpeed = -fSunSpeed * 0.5;
  float fStarContrib = clamp((fSunHeight - fDayHeight) * (-fInverseHL), 0.0, 1.0);
  vec3 vStarDir = rd * mat3( vec3(cos(fStarSpeed), -sin(fStarSpeed), 0.0),
                             vec3(sin(fStarSpeed),  cos(fStarSpeed), 0.0),
                             vec3(0.0,             0.0,            1.0));
  col += pow((texture(iChannel0, vStarDir.xy).r + texture(iChannel0, vStarDir.zy).r) * 0.5, 42.0) * fStarContrib * 40.0;
  return vec4( col, 1.0 );
}
mat3 setCamera( in vec3 ro, in vec3 ta, float cr ){
  vec3 cw = normalize(ta-ro);
  vec3 cp = vec3(sin(cr), cos(cr),0.0);
  vec3 cu = normalize( cross(cw,cp) );
  vec3 cv = normalize( cross(cu,cw) );
  return mat3( cu, cv, cw );
}
void main(){
  vec2 p = (-iResolution.xy + 2.0*fragCoord.xy)/ iResolution.y;
  vec2 m = vec2(0.25, 0.5);
  vec3 ro = 4.0*normalize(vec3(sin(6.28*m.x + 1.5), 0.4 * m.y, cos(6.28*m.x + 1.5)));
  vec3 ta = vec3(0.0, -1.0, 0.0);
  mat3 ca = setCamera( ro, ta, 0.0 );
  vec3 rd = ca * normalize( vec3(p.xy,1.5));
  fragColor = render( ro, rd );
}`;


export const TERRAIN_FRAGMENT_SHADER = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec4 iMouse;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform sampler2D iChannel2;
uniform float scrollProgress;
in vec2 fragCoord;
out vec4 fragColor;
#define SC (250.0)
float fTurbulence = 0.35;
vec3 vNightColor   = vec3(.15, 0.3, 0.6);
vec3 vHorizonColor = vec3(0.6, 0.3, 0.4);
vec3 vDayColor     = vec3(0.7,0.8,1);
vec3 vSunColor     = vec3(1.0,0.8,0.6);
vec3 vSunRimColor  = vec3(1.0,0.66,0.33);
vec3 noised( in vec2 x ){
  vec2 p = floor(x);
  vec2 f = fract(x);
  vec2 u = f*f*(3.0-2.0*f);
  float a = texture(iChannel0,(p+vec2(0.5,0.5))/256.0,-100.0).x;
  float b = texture(iChannel0,(p+vec2(1.5,0.5))/256.0,-100.0).x;
  float c = texture(iChannel0,(p+vec2(0.5,1.5))/256.0,-100.0).x;
  float d = texture(iChannel0,(p+vec2(1.5,1.5))/256.0,-100.0).x;
  return vec3(a+(b-a)*u.x+(c-a)*u.y+(a-b-c+d)*u.x*u.y,6.0*f*(1.0-f)*(vec2(b-a,c-a)+(a-b-c+d)*u.yx));
}
const mat2 m2 = mat2(0.8,-0.6,0.6,0.8);
float detailH( in vec2 x ){
  float d = 0.0;
  return d + 0.5*texture( iChannel2, x*2.0/SC, 0.0 ).x;
}
float detailM( in vec2 x ){
  float d = 0.0;
  return d;
}
float terrainH( in vec2 x ){
  vec2  p = x*0.003/SC;
  float a = 0.0;
  float b = 1.0;
  vec2  d = vec2(0.0);
  for( int i=0; i<10; i++ ){
    vec3 n = noised(p);
    d += n.yz;
    a += b*n.x/(1.0+dot(d,d));
    b *= 0.5;
    p = m2*p*2.0;
  }
  float de = detailH(x);
  return SC*100.0*a - de;
}
float terrainM( in vec2 x ){
  vec2  p = x*0.003/SC;
  float a = 0.0;
  float b = 1.0;
  vec2  d = vec2(0.0);
  for( int i=0; i<6; i++ ){
    vec3 n = noised(p);
    d += n.yz;
    a += b*n.x/(1.0+dot(d,d));
    b *= 0.5;
    p = m2*p*2.0;
  }
  return SC*100.0*a - detailH(x);
}
float terrainL( in vec2 x ){
  vec2  p = x*0.003/SC;
  float a = 0.0;
  float b = 1.0;
  vec2  d = vec2(0.0);
  for( int i=0; i<5; i++ ){
    vec3 n = noised(p);
    d += n.yz;
    a += b*n.x/(1.0+dot(d,d));
    b *= 0.5;
    p = m2*p*2.0;
  }
  return SC*100.0*a;
}
float interesct( in vec3 ro, in vec3 rd, in float tmin, in float tmax ){
  float t = tmin;
  for( int i=0; i<128; i++ ){
    vec3 pos = ro + t*rd;
    float h = pos.y - terrainM( pos.xz );
    if( h<(0.004*t) || t>tmax ) break;
    t += 0.5*h;
  }
  return t;
}
float softShadow(in vec3 ro, in vec3 rd ){
  float res = 1.0;
  float t = 0.001;
  for( int i=0; i<32; i++ ){
    vec3  p = ro + t*rd;
    float h = p.y - terrainM( p.xz );
    res = min( res, 16.0*h/t );
    t += h;
    if( res<0.001 ||p.y>(SC*200.0) ) break;
  }
  return clamp( res, 0.0, 1.0 );
}
vec3 calcNormal( in vec3 pos, float t ){
  vec2  eps = vec2( 0.002*t, 0.0 );
  return normalize( vec3( terrainH(pos.xz-eps.xy) - terrainH(pos.xz+eps.xy),2.0*eps.x,terrainH(pos.xz-eps.yx) - terrainH(pos.xz+eps.yx) ) );
}
vec3 camPath( float time ){
  return SC*1100.0*vec3( cos(0.0+0.23*time), 0.0, cos(1.5+0.21*time) );
}
float fbm( vec2 p ){
  float f = 0.0;
  f += 0.5000*texture( iChannel0, p/256.0 ).x; p = m2*p*2.02;
  f += 0.2500*texture( iChannel0, p/256.0 ).x; p = m2*p*2.03;
  f += 0.1250*texture( iChannel0, p/256.0 ).x; p = m2*p*2.01;
  f += 0.0625*texture( iChannel0, p/256.0 ).x;
  return f/0.9375;
}
mat3 setCamera( in vec3 ro, in vec3 ta, in float cr ){
  vec3 cw = normalize(ta-ro);
  vec3 cp = vec3(sin(cr), cos(cr),0.0);
  vec3 cu = normalize( cross(cw,cp) );
  vec3 cv = normalize( cross(cu,cw) );
  return mat3( cu, cv, cw );
}
vec3 renderSky( in vec3 rd, in float dayNightMix ){
  float fSunSpeed = dayNightMix * 3.14159;
  vec3 sundir = normalize( vec3(cos(fSunSpeed),sin(fSunSpeed),0.0) );
  float sun = clamp( dot(sundir,rd), 0.0, 1.0 );
  float fSunHeight = sundir.y;
  float fNightHeight = -0.8;
  float fDayHeight   = 0.3;
  float fHorizonLength = fDayHeight - fNightHeight;
  float fInverseHL = 1.0 / fHorizonLength;
  float fHalfHorizonLength = fHorizonLength / 2.0;
  float fInverseHHL = 1.0 / fHalfHorizonLength;
  float fMidPoint = fNightHeight + fHalfHorizonLength;
  float fNightContrib = clamp((fSunHeight - fMidPoint) * (-fInverseHHL), 0.0, 1.0);
  float fHorizonContrib = -clamp(abs((fSunHeight - fMidPoint) * (-fInverseHHL)), 0.0, 1.0) + 1.0;
  float fDayContrib = clamp((fSunHeight - fMidPoint) * ( fInverseHHL), 0.0, 1.0);
  vec3 vSkyColor = vec3(0.0);
  vSkyColor += mix(vec3(0.0),   vNightColor, fNightContrib);
  vSkyColor += mix(vec3(0.0), vHorizonColor, fHorizonContrib);
  vSkyColor += mix(vec3(0.0),     vDayColor, fDayContrib);
  vec3 col = vSkyColor;
  col -= clamp(rd.y, 0.0, 0.5);
  col += 0.4 * vSunRimColor * pow( sun,    4.0 );
  col += 1.0 * vSunColor    * pow( sun, 2000.0 );
  float fStarSpeed = -fSunSpeed * 0.5;
  float fStarContrib = clamp((fSunHeight - fDayHeight) * (-fInverseHL), 0.0, 1.0);
  vec3 vStarDir = rd * mat3( vec3(cos(fStarSpeed), -sin(fStarSpeed), 0.0),
                             vec3(sin(fStarSpeed),  cos(fStarSpeed), 0.0),
                             vec3(0.0,             0.0,            1.0));
  col += pow((texture(iChannel0, vStarDir.xy).r + texture(iChannel0, vStarDir.zy).r) * 0.5, 42.0) * fStarContrib * 40.0;
  return col;
}
vec3 render( in vec3 ro, in vec3 rd ){
  vec3 light1 = normalize( vec3(-0.8,0.4,-0.3) );
  float tmin = 1.0;
  float tmax = 1000.0*SC;
  float maxh = 300.0*SC;
  float tp = (maxh-ro.y)/rd.y;
  if( tp>0.0 ){
    if( ro.y>maxh ) tmin = max( tmin, tp );
    else            tmax = min( tmax, tp );
  }
  vec3 col;
  float t = interesct( ro, rd, tmin, tmax );
  float dayNightMix = scrollProgress;
  if( t>tmax){
    col = renderSky( rd, dayNightMix );
  }else{
    vec3 pos = ro + t*rd;
    vec3 nor = calcNormal( pos, t );
    vec3 ref = reflect( rd, nor );
    float fre = clamp( 1.0+dot(rd,nor), 0.0, 1.0 );
    float r = texture( iChannel0, (7.0/SC)*pos.xz/256.0 ).x;
    col = (r*0.25+0.75)*0.9*mix( vec3(0.08,0.05,0.03), vec3(0.10,0.09,0.08), texture(iChannel0,0.00007*vec2(pos.x,pos.y*48.0)/SC).x );
    col = mix( col, 0.20*vec3(0.45,.30,0.15)*(0.50+0.50*r),smoothstep(0.70,0.9,nor.y) );
    col = mix( col, 0.15*vec3(0.30,.30,0.10)*(0.25+0.75*r),smoothstep(0.95,1.0,nor.y) );
    float h = smoothstep(55.0,80.0,pos.y/SC + 25.0*fbm(0.01*pos.xz/SC) );
    float e = smoothstep(1.0-0.5*h,1.0-0.1*h,nor.y);
    float o = 0.3 + 0.7*smoothstep(0.0,0.1,nor.x+h*h);
    float s = h*e*o;
    col = mix( col, 0.29*vec3(0.62,0.65,0.7), smoothstep( 0.1, 0.9, s ) );
    float amb = clamp(0.5+0.5*nor.y,0.0,1.0);
    float dif = clamp( dot( light1, nor ), 0.0, 1.0 );
    float bac = clamp( 0.2 + 0.8*dot( normalize( vec3(-light1.x, 0.0, light1.z ) ), nor ), 0.0, 1.0 );
    float sh = 1.0; if( dif>=0.0001 ) sh = softShadow(pos+light1*20.0,light1);
    vec3 lin  = vec3(0.0);
    lin += dif*vec3(7.00,5.00,3.00)*vec3( sh, sh*sh*0.5+0.5*sh, sh*sh*0.8+0.2*sh );
    lin += amb*vec3(0.40,0.60,0.80)*1.2;
    lin += bac*vec3(0.40,0.50,0.60);
    col *= lin;
    col += s*0.1*pow(fre,4.0)*vec3(7.0,5.0,3.0)*sh * pow( clamp(dot(light1,ref), 0.0, 1.0),16.0);
    col += s*0.1*pow(fre,4.0)*vec3(0.4,0.5,0.6)*smoothstep(0.0,0.6,ref.y);
    float fo = 1.0-exp(-0.001*t/SC );
    vec3 fco = 0.7*vec3(0.5,0.7,0.9) + 0.1*vec3(1.0,0.8,0.5)*pow( dot(light1,rd), 4.0 );
    col = mix( col, fco, fo );
    col += 0.3*vec3(1.0,0.8,0.4)*pow( dot(light1,rd), 8.0 )*(1.0-exp(-0.002*t/SC));
  }
  col = pow(col,vec3(0.4545));
  return col;
}
void main() {
  vec2 xy = -1.0 + 2.0*fragCoord;
  vec2 s = xy*vec2(iResolution.x/iResolution.y,1.0);
  float time;
  vec3 ro;
  vec3 ta;
  float cr;
  if (scrollProgress < 0.30) {
    time = 10.0 - scrollProgress * 7.7;
    ro = camPath( time );
    ta = camPath( time + 3.0 );
    ro.y = terrainL( ro.xz ) + 11.0*SC;
    ta.y = ro.y - 20.0*SC;
    cr = 0.2*cos(0.1*time);
  } else {
    time = 10.0 - (0.30 * 7.7);
    ro = camPath( time );
    ta = camPath( time + 3.0 );
    ro.y = terrainL( ro.xz ) + 11.0*SC;
    ta.y = ro.y - 20.0*SC;
    cr = 0.2*cos(0.1*time);
  }
  mat3 cam = setCamera( ro, ta, cr );
  vec3 rd = cam * normalize(vec3(s.xy,2.0));
  vec3 col = render( ro, rd );
  col *= 0.5 + 0.5*pow( (xy.x+1.0)*(xy.y+1.0)*(xy.x-1.0)*(xy.y-1.0), 0.1 );
  fragColor = vec4( col, 1.0 );
}`;