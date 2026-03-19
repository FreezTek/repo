const STORAGE_KEY = "portfolio-theme";
const root = document.documentElement;

function getSavedTheme() {
  const savedTheme = window.localStorage.getItem(STORAGE_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function updateButtons(theme) {
  const isLight = theme === "light";

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.textContent = isLight ? "Mode sombre" : "Mode clair";
    button.setAttribute("aria-pressed", String(isLight));
    button.setAttribute(
      "aria-label",
      isLight ? "Activer le mode sombre" : "Activer le mode clair"
    );
  });
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  updateButtons(theme);
}

function toggleTheme() {
  const nextTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";

  window.localStorage.setItem(STORAGE_KEY, nextTheme);
  applyTheme(nextTheme);
}

document.addEventListener("DOMContentLoaded", () => {
  applyTheme(getSavedTheme());

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", toggleTheme);
  });
});