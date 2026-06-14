---
layout: home
hero:
  name: ''
  text: ''
  tagline: ''
---

<style>
/* Canvas 背景層 */
#particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
}

/* 游標光暈 */
#cursor-glow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(600px circle at 0 0, rgba(100, 108, 255, 0.08), transparent 60%);
  transition: background 0.1s ease;
}

.VPContent {
  position: relative;
  z-index: 1;
}

/* 解決預設 hero 造成文字被裁切的問題 */
.VPHero {
  padding: 0 !important;
  min-height: unset !important;
  overflow: visible !important;
}
.VPHero .container {
  margin: 0 !important;
  padding: 0 !important;
  max-width: none !important;
  overflow: visible !important;
}
.VPHero .container .main {
  margin: 0 !important;
  padding: 0 !important;
  overflow: visible !important;
}

/* 自訂內容區塊：讓 Hello World 靠上 */
.custom-home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20vh;
  min-height: calc(100vh - 80px);
  gap: 2rem;
}

/* Hello World 標語 — 更大、更靠上 */
.hello-world {
  font-size: 6rem;
  font-weight: 800;
  letter-spacing: 4px;
  background: linear-gradient(135deg, #646cff, #a78bfa, #646cff);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 4s ease infinite;
  margin: 0;
  padding: 0.5em 0;
  opacity: 0.9;
  line-height: 1.3;
}

@keyframes shimmer {
  0%   { background-position: 0% center; }
  50%  { background-position: 100% center; }
  100% { background-position: 0% center; }
}

/* 點我提示 */
.hint {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  opacity: 0.4;
  margin-top: -1.5rem;
  letter-spacing: 6px;
  animation: pulseHint 2.5s ease-in-out infinite;
}

@keyframes pulseHint {
  0%, 100% { opacity: 0.3; }
  50%      { opacity: 0.7; }
}

/* 三張卡片 — 更寬、更美 */
.cards-row {
  display: flex;
  gap: 1.8rem;
  justify-content: center;
  flex-wrap: wrap;
}

.card {
  position: relative;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem 3.5rem;
  text-align: center;
  text-decoration: none;
  color: var(--vp-c-text-1);
  min-width: 220px;
  overflow: hidden;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 0.35s ease;
}

/* 各語言頂部色條 */
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  border-radius: 20px 20px 0 0;
  transition: height 0.3s ease;
}

