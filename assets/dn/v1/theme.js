/* ducnguyen.vn — Design System v1.0 · chế độ sáng/tối (BẤT BIẾN). Đặt trong <head>, TRƯỚC CSS, không defer. */
(function () {
  var K = 'dn-theme', d = document.documentElement;
  function stored() { try { return localStorage.getItem(K); } catch (e) { return null; } }
  function system() { try { return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'; } catch (e) { return 'dark'; } }
  function apply(t) {
    d.setAttribute('data-theme', t);
    d.classList.toggle('dark', t === 'dark');
    var s = document.querySelectorAll('[data-dn-theme-toggle]');
    for (var i = 0; i < s.length; i++) {
      s[i].setAttribute('aria-pressed', t === 'light' ? 'true' : 'false');
      s[i].setAttribute('aria-label', t === 'light' ? 'Chuyển sang giao diện tối' : 'Chuyển sang giao diện sáng');
    }
  }
  /* mặc định TỐI (giao diện gốc của site); trang đặt data-dn-default="system" trên <html> thì theo máy */
  var t = stored(); if (t !== 'light' && t !== 'dark') t = d.getAttribute('data-dn-default') === 'system' ? system() : (d.getAttribute('data-dn-default') === 'light' ? 'light' : 'dark');
  apply(t);
  document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest ? e.target.closest('[data-dn-theme-toggle]') : null;
    if (!b) return;
    t = d.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    try { localStorage.setItem(K, t); } catch (x) {}
    apply(t);
  });
  document.addEventListener('DOMContentLoaded', function () { apply(d.getAttribute('data-theme') || t); });
  window.dnTheme = { set: function (v) { try { localStorage.setItem(K, v); } catch (x) {} apply(v); } };
})();
