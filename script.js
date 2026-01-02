const page = document.querySelector(".page");
const themeToggle = document.querySelector("[data-theme-toggle]");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

const setTheme = (mode) => {
  page.setAttribute("data-theme", mode);
  localStorage.setItem("brodex-theme", mode);
};

const initTheme = () => {
  const stored = localStorage.getItem("brodex-theme");
  if (stored) {
    page.setAttribute("data-theme", stored);
  } else {
    page.setAttribute("data-theme", prefersDark.matches ? "dark" : "light");
  }
};

initTheme();

prefersDark.addEventListener("change", (event) => {
  const stored = localStorage.getItem("brodex-theme");
  if (!stored) {
    page.setAttribute("data-theme", event.matches ? "dark" : "light");
  }
});

themeToggle?.addEventListener("click", () => {
  const current = page.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.scroll);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const id = button.dataset.copy;
    const target = document.getElementById(id);
    if (!target) return;

    try {
      await navigator.clipboard.writeText(target.value.trim());
      const original = button.textContent;
      button.textContent = "Copied!";
      setTimeout(() => {
        button.textContent = original;
      }, 1400);
    } catch (error) {
      button.textContent = "Copy failed";
    }
  });
});

const revealElements = document.querySelectorAll(".reveal");
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

if (prefersReduced.matches) {
  revealElements.forEach((el) => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealElements.forEach((el) => observer.observe(el));
}
