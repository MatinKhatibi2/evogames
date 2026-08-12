/* ==========================================================================
   EvoGames — i18n + Theme Engine
   Elements to translate: <el data-i18n="key">fallback</el>
   Attribute translation: <el data-i18n-attr="placeholder:key.name">
   ========================================================================== */

const EvoI18n = (() => {
  let dict = {};
  let currentLang = localStorage.getItem('evo-lang') || 'fa';

  function get(key, fallback = '') {
    const parts = key.split('.');
    let node = dict;
    for (const p of parts) {
      if (node && typeof node === 'object' && p in node) node = node[p];
      else return fallback || key;
    }
    return typeof node === 'string' ? node : (fallback || key);
  }

  function apply() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'fa' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = get(key, el.textContent);
      el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      el.innerHTML = get(key, el.innerHTML);
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const spec = el.getAttribute('data-i18n-attr'); // "placeholder:key.path"
      spec.split(';').forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        if (attr && key) el.setAttribute(attr, get(key, el.getAttribute(attr) || ''));
      });
    });

    document.querySelectorAll('.lang-toggle-label').forEach(el => {
      el.textContent = currentLang === 'fa' ? 'EN' : 'فا';
    });

    window.dispatchEvent(new CustomEvent('evo-lang-changed', { detail: { lang: currentLang } }));
  }

  async function loadDict(lang) {
    // dict is embedded globally via window.EVO_DICT to avoid fetch/CORS issues on file:// use
    if (window.EVO_DICT && window.EVO_DICT[lang]) {
      dict = window.EVO_DICT[lang];
    }
  }

  async function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('evo-lang', lang);
    await loadDict(lang);
    apply();
  }

  async function init() {
    await loadDict(currentLang);
    apply();
    document.querySelectorAll('[data-action="toggle-lang"]').forEach(btn => {
      btn.addEventListener('click', () => setLang(currentLang === 'fa' ? 'en' : 'fa'));
    });
  }

  return { init, setLang, get: (k, f) => get(k, f), get currentLang() { return currentLang; } };
})();

const EvoTheme = (() => {
  let current = localStorage.getItem('evo-theme') || 'dark';

  function apply() {
    if (current === 'light') document.documentElement.setAttribute('data-theme', 'light');
    else document.documentElement.removeAttribute('data-theme');
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.setAttribute('aria-pressed', current === 'light');
    });
    window.dispatchEvent(new CustomEvent('evo-theme-changed', { detail: { theme: current } }));
  }

  function set(theme) {
    current = theme;
    localStorage.setItem('evo-theme', theme);
    apply();
  }

  function init() {
    apply();
    document.querySelectorAll('[data-action="toggle-theme"]').forEach(btn => {
      btn.addEventListener('click', () => set(current === 'dark' ? 'light' : 'dark'));
    });
  }

  return { init, set, get current() { return current; } };
})();

document.addEventListener('DOMContentLoaded', () => {
  EvoTheme.init();
  EvoI18n.init();
  initRevealObserver();
});

function initRevealObserver() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}
