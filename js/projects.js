// ============================================================
//  PROJECTS.JS
// ============================================================

class ProjectsSection {
  constructor() {
    this.grid = document.getElementById("projects-grid");
    this.filterBtns = document.querySelectorAll(".proj-filter-btn");
    this.modal = document.getElementById("project-modal");
    this.activeFilter = "all";
    this._render();
    this._initFilters();
    this._initModal();
  }

  _render(filter = "all") {
    if (!this.grid) return;
    const filtered = filter === "all" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

    this.grid.innerHTML = filtered.map((p, i) => `
      <article class="project-card reveal" style="animation-delay:${i * 0.08}s" data-id="${p.id}">
        <div class="project-card-inner">
          <div class="project-thumb">
            ${p.image
              ? `<img src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.style.display='none'">`
              : ""}
            <div class="project-overlay">
              <div class="project-overlay-icons">
                ${p.demoUrl   ? `<a href="${p.demoUrl}"   target="_blank" class="proj-icon-link" title="Live Demo" onclick="event.stopPropagation()">🔗</a>` : ""}
                ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" class="proj-icon-link" title="GitHub"    onclick="event.stopPropagation()">⌥</a>` : ""}
              </div>
            </div>
            ${p.featured ? '<span class="featured-badge">Featured</span>' : ""}
            <div class="project-glow"></div>
          </div>
          <div class="project-info">
            <span class="project-year">${p.year}</span>
            <h3 class="project-title">${p.title}</h3>
            <p class="project-desc">${p.description}</p>
            <div class="project-tags">
              ${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}
            </div>
          </div>
        </div>
      </article>
    `).join("");

    // Re-attach reveal observer for newly added cards
    if (window._animations && window._animations._revealObserver) {
      this.grid.querySelectorAll(".reveal").forEach(el => window._animations._revealObserver.observe(el));
    }

    // Card click → modal
    this.grid.querySelectorAll(".project-card").forEach(card => {
      card.addEventListener("click", () => {
        const project = PROJECTS.find(p => p.id === +card.dataset.id);
        if (project) this._openModal(project);
      });
    });
  }

  _initFilters() {
    const filterBar = document.getElementById("project-filter-bar");
    if (!filterBar) return;

    // Use event delegation so dynamically injected buttons are caught
    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".proj-filter-btn");
      if (!btn) return;

      filterBar.querySelectorAll(".proj-filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      this.activeFilter = btn.dataset.filter;

      // Animate out then back in
      this.grid.style.opacity = "0";
      this.grid.style.transform = "translateY(10px)";
      setTimeout(() => {
        this._render(this.activeFilter);
        this.grid.style.transition = "opacity 0.3s, transform 0.3s";
        this.grid.style.opacity = "1";
        this.grid.style.transform = "translateY(0)";
      }, 250);
    });
  }

  _openModal(project) {
    if (!this.modal) return;
    this.modal.querySelector("#modal-title").textContent = project.title;
    this.modal.querySelector("#modal-year").textContent = project.year;
    this.modal.querySelector("#modal-desc").textContent = project.longDescription || project.description;
    this.modal.querySelector("#modal-tags").innerHTML = project.tags.map(t => `<span class="tag">${t}</span>`).join("");
    this.modal.querySelector("#modal-demo").href = project.demoUrl || "#";
    this.modal.querySelector("#modal-github").href = project.githubUrl || "#";

    // Image or video
    const mediaEl = this.modal.querySelector("#modal-media");
    if (project.video) {
      mediaEl.innerHTML = `<video src="${project.video}" autoplay muted loop playsinline class="modal-video"></video>`;
    } else if (project.image) {
      mediaEl.innerHTML = `<img src="${project.image}" alt="${project.title}" class="modal-img" onerror="this.style.display='none'">`;
    } else {
      mediaEl.innerHTML = `<div class="modal-no-media">No preview available</div>`;
    }

    this.modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  _initModal() {
    if (!this.modal) return;
    this.modal.querySelector(".modal-close")?.addEventListener("click", () => this._closeModal());
    this.modal.querySelector(".modal-backdrop")?.addEventListener("click", () => this._closeModal());
    document.addEventListener("keydown", e => { if (e.key === "Escape") this._closeModal(); });
  }

  _closeModal() {
    this.modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}