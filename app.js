/* ═════════════════════════════════════════════════════════
   Waterways of the Low Countries — app logic
   ═════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const WM = 'https://commons.wikimedia.org/wiki/Special:FilePath/';
  const wmUrl = (file, w) => WM + encodeURIComponent(file) + (w ? '?width=' + w : '');

  const ERAS = {
    1: {
      num:'I', tag:'47 – 400 CE · Roman',
      title:'Engineering arrives at the <em>Rhine</em>',
      desc:'The first engineered waterways in the Low Countries were Roman. The Fossa Corbulonis, cut around 47 CE, linked the Rhine to the Meuse so ships could avoid the dangerous North Sea coast.',
      images:[
        {file:'Fossa_Corbulonis_map.png',
         cap:'<strong>Fossa Corbulonis.</strong> Archaeological map of the Roman canal linking Rhine and Meuse, c. 47 CE.'}
      ]
    },
    2: {
      num:'II', tag:'500 – 1000 · Early Medieval',
      title:'The Frisians return <em>to the rivers</em>',
      desc:'Roman works decayed. Trade reverted to natural rivers, dominated by Frisian merchants operating from Dorestad — for two centuries the largest trading port in northwest Europe.',
      images:[
        {file:'Frisia_716-la.svg',
         cap:'<strong>Frisia, c. 716 CE.</strong> Extent of Frisian territory on the Rhine delta.'},
        {file:'Bronzen_schildpadfibula_uit_Dorestad_(800-900),_Rijksmuseum_van_Oudheden,_Leiden.JPG',
         cap:'<strong>Dorestad fibula, 9th c.</strong> Turtle brooch excavated at Dorestad. Rijksmuseum van Oudheden, Leiden.'}
      ]
    },
    3: {
      num:'III', tag:'1000 – 1500 · Medieval',
      title:'First dikes, <em>first canals</em>',
      desc:'Bruges reached open water via Damme on the Zwin inlet; Ghent and Ypres built their own canal lines; the first polders were ringed and drained in Holland.',
      images:[
        {file:'Geschilderde_plan_Brugge.jpg',
         cap:'<strong>Painted plan of Bruges,</strong> 16th c. Canals woven through the medieval city. Groeningemuseum.'}
      ]
    },
    4: {
      num:'IV', tag:'1500 – 1700 · Dutch Golden Age',
      title:'The densest waterway <em>network on Earth</em>',
      desc:'Amsterdam laid out its grachtengordel from 1613. Engineers drained the Beemster, Schermer, and Purmer. The trekvaart barge network linked every major Dutch city on reliable schedules.',
      images:[
        {file:'Hollandia_Comitatvs_-_Atlas_Maior,_vol_4,_map_42_-_Joan_Blaeu,_1667_-_BL_114.h(star).4.(42).jpg',
         cap:'<strong>Hollandia Comitatus.</strong> Joan Blaeu, Atlas Maior, vol. 4, map 42, 1667. British Library.'}
      ]
    },
    5: {
      num:'V', tag:'1700 – 1900 · Industrial',
      title:'Ship canals replace <em>barge canals</em>',
      desc:'Six new cuts to the sea: the North Holland Canal, the North Sea Canal to Amsterdam, the New Waterway to Rotterdam, and Belgium\u2019s Ghent\u2013Terneuzen, Brussels\u2013Charleroi, and Brussels\u2013Scheldt canals.',
      images:[
        {file:'Luchtopname_van_de_Oudehaven,_Wijnhaven,_Haringvliet_en_Nieuwehaven_en_omgeving_1935.jpg',
         cap:'<strong>Rotterdam harbours, 1935.</strong> Oudehaven, Wijnhaven, Haringvliet, Nieuwehaven from the air.'}
      ]
    },
    6: {
      num:'VI', tag:'1900 – 2000 · Twentieth Century',
      title:'Closing off <em>the sea</em>',
      desc:'The Afsluitdijk sealed the Zuiderzee in 1932, turning a bay into the freshwater IJsselmeer and enabling the Flevoland polders. After the 1953 flood, the Delta Works dammed Zeeland\u2019s estuaries. Belgium built the Albert Canal.',
      images:[
        {file:'NIMH_-_2011_-_3551_-_Aerial_photograph_of_Afsluitdijk_construction,_The_Netherlands.jpg',
         cap:'<strong>Afsluitdijk under construction, c. 1931.</strong> Aerial photograph. Nederlands Instituut voor Militaire Historie.'}
      ]
    },
    7: {
      num:'VII', tag:'Today',
      title:'Two world ports, <em>one network</em>',
      desc:'Rotterdam and Antwerp-Bruges are Europe\u2019s two largest ports, linked by one of the densest inland shipping networks on Earth. The historic canals at Amsterdam, Bruges, and Ghent are UNESCO-listed.',
      images:[
        {file:'ISS-53_Rotterdam,_Den_Haag_and_Amsterdam_in_the_Netherlands.jpg',
         cap:'<strong>Randstad from orbit.</strong> Rotterdam, Den Haag and Amsterdam at night from the ISS (Expedition 53). NASA.'}
      ]
    }
  };

  // ═══════════════════════════════════ BUILD ERA CARDS ═══
  const container = document.getElementById('eraCards');
  const mapTpl = document.getElementById('mapTemplate');

  function buildCard(n, data) {
    const section = document.createElement('section');
    section.className = 'era';
    section.id = 'era-' + n;
    section.dataset.era = n;

    section.innerHTML = `
      <div class="era-meta">
        <span class="era-num">${data.num}</span>
        <span class="era-tag">${data.tag}</span>
      </div>
      <h2 class="era-title">${data.title}</h2>
      <p class="era-desc">${data.desc}</p>
      <div class="map-card">
        <div class="map-card-inner"></div>
      </div>
      <button class="photo-card" data-era-photo="${n}" aria-label="Open photo">
        <div class="photo-card-inner">
          <div class="photo-spinner"><svg viewBox="0 0 40 40" width="30" height="30"><circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="22 66"/></svg></div>
          <img data-era-img="${n}" alt="" decoding="async" />
          <div class="photo-cue" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8"/><path d="M10.5 7.5v6M7.5 10.5h6"/></svg>
          </div>
        </div>
      </button>
      <p class="photo-caption" data-era-cap="${n}"></p>
    `;

    // Clone the map SVG from the template into the map card
    const mapInner = section.querySelector('.map-card-inner');
    const svg = mapTpl.content.querySelector('svg').cloneNode(true);
    // Uniquify filter IDs per clone (otherwise all 7 would collide)
    const filters = svg.querySelectorAll('filter[id]');
    const renameMap = {};
    filters.forEach(f => {
      const oldId = f.id;
      const newId = `${oldId}-e${n}`;
      f.id = newId;
      renameMap[oldId] = newId;
    });
    // Update url(#oldId) references within this clone
    svg.querySelectorAll('[filter]').forEach(el => {
      const m = /url\(#([^)]+)\)/.exec(el.getAttribute('filter') || '');
      if (m && renameMap[m[1]]) {
        el.setAttribute('filter', `url(#${renameMap[m[1]]})`);
      }
    });
    mapInner.appendChild(svg);

    container.appendChild(section);
    return section;
  }

  for (let n = 1; n <= 7; n++) buildCard(n, ERAS[n]);

  // ═══════════════════════════════════ PHOTO LOADING ═══
  const photoCache = new Map();

  function loadPhotoFor(eraNum) {
    if (photoCache.has(eraNum)) return;
    const era = ERAS[eraNum];
    const imgEl = document.querySelector(`[data-era-img="${eraNum}"]`);
    const capEl = document.querySelector(`[data-era-cap="${eraNum}"]`);
    const card = imgEl?.closest('.photo-card');
    if (!imgEl) return;

    const tryIdx = (i) => {
      if (i >= era.images.length) {
        if (card) card.style.display = 'none'; // hide if no image loads
        return;
      }
      const cand = era.images[i];
      const src = wmUrl(cand.file, 900);
      const probe = new Image();
      probe.onload = () => {
        const ar = (probe.naturalWidth && probe.naturalHeight)
          ? probe.naturalWidth / probe.naturalHeight : 4/3;
        const inner = card.querySelector('.photo-card-inner');
        if (inner) inner.style.setProperty('--ar', ar.toFixed(3));
        imgEl.src = src;
        imgEl.alt = (cand.cap || '').replace(/<[^>]+>/g,'');
        imgEl.setAttribute('data-loaded','true');
        if (card) card.setAttribute('data-loaded','true');
        if (capEl) capEl.innerHTML = cand.cap;
        photoCache.set(eraNum, {src, file: cand.file, cap: cand.cap, ar});
      };
      probe.onerror = () => tryIdx(i + 1);
      probe.src = src;
    };
    tryIdx(0);
  }

  // Lazy-load photos via IntersectionObserver
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const n = +e.target.dataset.era;
          loadPhotoFor(n);
          // don't unobserve — we want to keep tracking for scroll spy
        }
      });
    }, { rootMargin: '200px 0px', threshold: 0.01 });
    document.querySelectorAll('.era').forEach(el => io.observe(el));
  } else {
    // Fallback: load all at once
    for (let n = 1; n <= 7; n++) loadPhotoFor(n);
  }

  // ═══════════════════════════════════ SCROLL SPY ═══
  const hdrEra = document.getElementById('hdrEra');
  const hdrProgress = document.getElementById('hdrProgress');
  const dots = [...document.querySelectorAll('.dot')];
  const eraSections = [...document.querySelectorAll('.era')];
  let currentEra = 0;

  function setCurrent(n) {
    if (n === currentEra) return;
    currentEra = n;
    hdrEra.textContent = n > 0 ? ERAS[n].num : '';
    hdrProgress.style.width = ((n / 7) * 100) + '%';
    dots.forEach(d => d.setAttribute('aria-current', +d.dataset.era === n ? 'true' : 'false'));
    // deep-link
    if (n > 0) history.replaceState(null, '', '#era-' + n);
  }

  // Scroll spy — whichever era takes the most space in the viewport is current
  let spyRAF;
  function runSpy() {
    cancelAnimationFrame(spyRAF);
    spyRAF = requestAnimationFrame(() => {
      const vh = window.innerHeight;
      const threshold = vh * 0.35; // activation line: ~35% down the viewport
      let active = 0;
      for (const sec of eraSections) {
        const r = sec.getBoundingClientRect();
        if (r.top <= threshold && r.bottom >= threshold) {
          active = +sec.dataset.era;
          break;
        }
      }
      if (!active && eraSections.length) {
        // before the first era? check if scrolled past intro
        const firstTop = eraSections[0].getBoundingClientRect().top;
        active = firstTop > threshold ? 0 : 1;
      }
      setCurrent(active);
    });
  }
  addEventListener('scroll', runSpy, { passive: true });
  addEventListener('resize', runSpy, { passive: true });
  runSpy();

  // ═══════════════════════════════════ DOT NAV ═══
  dots.forEach(d => d.addEventListener('click', () => {
    const n = +d.dataset.era;
    const target = document.getElementById('era-' + n);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));

  // ═══════════════════════════════════ PHOTO LIGHTBOX ═══
  const lb = document.getElementById('lb');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCap');
  const lbBody = document.getElementById('lbBody');
  const lbX = document.getElementById('lbX');

  let lbScale = 1, lbTX = 0, lbTY = 0;
  const MIN = 1, MAX = 6;

  function lbApply() {
    lbImg.style.transform = `translate(${lbTX}px,${lbTY}px) scale(${lbScale})`;
  }
  function lbReset() { lbScale = 1; lbTX = 0; lbTY = 0; lbApply(); }

  function lbClamp() {
    if (lbScale <= 1) { lbTX = 0; lbTY = 0; return; }
    const r = lbBody.getBoundingClientRect();
    const iw = lbImg.naturalWidth, ih = lbImg.naturalHeight;
    if (!iw) return;
    const baseScale = Math.min(r.width / iw, r.height / ih);
    const dw = iw * baseScale * lbScale;
    const dh = ih * baseScale * lbScale;
    const maxX = Math.max(0, (dw - r.width) / 2);
    const maxY = Math.max(0, (dh - r.height) / 2);
    lbTX = Math.max(-maxX, Math.min(maxX, lbTX));
    lbTY = Math.max(-maxY, Math.min(maxY, lbTY));
  }

  function openLB(eraNum) {
    const cache = photoCache.get(eraNum);
    if (!cache) return;
    lb.hidden = false;
    requestAnimationFrame(() => lb.setAttribute('data-open','true'));
    lbImg.src = wmUrl(cache.file, 2000);
    lbImg.alt = cache.cap.replace(/<[^>]+>/g,'');
    lbCap.innerHTML = cache.cap;
    lbReset();
  }
  function closeLB() {
    lb.removeAttribute('data-open');
    setTimeout(() => { lb.hidden = true; lbImg.removeAttribute('src'); }, 260);
    lbReset();
  }

  // Wire photo cards → open
  document.querySelectorAll('.photo-card').forEach(card => {
    card.addEventListener('click', (ev) => {
      const n = +card.dataset.eraPhoto;
      if (photoCache.has(n)) { ev.preventDefault(); openLB(n); }
    });
  });
  lbX.addEventListener('click', closeLB);
  lb.addEventListener('click', (ev) => { if (ev.target === lb || ev.target === lbBody) closeLB(); });

  // Pinch / pan / double-tap
  const dist = (a, b) => Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
  let g = null;

  lbBody.addEventListener('touchstart', (ev) => {
    if (ev.touches.length === 2) {
      const [a, b] = ev.touches;
      const r = lbBody.getBoundingClientRect();
      const mx = (a.clientX + b.clientX) / 2 - r.left - r.width/2;
      const my = (a.clientY + b.clientY) / 2 - r.top - r.height/2;
      g = { type:'pinch', d0: dist(a,b), s0: lbScale, tx0: lbTX, ty0: lbTY, mx, my };
    } else if (ev.touches.length === 1) {
      g = { type:'pan', x0: ev.touches[0].clientX, y0: ev.touches[0].clientY, tx0: lbTX, ty0: lbTY, t0: Date.now() };
    }
  }, { passive: true });

  lbBody.addEventListener('touchmove', (ev) => {
    if (!g) return;
    if (g.type === 'pinch' && ev.touches.length === 2) {
      ev.preventDefault();
      const [a, b] = ev.touches;
      const r = lbBody.getBoundingClientRect();
      const curMX = (a.clientX + b.clientX) / 2 - r.left - r.width/2;
      const curMY = (a.clientY + b.clientY) / 2 - r.top - r.height/2;
      const nextScale = Math.max(MIN, Math.min(MAX, g.s0 * (dist(a,b) / g.d0)));
      const factor = nextScale / g.s0;
      lbTX = g.mx - (g.mx - g.tx0) * factor + (curMX - g.mx);
      lbTY = g.my - (g.my - g.ty0) * factor + (curMY - g.my);
      lbScale = nextScale;
      lbClamp(); lbApply();
    } else if (g.type === 'pan' && ev.touches.length === 1 && lbScale > 1) {
      ev.preventDefault();
      lbTX = g.tx0 + (ev.touches[0].clientX - g.x0);
      lbTY = g.ty0 + (ev.touches[0].clientY - g.y0);
      lbClamp(); lbApply();
    }
  }, { passive: false });

  lbBody.addEventListener('touchend', (ev) => {
    if (g && g.type === 'pan' && ev.touches.length === 0) {
      const dt = Date.now() - g.t0;
      const dx = Math.abs(ev.changedTouches[0].clientX - g.x0);
      const dy = Math.abs(ev.changedTouches[0].clientY - g.y0);
      if (dt < 280 && dx < 8 && dy < 8) {
        const now = Date.now();
        if (lbBody._lastTap && now - lbBody._lastTap < 320) {
          if (lbScale > 1) lbReset();
          else {
            const r = lbBody.getBoundingClientRect();
            const tx = ev.changedTouches[0].clientX - r.left - r.width/2;
            const ty = ev.changedTouches[0].clientY - r.top - r.height/2;
            lbScale = 2.5;
            lbTX = -tx * (lbScale - 1) / lbScale;
            lbTY = -ty * (lbScale - 1) / lbScale;
            lbClamp(); lbApply();
          }
          lbBody._lastTap = 0;
        } else lbBody._lastTap = now;
      }
    }
    if (ev.touches.length === 0) {
      if (lbScale < 1.05) lbReset();
      g = null;
    }
  }, { passive: true });

  lbBody.addEventListener('wheel', (ev) => {
    if (lb.hidden) return;
    ev.preventDefault();
    const r = lbBody.getBoundingClientRect();
    const mx = ev.clientX - r.left - r.width/2;
    const my = ev.clientY - r.top - r.height/2;
    const delta = -ev.deltaY * 0.0015;
    const nextScale = Math.max(MIN, Math.min(MAX, lbScale * (1 + delta)));
    const factor = nextScale / lbScale;
    lbTX = mx - (mx - lbTX) * factor;
    lbTY = my - (my - lbTY) * factor;
    lbScale = nextScale;
    lbClamp(); lbApply();
  }, { passive: false });

  lbBody.addEventListener('dblclick', (ev) => {
    if (lb.hidden) return;
    if (lbScale > 1) { lbReset(); return; }
    const r = lbBody.getBoundingClientRect();
    const tx = ev.clientX - r.left - r.width/2;
    const ty = ev.clientY - r.top - r.height/2;
    lbScale = 2.5;
    lbTX = -tx * (lbScale - 1) / lbScale;
    lbTY = -ty * (lbScale - 1) / lbScale;
    lbClamp(); lbApply();
  });

  addEventListener('keydown', (ev) => {
    if (!lb.hidden && ev.key === 'Escape') { closeLB(); return; }
    if (/^[1-7]$/.test(ev.key)) {
      const target = document.getElementById('era-' + ev.key);
      if (target) target.scrollIntoView({ behavior:'smooth', block:'start' });
    }
  });

  // Deep-link on load
  const hashMatch = /^#era-([1-7])$/.exec(location.hash);
  if (hashMatch) {
    requestAnimationFrame(() => {
      const target = document.getElementById('era-' + hashMatch[1]);
      if (target) target.scrollIntoView({ behavior:'auto', block:'start' });
    });
  }
})();