.card[href*="python"]::before  { background: linear-gradient(90deg, #3776AB, #4B8BBE, #FFD43B); }
.card[href*="java"]::before    { background: linear-gradient(90deg, #ED8B00, #F80000, #5382A1); }
.card[href*="/c/"]::before     { background: linear-gradient(90deg, #283593, #5C6BC0, #A8B9CC); }

/* 內層光暈 */
.card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 20px;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.card[href*="python"]::after { background: radial-gradient(ellipse at 50% 0%, rgba(55,118,171,0.15), transparent 70%); }
.card[href*="java"]::after   { background: radial-gradient(ellipse at 50% 0%, rgba(237,139,0,0.12), transparent 70%); }
.card[href*="/c/"]::after    { background: radial-gradient(ellipse at 50% 0%, rgba(92,107,192,0.15), transparent 70%); }

.card .lang-icon {
  font-size: 1.8rem;
  display: block;
  margin-bottom: 0.4rem;
  opacity: 0.7;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.card .lang-name {
  font-size: 1.5rem;
  font-weight: 700;
  display: block;
  letter-spacing: 1px;
}

.card .lang-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
  display: block;
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.card .lang-click {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-top: 0.8rem;
  display: inline-block;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  border-bottom: 1px solid transparent;
}

/* Hover */
.card:hover {
  transform: translateY(-6px) scale(1.05);
}

.card[href*="python"]:hover { box-shadow: 0 0 40px rgba(55,118,171,0.2), 0 12px 40px rgba(0,0,0,0.15); }
.card[href*="java"]:hover   { box-shadow: 0 0 40px rgba(237,139,0,0.18), 0 12px 40px rgba(0,0,0,0.15); }
.card[href*="/c/"]:hover    { box-shadow: 0 0 40px rgba(92,107,192,0.2), 0 12px 40px rgba(0,0,0,0.15); }

.card:hover::before {
  height: 5px;
}

.card:hover::after {
  opacity: 1;
}

.card:hover .lang-icon {
  transform: scale(1.15);
  opacity: 1;
}

.card:hover .lang-desc {
  opacity: 0.8;
}

.card:hover .lang-click {
  opacity: 0.8;
  transform: translateY(0);
  border-bottom-color: var(--vp-c-text-2);
}

/* 底部資訊列 */
.footer-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  padding: 1rem 2rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  opacity: 0.5;
  z-index: 1;
  pointer-events: none;
}

/* 移除所有可能造成裁切的預設樣式 */
.VPHero .container {
  margin: 0 !important;
  padding: 0 !important;
}
.VPHero .main {
  margin: 0 !important;
  padding: 0 !important;
}
.VPHome {
  padding: 0 !important;
  margin: 0 !important;
  min-height: unset !important;
  overflow: visible !important;
}
/* VitePress 預設 hero 有 min-height 會卡住內容 */
.VPHomeHero {
  min-height: unset !important;
  overflow: visible !important;
}
</style>

<canvas id="particle-canvas"></canvas>
<div id="cursor-glow"></div>

<div class="custom-home">

  <p class="hello-world">Hello, World!</p>
  <p class="hint">− 選一個開始 −</p>

  <div class="cards-row">
    <a :href="withBase('/python/')" class="card">
      <span class="lang-icon">🐍</span>
      <span class="lang-name">Python</span>
      <span class="lang-desc">簡潔優雅・快速上手</span>
      <span class="lang-click">點我 →</span>
    </a>
    <a :href="withBase('/java/')" class="card">
      <span class="lang-icon">☕</span>
      <span class="lang-name">Java</span>
      <span class="lang-desc">嚴謹紮實・物件導向</span>
      <span class="lang-click">點我 →</span>
    </a>
    <a :href="withBase('/c/')" class="card">
      <span class="lang-icon">⚙️</span>
      <span class="lang-name">C 語言</span>
      <span class="lang-desc">貼近底層・掌握核心</span>
      <span class="lang-click">點我 →</span>
    </a>
  </div>

</div>

<div class="footer-bar">© 2026 D.S. Li</div>

<script setup>
import { onMounted } from 'vue'
import { withBase } from 'vitepress'

let cleanup = null;

onMounted(() => {
  const canvas = document.getElementById('particle-canvas');
  const glow = document.getElementById('cursor-glow');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  let particles = [];
  let animId;
  const mouse = { x: null, y: null, radius: 120 };
  const PARTICLE_COUNT = 80;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.speedY = (Math.random() - 0.5) * 0.8;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.hue = Math.random() * 60 + 200;
    }
    update() {
      if (mouse.x !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += dx / dist * force * 2;
          this.y += dy / dist * force * 2;
        }
      }
      this.x += this.speedX;
      this.y += this.speedY;
      this.opacity += (Math.random() - 0.5) * 0.01;
      this.opacity = Math.max(0.1, Math.min(0.8, this.opacity));
      if (this.x < 0) this.x = W;
      if (this.x > W) this.x = 0;
      if (this.y < 0) this.y = H;
      if (this.y > H) this.y = 0;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 60%, 60%, ${this.opacity})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `hsla(220, 50%, 60%, ${(1 - dist / 150) * 0.25})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) { p.update(); p.draw(); }
    drawLines();
    animId = requestAnimationFrame(animate);
  }

  const onMove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if (glow) {
      glow.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(100, 108, 255, 0.1), transparent 60%)`;
    }
  };
  const onLeave = () => {
    mouse.x = null;
    mouse.y = null;
    if (glow) {
      glow.style.background = `radial-gradient(600px circle at 0 0, rgba(100, 108, 255, 0.08), transparent 60%)`;
    }
  };

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseleave', onLeave);

  init();
  animate();

  cleanup = () => {
    cancelAnimationFrame(animId);
    window.removeEventListener('resize', resize);
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseleave', onLeave);
  };
});
</script>
