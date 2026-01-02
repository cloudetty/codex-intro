const page = document.querySelector(".page");
const themeToggle = document.querySelector("[data-theme-toggle]");

const storedTheme = localStorage.getItem("brodex-theme");
if (storedTheme) {
  page.setAttribute("data-theme", storedTheme);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  page.setAttribute("data-theme", "dark");
}

themeToggle?.addEventListener("click", () => {
  const next = page.getAttribute("data-theme") === "dark" ? "light" : "dark";
  page.setAttribute("data-theme", next);
  localStorage.setItem("brodex-theme", next);
});

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.getAttribute("data-scroll"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const openModal = (id) => {
  const modal = document.getElementById(id);
  if (modal) {
    modal.hidden = false;
  }
};

const closeModal = (modal) => {
  modal.hidden = true;
};

document.querySelectorAll("[data-open]").forEach((button) => {
  button.addEventListener("click", () => openModal(button.dataset.open));
});

document.querySelectorAll(".case-card").forEach((card) => {
  card.addEventListener("click", () => openModal(card.dataset.modal));
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });

  modal.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", () => closeModal(modal));
  });

  modal.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const text = modal.querySelector("textarea")?.value ?? "";
      try {
        await navigator.clipboard.writeText(text.trim());
        button.textContent = "Copied!";
        setTimeout(() => {
          button.textContent = "Copy prompt";
        }, 1400);
      } catch (error) {
        button.textContent = "Copy failed";
      }
    });
  });
});
