// === Robust Scope Cursor ===
(() => {
  function initScope() {
    try {
      // Create (or reuse) the overlay canvas
      let canvas = document.getElementById('cursorScope');
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'cursorScope';
        // minimal inline styles in case CSS hasn't loaded yet
        Object.assign(canvas.style, {
          position: 'fixed',
          inset: '0',
          pointerEvents: 'none',
          zIndex: '99998'
        });
        document.body.appendChild(canvas);
      }

      // Only hide the native cursor when scope is running
      document.body.classList.add('scope-on');

      const ctx = canvas.getContext('2d', { alpha: true });
      let W = canvas.width = window.innerWidth;
      let H = canvas.height = window.innerHeight;

      let mx = -1, my = -1;  // start off-screen so you see native cursor until we have a position
      const base = 14;       // thickness at the cursor (px)
      const crossLen = 12;   // small crosshair length (px)
      const color = '#242424';

      function resize() {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width  = Math.floor(W * DPR);
        canvas.height = Math.floor(H * DPR);
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);  // draw in CSS pixels
        }
      window.addEventListener('resize', resize, { passive: true });

      window.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;
      }, { passive: true });

      window.addEventListener('mouseleave', () => {
        mx = -1; my = -1;   // stop drawing when pointer leaves window
      }, { passive: true });

      // Draw a tapered triangle from the cursor (base) to an edge (tip)
      function drawTaper(toX, toY, baseX, baseY) {
        const dx = toX - baseX, dy = toY - baseY;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len, ny = dx / len; // normal
        const half = base / 2;

        ctx.beginPath();
        ctx.moveTo(baseX + nx * half, baseY + ny * half);
        ctx.lineTo(toX, toY);
        ctx.lineTo(baseX - nx * half, baseY - ny * half);
        ctx.closePath();
        ctx.fill();
      }

      function loop() {
        ctx.clearRect(0, 0, W, H);

        if (mx >= 0 && my >= 0) {
            ctx.save();
            
            ctx.globalCompositeOperation = 'source-over'; // blend handled by CSS
            ctx.strokeStyle = '#fff';

            ctx.lineWidth = 0.1;

            // horizontal line
            ctx.beginPath();
            ctx.moveTo(0, my);
            ctx.lineTo(W, my);
            ctx.stroke();

            // vertical line
            ctx.beginPath();
            ctx.moveTo(mx, 0);
            ctx.lineTo(mx, H);
            ctx.stroke();

            // crosshair in the middle (thicker)
            ctx.lineWidth = 0.25;
            ctx.beginPath();
            ctx.moveTo(mx - crossLen, my);
            ctx.lineTo(mx + crossLen, my);
            ctx.moveTo(mx, my - crossLen);
            ctx.lineTo(mx, my + crossLen);
            ctx.stroke();

            ctx.restore();
        }

        requestAnimationFrame(loop);
        }



      loop();
    } catch (err) {
      // If anything fails, restore native cursor
      console.error('Scope init failed:', err);
      document.body.classList.remove('scope-on');
      const c = document.getElementById('cursorScope');
      if (c && c.parentNode) c.parentNode.removeChild(c);
    }
  }

  // Run after DOM is ready so <body> definitely exists
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScope, { once: true });
  } else {
    initScope();
  }
})();
