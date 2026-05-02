// ============================================================
//  NAVIGATION.JS
// ============================================================

class Navigation {
  constructor() {
    this.nav = document.getElementById("navbar");
    this.menuBtn = document.getElementById("menu-btn");
    this.mobileMenu = document.getElementById("mobile-menu");
    this.themeBtn = document.getElementById("theme-toggle");
    this.links = document.querySelectorAll(".nav-link");
    this.sections = document.querySelectorAll("section[id]");
    this.isOpen = false;
    this._init();
  }

  _init() {
    // Scroll behaviour
    window.addEventListener("scroll", () => this._onScroll(), { passive: true });

    // Mobile toggle
    this.menuBtn?.addEventListener("click", () => this._toggleMenu());

    // Close on link click
    document.querySelectorAll(".mobile-nav-link").forEach(l => {
      l.addEventListener("click", () => this._closeMenu());
    });

    // Theme toggle
    this.themeBtn?.addEventListener("click", () => this._toggleTheme());

    // Active link on scroll
    window.addEventListener("scroll", () => this._updateActiveLink(), { passive: true });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener("click", e => {
        const target = document.querySelector(a.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          this._closeMenu();
        }
      });
    });
  }

  _onScroll() {
    if (window.scrollY > 50) {
      this.nav.classList.add("scrolled");
    } else {
      this.nav.classList.remove("scrolled");
    }
  }

  _toggleMenu() {
    this.isOpen = !this.isOpen;
    this.mobileMenu.classList.toggle("open", this.isOpen);
    this.menuBtn.classList.toggle("active", this.isOpen);
    document.body.style.overflow = this.isOpen ? "hidden" : "";
  }

  _closeMenu() {
    this.isOpen = false;
    this.mobileMenu.classList.remove("open");
    this.menuBtn.classList.remove("active");
    document.body.style.overflow = "";
  }

  _toggleTheme() {
    const html = document.documentElement;
    const isLight = html.classList.toggle("light-theme");
    this.themeBtn.textContent = isLight ? "🌙" : "☀️";
    localStorage.setItem("theme", isLight ? "light" : "dark");
  }

  _updateActiveLink() {
    let current = "";
    this.sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.getAttribute("id");
      }
    });
    this.links.forEach(l => {
      l.classList.toggle("active", l.getAttribute("href") === `#${current}`);
    });
  }
}