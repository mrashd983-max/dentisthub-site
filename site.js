// Language: the visitor's choice, else the browser's language. Both languages are in
// every page; CSS shows one. Nothing is tracked.
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  var lang = saved || ((navigator.language || '').toLowerCase().indexOf('ar') === 0 ? 'ar' : 'en');
  function apply(l) {
    root.lang = l;
    root.dir = l === 'ar' ? 'rtl' : 'ltr';
    var t = document.querySelector('meta[name="title-' + l + '"]');
    if (t) document.title = t.content;
  }
  apply(lang);
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-lang-toggle]');
    if (!b) return;
    lang = root.lang === 'ar' ? 'en' : 'ar';
    try { localStorage.setItem('lang', lang); } catch (err) {}
    apply(lang);
  });
  document.addEventListener('DOMContentLoaded', function () {
    var y = document.querySelectorAll('[data-year]');
    for (var i = 0; i < y.length; i++) y[i].textContent = new Date().getFullYear();
  });
})();
