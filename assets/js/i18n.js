(function () {
  const KEY = 'lang';
  const supported = ['en', 'es'];

  function getLang() {
    const saved = localStorage.getItem(KEY);
    if (saved && supported.includes(saved)) return saved;
    const nav = (navigator.language || 'en').slice(0, 2);
    return supported.includes(nav) ? nav : 'en';
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-en],[data-es]').forEach(el => {
      const val = el.getAttribute('data-' + lang);
      if (val !== null) el.textContent = val;
    });
    const btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = lang === 'en' ? 'ES' : 'EN';
  }

  function toggle() {
    const current = getLang();
    const next = current === 'en' ? 'es' : 'en';
    localStorage.setItem(KEY, next);
    apply(next);
  }

  document.addEventListener('DOMContentLoaded', () => {
    apply(getLang());
    const btn = document.getElementById('lang-toggle');
    if (btn) btn.addEventListener('click', toggle);
  });
})();
