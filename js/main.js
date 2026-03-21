/**
 * Funcionalidad UI sin framework:
 * - Tema claro/oscuro (persistido)
 * - Año actual en el footer
 * - Validación de formulario de contacto
 * - Envío de formulario con EmailJS
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

  function validateContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevenir envío tradicional

      var nameInput = document.getElementById('name');
      var emailInput = document.getElementById('email');
      var subjectInput = document.getElementById('subject');
      var messageInput = document.getElementById('message');
      var submitBtn = form.querySelector('button[type="submit"]');

      // Limpiar errores previos antes de validar
      clearInlineErrors();
      
      // Validar nombre (obligatorio)
      var name = String(nameInput.value || '').trim();
      if (name.length < 2) {
        showInlineError('validation-name-required', nameInput);
        return false;
      }

      // Validar email (obligatorio)
      var email = String(emailInput.value || '').trim();
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showInlineError('validation-email-invalid', emailInput);
        return false;
      }

      // Validar mensaje (obligatorio, mínimo 10 caracteres)
      var message = String(messageInput.value || '').trim();
      if (message.length < 10) {
        showInlineError('validation-message-min', messageInput);
        return false;
      }

      // Validar longitud máxima del mensaje
      if (message.length > 2000) {
        showInlineError('validation-message-max', messageInput);
        return false;
      }

      function showInlineError(errorKey, inputElement) {
        // Crear o actualizar elemento de error inline usando data-i18n
        var existingError = inputElement.parentNode.querySelector('.inline-error');
        if (existingError) {
          existingError.setAttribute('data-i18n', errorKey);
        } else {
          var errorElement = document.createElement('div');
          errorElement.className = 'inline-error';
          errorElement.setAttribute('data-i18n', errorKey);
          inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
        }
        
        inputElement.focus();
        inputElement.classList.add('error');
        
        // Aplicar traducción inmediata usando el sistema i18n existente
        if (typeof window.getTranslation === 'function') {
          var currentLang = getCurrentLanguage();
          var errorElement = inputElement.parentNode.querySelector('.inline-error');
          var translation = window.getTranslation(currentLang, errorKey);
          if (translation) {
            errorElement.textContent = translation;
          }
        }
      }

      function clearInlineErrors() {
        var errorElements = document.querySelectorAll('.inline-error');
        errorElements.forEach(function(error) {
          error.remove();
        });
        
        var inputElements = document.querySelectorAll('.error');
        inputElements.forEach(function(input) {
          input.classList.remove('error');
        });
      }

      // Obtener idioma actual
      var currentLang = getCurrentLanguage();
      
      // Preparar datos para EmailJS
      var templateParams = {
        // Datos del formulario
        name: name,
        email: email,
        sbj: String(subjectInput.value || '').trim(),
        message: message,
        
        // Etiquetas traducidas usando el sistema i18n existente
        label_name: getLabelText('form-name', currentLang),
        label_email: getLabelText('form-email', currentLang),
        label_subject: getLabelText('form-subject', currentLang),
        l_mess: getLabelText('form-message', currentLang),
        
        // Variables generadas dinámicamente
        title: getTitleText(currentLang),
        label_sent_from: getSentFromText(currentLang),
        time: new Date().toLocaleString(currentLang === 'pt' ? 'pt-BR' : currentLang === 'en' ? 'en-US' : 'es-ES')
      };

      // Añadir campos hidden al formulario para EmailJS
      addHiddenFields(form, templateParams);

      // Cambiar texto del botón
      var originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = getButtonText('sending', currentLang);
      submitBtn.disabled = true;

      // Enviar con EmailJS
      emailjs.sendForm('default_service', 'template_gcpt9tt', form)
        .then(function() {
          // Éxito - redirigir a thanks.html
          window.location.href = 'thanks.html';
        }, function(err) {
          // Error - redirigir a error.html
          console.error('EmailJS error:', err);
          window.location.href = 'error.html';
        });

      // Log para debugging
      console.log('Sending email with params:', templateParams);
    });
  }

  // Función para añadir campos hidden al formulario
  function addHiddenFields(form, params) {
    // Eliminar campos hidden existentes para evitar duplicados
    var existingFields = form.querySelectorAll('input[type="hidden"][data-emailjs]');
    existingFields.forEach(function(field) {
      field.remove();
    });

    // Añadir nuevos campos hidden con los datos de EmailJS
    Object.keys(params).forEach(function(key) {
      if (key !== 'name' && key !== 'email' && key !== 'message' && key !== 'sbj') {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = params[key];
        input.setAttribute('data-emailjs', 'true');
        form.appendChild(input);
      }
    });
  }

  // Funciones auxiliares para traducciones - Simplificadas para usar el sistema i18n existente
  function getCurrentLanguage() {
    if (typeof window.getCurrentLang === 'function') {
      return window.getCurrentLang();
    }
    return 'es'; // fallback
  }

  function getLabelText(key, lang) {
    if (typeof window.getTranslation === 'function') {
      return window.getTranslation(lang, key) || key;
    }
    return key; // fallback simple
  }

  function getTitleText(lang) {
    var titles = { 'es': 'Nuevo mensaje', 'pt': 'Nova mensagem', 'en': 'New message' };
    return titles[lang] || titles['es'];
  }

  function getSentFromText(lang) {
    var sentFrom = { 'es': 'Enviado desde', 'pt': 'Enviado de', 'en': 'Sent from' };
    return sentFrom[lang] || sentFrom['es'];
  }

  function getButtonText(type, lang) {
    var buttons = {
      'sending': { 'es': 'Enviando...', 'pt': 'Enviando...', 'en': 'Sending...' }
    };
    return buttons[type][lang] || buttons[type]['es'];
  }

  function getSuccessMessage(lang) {
    var messages = {
      'es': '¡Mensaje enviado con éxito!',
      'pt': 'Mensagem enviada com sucesso!',
      'en': 'Message sent successfully!'
    };
    return messages[lang] || messages['es'];
  }

  function getErrorMessage(lang) {
    var messages = {
      'es': 'Error al enviar el mensaje.',
      'pt': 'Erro ao enviar a mensagem.',
      'en': 'Error sending message.'
    };
    return messages[lang] || messages['es'];
  }

  function initEmailJS() {
    // Inicializar EmailJS con tu public key
    emailjs.init('RziuhrdWs-sf8NbV2');
  }

  function init() {
    setYear();
    initTheme();
    ensurePhotoFallback();
    initEmailJS();
    validateContactForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

