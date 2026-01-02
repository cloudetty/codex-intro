const root = document.documentElement;
const toggle = document.querySelector("[data-theme-toggle]");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

const applyTheme = (theme) => {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("brodex-theme", theme);
};

const initTheme = () => {
  const stored = localStorage.getItem("brodex-theme");
  if (stored) {
    root.setAttribute("data-theme", stored);
  } else {
    root.setAttribute("data-theme", prefersDark.matches ? "dark" : "light");
  }
};

initTheme();

prefersDark.addEventListener("change", (event) => {
  const stored = localStorage.getItem("brodex-theme");
  if (!stored) {
    root.setAttribute("data-theme", event.matches ? "dark" : "light");
  }
});

toggle?.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

const revealItems = document.querySelectorAll("[data-reveal]");
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

if (prefersReduced.matches) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else if ("IntersectionObserver" in window) {
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

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll("a[href^='#']").forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
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
