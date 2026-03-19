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

function updateHomeProfileLink(theme) {
  const profileLink = document.querySelector(".profile-link");

  if (!profileLink) {
    return;
  }

  const isLight = theme === "light";
  const lightThemeHref = "https://youtu.be/WVg10miZiBQ";
  const darkThemeHref = "https://fr.wikipedia.org/wiki/Luigi";

  profileLink.href = isLight ? lightThemeHref : darkThemeHref;
  profileLink.setAttribute(
    "aria-label",
    isLight
      ? "Lien video YouTube"
      : "Page Wikipedia de Luigi parceque pourquoi pas"
  );
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  updateButtons(theme);
  updateHomeProfileLink(theme);
}

function toggleTheme() {
  const nextTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";

  window.localStorage.setItem(STORAGE_KEY, nextTheme);
  applyTheme(nextTheme);
}

function createConfettiBurst() {
  const colors = ["#f4c542", "#3bd1ff", "#7df59f", "#ff6b6b", "#ffffff"];
  const confettiCount = 120;

  for (let index = 0; index < confettiCount; index += 1) {
    const particle = document.createElement("span");
    const isLeftSide = index < confettiCount / 2;
    const size = 6 + Math.random() * 8;
    const left = isLeftSide ? 2 + Math.random() * 8 : 90 + Math.random() * 8;
    const duration = 2200 + Math.random() * 1600;
    const delay = Math.random() * 320;
    const rotation = Math.random() * 360;
    const riseX = isLeftSide ? 18 + Math.random() * 28 : -(18 + Math.random() * 28);
    const riseY = -(35 + Math.random() * 35);

    particle.className = "confetti";
    particle.style.left = `${left}vw`;
    particle.style.bottom = "-1.5rem";
    particle.style.width = `${size}px`;
    particle.style.height = `${size * 0.6}px`;
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.animationDuration = `${duration}ms`;
    particle.style.animationDelay = `${delay}ms`;
    particle.style.setProperty("--confetti-rotation", `${rotation}deg`);
    particle.style.setProperty("--confetti-x", `${riseX}vw`);
    particle.style.setProperty("--confetti-y", `${riseY}vh`);

    document.body.appendChild(particle);
    window.setTimeout(() => particle.remove(), duration + delay + 120);
  }
}

function initContactFormSuccessAnimation() {
  const contactForm = document.querySelector(".contact-form");

  if (!contactForm) {
    return;
  }

  const submitButton = contactForm.querySelector("button[type='submit']");
  const feedback = document.createElement("p");
  feedback.className = "form-feedback";
  feedback.setAttribute("role", "status");
  feedback.setAttribute("aria-live", "polite");
  contactForm.appendChild(feedback);

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    createConfettiBurst();
    contactForm.classList.add("is-success");
    feedback.textContent = "Message envoye avec succes. Merci pour votre contact.";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Envoye";
    }

    window.setTimeout(() => {
      contactForm.reset();
      contactForm.classList.remove("is-success");
      feedback.textContent = "";

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Envoyer";
      }
    }, 1800);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyTheme(getSavedTheme());

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", toggleTheme);
  });

  initContactFormSuccessAnimation();
});