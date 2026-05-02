// bg-particles.js — floating bubbles, stars, moving dots on a canvas
(function () {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let W, H, particles = [], animId;

  const PARTICLE_COUNT = 120;
  const BUBBLE_COUNT   = 14;
  const STAR_COUNT     = 55;
  const DOT_COUNT      = 51;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function mkStar() {
    return {
      type: "star",
      x: rand(0, W), y: rand(0, H),
      r: rand(0.5, 2),
      opacity: rand(0.2, 0.9),
      twinkleSpeed: rand(0.005, 0.02),
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
      vx: rand(-0.04, 0.04), vy: rand(-0.04, 0.04),
    };
  }

  function mkBubble() {
    return {
      type: "bubble",
      x: rand(0, W), y: rand(H * 0.1, H),
      r: rand(14, 60),
      opacity: rand(0.04, 0.12),
      vx: rand(-0.12, 0.12),
      vy: rand(-0.25, -0.06),
      color: Math.random() > 0.5 ? "0,245,255" : "191,0,255",
    };
  }

  function mkDot() {
    return {
      type: "dot",
      x: rand(0, W), y: rand(0, H),
      r: rand(1.5, 3.5),
      opacity: rand(0.15, 0.55),
      vx: rand(-0.3, 0.3),
      vy: rand(-0.3, 0.3),
      color: ["0,245,255","191,0,255","0,255,156"][Math.floor(rand(0,3))],
      pulseSpeed: rand(0.01, 0.03),
      pulsePhase: rand(0, Math.PI * 2),
    };
  }

  function build() {
    particles = [];
    for (let i = 0; i < STAR_COUNT;   i++) particles.push(mkStar());
    for (let i = 0; i < BUBBLE_COUNT; i++) particles.push(mkBubble());
    for (let i = 0; i < DOT_COUNT;    i++) particles.push(mkDot());
  }

  function drawStar(p) {
    p.opacity += p.twinkleSpeed * p.twinkleDir;
    if (p.opacity >= 0.95 || p.opacity <= 0.1) p.twinkleDir *= -1;
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = "#fff";
    ctx.shadowColor = "rgba(0,245,255,0.8)";
    ctx.shadowBlur = 4;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawBubble(p) {
    p.x += p.vx; p.y += p.vy;
    if (p.y + p.r < 0) { Object.assign(p, mkBubble()); p.y = H + p.r; }
    if (p.x < -p.r) p.x = W + p.r;
    if (p.x > W + p.r) p.x = -p.r;

    ctx.save();
    ctx.globalAlpha = p.opacity;
    const g = ctx.createRadialGradient(p.x - p.r * 0.3, p.y - p.r * 0.3, p.r * 0.1, p.x, p.y, p.r);
    g.addColorStop(0, `rgba(${p.color},0.4)`);
    g.addColorStop(0.5, `rgba(${p.color},0.1)`);
    g.addColorStop(1, `rgba(${p.color},0)`);
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.strokeStyle = `rgba(${p.color},0.25)`;
    ctx.lineWidth = 0.8;
    ctx.stroke();
    ctx.restore();
  }

  function drawDot(p, t) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    const pulse = 0.5 + 0.5 * Math.sin(t * p.pulseSpeed + p.pulsePhase);

    ctx.save();
    ctx.globalAlpha = p.opacity * (0.5 + 0.5 * pulse);
    ctx.shadowColor = `rgba(${p.color},0.9)`;
    ctx.shadowBlur = 8 + pulse * 8;
    ctx.fillStyle = `rgba(${p.color},1)`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * (0.8 + 0.2 * pulse), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  let t = 0;
  function frame() {
    ctx.clearRect(0, 0, W, H);
    t++;
    for (const p of particles) {
      if (p.type === "star")   drawStar(p);
      if (p.type === "bubble") drawBubble(p);
      if (p.type === "dot")    drawDot(p, t);
    }
    animId = requestAnimationFrame(frame);
  }

  window.addEventListener("resize", () => { resize(); build(); });
  resize();
  build();
  frame();
})();