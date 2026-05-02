// ============================================================
//  MAIN.JS  — Bootstrap all modules
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // ── Theme preference ─────────────────────────────────────
  const saved = localStorage.getItem("theme");
  if (saved === "light") {
    document.documentElement.classList.add("light-theme");
    const btn = document.getElementById("theme-toggle");
    if (btn) btn.textContent = "🌙";
  }

  // ── Navigation ───────────────────────────────────────────
  new Navigation();

  // ── Animations ───────────────────────────────────────────
  window._animations = new Animations();

  // ── Projects ─────────────────────────────────────────────
  // Render project filter buttons from data
  const filterBar = document.getElementById("project-filter-bar");
  if (filterBar) {
    filterBar.innerHTML = PROJECT_CATEGORIES.map((c, i) =>
      `<button class="proj-filter-btn ${i === 0 ? "active" : ""}" data-filter="${c.id}">${c.label}</button>`
    ).join("");
  }
  new ProjectsSection();

  // ── Certificates ─────────────────────────────────────────
  const certFilterBar = document.getElementById("cert-filter-bar");
  if (certFilterBar) {
    certFilterBar.innerHTML = CERTIFICATE_CATEGORIES.map((c, i) =>
      `<button class="cert-filter-btn ${i === 0 ? "active" : ""}" data-filter="${c.id}">${c.label}</button>`
    ).join("");
  }
  new CertificatesSection();

  // ── Skills ───────────────────────────────────────────────
  _renderSkills();

  // ── Experience ───────────────────────────────────────────
  _renderExperience();

  // Re-observe .reveal elements added by dynamic renders
  requestAnimationFrame(() => {
    if (window._animations && window._animations._revealObserver) {
      document.querySelectorAll(".reveal:not(.revealed)").forEach(el => {
        window._animations._revealObserver.observe(el);
      });
    }
  });

  // ── 3D Scenes (lazy init with IntersectionObserver) ──────
  if (typeof THREE !== "undefined") {
    const threeScene = new ThreeScene();
    window._threeScene = threeScene;

    // Hero — init immediately (above fold)
    threeScene.initHero("hero-canvas");

    // Laptop — init when hero is visible
    const laptopObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        threeScene.initLaptop("laptop-canvas");
        laptopObserver.disconnect();
      }
    }, { threshold: 0.1 });
    const laptopEl = document.getElementById("laptop-canvas");
    if (laptopEl) laptopObserver.observe(laptopEl);

    // Globe — init when skills section visible
    const globeObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        threeScene.initGlobe("globe-canvas", SKILLS.globe);
        globeObserver.disconnect();
      }
    }, { threshold: 0.1 });
    const globeEl = document.getElementById("globe-canvas");
    if (globeEl) globeObserver.observe(globeEl);

    window.addEventListener("resize", () => threeScene.handleResize());
  }

  // ── Contact form ─────────────────────────────────────────
  const form = document.getElementById("contact-form");
  form?.addEventListener("submit", e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = "Sending…";
    btn.disabled = true;
    // Replace with your actual form submission logic (e.g. EmailJS / Formspree)
    setTimeout(() => {
      btn.textContent = "Message Sent ✓";
      btn.style.background = "linear-gradient(135deg, #00FF9C, #00cc7a)";
      form.reset();
      setTimeout(() => {
        btn.textContent = "Send Message";
        btn.style.background = "";
        btn.disabled = false;
      }, 3000);
    }, 1200);
  });

  // ── Parallax on hero ─────────────────────────────────────
  window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero-content");
    if (hero) hero.style.transform = `translateY(${window.scrollY * 0.2}px)`;
  }, { passive: true });
});

// ── Render skill bars ──────────────────────────────────────
function _renderSkills() {
  const container = document.getElementById("skills-container");
  if (!container || typeof SKILLS === "undefined") return;

  container.innerHTML = SKILLS.categories.map(cat => `
    <div class="skills-category reveal">
      <h3 class="skills-cat-title">${cat.icon} ${cat.label}</h3>
      <div class="skills-list">
        ${cat.skills.map(s => `
          <div class="skill-item">
            <div class="skill-header">
              <span class="skill-name">${s.name}</span>
              <span class="skill-pct">${s.level}%</span>
            </div>
            <div class="skill-bar-bg">
              <div class="skill-bar-fill" data-level="${s.level}" style="--skill-color:${s.color}"></div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");
}

// ── Render experience timeline ──────────────────────────────
function _renderExperience() {
  const container = document.getElementById("experience-timeline");
  if (!container || typeof EXPERIENCE === "undefined") return;

  container.innerHTML = EXPERIENCE.map((exp, i) => `
    <div class="exp-item reveal ${i % 2 === 0 ? "left" : "right"}">
      <div class="exp-dot" style="background:${exp.color}; box-shadow: 0 0 12px ${exp.color}"></div>
      <div class="exp-card" style="--exp-color:${exp.color}">
        <div class="exp-header">
          <div>
            <h3 class="exp-role">${exp.role}</h3>
            <p class="exp-company">${exp.company} · ${exp.location}</p>
          </div>
          <span class="exp-period ${exp.current ? "current" : ""}">${exp.period}</span>
        </div>
        <p class="exp-desc">${exp.description}</p>
        <ul class="exp-achievements">
          ${exp.achievements.map(a => `<li>${a}</li>`).join("")}
        </ul>
        <div class="exp-tech">
          ${exp.tech.map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
      </div>
    </div>
  `).join("");
}