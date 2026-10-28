(function () {
  const LANGS = ["zh", "en", "ko", "ja"];
  const LANG_LABEL = { zh: "中文", en: "EN", ko: "한국어", ja: "日本語" };
  const HTML_LANG = { zh: "zh-CN", en: "en", ko: "ko", ja: "ja" };
  const STORAGE_KEY = "phys-lang";

  function getLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGS.includes(saved)) return saved;
    const nav = (navigator.language || "zh").toLowerCase();
    if (nav.startsWith("ko")) return "ko";
    if (nav.startsWith("ja")) return "ja";
    if (nav.startsWith("en")) return "en";
    return "zh";
  }

  function setLang(lang) {
    if (!LANGS.includes(lang)) return;
    localStorage.setItem(STORAGE_KEY, lang);
    apply();
  }

  function t(dict, lang, key) {
    return (dict[lang] && dict[lang][key]) || (dict.zh && dict.zh[key]) || "";
  }

  function applyNode(el, dict, lang) {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    const val = t(dict, lang, key);
    if (val === "") return;
    if (el.hasAttribute("data-i18n-html")) {
      el.innerHTML = val;
    } else {
      el.textContent = val;
    }
  }

  function apply() {
    const dict = window.I18N_DICT || {};
    const lang = getLang();
    document.documentElement.lang = HTML_LANG[lang];
    document.documentElement.setAttribute("data-lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      applyNode(el, dict, lang);
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      const spec = el.getAttribute("data-i18n-attr");
      // format: attr:key,attr:key
      spec.split(",").forEach(function (pair) {
        const parts = pair.split(":");
        if (parts.length !== 2) return;
        const attr = parts[0].trim();
        const key = parts[1].trim();
        const val = t(dict, lang, key);
        if (val) el.setAttribute(attr, val);
      });
    });

    const titleKey = document.body.getAttribute("data-title-key");
    if (titleKey) {
      const title = t(dict, lang, titleKey);
      if (title) document.title = title;
    }

    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    if (typeof window.onI18nApplied === "function") {
      window.onI18nApplied(lang, dict);
    }

    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  }

  function mountSwitcher(mount) {
    if (!mount) return;
    const box = document.createElement("div");
    box.className = "lang-switch";
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", "Language");
    LANGS.forEach(function (lang) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("data-lang", lang);
      btn.textContent = LANG_LABEL[lang];
      btn.addEventListener("click", function () {
        setLang(lang);
      });
      box.appendChild(btn);
    });
    mount.appendChild(box);
  }

  function mountSiteBack(inner) {
    if (!inner || inner.querySelector(".site-back")) return;
    const a = document.createElement("a");
    a.className = "site-back";
    a.href = "/subjects/physics";
    a.textContent = "← StudyWeb";
    inner.insertBefore(a, inner.firstChild);
  }

  function initTopbar(options) {
    options = options || {};
    const existing = document.querySelector(".topbar");
    if (existing) {
      mountSiteBack(existing.querySelector(".topbar-inner"));
      const mount = existing.querySelector("[data-lang-mount]");
      mountSwitcher(mount);
      apply();
      return;
    }
    const bar = document.createElement("div");
    bar.className = "topbar";
    bar.innerHTML =
      '<div class="topbar-inner">' +
      '<a class="brand" href="' +
      (options.homeHref || "index.html") +
      '"><span class="brand-dot"></span><span data-i18n="nav.home">Physics Notes</span></a>' +
      '<div data-lang-mount></div>' +
      "</div>";
    document.body.insertBefore(bar, document.body.firstChild);
    mountSiteBack(bar.querySelector(".topbar-inner"));
    mountSwitcher(bar.querySelector("[data-lang-mount]"));
    apply();
  }

  window.PhysI18n = {
    getLang: getLang,
    setLang: setLang,
    apply: apply,
    initTopbar: initTopbar,
    t: function (key) {
      return t(window.I18N_DICT || {}, getLang(), key);
    },
  };
})();
