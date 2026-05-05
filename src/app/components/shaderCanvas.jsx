"use client";
import { useEffect, useRef } from "react";

// Single shared clock — all canvas instances use identical elapsed time
const START_TIME = Date.now();

const VERT = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAG = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  uniform float iTime;
  uniform vec2  iResolution;   // this canvas's pixel size
  uniform vec2  uViewportSize; // full viewport pixel size
  uniform vec2  uOffset;       // this canvas's bottom-left in viewport coords
  uniform float uDark;
  uniform float uAlpha;

  const float scale      = 5.5;
  const float velocity_x = 0.1;
  const float velocity_y = 0.2;
  const float twist      = 50.0;
  const float detail     = 200.0;
  const int   iterations = 10;

  const vec3 luma = vec3(0.2126, 0.7152, 0.0722);

  float f(vec2 p) {
    return sin(p.x + sin(p.y + iTime * velocity_x))
         * sin(p.y * p.x * 0.1 + iTime * velocity_y);
  }

  vec2 flowField(vec2 p) {
    vec2 ep = vec2(0.05, 0.0);
    vec2 g  = vec2(0.0);
    for (int i = 0; i < iterations; i++) {
      float t0 = f(p);
      float t1 = f(p + ep.xy);
      float t2 = f(p + ep.yx);
      g  = vec2(t1 - t0, t2 - t0) / ep.xx;
      vec2 t = vec2(-g.y, g.x);
      p += (twist * 0.01) * t + g * (1.0 / detail);
      p.x += sin(iTime * 0.25) * 0.05;
      p.y += cos(iTime * 0.25) * 0.05;
    }
    return g;
  }

  vec3 getColor(vec2 p) {
    float r = cos(p.x + p.y + 1.0) * 0.5 + 0.5;
    float g = sin(p.x + p.y + 1.0) * 0.5 + 0.5;
    float b = (sin(p.x + p.y) + cos(p.x + p.y)) * 0.3 + 0.5;
    return vec3(r, g, b);
  }

  void main() {
    // Convert this fragment's position to viewport-space UV
    // so every canvas instance samples the same point in the flow field
    vec2 vpCoord = gl_FragCoord.xy + uOffset;
    vec2 uv = vpCoord / uViewportSize;

    vec2 p  = uv - 0.5;
    p.x *= uViewportSize.x / uViewportSize.y;
    p   *= scale;

    vec2  flow       = flowField(p);
    vec3  col        = getColor(flow);
    float brightness = dot(col, luma);

    float density   = 400.0;
    float maxRadius = 0.8;
    float angle     = 0.45;
    mat2  rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));

    // Halftone grid also aligned to viewport so dots don't shift at section edges
    vec2  vpUV  = vpCoord / uViewportSize;
    vec2  tuv   = rot * (vpUV - 0.5) + 0.5;
    vec2  gv    = fract(tuv * density) - 0.5;
    float dist  = length(gv);
    float radius    = maxRadius * brightness;
    float dotShape  = smoothstep(radius + 0.01, radius - 0.01, dist);

    float dotLuma = uDark > 0.5 ? 1.0 : 0.0;
    float alpha   = dotShape * uAlpha;

    gl_FragColor = vec4(vec3(dotLuma), alpha);
  }
`;

// viewportAlign=true: reads the canvas's position in the viewport each frame
// so the UV matches the global background canvas exactly.
export default function ShaderCanvas({ isDark, alpha = 0.30, viewportAlign = false }) {
  const canvasRef  = useRef(null);
  const isDarkRef  = useRef(isDark);
  const alphaRef   = useRef(alpha);
  const readyRef   = useRef(false);

  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);
  useEffect(() => { alphaRef.current = alpha; }, [alpha]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    function compile(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("[ShaderCanvas]", gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    }

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("[ShaderCanvas]", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      iTime:        gl.getUniformLocation(program, "iTime"),
      iResolution:  gl.getUniformLocation(program, "iResolution"),
      uViewportSize:gl.getUniformLocation(program, "uViewportSize"),
      uOffset:      gl.getUniformLocation(program, "uOffset"),
      uDark:        gl.getUniformLocation(program, "uDark"),
      uAlpha:       gl.getUniformLocation(program, "uAlpha"),
    };

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      const w   = Math.floor(canvas.offsetWidth  * dpr);
      const h   = Math.floor(canvas.offsetHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width  = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let raf;
    let offscreen = false;

    function render() {
      const elapsed = (Date.now() - START_TIME) / 1000;
      const dpr = Math.min(window.devicePixelRatio, 1.5);

      let offsetX = 0;
      let offsetY = 0;
      let vpW = canvas.width;
      let vpH = canvas.height;

      if (viewportAlign) {
        const rect = canvas.getBoundingClientRect();
        vpW = Math.floor(window.innerWidth  * dpr);
        vpH = Math.floor(window.innerHeight * dpr);
        offsetX = Math.floor(rect.left   * dpr);
        offsetY = Math.floor((window.innerHeight - rect.bottom) * dpr);
      }

      gl.uniform1f(uniforms.iTime, elapsed);
      gl.uniform2f(uniforms.iResolution, canvas.width, canvas.height);
      gl.uniform2f(uniforms.uViewportSize, vpW, vpH);
      gl.uniform2f(uniforms.uOffset, offsetX, offsetY);
      gl.uniform1f(uniforms.uDark, isDarkRef.current ? 1.0 : 0.0);
      gl.uniform1f(uniforms.uAlpha, alphaRef.current);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (!readyRef.current) {
        readyRef.current = true;
        canvas.style.opacity = "1";
      }

      raf = requestAnimationFrame(render);
    }

    function tryStart() {
      if (!offscreen && !document.hidden) render();
    }

    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!offscreen) {
        render();
      }
    }
    document.addEventListener("visibilitychange", onVisibility);

    const io = new IntersectionObserver(([entry]) => {
      offscreen = !entry.isIntersecting;
      if (offscreen) {
        cancelAnimationFrame(raf);
      } else if (!document.hidden) {
        render();
      }
    }, { threshold: 0 });
    io.observe(canvas);

    tryStart();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
    };
  }, [viewportAlign]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        display: "block",
        zIndex: 0,
        opacity: 0,
        transition: "opacity 0.6s ease",
      }}
    />
  );
}
