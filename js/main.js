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
    var hiddenSubject = document.getElementById('fs-subject');
    if (!subjectInput || !hiddenSubject) return;

    var prefix = 'PORTFOLIO — ';

    function sync() {
      var s = String(subjectInput.value || '').trim();
      hiddenSubject.value = prefix + s;
    }

    subjectInput.addEventListener('input', sync);
    form.addEventListener('submit', sync);
    sync();
  }

  function initProjectModal() {
    var modal = document.getElementById('project-modal');
    if (!modal) return;

    var backdrop = modal.querySelector('.project-modal-backdrop');
    var closeBtn = modal.querySelector('.project-modal-close');
    var imgEl = document.getElementById('project-modal-img');
    var titleEl = document.getElementById('project-modal-title');
    var descEl = document.getElementById('project-modal-desc');
    var dateEl = document.getElementById('project-modal-date');
    var githubLink = document.getElementById('project-modal-github');
    var currentSpan = document.getElementById('project-modal-current');
    var totalSpan = document.getElementById('project-modal-total');
    var prevBtn = modal.querySelector('.project-modal-prev');
    var nextBtn = modal.querySelector('.project-modal-next');

    var currentImages = [];
    var currentIndex = 0;
    var currentCard = null;

    function setSlide(index) {
      currentIndex = index;
      if (currentImages.length === 0) return;
      imgEl.src = currentImages[index];
      imgEl.alt = titleEl.textContent + ' — imagen ' + (index + 1);
      currentSpan.textContent = String(index + 1);
      prevBtn.disabled = index <= 0;
      nextBtn.disabled = index >= currentImages.length - 1;
    }

    function openModal(card) {
      var title = (card.querySelector('.project-title') || {}).textContent || '';
      var descKey = card.getAttribute('data-project-desc-long-key') || '';
      var dateKey = card.getAttribute('data-project-date-key') || '';
      var descLong = (typeof window.getTranslation === 'function' && typeof window.getCurrentLang === 'function')
        ? window.getTranslation(window.getCurrentLang(), descKey)
        : '';
      var dateStr = (typeof window.getTranslation === 'function' && typeof window.getCurrentLang === 'function' && dateKey)
        ? window.getTranslation(window.getCurrentLang(), dateKey)
        : '';
      var github = card.getAttribute('data-project-github') || '#';
      var imagesJson = card.getAttribute('data-project-images') || '[]';
      try {
        currentImages = JSON.parse(imagesJson);
      } catch (e) {
        currentImages = [];
      }
      var themeAware = card.getAttribute('data-project-theme-aware') === 'true';
      if (themeAware && currentImages.length >= 2) {
        var isLight = document.body.classList.contains('theme-light');
        var firstIndex = isLight ? 1 : 0;
        var firstImg = currentImages[firstIndex];
        var rest = currentImages.filter(function (_, i) { return i !== firstIndex; });
        currentImages = [firstImg].concat(rest);
      }
      if (currentImages.length === 0) currentImages = ['https://placehold.co/800x500/1a1a1f/6366f1?text=Sin+imagen'];

      titleEl.textContent = title;
      descEl.textContent = descLong;
      dateEl.textContent = dateStr;
      dateEl.style.display = dateStr ? '' : 'none';
      githubLink.href = github;
      totalSpan.textContent = String(currentImages.length);
      setSlide(0);
      currentCard = card;
      modal.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
    }

    function refreshModalLang() {
      if (!currentCard || modal.hasAttribute('hidden')) return;
      var title = (currentCard.querySelector('.project-title') || {}).textContent || '';
      var descKey = currentCard.getAttribute('data-project-desc-long-key') || '';
      var dateKey = currentCard.getAttribute('data-project-date-key') || '';
      var descLong = (typeof window.getTranslation === 'function' && typeof window.getCurrentLang === 'function')
        ? window.getTranslation(window.getCurrentLang(), descKey)
        : '';
      var dateStr = (typeof window.getTranslation === 'function' && typeof window.getCurrentLang === 'function' && dateKey)
        ? window.getTranslation(window.getCurrentLang(), dateKey)
        : '';
      titleEl.textContent = title;
      descEl.textContent = descLong;
      dateEl.textContent = dateStr;
      dateEl.style.display = dateStr ? '' : 'none';
    }

    function closeModal() {
      modal.setAttribute('hidden', '');
      document.body.style.overflow = '';
      currentCard = null;
    }

    backdrop.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', function () {
      if (currentIndex > 0) setSlide(currentIndex - 1);
    });
    nextBtn.addEventListener('click', function () {
      if (currentIndex < currentImages.length - 1) setSlide(currentIndex + 1);
    });

    modal.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
      if (modal.hasAttribute('hidden')) return;
      if (e.key === 'ArrowLeft') prevBtn.click();
      if (e.key === 'ArrowRight') nextBtn.click();
    });

    document.querySelectorAll('.btn-ver-mas').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var card = this.closest('.project-card');
        if (card) openModal(card);
      });
    });

    window.addEventListener('portfolio-lang-change', refreshModalLang);

    window.addEventListener('portfolio-theme-change', function () {
      if (!currentCard || modal.hasAttribute('hidden')) return;
      if (currentCard.getAttribute('data-project-theme-aware') !== 'true') return;
      var imagesJson = currentCard.getAttribute('data-project-images') || '[]';
      var images = [];
      try {
        images = JSON.parse(imagesJson);
      } catch (e) {}
      if (images.length < 2) return;
      var isLight = document.body.classList.contains('theme-light');
      var firstIndex = isLight ? 1 : 0;
      var firstImg = images[firstIndex];
      var rest = images.filter(function (_, i) { return i !== firstIndex; });
      currentImages = [firstImg].concat(rest);
      totalSpan.textContent = String(currentImages.length);
      setSlide(0);
    });
  }

  function init() {
    setYear();
    initTheme();
    ensurePhotoFallback();
    initFormSubmitSubject();
    initProjectModal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

