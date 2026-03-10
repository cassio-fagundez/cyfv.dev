/**
 * Soporte multiidioma: ES, PT-BR, EN
 * Se autoconfigura según el idioma del navegador si hay coincidencia.
 */
(function () {
  'use strict';

  var translations = {
    es: {
      'download-cv': 'Descargar CV',
      'download-cv-lang': 'en español',
      'about-title': 'Sobre mí',
      'about-p1': 'Soy Software Developer Jr y QA Analyst / Tester Jr, egresado como Tecnólogo en Análisis y Desarrollo de Sistemas.',
      'about-p2': 'Tengo experiencia académica trabajando en todas las etapas del desarrollo de software, incluyendo programación, bases de datos, testing y el análisis previo. Aunque he trabajado en proyectos fullstack, me interesa especialmente el desarrollo backend y la calidad del software.',
      'about-p3': 'Me considero una persona analítica, detallista y orientada a construir aplicaciones confiables. Actualmente busco oportunidades junior o trainee donde pueda seguir aprendiendo, mejorar mis habilidades técnicas y contribuir al desarrollo de software de calidad.',
      'about-contact-before': 'Puedes contactarme a través de ',
      'about-contact-middle': ' o haciendo click ',
      'about-contact-link': 'aquí',
      'resume-title': 'Currículum',
      'education-title': 'Estudios',
      'experience-title': 'Experiencia laboral',
      'edu1-date': '2015 — 2017 | Uruguay',
      'edu1-title': 'Bachillerato en Informática — UTU',
      'edu1-desc': 'Formación técnica orientada al desarrollo de software, con énfasis en programación, bases de datos, sistemas operativos y análisis y diseño de aplicaciones.',
      'edu2-date': '2018 — 2024 | Uruguay & Brasil',
      'edu2-title': 'Tecnólogo en Análisis y Desarrollo de Sistemas — UTEC | IFSUL',
      'edu2-desc': 'Carrera binacional enfocada en desarrollo de software, bases de datos, análisis de sistemas y ciclo de vida del software.',
      'edu4-date': '2025 | Uruguay',
      'edu4-title': 'Testing de Software — Jóvenes a Programar | Ceibal',
      'edu4-desc': 'Formación en testing de software, incluyendo testing manual, diseño de casos de prueba y reporte de bugs, complementada con competencias transversales e inglés orientado al ámbito profesional.\nCapacitado como QA Analyst / Tester Jr.',
      'exp1-date': 'dic. 2020 — abr. 2021 (5 meses) | Brasil (remoto)',
      'exp1-title': 'Trainee Back-end — NTConsult',
      'exp1-desc': '• Formación práctica en Java y fundamentos de C#, enfocada en lógica de programación y buenas prácticas de desarrollo.\n• Uso de Git y GitHub para control de versiones durante el proceso de aprendizaje.\n• Participación en instancias de seguimiento semanales con prácticas ágiles.\n• Trabajo remoto con equipos de Brasil, utilizando portugués en la comunicación diaria.',
      'exp2-date': 'Presente',
      'exp2-title': 'En búsqueda de empleo',
      'exp2-desc': 'Abierto a ofertas laborales.',
      'portfolio-title': 'Portfolio',
      'proj1-title': 'EventLink',
      'proj1-desc': 'Aplicación móvil Android para publicar y descubrir eventos locales o virtuales. Desarrollada en Java con Android Studio, OpenStreetMap y Firebase.',
      'proj1-date': '2024 — FullStack Mobile Developer',
      'proj2-title': 'Veterinaria Guau Guau',
      'proj2-desc': 'Proyecto final del curso de Testing de Software (Jóvenes a Programar — Ceibal). Casos de prueba e informes de incidencias sobre la web de la veterinaria.',
      'proj2-date': '2025 — QA Analyst / Tester',
      'proj3-title': 'Personal Portfolio Website',
      'proj3-desc': 'Sitio web estático con mi perfil, proyectos y currículum. HTML, CSS y JavaScript; multiidioma (ES, PT, EN) y diseño responsivo.',
      'proj3-date': '2026 — FullStack Developer',
      'saber-mas': 'Saber más',
      'contact-title': 'Contacto',
      'contact-intro': 'Completa el formulario y me pondré en contacto contigo.',
      'form-name': 'Nombre',
      'form-email': 'Correo electrónico',
      'form-subject': 'Asunto',
      'form-message': 'Mensaje',
      'form-submit': 'Enviar mensaje',
      'theme-dark': 'Oscuro',
      'theme-light': 'Claro',
      'theme-switch-aria': 'Cambiar modo claro u oscuro',
      'proj1-desc-long': 'Proyecto final de la carrera de Tecnólogo en Análisis y Desarrollo de Sistemas (TADS). EventLink es una aplicación móvil para Android desarrollada en Android Studio con Java. Utiliza OpenStreetMap para la visualización de mapas y Firebase para autenticación y persistencia de datos. El propósito de la app es permitir la publicación de eventos locales o virtuales con el fin de aumentar su difusión y alcance.',
      'proj2-desc-long': 'Trabajo final del curso de Testing de Software de Jóvenes a Programar (Ceibal). Se trabajó en equipo sobre la web de la veterinaria Guau Guau. A partir de las Especificaciones de Requisitos Funcionales y No Funcionales y de la propia página web, se idearon y documentaron casos de prueba, se aplicaron técnicas de testing y se elaboraron Informes de Incidencias e informes de resultados. Rol desempeñado: QA Analyst / Tester.',
      'proj3-desc-long': 'Este portfolio es el sitio en el que estás navegando. Desarrollado desde cero con HTML5, CSS3 y JavaScript vanilla, sin frameworks. Incluye secciones de perfil, sobre mí, currículum (estudios y experiencia), portfolio de proyectos con modal de detalle y formulario de contacto integrado con FormSubmit. Soporta tres idiomas (Español, Portugués e Inglés) con detección automática del navegador, modo claro/oscuro y diseño responsivo.',
      'modal-ver-github': 'Ver en GitHub',
      'modal-prev': 'Anterior',
      'modal-next': 'Siguiente',
      'modal-close': 'Cerrar'
    },
    pt: {
      'download-cv': 'Baixar CV',
      'download-cv-lang': 'em português',
      'about-title': 'Sobre mim',
      'about-p1': 'Sou Software Developer Jr e QA Analyst / Tester Jr, formado como Tecnólogo em Análise e Desenvolvimento de Sistemas.',
      'about-p2': 'Tenho experiência acadêmica atuando em todas as etapas do desenvolvimento de software, incluindo programação, bancos de dados, testes e análise prévia. Embora eu tenha trabalhado em projetos fullstack, me interessa especialmente o desenvolvimento backend e a qualidade de software.',
      'about-p3': 'Me considero uma pessoa analítica, detalhista e orientada a construir aplicações confiáveis. Atualmente busco oportunidades júnior ou trainee onde eu possa continuar aprendendo, aprimorar minhas habilidades técnicas e contribuir para o desenvolvimento de software de qualidade.',
      'about-contact-before': 'Você pode me contatar através de ',
      'about-contact-middle': ' ou clicando ',
      'about-contact-link': 'aqui',
      'resume-title': 'Currículo',
      'education-title': 'Estudos',
      'experience-title': 'Experiência profissional',
      'edu1-date': '2015 — 2017 | Uruguai',
      'edu1-title': 'Ensino Médio Técnico em Informática — UTU',
      'edu1-desc': 'Formação técnica voltada ao desenvolvimento de software, com ênfase em programação, bancos de dados, sistemas operacionais e análise e design de aplicações.',
      'edu2-date': '2018 — 2024 | Brasil & Uruguai',
      'edu2-title': 'Tecnólogo em Análise e Desenvolvimento de Sistemas — UTEC | IFSUL',
      'edu2-desc': 'Curso binacional com foco em desenvolvimento de software, bancos de dados, análise de sistemas e ciclo de vida de software.',
      'edu4-date': '2025 | Uruguai',
      'edu4-title': 'Testes de Software — Jóvenes a Programar | Ceibal',
      'edu4-desc': 'Formação em testes de software, incluindo testes manuais, design de casos de teste e reporte de bugs, complementada com competências transversais e inglês voltado ao âmbito profissional.\nCapacitado como Analista QA / Tester Jr.',
      'exp1-date': 'dez. 2020 — abr. 2021 (5 meses) | Brasil (remoto)',
      'exp1-title': 'Trainee Back-end — NTConsult',
      'exp1-desc': '• Formação prática em Java e fundamentos de C#, com foco em lógica de programação e boas práticas de desenvolvimento.\n• Uso de Git e GitHub para controle de versões durante o processo de aprendizagem.\n• Participação em instâncias de acompanhamento semanais com práticas ágeis.\n• Trabalho remoto com equipes do Brasil, utilizando português na comunicação diária.',
      'exp2-date': 'Presente',
      'exp2-title': 'Em busca de emprego',
      'exp2-desc': 'Aberto a oportunidades de trabalho.',
      'portfolio-title': 'Portfólio',
      'proj1-title': 'EventLink',
      'proj1-desc': 'Aplicativo móvel Android para publicar e descobrir eventos locais ou virtuais. Desenvolvido em Java com Android Studio, OpenStreetMap e Firebase.',
      'proj1-date': '2024 — FullStack Mobile Developer',
      'proj2-title': 'Veterinaria Guau Guau',
      'proj2-desc': 'Projeto final do curso de Testes de Software (Jóvenes a Programar — Ceibal). Casos de teste e relatórios de incidências sobre o site da veterinária.',
      'proj2-date': '2025 — QA Analyst / Tester',
      'proj3-title': 'Personal Portfolio Website',
      'proj3-desc': 'Site estático com meu perfil, projetos e currículo. HTML, CSS e JavaScript; multilíngue (ES, PT, EN) e design responsivo.',
      'proj3-date': '2026 — FullStack Developer',
      'saber-mas': 'Saber mais',
      'contact-title': 'Contato',
      'contact-intro': 'Preencha o formulário e entrarei em contato com você.',
      'form-name': 'Nome',
      'form-email': 'E-mail',
      'form-subject': 'Assunto',
      'form-message': 'Mensagem',
      'form-submit': 'Enviar mensagem',
      'theme-dark': 'Escuro',
      'theme-light': 'Claro',
      'theme-switch-aria': 'Alternar modo claro ou escuro',
      'proj1-desc-long': 'Projeto final da carreira de Tecnólogo em Análise e Desenvolvimento de Sistemas (TADS). EventLink é um aplicativo móvel para Android desenvolvido no Android Studio com Java. Utiliza OpenStreetMap para visualização de mapas e Firebase para autenticação e persistência de dados. O propósito do app é permitir a publicação de eventos locais ou virtuais para aumentar sua divulgação e alcance.',
      'proj2-desc-long': 'Trabalho final do curso de Testes de Software do Jóvenes a Programar (Ceibal). Trabalhou-se em equipe sobre o site da veterinária Guau Guau. A partir das Especificações de Requisitos Funcionais e Não Funcionais e do próprio site, foram idealizados e documentados casos de teste, aplicadas técnicas de testing e elaborados Relatórios de Incidências e relatórios de resultados. Função desempenhada: QA Analyst / Tester.',
      'proj3-desc-long': 'Este portfólio é o site em que você está navegando. Desenvolvido do zero com HTML5, CSS3 e JavaScript vanilla, sem frameworks. Inclui seções de perfil, sobre mim, currículo (estudos e experiência), portfólio de projetos com modal de detalhe e formulário de contato integrado ao FormSubmit. Suporta três idiomas (Espanhol, Português e Inglês) com detecção automática do navegador, modo claro/escuro e design responsivo.',
      'modal-ver-github': 'Ver no GitHub',
      'modal-prev': 'Anterior',
      'modal-next': 'Próximo',
      'modal-close': 'Fechar'
    },
    en: {
      'download-cv': 'Download CV',
      'download-cv-lang': 'in english',
      'about-title': 'About me',
      'about-p1': 'I’m a Junior Software Developer and Junior QA Analyst / Tester, graduated as a Systems Analysis and Software Development Technologist.',
      'about-p2': 'I have academic experience working across all stages of software development, including programming, databases, testing, and early-stage analysis. Although I’ve worked on full-stack projects, I’m especially interested in backend development and software quality.',
      'about-p3': 'I consider myself an analytical, detail-oriented person focused on building reliable applications. I’m currently looking for junior or trainee opportunities where I can keep learning, strengthen my technical skills, and contribute to high-quality software.',
      'about-contact-before': 'You can contact me at ',
      'about-contact-middle': ' or by clicking ',
      'about-contact-link': 'here',
      'resume-title': 'Resume',
      'education-title': 'Education',
      'experience-title': 'Work experience',
      'edu1-date': '2015 — 2017 | Uruguay',
      'edu1-title': 'IT High School Program — UTU',
      'edu1-desc': 'Technical training focused on software development, with emphasis on programming, databases, operating systems, and application analysis and design.',
      'edu2-date': '2018 — 2024 | Uruguay & Brazil',
      'edu2-title': 'Systems Analysis and Software Development Technologist — UTEC | IFSUL',
      'edu2-desc': 'Binational degree focused on software development, databases, systems analysis, and the software lifecycle.',
      'edu4-date': '2025 | Uruguay',
      'edu4-title': 'Software Testing — Jóvenes a Programar | Ceibal',
      'edu4-desc': 'Training in software testing, including manual testing, test case design, and bug reporting, complemented with transversal skills and English focused on the professional environment.\nTrained as a Junior QA Analyst / Tester.',
      'exp1-date': 'Dec 2020 — Apr 2021 (5 months) | Brazil (remote)',
      'exp1-title': 'Back-end Trainee — NTConsult',
      'exp1-desc': '• Hands-on training in Java and C# fundamentals, focused on programming logic and development best practices.\n• Used Git and GitHub for version control throughout the learning process.\n• Participated in weekly follow-up sessions using agile practices.\n• Remote work with teams in Brazil, using Portuguese in day-to-day communication.',
      'exp2-date': 'Present',
      'exp2-title': 'Seeking employment',
      'exp2-desc': 'Open to job opportunities.',
      'portfolio-title': 'Portfolio',
      'proj1-title': 'EventLink',
      'proj1-desc': 'Android mobile app to publish and discover local or virtual events. Built with Java in Android Studio, OpenStreetMap and Firebase.',
      'proj1-date': '2024 — FullStack Mobile Developer',
      'proj2-title': 'Veterinaria Guau Guau',
      'proj2-desc': 'Final project of the Software Testing course (Jóvenes a Programar — Ceibal). Test cases and incident reports based on the vet clinic website and its documentation.',
      'proj2-date': '2025 — QA Analyst / Tester',
      'proj3-title': 'Personal Portfolio Website',
      'proj3-desc': 'Static site with my profile, projects and resume. HTML, CSS and JavaScript; multi-language (ES, PT, EN) and responsive design.',
      'proj3-date': '2026 — FullStack Developer',
      'saber-mas': 'Learn more',
      'contact-title': 'Contact',
      'contact-intro': 'Fill out the form and I will get back to you.',
      'form-name': 'Name',
      'form-email': 'Email',
      'form-subject': 'Subject',
      'form-message': 'Message',
      'form-submit': 'Send message',
      'theme-dark': 'Dark',
      'theme-light': 'Light',
      'theme-switch-aria': 'Toggle light or dark mode',
      'proj1-desc-long': 'Final project of the Systems Analysis and Software Development Technologist degree (TADS). EventLink is an Android mobile app developed in Android Studio with Java. It uses OpenStreetMap for map display and Firebase for authentication and data persistence. The app allows users to publish local or virtual events to increase their visibility and reach.',
      'proj2-desc-long': 'Final assignment of the Jóvenes a Programar (Ceibal) Software Testing course. Team project focused on the Veterinaria Guau Guau website. Based on the Functional and Non-Functional Requirements specifications and the site itself, we designed and documented test cases, applied testing techniques, and produced Incident Reports and result reports. Role: QA Analyst / Tester.',
      'proj3-desc-long': 'This portfolio is the site you are browsing. Built from scratch with HTML5, CSS3 and vanilla JavaScript, no frameworks. It includes profile, about me, resume (education and experience), project portfolio with detail modal and contact form integrated with FormSubmit. Supports three languages (Spanish, Portuguese and English) with browser detection, light/dark mode and responsive layout.',
      'modal-ver-github': 'View on GitHub',
      'modal-prev': 'Previous',
      'modal-next': 'Next',
      'modal-close': 'Close'
    }
  };

  var STORAGE_KEY = 'portfolio-lang';
  var defaultLang = 'en';

  function getBrowserLang() {
    var lang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (lang.indexOf('pt') === 0) return 'pt';
    if (lang.indexOf('en') === 0) return 'en';
    if (lang.indexOf('es') === 0) return 'es';
    return defaultLang;
  }

  function getStoredLang() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  function getCurrentLang() {
    var stored = getStoredLang();
    if (stored && translations[stored]) return stored;
    return getBrowserLang();
  }

  function applyLang(lang) {
    if (!translations[lang]) lang = defaultLang;
    var t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          if (el.placeholder !== undefined) el.placeholder = t[key];
          else if (el.type === 'submit' || el.type === 'button') el.value = t[key];
        } else {
          el.textContent = t[key];
        }
      }
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (t[key]) el.setAttribute('aria-label', t[key]);
    });
    document.documentElement.lang = lang === 'es' ? 'es' : lang === 'pt' ? 'pt' : 'en';
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Actualizar aria-label del switch de tema según idioma
    var themeInput = document.getElementById('theme-toggle');
    if (themeInput && t['theme-switch-aria']) {
      themeInput.setAttribute('aria-label', t['theme-switch-aria']);
    }

    // Actualizar enlace del CV según idioma (assets/CV/cv-es.pdf, cv-pt.pdf, cv-en.pdf)
    var cvLink = document.getElementById('cv-download-link');
    if (cvLink) {
      cvLink.setAttribute('href', 'assets/CV/cv-' + lang + '.pdf');
    }

    setStoredLang(lang);
    if (typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('portfolio-lang-change', { detail: { lang: lang } }));
    }
  }

  function init() {
    var lang = getCurrentLang();
    applyLang(lang);

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var l = this.getAttribute('data-lang');
        if (translations[l]) applyLang(l);
      });
    });
  }

  window.getCurrentLang = getCurrentLang;
  window.getTranslation = function (lang, key) {
    var t = translations[lang];
    return t && t[key] !== undefined ? t[key] : '';
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
