/* Waterways of the Low Countries — app logic */
(() => {
  'use strict';

  // ─── ERA DATA ──────────────────────────────────────────────
  // Each era's text content + ordered list of Wikimedia Commons filenames
  // to try for the period photo. First one that loads wins.
  const ERAS = {
    1: {
      num: 'I', tag: '47 – 400 CE · Roman', range: '47 CE',
      title: 'Engineering arrives at the <em>mouth of the Rhine</em>',
      desc: 'The first engineered waterways in the Low Countries were Roman. The Fossa Corbulonis, cut around 47 CE, linked the Rhine to the Meuse so ships could avoid the dangerous North Sea coast.',
      images: [
        { file: 'Fossa_Corbulonis_map.png',
          cap: '<strong>Fossa Corbulonis.</strong> Archaeological map of the Roman canal linking Rhine and Meuse estuaries, c. 47 CE. Wikimedia Commons.' },
        { file: 'Archeological_map_of_Rhineland_and_Delfland_(Netherlands)_during_the_Roman_Empire,_with_legend_(NL_language).svg',
          cap: '<strong>Roman Rhineland & Delfland.</strong> Archaeological map with legend. Wikimedia Commons.' }
      ]
    },
    2: {
      num: 'II', tag: '500 – 1000 · Early Medieval', range: 'c. 800',
      title: 'The Frisians return <em>to the rivers</em>',
      desc: 'Roman works decayed. Trade reverted to natural rivers, dominated by Frisian merchants operating from Dorestad — for two centuries the largest trading port in northwest Europe.',
      images: [
        { file: 'Frisia_716-la.svg',
          cap: '<strong>Frisia, c. 716 CE.</strong> Extent of Frisian territory on the Rhine delta. Wikimedia Commons.' },
        { file: 'Bronzen_schildpadfibula_uit_Dorestad_(800-900),_Rijksmuseum_van_Oudheden,_Leiden.JPG',
          cap: '<strong>Dorestad fibula, 9th c.</strong> Turtle brooch excavated at Dorestad. Rijksmuseum van Oudheden, Leiden. Wikimedia Commons.' }
      ]
    },
    3: {
      num: 'III', tag: '1000 – 1500 · Medieval', range: 'c. 1400',
      title: 'First dikes, <em>first canals</em>',
      desc: 'Bruges reached open water via Damme on the Zwin inlet; Ghent and Ypres built their own canal lines; the first polders were ringed and drained in Holland.',
      images: [
        { file: 'Geschilderde_plan_Brugge.jpg',
          cap: '<strong>Painted plan of Bruges,</strong> 16th century. Canals woven through the medieval city — the network of the Zwin era. Groeningemuseum / Wikimedia Commons.' },
        { file: 'Plan_van_Brugge,_1563,_Groeningemuseum,_0040265000.jpg',
          cap: '<strong>Plan of Bruges, 1563.</strong> Groeningemuseum / Wikimedia Commons.' }
      ]
    },
    4: {
      num: 'IV', tag: '1500 – 1700 · Dutch Golden Age', range: '1613',
      title: 'The densest waterway <em>network on Earth</em>',
      desc: 'Amsterdam laid out its grachtengordel from 1613. Engineers drained the Beemster, Schermer, and Purmer. The trekvaart barge network linked every major Dutch city on reliable schedules.',
      images: [
        { file: 'Hollandia_Comitatvs_-_Atlas_Maior,_vol_4,_map_42_-_Joan_Blaeu,_1667_-_BL_114.h(star).4.(42).jpg',
          cap: '<strong>Hollandia Comitatus.</strong> Joan Blaeu, Atlas Maior, vol. 4, map 42, 1667. British Library / Wikimedia Commons.' },
        { file: 'Blaeu_1645_-_Novus_XVII_Inferioris_Germaniæ_Provinciarum_typus.jpg',
          cap: '<strong>Novus XVII Inferioris Germaniæ Provinciarum typus.</strong> Willem Blaeu, 1645. Wikimedia Commons.' }
      ]
    },
    5: {
      num: 'V', tag: '1700 – 1900 · Industrial', range: '1876',
      title: 'Ship canals replace <em>barge canals</em>',
      desc: 'Six new cuts to the sea: the North Holland Canal, the North Sea Canal to Amsterdam, the New Waterway to Rotterdam, and Belgium\u2019s Ghent\u2013Terneuzen, Brussels\u2013Charleroi, and Brussels\u2013Scheldt canals.',
      images: [
        { file: 'Luchtopname_van_de_Oudehaven,_Wijnhaven,_Haringvliet_en_Nieuwehaven_en_omgeving_1935.jpg',
          cap: '<strong>Rotterdam harbours from the air, 1935.</strong> Oudehaven, Wijnhaven, Haringvliet, Nieuwehaven. Wikimedia Commons.' },
        { file: 'Luchtfoto_van_het_Noordzeekanaal_met_de_Hembrug_in_1914.jpg',
          cap: '<strong>Noordzeekanaal with the Hembrug, 1914.</strong> Aerial view of the ship canal to Amsterdam. Wikimedia Commons.' }
      ]
    },
    6: {
      num: 'VI', tag: '1900 – 2000 · Twentieth Century', range: '1932–97',
      title: 'Closing off <em>the sea</em>',
      desc: 'The Afsluitdijk sealed the Zuiderzee in 1932, turning a bay into the freshwater IJsselmeer and enabling the Flevoland polders. After the 1953 flood, the Delta Works dammed Zeeland\u2019s estuaries. Belgium built the Albert Canal.',
      images: [
        { file: 'NIMH_-_2011_-_3551_-_Aerial_photograph_of_Afsluitdijk_construction,_The_Netherlands.jpg',
          cap: '<strong>Afsluitdijk under construction, c. 1931.</strong> Aerial photograph from the Nederlands Instituut voor Militaire Historie. Wikimedia Commons.' },
        { file: 'Afsluitdijk_Netherlands_Satellite_Photo_by_Sentinel-2_30_June_2018.jpg',
          cap: '<strong>Afsluitdijk from space.</strong> Sentinel-2 satellite photo, 2018. Wikimedia Commons.' }
      ]
    },
    7: {
      num: 'VII', tag: 'Today', range: '2026',
      title: 'Two world ports, <em>one network</em>',
      desc: 'Rotterdam and Antwerp-Bruges are Europe\u2019s two largest ports, linked by one of the densest inland shipping networks on Earth. The historic canals at Amsterdam, Bruges, and Ghent are UNESCO-listed.',
      images: [
        { file: 'ISS-53_Rotterdam,_Den_Haag_and_Amsterdam_in_the_Netherlands.jpg',
          cap: '<strong>Randstad from orbit.</strong> Rotterdam, Den Haag and Amsterdam at night from the International Space Station (Expedition 53). NASA / Wikimedia Commons.' },
        { file: 'Aerial_view_of_Princess_Amalia_Wind_Farm_in_the_North_Sea_2019.jpg',
          cap: '<strong>Princess Amalia Wind Farm,</strong> North Sea, 2019. Wikimedia Commons.' }
      ]
    }
  };

  const WM = 'https://commons.wikimedia.org/wiki/Special:FilePath/';
  const wmUrl = (file, w) => WM + encodeURIComponent(file) + (w ? '?width=' + w : '');

  // ─── STATE ──────────────────────────────────────────────
  const body = document.body;
  const chipBar = document.getElementById('chipBar');
  const chips = [...chipBar.querySelectorAll('.chip')];
  const elRange = document.getElementById('range');
  const elNum = document.getElementById('eraNum');
  const elTag = document.getElementById('eraTag');
  const elTitle = document.getElementById('eraTitle');
  const elDesc = document.getElementById('eraDesc');
  const elInfo = document.querySelector('.info');
  const elPanelPhoto = document.getElementById('panelPhoto');
  const elPhotoImg = document.getElementById('photoImg');
  const elPhotoLoader = document.getElementById('photoLoader');
  const elPhotoError = document.getElementById('photoError');
  const elPhotoCap = document.getElementById('photoCap');
  const elStage = document.getElementById('stage');
  const vtButtons = [...document.querySelectorAll('.vt')];

  let current = 1;
  let currentView = 'map';
  let scrollTO = null;
  const photoCache = new Map(); // era -> {src, cap}

  // ─── CORE ACTIONS ──────────────────────────────────────────────
  function setEra(n, { scroll = true } = {}) {
    n = Math.max(1, Math.min(7, n | 0));
    if (n === current) return;
    current = n;
    const e = ERAS[n];
    body.setAttribute('data-era', n);

    // Update info
    elNum.textContent = e.num;
    elTag.textContent = e.tag;
    elTitle.innerHTML = e.title;
    elDesc.textContent = e.desc;
    elRange.textContent = e.range;

    // Fade in
    elInfo.classList.remove('fade');
    void elInfo.offsetWidth;
    elInfo.classList.add('fade');

    // Update chips
    chips.forEach(c => c.setAttribute('aria-current', c.dataset.era == n ? 'true' : 'false'));

    if (scroll) {
      const chip = chips.find(c => c.dataset.era == n);
      if (chip) chip.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }

    // If on photo view, refresh photo; otherwise defer until user switches
    if (currentView === 'photo') loadPhoto(n);

    // Deep link
    history.replaceState(null, '', '#era-' + n + (currentView === 'photo' ? '-photo' : ''));
  }

  function setView(v) {
    if (v !== 'map' && v !== 'photo') return;
    if (v === currentView) return;
    currentView = v;
    body.setAttribute('data-view', v);
    vtButtons.forEach(b => b.setAttribute('aria-current', b.dataset.view === v ? 'true' : 'false'));
    if (v === 'photo') loadPhoto(current);
    history.replaceState(null, '', '#era-' + current + (v === 'photo' ? '-photo' : ''));
  }

  // ─── PHOTO LOADING ──────────────────────────────────────────────
  function showLoading(on) {
    elPhotoLoader.setAttribute('data-on', on ? 'true' : 'false');
  }
  function showError(on) {
    if (on) elPhotoError.removeAttribute('hidden');
    else elPhotoError.setAttribute('hidden', '');
  }

  function loadPhoto(eraNum) {
    const e = ERAS[eraNum];
    if (!e || !e.images || !e.images.length) { showError(true); showLoading(false); return; }

    // Cached?
    const cached = photoCache.get(eraNum);
    if (cached) {
      const frame = document.querySelector('.photo-frame');
      if (frame && cached.ar) {
        frame.style.setProperty('--ar', cached.ar.toFixed(3));
        frame.setAttribute('data-has-image', 'true');
      }
      elPhotoImg.src = cached.src;
      elPhotoImg.alt = cached.alt;
      elPhotoImg.removeAttribute('data-loading');
      elPhotoCap.innerHTML = cached.cap;
      showLoading(false); showError(false);
      return;
    }

    showLoading(true);
    showError(false);
    elPhotoImg.setAttribute('data-loading', 'true');
    elPhotoImg.removeAttribute('src');
    elPhotoCap.innerHTML = '';

    // Try each candidate image in order until one loads
    const tryIndex = (i) => {
      if (i >= e.images.length) {
        showLoading(false);
        showError(true);
        return;
      }
      const candidate = e.images[i];
      const src = wmUrl(candidate.file, 720);
      const probe = new Image();
      probe.onload = () => {
        // Only commit if era hasn't changed since we started
        if (current !== eraNum && currentView !== 'photo') return;
        // Aspect-aware frame: fit frame to this image's real aspect ratio
        const ar = (probe.naturalWidth && probe.naturalHeight)
          ? probe.naturalWidth / probe.naturalHeight
          : 4 / 3;
        const frame = document.querySelector('.photo-frame');
        if (frame) {
          frame.style.setProperty('--ar', ar.toFixed(3));
          frame.setAttribute('data-has-image', 'true');
        }
        elPhotoImg.src = src;
        elPhotoImg.alt = (candidate.cap || '').replace(/<[^>]+>/g, '');
        elPhotoImg.removeAttribute('data-loading');
        elPhotoCap.innerHTML = candidate.cap;
        showLoading(false);
        showError(false);
        photoCache.set(eraNum, { src, alt: elPhotoImg.alt, cap: candidate.cap, ar });
      };
      probe.onerror = () => tryIndex(i + 1);
      probe.src = src;
    };
    tryIndex(0);
  }

  // ─── CHIP BAR: click, scroll-snap detection ──────────────────────────────────────────────
  chips.forEach(c => c.addEventListener('click', () => setEra(+c.dataset.era)));

  chipBar.addEventListener('scroll', () => {
    clearTimeout(scrollTO);
    scrollTO = setTimeout(() => {
      const center = chipBar.scrollLeft + chipBar.clientWidth / 2;
      let best = chips[0], bd = Infinity;
      for (const c of chips) {
        const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
        if (d < bd) { bd = d; best = c; }
      }
      setEra(+best.dataset.era, { scroll: false });
    }, 130);
  }, { passive: true });

  // ─── VIEW TOGGLE ──────────────────────────────────────────────
  vtButtons.forEach(b => b.addEventListener('click', () => setView(b.dataset.view)));

  // ─── KEYBOARD ──────────────────────────────────────────────
  addEventListener('keydown', (e) => {
    if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
    if (e.key === 'ArrowLeft') setEra(current - 1);
    else if (e.key === 'ArrowRight') setEra(current + 1);
    else if (/^[1-7]$/.test(e.key)) setEra(+e.key);
    else if (e.key === 'm' || e.key === 'M') setView('map');
    else if (e.key === 'p' || e.key === 'P') setView('photo');
  });

  // ─── SWIPE ON STAGE ──────────────────────────────────────────────
  let tx = 0, ty = 0, tt = 0;
  elStage.addEventListener('touchstart', (e) => {
    tx = e.touches[0].clientX; ty = e.touches[0].clientY; tt = Date.now();
  }, { passive: true });
  elStage.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - tx;
    const dy = e.changedTouches[0].clientY - ty;
    const dt = Date.now() - tt;
    if (dt < 600 && Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.6) {
      setEra(current + (dx < 0 ? 1 : -1));
    }
  }, { passive: true });

  // ─── DEEP LINK ──────────────────────────────────────────────
  (function initFromHash() {
    const m = /^#era-([1-7])(?:-(map|photo))?$/.exec(location.hash || '');
    if (m) {
      const n = +m[1];
      const v = m[2] || 'map';
      // Set era without triggering scroll animation before layout
      if (v === 'photo') {
        currentView = 'photo';
        body.setAttribute('data-view', 'photo');
        vtButtons.forEach(b => b.setAttribute('aria-current', b.dataset.view === 'photo' ? 'true' : 'false'));
      }
      if (n !== 1) {
        current = 0; // force setEra to apply
        setEra(n, { scroll: true });
      } else if (v === 'photo') {
        loadPhoto(1);
      }
    }
    requestAnimationFrame(() => {
      const chip = chips.find(c => c.dataset.era == current);
      if (chip) chip.scrollIntoView({ inline: 'center', block: 'nearest' });
    });
  })();

  // ─── ZOOM LIGHTBOX ──────────────────────────────────────────────
  // Tap inline photo → full-screen zoom view with pinch, pan, double-tap.
  const lb = document.getElementById('lightbox');
  const lbStage = document.getElementById('lbStage');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCap');
  const lbSpin = document.getElementById('lbSpin');
  const lbCloseBtn = document.getElementById('lbClose');
  const photoFrame = document.querySelector('.photo-frame');

  // Transform state
  let lbScale = 1, lbTX = 0, lbTY = 0;
  const MIN_SCALE = 1, MAX_SCALE = 6;

  // Gesture state
  let g = null; // active gesture: { type: 'pan'|'pinch', ... }

  function applyLB() {
    lbImg.style.transform = `translate(${lbTX}px, ${lbTY}px) scale(${lbScale})`;
  }
  function resetLB() { lbScale = 1; lbTX = 0; lbTY = 0; applyLB(); }

  function clampPan() {
    // Keep image within reasonable bounds when zoomed
    if (lbScale <= 1) { lbTX = 0; lbTY = 0; return; }
    const r = lbStage.getBoundingClientRect();
    const iw = lbImg.naturalWidth, ih = lbImg.naturalHeight;
    if (!iw || !ih) return;
    // Base displayed size (contained in stage)
    const baseScale = Math.min(r.width / iw, r.height / ih);
    const displayW = iw * baseScale * lbScale;
    const displayH = ih * baseScale * lbScale;
    const maxX = Math.max(0, (displayW - r.width) / 2);
    const maxY = Math.max(0, (displayH - r.height) / 2);
    lbTX = Math.max(-maxX, Math.min(maxX, lbTX));
    lbTY = Math.max(-maxY, Math.min(maxY, lbTY));
  }

  function openLB() {
    const e = ERAS[current];
    if (!e || !e.images || !e.images.length) return;
    // Prefer the image already successfully loaded in the inline frame
    const c = photoCache.get(current);
    const primary = e.images[0];
    const hiFile = primary.file;
    const cap = c ? c.cap : primary.cap;

    lb.hidden = false;
    requestAnimationFrame(() => lb.setAttribute('data-open', 'true'));
    lbSpin.setAttribute('data-on', 'true');
    lbImg.removeAttribute('data-loaded');
    lbCap.innerHTML = cap;
    resetLB();
    // High-res for zoom
    lbImg.src = wmUrl(hiFile, 2000);
    lbImg.alt = cap.replace(/<[^>]+>/g, '');
  }

  function closeLB() {
    lb.removeAttribute('data-open');
    setTimeout(() => { lb.hidden = true; lbImg.removeAttribute('src'); }, 260);
    resetLB();
  }

  // Inline photo tap → open
  if (photoFrame) {
    photoFrame.addEventListener('click', (ev) => {
      // Only open if we actually have an image visible
      if (!photoCache.has(current)) return;
      ev.preventDefault();
      openLB();
    });
    // Keyboard a11y: Enter/Space on frame
    photoFrame.setAttribute('role', 'button');
    photoFrame.setAttribute('tabindex', '0');
    photoFrame.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        if (photoCache.has(current)) openLB();
      }
    });
  }

  lbCloseBtn.addEventListener('click', closeLB);
  // Tap on dark background (not on image) closes
  lb.addEventListener('click', (ev) => {
    if (ev.target === lb || ev.target === lbStage) closeLB();
  });

  lbImg.addEventListener('load', () => {
    lbImg.setAttribute('data-loaded', 'true');
    lbSpin.setAttribute('data-on', 'false');
  });
  lbImg.addEventListener('error', () => {
    lbSpin.setAttribute('data-on', 'false');
  });

  // ─── Pinch / pan / double-tap ─────────────
  function dist(t1, t2) { return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY); }
  function mid(t1, t2) { return { x: (t1.clientX + t2.clientX) / 2, y: (t1.clientY + t2.clientY) / 2 }; }

  lbStage.addEventListener('touchstart', (ev) => {
    if (ev.touches.length === 2) {
      const [a, b] = ev.touches;
      const r = lbStage.getBoundingClientRect();
      // Midpoint in stage-local coords, center-relative (matches transform-origin:center)
      const mx = (a.clientX + b.clientX) / 2 - r.left - r.width / 2;
      const my = (a.clientY + b.clientY) / 2 - r.top - r.height / 2;
      g = { type: 'pinch', startDist: dist(a, b), startScale: lbScale, startTX: lbTX, startTY: lbTY, mx, my };
    } else if (ev.touches.length === 1) {
      g = { type: 'pan', startX: ev.touches[0].clientX, startY: ev.touches[0].clientY, startTX: lbTX, startTY: lbTY, t0: Date.now() };
    }
  }, { passive: true });

  lbStage.addEventListener('touchmove', (ev) => {
    if (!g) return;
    if (g.type === 'pinch' && ev.touches.length === 2) {
      ev.preventDefault();
      const [a, b] = ev.touches;
      const r = lbStage.getBoundingClientRect();
      const curMX = (a.clientX + b.clientX) / 2 - r.left - r.width / 2;
      const curMY = (a.clientY + b.clientY) / 2 - r.top - r.height / 2;
      const d = dist(a, b);
      const nextScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, g.startScale * (d / g.startDist)));
      const factor = nextScale / g.startScale;
      // Anchor pinch midpoint + let it track finger drift (allows pan during pinch)
      lbTX = g.mx - (g.mx - g.startTX) * factor + (curMX - g.mx);
      lbTY = g.my - (g.my - g.startTY) * factor + (curMY - g.my);
      lbScale = nextScale;
      clampPan();
      applyLB();
    } else if (g.type === 'pan' && ev.touches.length === 1 && lbScale > 1) {
      ev.preventDefault();
      lbTX = g.startTX + (ev.touches[0].clientX - g.startX);
      lbTY = g.startTY + (ev.touches[0].clientY - g.startY);
      clampPan();
      applyLB();
    }
  }, { passive: false });

  lbStage.addEventListener('touchend', (ev) => {
    if (g && g.type === 'pan' && ev.touches.length === 0) {
      const dt = Date.now() - g.t0;
      const dx = Math.abs((ev.changedTouches[0].clientX) - g.startX);
      const dy = Math.abs((ev.changedTouches[0].clientY) - g.startY);
      // Tap (short + no movement) on image while at 1× → toggle to 2.5×
      // Tap while zoomed → reset to 1×
      if (dt < 280 && dx < 8 && dy < 8) {
        // Handle as potential double-tap
        const now = Date.now();
        if (lbStage._lastTap && now - lbStage._lastTap < 320) {
          if (lbScale > 1) {
            resetLB();
          } else {
            // Zoom to tap point
            const r = lbStage.getBoundingClientRect();
            const tx = ev.changedTouches[0].clientX - r.left - r.width / 2;
            const ty = ev.changedTouches[0].clientY - r.top - r.height / 2;
            lbScale = 2.5;
            lbTX = -tx * (lbScale - 1) / lbScale;
            lbTY = -ty * (lbScale - 1) / lbScale;
            clampPan();
            applyLB();
          }
          lbStage._lastTap = 0;
        } else {
          lbStage._lastTap = now;
        }
      }
    }
    if (ev.touches.length === 0) {
      if (lbScale < 1.05) resetLB();
      g = null;
    }
  }, { passive: true });

  // Mouse wheel for desktop
  lbStage.addEventListener('wheel', (ev) => {
    if (lb.hidden) return;
    ev.preventDefault();
    const r = lbStage.getBoundingClientRect();
    const mx = ev.clientX - r.left - r.width / 2;
    const my = ev.clientY - r.top - r.height / 2;
    const delta = -ev.deltaY * 0.0015;
    const nextScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, lbScale * (1 + delta)));
    const factor = nextScale / lbScale;
    lbTX = mx - (mx - lbTX) * factor;
    lbTY = my - (my - lbTY) * factor;
    lbScale = nextScale;
    clampPan();
    applyLB();
  }, { passive: false });

  // Desktop double-click
  lbStage.addEventListener('dblclick', (ev) => {
    if (lb.hidden) return;
    if (lbScale > 1) { resetLB(); return; }
    const r = lbStage.getBoundingClientRect();
    const tx = ev.clientX - r.left - r.width / 2;
    const ty = ev.clientY - r.top - r.height / 2;
    lbScale = 2.5;
    lbTX = -tx * (lbScale - 1) / lbScale;
    lbTY = -ty * (lbScale - 1) / lbScale;
    clampPan();
    applyLB();
  });

  // Esc to close
  addEventListener('keydown', (ev) => {
    if (!lb.hidden && ev.key === 'Escape') closeLB();
  });
})();
