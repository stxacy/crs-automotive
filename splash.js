(function () {
  // Detect if we're on the homepage
  const path = window.location.pathname;
  const isHome = path.endsWith('index.html') || path.endsWith('/crs-automotive/') || path === '/';

  // First-ever visit = no localStorage key
  const hasVisited = localStorage.getItem('crs_visited');
  const showClickToEnter = isHome && !hasVisited;

  /* ── Styles ─────────────────────────────────────────────── */
  const css = document.createElement('style');
  css.textContent = `
    #crs-splash {
      position: fixed;
      inset: 0;
      background: #000;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2.5rem;
      opacity: 1;
      transition: opacity 0.7s ease;
    }
    #crs-splash.splash-out {
      opacity: 0;
      pointer-events: none;
    }
    .splash-logo-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .splash-logo-wrap img {
      width: clamp(160px, 30vw, 260px);
      opacity: 0;
      transform: scale(0.88);
      animation: splashLogoIn 0.75s cubic-bezier(0.22,1,0.36,1) 0.2s forwards;
      filter: brightness(1.05);
    }
    @keyframes splashLogoIn {
      to { opacity: 1; transform: scale(1); }
    }
    .splash-line {
      width: 0;
      height: 2px;
      background: #e3101c;
      animation: splashLine 0.6s ease 0.7s forwards;
    }
    @keyframes splashLine {
      to { width: clamp(80px, 15vw, 140px); }
    }
    .splash-enter-btn {
      opacity: 0;
      transform: translateY(8px);
      animation: splashBtnIn 0.5s ease 1.2s forwards;
      background: transparent;
      border: 1px solid rgba(255,255,255,0.35);
      color: #fff;
      font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif;
      font-size: 0.78rem;
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      padding: 0.8rem 2.8rem;
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s, color 0.2s;
    }
    .splash-enter-btn:hover {
      border-color: #e3101c;
      background: rgba(227,16,28,0.1);
      color: #fff;
    }
    @keyframes splashBtnIn {
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(css);

  /* ── Markup ─────────────────────────────────────────────── */
  const splash = document.createElement('div');
  splash.id = 'crs-splash';

  const logoWrap = document.createElement('div');
  logoWrap.className = 'splash-logo-wrap';
  const logo = document.createElement('img');
  logo.src = 'crslogo.png';
  logo.alt = 'CRS Automotive Parts';
  logoWrap.appendChild(logo);
  splash.appendChild(logoWrap);

  const line = document.createElement('div');
  line.className = 'splash-line';
  splash.appendChild(line);

  if (showClickToEnter) {
    const btn = document.createElement('button');
    btn.className = 'splash-enter-btn';
    btn.textContent = 'Click to Enter';
    btn.addEventListener('click', function () {
      localStorage.setItem('crs_visited', '1');
      dismiss();
    });
    splash.appendChild(btn);
  }

  document.body.appendChild(splash);

  /* ── Dismiss logic ──────────────────────────────────────── */
  function dismiss() {
    splash.classList.add('splash-out');
    setTimeout(function () { splash.remove(); }, 720);
  }

  if (!showClickToEnter) {
    // Auto-dismiss after logo animation completes
    setTimeout(dismiss, 1800);
  }
})();
