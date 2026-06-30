// script.js

// ================================
// 1. Базовая инициализация
// ================================

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initRevealOnScroll();
  initNavigation();
});

// ================================
// 2. Светлая / тёмная тема
// ================================

function initThemeToggle() {
  const toggleButton = document.querySelector(".theme-toggle");
  const icon = document.querySelector(".theme-toggle__icon");

  if (!toggleButton) return;

  const savedTheme = localStorage.getItem("site-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
  setTheme(initialTheme, icon);

  toggleButton.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme;
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    setTheme(nextTheme, icon);
    localStorage.setItem("site-theme", nextTheme);
  });
}

function setTheme(theme, icon) {
  document.documentElement.dataset.theme = theme;

  if (icon) {
    icon.textContent = theme === "dark" ? "☀" : "☾";
  }
}

// ================================
// 3. Плавное появление блоков
// ================================

function initRevealOnScroll() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach(element => observer.observe(element));
}

// ================================
// 4. Базовая логика навигации
// ================================

function initNavigation() {
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

// ================================
// 5. Место для будущего расширения
// ================================

function initNotesPage() {
  // Здесь позже можно добавить:
  // - оглавление страницы;
  // - подсветку активного раздела;
  // - поиск по конспекту;
  // - кнопку "наверх";
  // - сохранение прогресса чтения.
}