// ============================================================
//  THREE-SCENE.JS  — All 3D rendering logic
// ============================================================

class ThreeScene {
  constructor() {
    this.scenes = {};
    this.renderers = {};
    this.cameras = {};
    this.animFrames = {};
    this.clock = new THREE.Clock();
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
  }

  // ── 1. HERO PARTICLE FIELD ──────────────────────────────────
  initHero(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 50;

    // Particle system
    const count = window.innerWidth < 768 ? 1500 : 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const colorPalette = [
      new THREE.Color("#00F5FF"),
      new THREE.Color("#BF00FF"),
      new THREE.Color("#00FF9C"),
      new THREE.Color("#FFFFFF"),
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      sizes[i] = Math.random() * 2 + 0.5;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float uTime;
        uniform vec2 uMouse;
        void main() {
          vColor = color;
          vec3 pos = position;
          float d = length(pos.xy - uMouse * 100.0);
          float wave = sin(uTime * 0.5 + pos.x * 0.05 + pos.y * 0.05) * 2.0;
          pos.z += wave;
          if (d < 30.0) {
            pos.z += (30.0 - d) * 0.3;
          }
          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPos.z);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float alpha = 1.0 - d * 2.0;
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      depthWrite: false,
      vertexColors: true,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // Floating 3D text rings
    this._addRings(scene);

    this.scenes.hero = scene;
    this.renderers.hero = renderer;
    this.cameras.hero = camera;
    this._heroMat = mat;
    this._heroParticles = particles;

    window.addEventListener("mousemove", (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    this._animateHero();
  }

  _addRings(scene) {
    const ringData = [
      { r: 15, tube: 0.06, color: "#00F5FF", tilt: 0.5 },
      { r: 22, tube: 0.04, color: "#BF00FF", tilt: -0.3 },
      { r: 30, tube: 0.03, color: "#00FF9C", tilt: 0.8 },
    ];
    this._rings = [];
    ringData.forEach(({ r, tube, color, tilt }) => {
      const geo = new THREE.TorusGeometry(r, tube, 8, 120);
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.6 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = tilt;
      scene.add(mesh);
      this._rings.push(mesh);
    });
  }

  _animateHero() {
    const tick = () => {
      this.animFrames.hero = requestAnimationFrame(tick);
      const t = this.clock.getElapsedTime();
      if (this._heroMat) {
        this._heroMat.uniforms.uTime.value = t;
        this._heroMat.uniforms.uMouse.value.set(this.mouse.x, this.mouse.y);
      }
      if (this._heroParticles) {
        this._heroParticles.rotation.y = t * 0.02;
        this._heroParticles.rotation.x = t * 0.01;
      }
      if (this._rings) {
        this._rings.forEach((r, i) => {
          r.rotation.z = t * (0.1 + i * 0.05);
          r.rotation.y = t * (0.08 - i * 0.02);
        });
      }
      this.renderers.hero.render(this.scenes.hero, this.cameras.hero);
    };
    tick();
  }

  // ── 2. FLOATING LAPTOP ─────────────────────────────────────
  initLaptop(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 1, 6);

    // Lighting
    const ambient = new THREE.AmbientLight(0x111122, 2);
    scene.add(ambient);
    const cyan = new THREE.PointLight(0x00F5FF, 4, 20);
    cyan.position.set(-4, 3, 4);
    scene.add(cyan);
    const purple = new THREE.PointLight(0xBF00FF, 3, 20);
    purple.position.set(4, -2, 4);
    scene.add(purple);

    // Build laptop from boxes
    const laptop = this._buildLaptop(scene);
    scene.add(laptop);

    // Floating code particles around laptop
    this._addCodeParticles(scene);

    this.scenes.laptop = scene;
    this.renderers.laptop = renderer;
    this.cameras.laptop = camera;
    this._laptop = laptop;
    this._laptopLight1 = cyan;
    this._laptopLight2 = purple;

    this._animateLaptop();
  }

  _buildLaptop(scene) {
    const group = new THREE.Group();

    const baseMat = new THREE.MeshPhongMaterial({ color: 0x1a1a2e, shininess: 100, specular: 0x00F5FF });
    const screenMat = new THREE.MeshPhongMaterial({ color: 0x000510, emissive: 0x001133, emissiveIntensity: 1 });
    const glowMat = new THREE.MeshBasicMaterial({ color: 0x00F5FF, transparent: true, opacity: 0.15 });

    // Base
    const base = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.18, 2.2), baseMat);
    base.position.y = 0;
    group.add(base);

    // Screen base (hinge area)
    const screenBase = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.08, 1.9), new THREE.MeshPhongMaterial({ color: 0x111128 }));
    screenBase.position.set(0, 0.13, -0.05);
    screenBase.rotation.x = -0.35;
    group.add(screenBase);

    // Screen panel
    const screen = new THREE.Mesh(new THREE.BoxGeometry(3.0, 1.9, 0.08), screenMat);
    screen.position.set(0, 1.15, -1.05);
    screen.rotation.x = -0.35;
    group.add(screen);

    // Screen glow plane
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 1.75), glowMat);
    glow.position.set(0, 1.15, -1.0);
    glow.rotation.x = -0.35;
    group.add(glow);

    // Screen content lines (simulated code)
    for (let i = 0; i < 8; i++) {
      const w = 1.2 + Math.random() * 1.2;
      const lineMat = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0x00F5FF : i % 3 === 1 ? 0xBF00FF : 0x00FF9C,
        transparent: true,
        opacity: 0.7,
      });
      const line = new THREE.Mesh(new THREE.BoxGeometry(w, 0.04, 0.01), lineMat);
      line.position.set(-0.8 + Math.random() * 0.3, 0.68 + i * -0.18, -1.0);
      line.rotation.x = -0.35;
      group.add(line);
    }

    // Trackpad
    const pad = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.04, 0.65), new THREE.MeshPhongMaterial({ color: 0x22223a }));
    pad.position.set(0, 0.1, 0.4);
    group.add(pad);

    group.position.y = -0.3;
    return group;
  }

  _addCodeParticles(scene) {
    const count = 60;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ color: 0x00F5FF, size: 0.06, transparent: true, opacity: 0.6 });
    const pts = new THREE.Points(geo, mat);
    scene.add(pts);
    this._codeParticles = pts;
  }

  _animateLaptop() {
    const tick = () => {
      this.animFrames.laptop = requestAnimationFrame(tick);
      const t = this.clock.getElapsedTime();
      if (this._laptop) {
        this._laptop.rotation.y = Math.sin(t * 0.4) * 0.25;
        this._laptop.position.y = Math.sin(t * 0.6) * 0.15 - 0.3;
      }
      if (this._codeParticles) {
        this._codeParticles.rotation.y = t * 0.05;
      }
      if (this._laptopLight1) {
        this._laptopLight1.intensity = 3 + Math.sin(t * 2) * 1;
        this._laptopLight2.intensity = 2 + Math.cos(t * 1.5) * 1;
      }
      this.renderers.laptop.render(this.scenes.laptop, this.cameras.laptop);
    };
    tick();
  }

  // ── 3. SKILLS GLOBE ────────────────────────────────────────
  initGlobe(canvasId, skillNames) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 5;

    // Globe wireframe
    const globeGeo = new THREE.SphereGeometry(2, 32, 32);
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0x00F5FF, wireframe: true, transparent: true, opacity: 0.08,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globe);

    // Glowing core
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x0a0a1a });
    const core = new THREE.Mesh(new THREE.SphereGeometry(1.95, 32, 32), coreMat);
    scene.add(core);

    // Skill nodes on sphere surface
    this._globeNodes = [];
    const n = skillNames.length;
    skillNames.forEach((name, i) => {
      const phi   = Math.acos(-1 + (2 * i) / n);
      const theta = Math.sqrt(n * Math.PI) * phi;
      const x = 2 * Math.sin(phi) * Math.cos(theta);
      const y = 2 * Math.sin(phi) * Math.sin(theta);
      const z = 2 * Math.cos(phi);

      const nodeMat = new THREE.MeshBasicMaterial({
        color: [0x00F5FF, 0xBF00FF, 0x00FF9C][i % 3],
      });
      const node = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), nodeMat);
      node.position.set(x, y, z);
      node.userData = { name, originalPos: new THREE.Vector3(x, y, z), phase: Math.random() * Math.PI * 2 };
      globe.add(node);
      this._globeNodes.push(node);
    });

    // Connection lines
    const lineGroup = new THREE.Group();
    for (let i = 0; i < Math.min(n, 12); i++) {
      const a = this._globeNodes[i];
      const b = this._globeNodes[(i + 5) % n];
      const points = [a.position.clone(), b.position.clone()];
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({ color: 0x00F5FF, transparent: true, opacity: 0.15 });
      lineGroup.add(new THREE.Line(geo, mat));
    }
    globe.add(lineGroup);

    // Orbit rings
    [1.8, 2.2, 2.6].forEach((r, i) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.008, 8, 80),
        new THREE.MeshBasicMaterial({ color: [0x00F5FF, 0xBF00FF, 0x00FF9C][i], transparent: true, opacity: 0.3 })
      );
      ring.rotation.x = i * 0.5;
      ring.rotation.y = i * 0.3;
      scene.add(ring);
      if (!this._orbitRings) this._orbitRings = [];
      this._orbitRings.push(ring);
    });

    this.scenes.globe = scene;
    this.renderers.globe = renderer;
    this.cameras.globe = camera;
    this._globe = globe;

    // Drag to rotate
    let isDragging = false, prevX = 0, prevY = 0;
    canvas.addEventListener("mousedown", e => { isDragging = true; prevX = e.clientX; prevY = e.clientY; });
    window.addEventListener("mouseup", () => { isDragging = false; });
    window.addEventListener("mousemove", e => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      globe.rotation.y += dx * 0.005;
      globe.rotation.x += dy * 0.005;
      prevX = e.clientX; prevY = e.clientY;
    });
    canvas.addEventListener("touchstart", e => { isDragging = true; prevX = e.touches[0].clientX; prevY = e.touches[0].clientY; });
    canvas.addEventListener("touchend", () => { isDragging = false; });
    canvas.addEventListener("touchmove", e => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - prevX;
      const dy = e.touches[0].clientY - prevY;
      globe.rotation.y += dx * 0.005;
      globe.rotation.x += dy * 0.005;
      prevX = e.touches[0].clientX; prevY = e.touches[0].clientY;
    });

    this._animateGlobe();
  }

  _animateGlobe() {
    const tick = () => {
      this.animFrames.globe = requestAnimationFrame(tick);
      const t = this.clock.getElapsedTime();
      if (this._globe) this._globe.rotation.y += 0.002;
      if (this._orbitRings) {
        this._orbitRings.forEach((r, i) => {
          r.rotation.z = t * (0.2 + i * 0.1);
        });
      }
      if (this._globeNodes) {
        this._globeNodes.forEach((n) => {
          const s = 1 + Math.sin(t * 1.5 + n.userData.phase) * 0.15;
          n.scale.setScalar(s);
        });
      }
      this.renderers.globe.render(this.scenes.globe, this.cameras.globe);
    };
    tick();
  }

  // ── RESIZE HANDLER ─────────────────────────────────────────
  handleResize() {
    const resize = (key, canvasId) => {
      const canvas = document.getElementById(canvasId);
      if (!canvas || !this.renderers[key]) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      this.renderers[key].setSize(w, h);
      if (this.cameras[key]) {
        this.cameras[key].aspect = w / h;
        this.cameras[key].updateProjectionMatrix();
      }
    };
    resize("hero", "hero-canvas");
    resize("laptop", "laptop-canvas");
    resize("globe", "globe-canvas");
  }

  destroy() {
    Object.values(this.animFrames).forEach(cancelAnimationFrame);
  }
}