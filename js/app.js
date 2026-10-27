/**
 * ============================================================
 *  SIPANDU Publik — app.js
 *  Navigation, FAQ, scroll reveal, accessibility
 *  Version 1.0 — Public-facing landing page
 * ============================================================
 */

// ─── Helpers ─────────────────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ─── DOM References ──────────────────────────────────────────
const mainNav = $("#main-nav");
const navToggle = $("#nav-toggle");
const navLinks = $("#nav-links");
const backToTopBtn = $("#back-to-top");
const faqSearchInput = $("#faq-search-input");
const faqFiltersEl = $("#faq-filters");
const faqListEl = $("#faq-list");
const faqCountEl = $("#faq-count");

// ─── State ───────────────────────────────────────────────────
let faqData = [];
let faqCategories = [];
let activeFaqCategory = "Semua";
let faqSearchQuery = "";

// ═══════════════════════════════════════════════════════════
//  NAVIGATION
// ═══════════════════════════════════════════════════════════

// Sticky nav scroll effect
window.addEventListener("scroll", () => {
  if (mainNav) {
    mainNav.classList.toggle("scrolled", window.scrollY > 20);
  }
  if (backToTopBtn) {
    backToTopBtn.classList.toggle("visible", window.scrollY > 400);
  }
});

// Mobile menu toggle
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("active");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  // Close menu on link click
  $$("a", navLinks).forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}


// Active nav link on scroll
function updateActiveNavLink() {
  const sections = $$("section[id]");
  const scrollY = window.scrollY + 120;

  let currentSection = "";
  sections.forEach((section) => {
    if (section.offsetTop <= scrollY) {
      currentSection = section.id;
    }
  });

  $$(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle("active", href === "#" + currentSection);
  });
}

window.addEventListener("scroll", updateActiveNavLink);

// Back to top
if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ═══════════════════════════════════════════════════════════
//  SCROLL REVEAL (IntersectionObserver)
// ═══════════════════════════════════════════════════════════
function observeRevealElements() {
  const elements = $$(".reveal:not(.revealed)");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

// ═══════════════════════════════════════════════════════════
//  FAQ SYSTEM
// ═══════════════════════════════════════════════════════════

async function loadFAQData() {
  try {
    const response = await fetch("data/faq.public.json");
    if (!response.ok) throw new Error("Failed to load FAQ data");
    faqData = await response.json();

    // Extract unique categories
    const cats = new Set();
    faqData.forEach((item) => cats.add(item.kategori));
    faqCategories = ["Semua", ...Array.from(cats).sort()];

    renderFAQFilters();
    renderFAQList();
  } catch (err) {
    console.error("Gagal memuat data FAQ:", err);
    if (faqListEl) {
      faqListEl.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">⚠️</div>
          <p>Maaf, data FAQ gagal dimuat. Silakan coba muat ulang halaman.</p>
        </div>`;
    }
  }
}

function renderFAQFilters() {
  if (!faqFiltersEl) return;

  faqFiltersEl.innerHTML = faqCategories
    .map(
      (cat) => `
    <button class="faq-filter-btn${cat === activeFaqCategory ? " active" : ""}"
            data-category="${cat}"
            role="tab"
            aria-selected="${cat === activeFaqCategory}"
            aria-label="Filter: ${cat}">${cat}</button>`
    )
    .join("");

  // Event delegation
  faqFiltersEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".faq-filter-btn");
    if (!btn) return;
    activeFaqCategory = btn.dataset.category;

    $$(".faq-filter-btn", faqFiltersEl).forEach((b) => {
      const isActive = b.dataset.category === activeFaqCategory;
      b.classList.toggle("active", isActive);
      b.setAttribute("aria-selected", isActive);
    });

    renderFAQList();
  });
}

function renderFAQList() {
  if (!faqListEl || !faqCountEl) return;

  const q = faqSearchQuery.toLowerCase().trim();
  const filtered = faqData.filter((item) => {
    const catMatch =
      activeFaqCategory === "Semua" || item.kategori === activeFaqCategory;
    const searchMatch =
      !q ||
      item.pertanyaan.toLowerCase().includes(q) ||
      item.jawaban.toLowerCase().includes(q) ||
      item.kategori.toLowerCase().includes(q);
    return catMatch && searchMatch;
  });

  faqCountEl.textContent = `Menampilkan ${filtered.length} dari ${faqData.length} pertanyaan`;

  if (filtered.length === 0) {
    faqListEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <p>Tidak ada pertanyaan yang cocok. Coba ubah kata kunci atau filter kategori.</p>
      </div>`;
    return;
  }

  faqListEl.innerHTML = filtered
    .map(
      (item) => `
    <div class="accordion-item reveal" role="listitem" data-faq-id="${item.id}">
      <button class="accordion-header" aria-expanded="false" aria-controls="faq-body-${item.id}">
        <span class="case-tag-icon">${item.id}</span>
        <div style="flex:1">
          <div class="case-question">${highlightText(item.pertanyaan, q)}</div>
          <div class="case-tags">
            <span class="case-tag">${item.kategori}</span>
          </div>
        </div>
        <svg class="chevron" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"/></svg>
      </button>
      <div class="accordion-body" id="faq-body-${item.id}" role="region">
        <div class="accordion-body-inner">
          <div class="answer-label">Jawaban</div>
          <p>${highlightText(item.jawaban, q)}</p>
        </div>
      </div>
    </div>`
    )
    .join("");

  // Re-observe for scroll reveal
  setTimeout(observeRevealElements, 50);
}

function highlightText(text, query) {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

// ═══════════════════════════════════════════════════════════
//  ACCORDION
// ═══════════════════════════════════════════════════════════
document.addEventListener("click", (e) => {
  const header = e.target.closest(".accordion-header");
  if (!header) return;

  const item = header.closest(".accordion-item");
  const body = item.querySelector(".accordion-body");
  const isOpen = item.classList.contains("open");

  if (isOpen) {
    body.style.maxHeight = null;
    item.classList.remove("open");
    header.setAttribute("aria-expanded", "false");
  } else {
    body.style.maxHeight = body.scrollHeight + "px";
    item.classList.add("open");
    header.setAttribute("aria-expanded", "true");
  }
});

// ═══════════════════════════════════════════════════════════
//  FAQ SEARCH
// ═══════════════════════════════════════════════════════════
if (faqSearchInput) {
  faqSearchInput.addEventListener("input", (e) => {
    faqSearchQuery = e.target.value;
    renderFAQList();
  });
}

// ═══════════════════════════════════════════════════════════
//  KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════════════════
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close mobile menu
    if (navLinks && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    }
  }
});

// ═══════════════════════════════════════════════════════════
//  INITIALIZATION
// ═══════════════════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  loadFAQData();
  observeRevealElements();
  updateActiveNavLink();
});
