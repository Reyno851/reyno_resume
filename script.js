(function () {
  const STORAGE_KEY = "resume-lang";
  const DEFAULT_LANG = "en";
  const translations = window.RESUME_I18N;

  const toggle = document.querySelector(".nav__toggle");
  const menu = document.querySelector(".nav__menu");
  const langToggle = document.getElementById("lang-toggle");
  const yearEl = document.getElementById("year");

  function getMessage(lang, key) {
    if (!translations || !translations[lang]) return null;
    return translations[lang][key];
  }

  function applyLanguage(lang) {
    if (!translations || !translations[lang]) {
      lang = DEFAULT_LANG;
    }

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      const value = getMessage(lang, key);
      if (value != null) {
        el.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-alt");
      const value = getMessage(lang, key);
      if (value != null) {
        el.alt = value;
      }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-aria");
      const value = getMessage(lang, key);
      if (value != null) {
        el.setAttribute("aria-label", value);
      }
    });

    const title = getMessage(lang, "meta.title");
    const description = getMessage(lang, "meta.description");
    if (title) {
      document.title = title;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && description) {
      metaDesc.setAttribute("content", description);
    }

    if (langToggle) {
      const label = getMessage(lang, "lang.toggle");
      const aria = getMessage(lang, "lang.toggleAria");
      if (label) {
        langToggle.textContent = label;
      }
      if (aria) {
        langToggle.setAttribute("aria-label", aria);
      }
      langToggle.setAttribute("data-lang", lang);
    }

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* ignore */
    }
  }

  function getInitialLanguage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "ja") {
        return saved;
      }
    } catch (e) {
      /* ignore */
    }
    return DEFAULT_LANG;
  }

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (langToggle) {
    langToggle.addEventListener("click", function () {
      const current = langToggle.getAttribute("data-lang") || DEFAULT_LANG;
      applyLanguage(current === "en" ? "ja" : "en");
    });
  }

  applyLanguage(getInitialLanguage());

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
