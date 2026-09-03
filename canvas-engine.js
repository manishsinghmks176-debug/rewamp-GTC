/* GTC canvas compatibility layer.
   The supplied index.html already contains the Melius-style canvas scenes and geometry.
   This file intentionally does not replace that DOM with a different node graph. */
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('canvas');
    if (!canvas) return;
    canvas.querySelectorAll('[style*="opacity:0"][style*="translateY(16px)"]').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    canvas.querySelectorAll('svg path[opacity="0"]').forEach(function (el) {
      el.style.opacity = '.72';
      el.style.strokeDasharray = '1 0';
    });
    canvas.querySelectorAll('svg g[opacity="0"]').forEach(function (el) {
      el.style.opacity = '1';
    });
  });
})();
