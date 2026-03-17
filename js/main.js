/**
 * Funcionalidad UI sin framework:
 * - Tema claro/oscuro (persistido)
 * - Año actual en el footer
 * - Asunto para FormSubmit
 * - Fallback de foto a iniciales si falta el asset
 */
(function () {
  'use strict';

  var THEME_STORAGE_KEY = 'portfolio-theme';
  var THEME_LIGHT_CLASS = 'theme-light';

  function setYear() {
    var el = document.getElementById('current-year');
    if (!el) return;
    el.textContent = String(new Date().getFullYear());
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeTheme(value) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, value);
    } catch (e) {}
  }

  function applyTheme(theme) {
    var isLight = theme === 'light';
    document.body.classList.toggle(THEME_LIGHT_CLASS, isLight);

    var input = document.getElementById('theme-toggle');
    if (input) input.checked = isLight;

    if (typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('portfolio-theme-change', { detail: { theme: theme } }));
    }
  }

  function initTheme() {
    var input = document.getElementById('theme-toggle');
    if (!input) return;

    // No cambiar el look por defecto: si no hay preferencia guardada, mantener tema oscuro.
    var stored = getStoredTheme();
    if (stored === 'light' || stored === 'dark') {
      applyTheme(stored);
    } else {
      applyTheme('dark');
    }

    input.addEventListener('change', function () {
      var next = input.checked ? 'light' : 'dark';
      applyTheme(next);
      storeTheme(next);
    });
  }

  function initialsFromName(name) {
    var trimmed = String(name || '').trim();
    if (!trimmed) return 'CF';
    var parts = trimmed.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function ensurePhotoFallback() {
    var wrap = document.querySelector('.profile-photo-wrap');
    if (!wrap) return;

    var img = wrap.querySelector('img.profile-photo');
    if (!img) return;

    function setNoPhoto() {
      img.setAttribute('src', '');
      wrap.classList.add('no-photo');

      if (!wrap.querySelector('.profile-initials')) {
        var span = document.createElement('span');
        span.className = 'profile-initials';
        span.textContent = initialsFromName(img.getAttribute('alt'));
        wrap.appendChild(span);
      }
    }

    img.addEventListener('error', setNoPhoto);

    var src = img.getAttribute('src');
    if (!src) setNoPhoto();
  }

  function initFormSubmitSubject() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var subjectInput = document.getElementById('subject');
    var hiddenSubject = form.querySelector('input[name="_subject"]');
    if (!subjectInput || !hiddenSubject) return;

    var prefix = 'CYFV.DEV — ';
    var defaultSubject = 'Nuevo mensaje';

    function sync() {
      var s = String(subjectInput.value || '').trim();
      if (s) {
        hiddenSubject.value = prefix + s;
      } else {
        hiddenSubject.value = prefix + defaultSubject;
      }
    }

    subjectInput.addEventListener('input', sync);
    form.addEventListener('submit', sync);
    sync();
  }

  function init() {
    setYear();
    initTheme();
    ensurePhotoFallback();
    initFormSubmitSubject();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

