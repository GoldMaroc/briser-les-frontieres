"use client";

import { useEffect, useRef } from "react";

// Procedural WebGL2 Alpine Light & Topographic Mist Shader (From Nouveau dossier (4))
export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vsSource = `#version 300 es
    in vec2 a_pos;
    out vec2 v_uv;
    void main() {
      v_uv = a_pos * 0.5 + 0.5;
      gl_Position = vec4(a_pos, 0.0, 1.0);
    }`;

    const fsSource = `#version 300 es
    precision highp float;
    in vec2 v_uv;
    out vec4 outColor;

    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec2 u_res;
    uniform float u_isDark;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    void main() {
      vec2 uv = v_uv;
      float aspect = u_res.x / max(u_res.y, 1.0);
      vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

      float n1 = noise(p * 2.4 + vec2(u_time * 0.04, -u_time * 0.025));
      float n2 = noise(p * 5.2 - vec2(u_time * 0.03, u_time * 0.02));
      float elev = n1 * 0.65 + n2 * 0.35;

      float contour = abs(fract(elev * 9.0) - 0.5);
      float line = smoothstep(0.47, 0.495, contour);

      vec2 mPos = (u_mouse - 0.5) * vec2(aspect, 1.0);
      float dist = length(p - mPos);
      float glow = exp(-dist * dist * 2.4);

      vec3 darkBg = vec3(0.047, 0.063, 0.055);
      vec3 darkAccent = vec3(0.282, 0.388, 0.294);
      vec3 lightBg = vec3(0.953, 0.965, 0.957);
      vec3 lightAccent = vec3(0.239, 0.341, 0.251);

      vec3 baseCol = mix(lightBg, darkBg, u_isDark);
      vec3 sageCol = mix(lightAccent, darkAccent, u_isDark);

      vec3 col = baseCol;
      col = mix(col, sageCol, glow * (u_isDark > 0.5 ? 0.35 : 0.25));
      col = mix(col, sageCol * 1.25, (1.0 - line) * (u_isDark > 0.5 ? 0.18 : 0.12));

      float alpha = mix(0.45, 0.70, u_isDark);
      outColor = vec4(col, alpha);
    }`;

    const createShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);

    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(prog, "a_pos");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uIsDark = gl.getUniformLocation(prog, "u_isDark");

    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetX = 0.5;
    let targetY = 0.5;
    let rafId = 0;
    const startTime = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / Math.max(rect.width, 1);
      targetY = 1.0 - (e.clientY - rect.top) / Math.max(rect.height, 1);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    resize();

    const render = () => {
      resize();
      gl.useProgram(prog);

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? 1.0
          : 0.0;

      gl.uniform1f(uTime, (performance.now() - startTime) * 0.001);
      gl.uniform2f(uMouse, mouseX, mouseY);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uIsDark, isDark);

      gl.enableVertexAttribArray(aPos);
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(posBuf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60"
      aria-hidden="true"
    />
  );
}
