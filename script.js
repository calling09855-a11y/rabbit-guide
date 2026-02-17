const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function setupMultiExtImages() {
  const exts = ["jpg", "jpeg", "png", "webp", "gif"];

  $$("img[data-src-base]").forEach((img) => {
    const base = img.dataset.srcBase;
    if (!base) return;

    let idx = 0;
    const tryNext = () => {
      if (idx >= exts.length) return;
      const ext = exts[idx++];
      img.src = `${base}.${ext}`;
    };

    img.addEventListener("error", () => {
      tryNext();
    });

    const hasExt = /\.[a-z0-9]+$/i.test(img.getAttribute("src") || "");
    if (!hasExt) {
      tryNext();
    }
  });
}

const navToggle = $("#navToggle");
const siteNav = $("#siteNav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  $$("a", siteNav).forEach((a) => {
    a.addEventListener("click", () => {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const pills = $$(".pill");
const rows = $$(".food-row");

function setActivePill(btn) {
  pills.forEach((b) => {
    const active = b === btn;
    b.classList.toggle("active", active);
    b.setAttribute("aria-selected", active ? "true" : "false");
  });
}

function applyFoodFilter(filter) {
  rows.forEach((row) => {
    const kind = row.dataset.kind;
    const show = filter === "all" || kind === filter;
    row.style.display = show ? "grid" : "none";
  });
}

pills.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    setActivePill(btn);
    applyFoodFilter(filter);
  });
});

setupMultiExtImages();
