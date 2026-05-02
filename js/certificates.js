// ============================================================
//  CERTIFICATES.JS
// ============================================================

class CertificatesSection {
  constructor() {
    this.grid = document.getElementById("certs-grid");
    this.filterBtns = document.querySelectorAll(".cert-filter-btn");
    this._render();
    this._initFilters();
  }

  _render(filter = "all") {
    if (!this.grid) return;
    const filtered = filter === "all" ? CERTIFICATES : CERTIFICATES.filter(c => c.category === filter);

    this.grid.innerHTML = filtered.map((c, i) => `
      <article class="cert-card reveal" style="animation-delay:${i * 0.08}s; --cert-color: ${c.color}">
        <div class="cert-glow-border"></div>
        <div class="cert-inner">
          <div class="cert-logo-wrap">
            <div class="cert-logo" style="color:${c.color}">${c.issuerLogo}</div>
          </div>
          <div class="cert-body">
            <span class="cert-date">${c.date}</span>
            <h3 class="cert-title">${c.title}</h3>
            <p class="cert-issuer">${c.issuer}</p>
            <p class="cert-desc">${c.description}</p>
           
          </div>
        </div>
      </article>
    `).join("");
  }

  _initFilters() {
    const filterBar = document.getElementById("cert-filter-bar");
    if (!filterBar) return;

    // Use event delegation so dynamically injected buttons are caught
    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".cert-filter-btn");
      if (!btn) return;

      filterBar.querySelectorAll(".cert-filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      this.grid.style.opacity = "0";
      setTimeout(() => {
        this._render(filter);
        this.grid.style.transition = "opacity 0.3s";
        this.grid.style.opacity = "1";
        // Re-observe newly added .reveal elements
        if (window._animations && window._animations._revealObserver) {
          this.grid.querySelectorAll(".reveal").forEach(el => {
            el.classList.remove("revealed");
            window._animations._revealObserver.observe(el);
          });
        }
      }, 200);
    });
  }
}