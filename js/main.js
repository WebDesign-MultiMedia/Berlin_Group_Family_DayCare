/* ═══════════════════════════════════════════════════════════
   Berlin Group Family Daycare — main.js
   Covers: language toggle · mobile nav · scroll effects
           canvas 2-D particles · form validation · reveal
═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Helpers ────────────────────────────────────────────── */
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); };

  /* Sanitise string for safe textContent assignment */
  function sanitize(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ══════════════════════════════════════════════════════════
     LANGUAGE TOGGLE
  ══════════════════════════════════════════════════════════ */
  var currentLang = 'en';

  /* Dropdown option text per language */
  var ageOptions = {
    en: [
      'Select…',
      'Infant (6 wks – 18 mo)',
      'Toddler / Pre-K (18 mo – 5 yr)',
      'School Age (5 – 12 yr)'
    ],
    es: [
      'Seleccione…',
      'Bebé (6 sem – 18 meses)',
      'Niño pequeño (18 meses – 5 años)',
      'Escolar (5 – 12 años)'
    ]
  };

  var msgPlaceholder = {
    en: 'I\'d like to schedule a tour…',
    es: 'Me gustaría agendar un tour…'
  };

  function applyLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.body.classList.toggle('lang-es', lang === 'es');

    /* Toggle active class on language buttons */
    $$('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    /* Update <select> options */
    var sel = $('#cf-age');
    if (sel) {
      var opts = ageOptions[lang];
      for (var i = 0; i < sel.options.length; i++) {
        sel.options[i].text = opts[i] || '';
      }
    }

    /* Update textarea placeholder */
    var ta = $('#cf-message');
    if (ta) ta.placeholder = msgPlaceholder[lang];

    /* Update form heading */
    updateFormHeading();
  }

  function updateFormHeading() {
    var h3 = $('.contact-form h3');
    if (!h3) return;
    h3.textContent = currentLang === 'es' ? 'Envíanos un Mensaje' : 'Send Us a Message';
  }

  /* Bind lang buttons */
  $$('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () { applyLang(btn.dataset.lang); });
  });

  /* ══════════════════════════════════════════════════════════
     MOBILE NAV
  ══════════════════════════════════════════════════════════ */
  var hamburger  = $('#hamburger');
  var mobileMenu = $('#mobile-menu');
  var menuOpen   = false;

  function openMenu()  { menuOpen = true;  mobileMenu.classList.add('open');    hamburger.classList.add('open');    hamburger.setAttribute('aria-expanded', 'true'); }
  function closeMenu() { menuOpen = false; mobileMenu.classList.remove('open'); hamburger.classList.remove('open'); hamburger.setAttribute('aria-expanded', 'false'); }
  function toggleMenu() { menuOpen ? closeMenu() : openMenu(); }

  if (hamburger) hamburger.addEventListener('click', toggleMenu);

  /* Close menu on any link click */
  if (mobileMenu) {
    mobileMenu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeMenu();
    });
  }

  /* Close menu on outside click */
  document.addEventListener('click', function (e) {
    if (menuOpen && hamburger && !hamburger.contains(e.target) && mobileMenu && !mobileMenu.contains(e.target)) {
      closeMenu();
    }
  });

  /* ══════════════════════════════════════════════════════════
     NAVBAR SCROLL SHADOW + SCROLL-TO-TOP
  ══════════════════════════════════════════════════════════ */
  var navbar    = $('#navbar');
  var scrollBtn = $('#scroll-top');

  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    if (navbar)    navbar.classList.toggle('scrolled', y > 12);
    if (scrollBtn) scrollBtn.classList.toggle('show', y > 420);
  }, { passive: true });

  if (scrollBtn) {
    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ══════════════════════════════════════════════════════════
     FOOTER YEAR
  ══════════════════════════════════════════════════════════ */
  var yearEl = $('#footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ══════════════════════════════════════════════════════════
     INTERSECTION OBSERVER — scroll reveal
  ══════════════════════════════════════════════════════════ */
  if ('IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    $$('.reveal').forEach(function (el) { revealObs.observe(el); });
  } else {
    /* Fallback: show everything immediately */
    $$('.reveal').forEach(function (el) { el.classList.add('revealed'); });
  }

  /* ══════════════════════════════════════════════════════════
     CONTACT FORM — validation + honeypot
  ══════════════════════════════════════════════════════════ */
  var form = $('#contact-form');

  function showErr(id, msg) {
    var el = $('#' + id);
    if (el) { el.textContent = msg; el.classList.add('show'); }
  }
  function clearErr(id) {
    var el = $('#' + id);
    if (el) { el.textContent = ''; el.classList.remove('show'); }
  }
  function validPhone(v) { return /^[\d\s\-()+]{7,20}$/.test(v); }
  function validEmail(v) { return /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/.test(v); }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      /* Honeypot — silently reject bots */
      var hp = form.querySelector('input[name="website"]');
      if (hp && hp.value) return;

      var es    = currentLang === 'es';
      var valid = true;

      ['ferr-name', 'ferr-phone', 'ferr-email'].forEach(clearErr);
      var successEl = $('#form-success');
      if (successEl) successEl.classList.remove('show');

      var nameVal  = $('#cf-name')  ? $('#cf-name').value.trim()  : '';
      var phoneVal = $('#cf-phone') ? $('#cf-phone').value.trim() : '';
      var emailVal = $('#cf-email') ? $('#cf-email').value.trim() : '';

      if (nameVal.length < 2) {
        showErr('ferr-name', es ? 'Por favor ingrese su nombre completo.' : 'Please enter your full name.');
        valid = false;
      }
      if (!validPhone(phoneVal)) {
        showErr('ferr-phone', es ? 'Por favor ingrese un número válido.' : 'Please enter a valid phone number.');
        valid = false;
      }
      if (emailVal && !validEmail(emailVal)) {
        showErr('ferr-email', es ? 'Correo electrónico no válido.' : 'Please enter a valid email address.');
        valid = false;
      }

      if (!valid) return;

      /* Simulate send */
      var submitBtn = $('#form-submit');
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = es ? 'Enviando…' : 'Sending…'; }

      setTimeout(function () {
        form.reset();
        applyLang(currentLang); /* restore translated placeholders */
        if (successEl) successEl.classList.add('show');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = es ? '😊 Enviar Mensaje' : '😊 Send Message';
        }
      }, 900);
    });
  }

  /* ══════════════════════════════════════════════════════════
     CANVAS — 2-D PARTICLE SYSTEM
     Circles + 4-point sparkle stars, floating upward
  ══════════════════════════════════════════════════════════ */
  (function () {
    var canvas = $('#bg-canvas');
    if (!canvas || !canvas.getContext) return;

    var ctx = canvas.getContext('2d');
    var W = 0, H = 0, RAF;

    /* Brand palette */
    var COLORS = [
      '#12B5AC', '#FF6B9D', '#FFD93D',
      '#9B5DE5', '#FF8C42', '#4CAF50',
      '#ffffff',  '#ffffff',
      '#FFD93D',  '#12B5AC'
    ];

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize, { passive: true });
    resize();

    /* ── Particle ── */
    function Particle(spread) {
      this.init(spread);
    }

    Particle.prototype.init = function (spread) {
      this.x      = Math.random() * W;
      this.y      = spread ? Math.random() * H : H + 20;
      this.r      = Math.random() * 3.8 + 1.5;
      this.vy     = -(Math.random() * 0.55 + 0.18);
      this.vx     = (Math.random() - 0.5) * 0.3;
      this.wobble = Math.random() * Math.PI * 2;
      this.wSpd   = Math.random() * 0.022 + 0.008;
      this.color  = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.alpha  = spread ? Math.random() * 0.42 : 0;
      this.aIn    = Math.random() * 0.007 + 0.004;
      this.aMax   = Math.random() * 0.42 + 0.12;
      this.fading = false;
      this.type   = Math.random() < 0.28 ? 'star' : 'circle';
      this.rot    = Math.random() * Math.PI;
      this.rSpd   = (Math.random() - 0.5) * 0.035;
    };

    /* 4-point sparkle star */
    function drawStar(x, y, r, rot, color, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle   = color;
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.beginPath();
      var pts = 8;
      for (var i = 0; i < pts; i++) {
        var a   = (i / pts) * Math.PI * 2;
        var rad = i % 2 === 0 ? r * 1.8 : r * 0.5;
        i === 0 ? ctx.moveTo(Math.cos(a) * rad, Math.sin(a) * rad)
                : ctx.lineTo(Math.cos(a) * rad, Math.sin(a) * rad);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    /* ── Particle count: hard cap at 35 to keep GPU free ── */
    function getCount() {
      return Math.min(35, Math.max(15, Math.floor(W * H / 22000)));
    }

    var particles = [];
    function buildParticles() {
      var n = getCount();
      particles = [];
      for (var i = 0; i < n; i++) particles.push(new Particle(true));
    }
    buildParticles();

    window.addEventListener('resize', function () {
      var n = getCount();
      while (particles.length < n) particles.push(new Particle(false));
      while (particles.length > n) particles.pop();
    }, { passive: true });

    /* ── Render loop — throttled to ~30 fps ── */
    var FPS_INTERVAL = 1000 / 30;
    var lastFrameTime = 0;

    function tick(now) {
      RAF = requestAnimationFrame(tick);
      if (now - lastFrameTime < FPS_INTERVAL) return;  /* skip frame */
      lastFrameTime = now - ((now - lastFrameTime) % FPS_INTERVAL);

      ctx.clearRect(0, 0, W, H);

      for (var k = 0; k < particles.length; k++) {
        var p = particles[k];

        /* Move */
        p.y      += p.vy;
        p.x      += p.vx + Math.sin(p.wobble) * 0.38;
        p.wobble += p.wSpd;
        p.rot    += p.rSpd;

        /* Fade in then out near top */
        if (!p.fading) {
          p.alpha += p.aIn;
          if (p.alpha >= p.aMax) { p.alpha = p.aMax; p.fading = true; }
        } else if (p.y < H * 0.18) {
          p.alpha -= p.aIn * 1.9;
        }

        /* Recycle */
        if (p.alpha <= 0 || p.y < -p.r * 3 || p.x < -40 || p.x > W + 40) {
          p.init(false);
        }

        /* Draw */
        if (p.type === 'star') {
          drawStar(p.x, p.y, p.r, p.rot, p.color, p.alpha);
        } else {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle   = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
    }

    /* Pause when tab hidden — saves CPU/battery */
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) cancelAnimationFrame(RAF);
      else RAF = requestAnimationFrame(tick);
    });

    RAF = requestAnimationFrame(tick);
  }());

  /* ── Init ─────────────────────────────────────────────── */
  applyLang('en');

}());
