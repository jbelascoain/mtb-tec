/* ==========================================================================
   MTB Tec – Interaktionen
   Kein Framework, keine externen Requests.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobiles Menü ---------- */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('nav');

  function closeMenu() {
    if (!nav || !toggle) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Menü öffnen');
    document.body.classList.remove('nav-open');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
      document.body.classList.toggle('nav-open', isOpen);
    });

    // Menü schließen, wenn ein Link angeklickt wird
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu();
    });

    // Escape schließt das Menü
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });

    // Klick außerhalb schließt das Menü
    document.addEventListener('click', function (event) {
      if (!nav.classList.contains('is-open')) return;
      if (event.target.closest('#nav') || event.target.closest('#nav-toggle')) return;
      closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  /* ---------- Header-Schatten beim Scrollen ---------- */
  var header = document.getElementById('site-header');
  var ticking = false;

  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(onScroll);
  }, { passive: true });
  onScroll();

  /* ---------- Reveal-Animationen ---------- */
  var revealItems = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

    revealItems.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Aktiver Navigationspunkt ---------- */
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav-list a[href^="#"]');

  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    var linkFor = {};
    navLinks.forEach(function (link) {
      linkFor[link.getAttribute('href').slice(1)] = link;
    });

    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = linkFor[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('is-active'); });
          link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (section) { navObserver.observe(section); });
  }

  /* ---------- Jahr im Footer ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- Kontaktformular ---------- */
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  function showStatus(message, type) {
    if (!status) return;
    status.textContent = message;
    status.className = 'form-status is-visible ' + (type === 'error' ? 'is-error' : 'is-info');
  }

  if (form) {
    var action = form.getAttribute('action') || '';

    form.addEventListener('submit', function (event) {
      // Solange kein echter Formulardienst hinterlegt ist, nicht wirklich senden.
      if (action.indexOf('IHRE_FORM_ID') !== -1) {
        event.preventDefault();
        showStatus(
          'Das Formular ist noch nicht mit einem Versanddienst verbunden. ' +
          'Bitte schreiben Sie uns direkt an info@mtb-tec.de oder rufen Sie an: +49 123 456789.',
          'info'
        );
        return;
      }

      // Einfache Plausibilitätsprüfung zusätzlich zur Browser-Validierung
      var email = form.querySelector('#email');
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
        event.preventDefault();
        showStatus('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
        email.focus();
      }
    });
  }
})();
