// ============================================================
//  ANIMATIONS.JS
// ============================================================

class Animations {
  constructor() {
    this._initScrollReveal();
    this._initTypewriter();
    this._initCounters();
    this._initSkillBars();
    this._initMagneticButtons();
    this._initCursor();
  }

  // ── Scroll reveal ─────────────────────────────────────────
  _initScrollReveal() {
    this._revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            this._revealObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".reveal").forEach(el => this._revealObserver.observe(el));

    // Re-observe after dynamic content renders (skills, certs, experience)
    setTimeout(() => {
      document.querySelectorAll(".reveal:not(.revealed)").forEach(el => this._revealObserver.observe(el));
    }, 300);
  }

  // ── Typewriter ────────────────────────────────────────────
  _initTypewriter() {
    const el = document.getElementById("typewriter");
    if (!el) return;
    const words = el.dataset.words ? JSON.parse(el.dataset.words) : ["Developer", "Designer", "Creator"];
    let wIdx = 0, cIdx = 0, deleting = false;

    const tick = () => {
      const word = words[wIdx];
      el.textContent = deleting ? word.slice(0, cIdx--) : word.slice(0, cIdx++);

      let delay = deleting ? 60 : 110;
      if (!deleting && cIdx > word.length)  { deleting = true; delay = 1800; }
      if (deleting  && cIdx < 0)            { deleting = false; wIdx = (wIdx + 1) % words.length; cIdx = 0; delay = 400; }

      setTimeout(tick, delay);
    };
    tick();
  }

  // ── Number counters ───────────────────────────────────────
  _initCounters() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = +el.dataset.target;
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.round(current) + (el.dataset.suffix || "");
          if (current >= target) clearInterval(timer);
        }, 16);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll(".counter").forEach(el => observer.observe(el));
  }

  // ── Skill progress bars ───────────────────────────────────
  _initSkillBars() {
    const observeSkillCategories = () => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          e.target.querySelectorAll(".skill-bar-fill").forEach(bar => {
            const pct = bar.dataset.level || "0";
            setTimeout(() => { bar.style.width = pct + "%"; }, 200);
          });
          observer.unobserve(e.target);
        });
      }, { threshold: 0.2 });
      document.querySelectorAll(".skills-category").forEach(el => observer.observe(el));
    };

    // Observe immediately (in case elements already exist)
    observeSkillCategories();

    // Also re-observe after a short delay to catch dynamically rendered elements
    setTimeout(observeSkillCategories, 300);
  }

  // ── Magnetic buttons ──────────────────────────────────────
  _initMagneticButtons() {
    document.querySelectorAll(".btn-magnetic").forEach(btn => {
      btn.addEventListener("mousemove", e => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - r.left - r.width / 2;
        const dy = e.clientY - r.top  - r.height / 2;
        btn.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  // ── Custom cursor ─────────────────────────────────────────
  _initCursor() {
    if (window.innerWidth < 768) return; // skip on touch
    const dot  = document.createElement("div");
    const ring = document.createElement("div");
    dot.className  = "cursor-dot";
    ring.className = "cursor-ring";
    document.body.append(dot, ring);

    let rx = 0, ry = 0;
    window.addEventListener("mousemove", e => {
      dot.style.cssText  = `left:${e.clientX}px;top:${e.clientY}px`;
      rx += (e.clientX - rx) * 0.12;
      ry += (e.clientY - ry) * 0.12;
      ring.style.cssText = `left:${rx}px;top:${ry}px`;
    });

    const interactables = "a, button, .project-card, .cert-card, [data-cursor]";
    document.addEventListener("mouseover", e => {
      if (e.target.closest(interactables)) {
        dot.classList.add("hover");
        ring.classList.add("hover");
      }
    });
    document.addEventListener("mouseout", e => {
      if (e.target.closest(interactables)) {
        dot.classList.remove("hover");
        ring.classList.remove("hover");
      }
    });

    // requestAnimationFrame smoothing for ring
    const smooth = () => {
      ring.style.left = rx + "px";
      ring.style.top  = ry + "px";
      requestAnimationFrame(smooth);
    };
    smooth();
  }
}