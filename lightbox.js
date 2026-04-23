(function () {
  const gallery = document.querySelector('.product-gallery');
  if (!gallery) return;

  /* ── Build lightbox DOM ────────────────────────────────────── */
  const lb = document.createElement('div');
  lb.id = 'crs-lightbox';
  lb.innerHTML = `
    <div class="lb-backdrop"></div>
    <button class="lb-close" aria-label="Close">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
    <button class="lb-prev" aria-label="Previous image">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M15 18l-6-6 6-6"/>
      </svg>
    </button>
    <div class="lb-img-wrap">
      <img id="lb-img" src="" alt="">
    </div>
    <button class="lb-next" aria-label="Next image">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </button>
    <div class="lb-counter"></div>
  `;
  document.body.appendChild(lb);

  /* ── State ─────────────────────────────────────────────────── */
  let images = [];
  let current = 0;

  function getImages() {
    return Array.from(document.querySelectorAll('.gallery-thumb img')).map(img => img.src);
  }

  /* ── Open / close ──────────────────────────────────────────── */
  function open(index) {
    images = getImages();
    current = Math.max(0, Math.min(index, images.length - 1));
    render();
    lb.classList.add('lb-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('lb-open');
    document.body.style.overflow = '';
  }

  /* ── Render current image ──────────────────────────────────── */
  function render() {
    document.getElementById('lb-img').src = images[current];
    lb.querySelector('.lb-counter').textContent = (current + 1) + ' / ' + images.length;
    lb.querySelector('.lb-prev').style.visibility = images.length > 1 ? 'visible' : 'hidden';
    lb.querySelector('.lb-next').style.visibility = images.length > 1 ? 'visible' : 'hidden';
  }

  function prev() { current = (current - 1 + images.length) % images.length; render(); }
  function next() { current = (current + 1) % images.length; render(); }

  /* ── Click on featured image to open ──────────────────────── */
  const featuredImg = document.getElementById('featuredImg');
  if (featuredImg) {
    featuredImg.style.cursor = 'zoom-in';
    featuredImg.addEventListener('click', function () {
      const imgs = getImages();
      const idx = imgs.findIndex(s => s === this.src);
      open(idx >= 0 ? idx : 0);
    });
  }

  /* ── Controls ──────────────────────────────────────────────── */
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-backdrop').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); prev(); });
  lb.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); next(); });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('lb-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
})();
