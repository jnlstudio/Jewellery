/* JNL Studio Jewellery: mobile menu, gentle reveals, footer year. No dependencies. */
(function () {
  'use strict';

  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');

  function setMenu(open) {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  btn.addEventListener('click', function () {
    setMenu(btn.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      setMenu(false);
      btn.focus();
    }
  });
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('open') && !e.target.closest('.site-header')) setMenu(false);
  });
  window.matchMedia('(min-width: 761px)').addEventListener('change', function () {
    setMenu(false);
  });

  var items = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          seen.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { seen.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
