/* ============================================================
   Bomberos Restrepo — interacción (vanilla, sin dependencias)
   Navbar scroll · menú móvil accesible · contadores · reveal · video · scrollspy
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Año en el footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Medir la barra fija (emergencia + navbar) para offset de anclas ---------- */
  var topbar = document.getElementById('topbar');
  function measureTopbar() {
    if (!topbar) return;
    document.documentElement.style.setProperty('--topbar-h', topbar.offsetHeight + 'px');
  }
  measureTopbar();
  window.addEventListener('load', measureTopbar);
  window.addEventListener('resize', measureTopbar, { passive: true });

  /* ---------- Navbar: sombra al hacer scroll (passive + rAF) ---------- */
  var header = document.getElementById('site-header');
  if (header) {
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        header.classList.toggle('is-scrolled', window.scrollY > 24);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Menú móvil accesible ---------- */
  var nav = document.querySelector('.nav');
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  var closeBtn = document.getElementById('navClose');
  var scrim = document.getElementById('navScrim');
  var lastFocused = null;

  function setMenu(open) {
    if (!nav || !toggle) return;
    nav.setAttribute('data-open', open ? 'true' : 'false');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    if (scrim) {
      if (open) { scrim.hidden = false; requestAnimationFrame(function () { scrim.classList.add('is-visible'); }); }
      else { scrim.classList.remove('is-visible'); setTimeout(function () { scrim.hidden = true; }, 220); }
    }
    // Bloquear scroll de fondo solo en móvil (cuando el menú es overlay)
    var isOverlay = window.matchMedia('(max-width: 959px)').matches;
    document.body.style.overflow = (open && isOverlay) ? 'hidden' : '';

    if (open) {
      lastFocused = document.activeElement;
      var first = menu && menu.querySelector('a, button');
      if (first && isOverlay) first.focus();
    } else if (lastFocused && lastFocused.focus) {
      lastFocused.focus();
    }
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      setMenu(nav.getAttribute('data-open') !== 'true');
    });
  }
  if (closeBtn) closeBtn.addEventListener('click', function () { setMenu(false); });
  if (scrim) scrim.addEventListener('click', function () { setMenu(false); });

  // Cerrar al activar un enlace del menú
  if (menu) {
    menu.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (link) setMenu(false);
    });
  }

  // Esc cierra; foco atrapado dentro del menú abierto en móvil
  document.addEventListener('keydown', function (e) {
    if (nav && nav.getAttribute('data-open') === 'true') {
      if (e.key === 'Escape') { setMenu(false); return; }
      if (e.key === 'Tab' && window.matchMedia('(max-width: 959px)').matches) {
        var focusables = menu.querySelectorAll('a[href], button:not([disabled])');
        if (!focusables.length) return;
        var firstEl = focusables[0];
        var lastEl = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
      }
    }
  });

  // Reset al pasar a desktop
  window.addEventListener('resize', function () {
    if (window.matchMedia('(min-width: 960px)').matches && nav && nav.getAttribute('data-open') === 'true') {
      setMenu(false);
    }
  });

  /* ---------- Reveal on scroll ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = parseInt(entry.target.getAttribute('data-reveal-delay') || '0', 10);
          var el = entry.target;
          setTimeout(function () { el.classList.add('is-visible'); }, delay);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { revObserver.observe(el); });
  }

  /* ---------- Contadores ---------- */
  var counters = Array.prototype.slice.call(document.querySelectorAll('.stat__num[data-count]'));
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var plain = el.getAttribute('data-plain') === 'true';
    if (reduceMotion || plain || isNaN(target)) { el.textContent = target + suffix; return; }
    var start = null;
    var dur = 1100;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }
  if (counters.length) {
    if (!('IntersectionObserver' in window)) {
      counters.forEach(function (el) { el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || ''); });
    } else {
      var countObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { animateCount(entry.target); obs.unobserve(entry.target); }
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) {
        // Cifra real en el HTML (mejora progresiva); con JS se anima desde 0.
        if (!reduceMotion && el.getAttribute('data-plain') !== 'true') {
          el.textContent = '0' + (el.getAttribute('data-suffix') || '');
        }
        countObserver.observe(el);
      });
    }
  }

  /* ---------- Video click-to-play ---------- */
  var videoWrap = document.getElementById('video');
  if (videoWrap) {
    var videoEl = videoWrap.querySelector('.video__el');
    var playBtn = document.getElementById('videoPlay');
    var caption = videoWrap.querySelector('.video__caption');
    function startVideo() {
      if (!videoEl) return;
      videoEl.play();
      if (playBtn) playBtn.classList.add('is-hidden');
      if (caption) caption.classList.add('is-hidden');
    }
    if (playBtn) playBtn.addEventListener('click', startVideo);
    if (videoEl) {
      videoEl.addEventListener('play', function () {
        if (playBtn) playBtn.classList.add('is-hidden');
        if (caption) caption.classList.add('is-hidden');
      });
      videoEl.addEventListener('pause', function () {
        if (playBtn) playBtn.classList.remove('is-hidden');
        if (caption) caption.classList.remove('is-hidden');
      });
    }
  }

  /* ---------- Scrollspy: enlace activo según sección visible ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
  var sections = navLinks
    .map(function (l) { var id = l.getAttribute('href'); return id && id.charAt(0) === '#' ? document.querySelector(id) : null; })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = '#' + entry.target.id;
          navLinks.forEach(function (l) {
            if (l.getAttribute('href') === id) l.setAttribute('aria-current', 'page');
            else l.removeAttribute('aria-current');
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }
})();
