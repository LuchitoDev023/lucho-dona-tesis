// MHDS — render de estrategias (pasivas/activas), navegación desplegable, búsqueda
// y comparador de transmitancia térmica (K) de envolventes.
(function () {
  'use strict';

  const state = {
    query: '',
    open: new Set(),                                  // ids de <details> abiertos (se conserva entre renders)
    cmp: { set: 'muro', a: null, b: null },           // estado del comparador de K
    lastWasQuery: false,
  };

  const $ = (sel, el) => (el || document).querySelector(sel);
  const $$ = (sel, el) => Array.from((el || document).querySelectorAll(sel));

  const rootEl = $('#strategy-root');
  const noteEl = $('#results-note');
  const searchEl = $('#searchbox');

  const TYPES = [
    { key: 'pasiva', id: 'pasivas', title: 'PASIVAS' },
    { key: 'activa', id: 'activas', title: 'ACTIVAS' },
  ];

  const imgFor = s => `assets/strategies/${s.code}.jpg`;
  const icoFor = code => `assets/strategies/${code}.jpg`;
  const iconFor = cat => `assets/icons/cat-${Number(cat.num)}.png`;
  const catsOf = type => Object.entries(CATEGORIES).filter(([, c]) => c.type === type);

  const ARROW = '<svg class="group-arrow" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const slug = str => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const nf = (n, d) => n.toFixed(d === undefined ? 2 : d).replace('.', ',');

  // ---------- Búsqueda ----------
  let searchTimer;
  searchEl.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.query = searchEl.value.trim().toLowerCase();
      render();
      if (state.query) rootEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 180);
  });

  function matches(s) {
    if (!state.query) return true;
    const hay = [
      s.code, s.title, s.text || '', s.group || '',
      CATEGORIES[s.cat].name,
      (s.ventajas || []).join(' '), (s.desventajas || []).join(' '),
      (s.capas || []).join(' '), s.kdato || '', s.tip || '',
      (s.tips || []).join(' '), (s.notas || []).map(n => n.html || n).join(' '),
    ].join(' ').replace(REF_TOKEN, '').toLowerCase();
    return state.query.split(/\s+/).every(w => hay.includes(w));
  }

  function esc(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function hl(str) {
    const escaped = esc(str);
    if (!state.query) return escaped;
    let out = escaped;
    state.query.split(/\s+/).filter(Boolean).forEach(w => {
      const safe = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      out = out.replace(new RegExp(`(${safe})`, 'gi'), '<mark>$1</mark>');
    });
    return out;
  }

  // ---------- Referencias: "[*clave]" → asterisco con ventana al pasar el mouse ----------
  const REF_TOKEN = /\[\*([a-z0-9-]+)\]/g;
  const refMark = key => REFS[key]
    ? `<button type="button" class="ref" data-ref="${key}" aria-label="Ver referencia">*</button>` : '';
  const withRefs = html => String(html).replace(REF_TOKEN, (_, key) => refMark(key));
  const linkify = html => html.replace(/(https?:\/\/[^\s<]+[^\s<.,;)])/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');

  // Recuadro de dato/tip: foquito por defecto, o el gráfico propio de la nota si lo tiene
  const tipbox = (html, icon, alt) => `<div class="tipbox${icon ? ' tipbox-img' : ''}">${icon
    ? `<img class="tip-img" src="${icon}" alt="${esc(alt || '')}" loading="lazy">`
    : '<span class="tip-icon" aria-hidden="true">💡</span>'}<p>${withRefs(html)}</p></div>`;

  const iramClass = v => v === 'No cumple' ? 'iram-no' : v === 'Clase A' ? 'iram-a' : v === 'Clase B' ? 'iram-b' : 'iram-c';

  // ---------- Agrupación en subcategorías ----------
  function groupsOf(catKey, filtered) {
    const groups = [];
    (filtered || STRATEGIES.filter(s => s.cat === catKey)).forEach(s => {
      const g = s.group || '';
      let bucket = groups.find(b => b.name === g);
      if (!bucket) { bucket = { name: g, items: [] }; groups.push(bucket); }
      bucket.items.push(s);
    });
    return groups;
  }

  const groupId = (catKey, name) => `g-${catKey}-${slug(name)}`;

  // ---------- Menú desplegable del nav ----------
  function buildNavMenus() {
    $$('.nav-menu').forEach(menu => {
      const type = menu.dataset.type;
      menu.innerHTML = catsOf(type).map(([key, c]) => `
        <div class="nav-cat" style="--c:${c.color}">
          <a href="#cat-${key}"><span class="dot"></span><span class="nav-cat-name">${c.num} ${c.name}</span><span class="nav-caret">›</span></a>
          <div class="nav-sub">
            ${key === 'EV' ? `<a class="nav-sub-group" href="#${groupId('EV', 'Consideraciones generales')}">Consideraciones generales</a>` : ''}
            ${groupsOf(key).map(g => `
              ${g.name ? `<a class="nav-sub-group" href="#${groupId(key, g.name)}">${esc(g.name)}</a>` : ''}
              ${g.items.map(s => `<a href="#s-${s.code}"><b>${s.code}</b> ${esc(s.title)}</a>`).join('')}
            `).join('')}
            ${key === 'EV' ? '<a class="nav-sub-group" href="#cmp-envolventes">Comparador de aislación (K)</a>' : ''}
          </div>
        </div>`).join('');
    });
  }

  // ---------- Ficha de estrategia (formato del anexo: código · título | imagen | descripción) ----------
  function strategyHTML(s) {
    const cat = CATEGORIES[s.cat];

    const badges = [];
    if (s.iram) badges.push(`<span class="iram-badge ${iramClass(s.iram)}">${esc(s.iram)}</span>`);
    if (s.esp) badges.push(`<span class="data-badge">Esp. ${esc(s.esp)}</span><span class="data-badge">K ${esc(s.k)} W/m²K</span>`);
    if (s.kdato) badges.push(`<span class="data-badge">${esc(s.kdato)}</span>`);

    // Las fichas con tabla o funcionamiento (AE01, AE03, AE04) muestran la línea
    // código | gráfico | texto, y debajo filas a todo el ancho de la ficha.
    const wide = !!(s.tabla || s.ciclo);
    const extras = [];
    const rows = [];

    if (s.capas) {
      extras.push(`<p class="st-label">Solución — capas que la componen:</p>
        <ul class="st-capas">${s.capas.map(c => `<li>${hl(c)}</li>`).join('')}</ul>`);
    }
    if (s.ventajas || s.desventajas) {
      (wide ? rows : extras).push(`<div class="vd-grid">
        ${s.ventajas ? `<div class="vd-col vd-ventajas"><h5>Ventajas</h5><ul>${s.ventajas.map(v => `<li>${hl(v)}</li>`).join('')}</ul></div>` : ''}
        ${s.desventajas ? `<div class="vd-col vd-desventajas"><h5>Desventajas</h5><ul>${s.desventajas.map(v => `<li>${hl(v)}</li>`).join('')}</ul></div>` : ''}
      </div>`);
    }
    if (s.ciclo) rows.push(cicloHTML(s.ciclo));
    if (s.tabla) rows.push(aguaHTML(s.tabla));
    if (s.tip) extras.push(tipbox(s.tip));
    if (s.tips) s.tips.forEach(t => extras.push(tipbox(t)));

    return `<article class="st-item${wide ? ' st-wide-item' : ''}" id="s-${s.code}" style="--c:${cat.color}">
      <header class="st-head"><span class="st-code">${hl(s.code)}</span><h4 class="st-title">${hl(s.title)}</h4></header>
      <div class="st-media"><img src="${imgFor(s)}" alt="${esc(s.code)} — ${esc(s.title)}" loading="lazy"></div>
      <div class="st-body">
        ${badges.length ? `<div class="badges">${badges.join('')}</div>` : ''}
        ${s.text ? `<p class="st-text">${hl(s.text)}</p>` : ''}
        ${extras.join('')}
      </div>
      ${rows.map(r => `<div class="st-row">${r}</div>`).join('')}
    </article>`;
  }

  // ---------- Funcionamiento (AE03, AE04): pasos numerados en tarjetas ----------
  function cicloHTML(c) {
    return `<p class="st-label">Funcionamiento</p>
      <div class="ciclo">
        <p class="ciclo-intro">${hl(c.intro)}</p>
        <ol class="ciclo-pasos">${c.pasos.map(([b, t], i) => {
          const name = b.replace(/^\(\d+\)\.\s*/, '').replace(/:\s*$/, '');
          return `<li class="ciclo-paso"><span class="ciclo-num">${i + 1}</span><div><b>${hl(name)}</b><p>${hl(t)}</p></div></li>`;
        }).join('')}</ol>
      </div>`;
  }

  // ---------- AE01: consumo de agua, tradicional vs eficiente ----------
  function aguaHTML(t) {
    const max = Math.max.apply(null, t.pares.map(p => p.trad.dia));
    const pct = n => `${Math.max(1.5, n / max * 100)}%`;
    const tot = { trad: +t.totalTradicionales, efic: +t.totalEficientes };
    const ahorroDia = tot.trad - tot.efic;
    const miles = n => n.toLocaleString('es-AR');

    const filas = t.pares.map(p => {
      const menos = Math.round((1 - p.efic.dia / p.trad.dia) * 100);
      return `<div class="agua-row">
        <div class="agua-name"><b>${esc(p.artefacto)}</b><span>${esc(p.trad.unidad)} → <em>${esc(p.efic.unidad)}</em></span></div>
        <div class="agua-bars">
          <div class="agua-bar agua-trad" style="width:${pct(p.trad.dia)}"><span>${p.trad.dia} L</span></div>
          <div class="agua-bar agua-efic" style="width:${pct(p.efic.dia)}"><span>${p.efic.dia} L</span></div>
        </div>
        <div class="agua-save" title="Ahorro con ${esc(p.artefacto.toLowerCase())} ${esc(p.mejora)}">−${menos}%</div>
      </div>`;
    }).join('');

    const row = r => `<tr><td></td>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`;
    return `<div class="agua">
      <div class="agua-head">
        <p class="agua-title">¿Cuánta agua usa una vivienda por día?</p>
        <div class="agua-legend">
          <span><i class="agua-dot agua-trad"></i>Artefactos tradicionales</span>
          <span><i class="agua-dot agua-efic"></i>Artefactos eficientes</span>
        </div>
      </div>
      <div class="agua-rows">${filas}</div>
      <div class="agua-total">
        <div class="agua-total-col"><span class="agua-total-label">Tradicionales</span><span class="agua-total-num agua-t-trad">${tot.trad}<small> L/día</small></span></div>
        <div class="agua-total-arrow" aria-hidden="true">→</div>
        <div class="agua-total-col"><span class="agua-total-label">Eficientes</span><span class="agua-total-num agua-t-efic">${tot.efic}<small> L/día</small></span></div>
        <div class="agua-total-save"><b>${ahorroDia} litros menos por día</b><span>≈ ${miles(Math.round(ahorroDia * 365 / 1000) * 1000)} litros al año</span></div>
      </div>
      <details class="agua-data">
        <summary>Ver tabla de datos</summary>
        <div class="table-wrap"><table class="ae-table">
          <thead><tr>${t.headers.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>
          <tbody>
            <tr class="grp"><td colspan="5">TRADICIONALES</td></tr>
            ${t.tradicionales.map(row).join('')}
            <tr class="tt-row"><td>TOTAL</td><td></td><td></td><td></td><td>${t.totalTradicionales}</td></tr>
            <tr class="grp"><td colspan="5">EFICIENTES</td></tr>
            ${t.eficientes.map(row).join('')}
            <tr class="tt-row"><td>TOTAL</td><td></td><td></td><td></td><td>${t.totalEficientes}</td></tr>
          </tbody>
        </table></div>
      </details>
      <p class="caption">${withRefs(esc(t.caption)).replace(/\n/g, '<br>')}</p>
    </div>`;
  }

  // ============================================================
  //  COMPARADOR DE TRANSMITANCIA TÉRMICA (K)
  // ============================================================
  const CMP_SETS = {
    muro: {
      label: 'Muros', group: 'Muro',
      subject: it => `un muro de ${cmpIco(it)}<b>${esc(it.title)}</b> (${it.code})`,
      limits: [['A', 0.33], ['B1', 0.62], ['B', 0.91], ['C', 1.59]],
    },
    cubierta: {
      label: 'Cubiertas', group: 'Cubierta',
      subject: it => `una cubierta de ${cmpIco(it)}<b>${esc(it.title)}</b> (${it.code})`,
      limits: [['A', 0.18], ['B1', 0.31], ['B', 0.45], ['C', 0.72]],
    },
    vidrio: {
      label: 'Vidrios', group: 'Aventanamientos - vidriado',
      subject: it => `el ${cmpIco(it)}<b>${esc(it.title)}</b> (${it.code})`,
      limits: null,
    },
  };

  const cmpIco = it => `<img class="cmp-ico" src="${icoFor(it.code)}" alt="" loading="lazy">`;

  const parseK = v => parseFloat(String(v).replace(/[^0-9,.]/g, '').replace(',', '.'));

  function cmpItems(setKey) {
    const cfg = CMP_SETS[setKey];
    return STRATEGIES
      .filter(s => s.cat === 'EV' && s.group === cfg.group)
      .map(s => ({
        code: s.code, title: s.title, esp: s.esp || '', iram: s.iram || '',
        k: parseK(s.k != null ? s.k : (s.kdato || '')),
      }))
      .filter(it => !isNaN(it.k) && it.k > 0);
  }

  function cmpDefaults(setKey) {
    const sorted = cmpItems(setKey).slice().sort((x, y) => y.k - x.k);
    return { a: sorted[0].code, b: sorted[sorted.length - 1].code };
  }

  function cmpCurrent() {
    const setKey = CMP_SETS[state.cmp.set] ? state.cmp.set : 'muro';
    const items = cmpItems(setKey);
    const ok = c => items.some(i => i.code === c);
    if (!ok(state.cmp.a) || !ok(state.cmp.b)) {
      const d = cmpDefaults(setKey);
      state.cmp = { set: setKey, a: d.a, b: d.b };
    }
    return {
      setKey, items,
      A: items.find(i => i.code === state.cmp.a),
      B: items.find(i => i.code === state.cmp.b),
    };
  }

  function cmpCard(items, it, side) {
    const opts = items.map(i =>
      `<option value="${i.code}"${i.code === it.code ? ' selected' : ''}>${i.code} · ${esc(i.title)} — K ${nf(i.k)}</option>`).join('');
    return `<div class="cmp-card">
      <label class="cmp-label" for="cmp-sel-${side}">Sistema ${side.toUpperCase()}</label>
      <select class="cmp-select" id="cmp-sel-${side}" data-side="${side}">${opts}</select>
      <div class="cmp-card-body">
        <img class="cmp-thumb" src="${icoFor(it.code)}" alt="${esc(it.code)} — ${esc(it.title)}" loading="lazy">
        <div class="cmp-card-data">
          <p class="cmp-k"><span>${nf(it.k)}</span> W/m²K</p>
          <p class="cmp-meta">
            ${it.iram ? `<span class="iram-badge ${iramClass(it.iram)}">${esc(it.iram)}</span>` : ''}
            ${it.esp ? `<span class="data-badge">Esp. ${esc(it.esp)}</span>` : ''}
            <a href="#s-${it.code}">Ver ficha ${it.code} ›</a>
          </p>
        </div>
      </div>
    </div>`;
  }

  function cmpVerdict(cfg, A, B) {
    const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
    if (A.code === B.code) {
      return `<div class="cmp-verdict-box"><p class="cmp-verdict">Elegí dos sistemas distintos para ver la comparación.</p></div>`;
    }
    const better = A.k <= B.k ? A : B;
    const worse = A.k <= B.k ? B : A;
    const ratio = worse.k / better.k;

    if (ratio < 1.05) {
      return `<div class="cmp-verdict-box">
        <p class="cmp-verdict">${cap(cfg.subject(A))} y ${cfg.subject(B)} <b>aíslan prácticamente lo mismo</b>: K ${nf(A.k)} frente a K ${nf(B.k)} W/m²K.</p>
      </div>`;
    }
    const red = (1 - better.k / worse.k) * 100;
    return `<div class="cmp-verdict-box">
      <p class="cmp-verdict">${cap(cfg.subject(better))} aísla <b class="cmp-ratio">${nf(ratio, 1)} veces más</b> que ${cfg.subject(worse)}.</p>
      <p class="cmp-sub">Reduce las pérdidas de calor a través de esa superficie un <b>${nf(red, 0)}%</b>. Con 10&nbsp;°C de diferencia entre interior y exterior, cada m² deja pasar <b>${nf(better.k * 10, 1)} W</b> en lugar de <b>${nf(worse.k * 10, 1)} W</b>.</p>
    </div>`;
  }

  function cmpRank(cfg, items, A, B) {
    const max = Math.max.apply(null, items.map(i => i.k));
    const rows = items.slice().sort((x, y) => x.k - y.k).map(i => {
      const sel = (i.code === A.code || i.code === B.code) ? ' is-sel' : '';
      return `<div class="cmp-row${sel}">
        <img class="cmp-row-ico" src="${icoFor(i.code)}" alt="" loading="lazy">
        <span class="cmp-row-label"><b>${i.code}</b> ${esc(i.title)}</span>
        <span class="cmp-bar-track"><span class="cmp-bar ${i.iram ? iramClass(i.iram) : ''}" style="width:${Math.max(2, i.k / max * 100)}%"></span></span>
        <span class="cmp-row-k">${nf(i.k)}</span>
      </div>`;
    }).join('');

    const limits = cfg.limits ? `<div class="cmp-limits" aria-hidden="true">${cfg.limits.map(([n, v]) =>
      `<span class="cmp-limit" style="left:${v / max * 100}%"><i></i><b>${n}</b></span>`).join('')}</div>` : '';

    const legend = cfg.limits
      ? 'Las líneas verticales marcan los valores máximos de K admitidos para los niveles A, B1, B y C de la tabla de la Introducción (región centro de Santa Fe; fuente: Norma IRAM 11605). Cuanto más corta la barra, más aísla.'
      : 'Cuanto más corta la barra, más aísla.';

    return `<p class="cmp-rank-title">Todos los sistemas ordenados de mayor a menor aislación</p>
      <div class="cmp-rank">${limits}${rows}</div>
      <p class="cmp-legend">${legend}</p>`;
  }

  function comparatorInnerHTML() {
    const cur = cmpCurrent();
    const cfg = CMP_SETS[cur.setKey];
    return `
      <div class="cmp-tabs">${Object.keys(CMP_SETS).map(k =>
        `<button type="button" class="chip cmp-tab${k === cur.setKey ? ' is-on' : ''}" data-set="${k}">${CMP_SETS[k].label}</button>`).join('')}</div>
      <div class="cmp-pair">
        ${cmpCard(cur.items, cur.A, 'a')}
        <button type="button" class="cmp-swap" title="Invertir A y B" aria-label="Invertir A y B">⇄</button>
        ${cmpCard(cur.items, cur.B, 'b')}
      </div>
      ${cmpVerdict(cfg, cur.A, cur.B)}
      ${cmpRank(cfg, cur.items, cur.A, cur.B)}`;
  }

  function comparatorHTML() {
    if (state.query) return '';
    return `<details class="group-section cmp-section" id="cmp-envolventes"${state.open.has('cmp-envolventes') ? ' open' : ''}>
      <summary class="group-summary">
        <span class="group-name">Comparador de aislación (K)</span>
        <span class="group-count">muros · cubiertas · vidrios</span>
        <button type="button" class="info-btn" data-kmodal title="Valores de K admisibles (Norma IRAM)" aria-label="Ver la tabla de transmitancia térmica admisible">!</button>
        ${ARROW}
      </summary>
      <div class="group-content">
        <p class="cmp-intro">La transmitancia térmica <b>K</b> mide cuánto calor deja pasar 1&nbsp;m² de envolvente por cada grado de diferencia entre interior y exterior: <b>cuanto más bajo es el K, más aísla</b>. Elegí dos sistemas para compararlos.</p>
        <div id="cmp-root">${comparatorInnerHTML()}</div>
      </div>
    </details>`;
  }

  function refreshComparator() {
    const el = $('#cmp-root');
    if (el) el.innerHTML = comparatorInnerHTML();
  }

  // ---------- Intros / cierres de categoría ----------
  // Bloque desplegable con el mismo aspecto que una subcategoría
  function foldHTML(id, name, content, count) {
    const open = state.open.has(id) ? ' open' : '';
    return `<details class="group-section" id="${id}"${open}>
      <summary class="group-summary">
        <span class="group-name">${esc(name)}</span>
        ${count ? `<span class="group-count">${esc(count)}</span>` : ''}
        ${ARROW}
      </summary>
      <div class="group-content">${content}</div>
    </details>`;
  }

  function catIntroHTML(key) {
    if (state.query) return '';
    if (key === 'EV') {
      const c = ENVOLVENTES_COLOR;
      return foldHTML(groupId('EV', 'Consideraciones generales'), 'Consideraciones generales', `<div class="cat-intro">
        <p>${c.p1}</p>
        <div class="vd-grid">
          <div class="vd-col color-oscuros"><h5>${c.oscuros.label} <small>${c.oscuros.sub}</small></h5><ul>${c.oscuros.items.map(i => `<li>${i}</li>`).join('')}</ul></div>
          <div class="vd-col color-claros"><h5>${c.claros.label} <small>${c.claros.sub}</small></h5><ul>${c.claros.items.map(i => `<li>${i}</li>`).join('')}</ul></div>
        </div>
        <p>${withRefs(c.p2)}</p><p>${c.p3}</p>
      </div>`, 'el color de la envolvente');
    }
    if (key === 'RH') {
      return `<div class="cat-intro">${RH_INTRO.split('\n\n').map(p => `<p>${withRefs(esc(p))}</p>`).join('')}</div>`;
    }
    return '';
  }

  function catOutroHTML(key) {
    if (state.query) return '';
    if (key === 'EV') return comparatorHTML();
    return '';
  }

  // Contenido extra al pie de una subcategoría (dentro de su desplegable)
  function groupExtraHTML(catKey, name) {
    if (state.query) return '';
    if (catKey === 'P' && name === 'Vegetación') {
      const v = VEGETACION_EXTRA;
      return `<div class="cat-intro group-extra">
        <p>${esc(v.intro)}</p>
        <ul class="veg-list">${v.items.map(([b, t]) => `<li><b>${esc(b)}</b> ${esc(t)}</li>`).join('')}</ul>
        <p>${esc(v.cierre)}</p>
      </div>` + tipbox(v.tip);
    }
    return '';
  }

  // ---------- Render ----------
  function captureOpen() {
    // Si lo que hay en pantalla es un resultado de búsqueda, todo está forzado
    // abierto: no sobrescribimos el estado real de despliegue del usuario.
    if (state.query || state.lastWasQuery) return;
    state.open = new Set($$('details.cat-section[id], details.group-section[id]')
      .filter(d => d.open).map(d => d.id));
  }

  function subgroupHTML(catKey, g) {
    // Avisos generales de la subcategoría: van al pie del grupo, debajo de las fichas.
    const notas = g.items.reduce((acc, s) => acc.concat(s.notas || []), []);
    const grid = `<div class="st-grid">${g.items.map(strategyHTML).join('')}</div>`
      + (notas.length ? `<div class="group-notes">${notas.map(n => n.html ? tipbox(n.html, n.icon, n.alt) : tipbox(n)).join('')}</div>` : '')
      + groupExtraHTML(catKey, g.name);
    if (!g.name) return grid;
    const id = groupId(catKey, g.name);
    const open = state.query || state.open.has(id) ? ' open' : '';
    return `<details class="group-section" id="${id}"${open}>
      <summary class="group-summary">
        <span class="group-name">${esc(g.name)}</span>
        <span class="group-count">${g.items.length}</span>
        ${ARROW}
      </summary>
      <div class="group-content">${grid}</div>
    </details>`;
  }

  function render() {
    captureOpen();

    const frag = [];
    let total = 0;

    TYPES.forEach(t => {
      const cats = catsOf(t.key);
      const catBlocks = [];

      cats.forEach(([key, cat]) => {
        const items = STRATEGIES.filter(s => s.cat === key && matches(s));
        if (!items.length) return;
        total += items.length;

        const groups = groupsOf(key, items);
        const catId = `cat-${key}`;
        const open = state.query || state.open.has(catId) ? ' open' : '';

        catBlocks.push(`<details class="cat-section" id="${catId}" style="--c:${cat.color}"${open}>
          <summary class="cat-header">
            <div class="cat-icon"><img src="${iconFor(cat)}" alt="" loading="lazy"></div>
            <div class="cat-header-text">
              <span class="cat-num">${cat.num} | ${cat.name} <span class="cat-tag">${cat.tag}</span></span>
              <svg class="cat-arrow" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
          </summary>
          <div class="cat-content">
            ${catIntroHTML(key)}
            ${groups.map(g => subgroupHTML(key, g)).join('')}
            ${catOutroHTML(key)}
          </div>
        </details>`);
      });

      if (!catBlocks.length) return;

      frag.push(`<section class="type-section" id="${t.id}">
        <div class="type-banner">
          <div class="type-banner-inner">
            <p class="type-banner-pre">ESTRATEGIAS</p>
            <h2>${t.title}</h2>
            ${state.query ? '' : `<div class="cat-nav">${cats.map(([key, c]) =>
              `<a class="chip chip-cat" style="--c:${c.color}" href="#cat-${key}"><span class="dot"></span>${c.num} | ${c.name}</a>`).join('')}</div>`}
          </div>
        </div>
        <div class="section type-body">
          ${catBlocks.join('')}
        </div>
      </section>`);
    });

    rootEl.innerHTML = frag.join('') || '';
    if (state.query) {
      noteEl.hidden = false;
      noteEl.textContent = total
        ? `${total} estrategia${total === 1 ? '' : 's'} para “${searchEl.value.trim()}”`
        : `No se encontraron estrategias para “${searchEl.value.trim()}”.`;
    } else {
      noteEl.hidden = true;
    }
    state.lastWasQuery = !!state.query;
  }

  // ---------- Ventana flotante con la tabla de K admisible (punto 06) ----------
  function initKModal() {
    const modal = $('#k-modal');
    const body = $('#k-modal-body');
    const src = $('#intro-k');
    if (!modal || !body || !src) return;
    // Una sola fuente de verdad: se clona la tabla del punto 06 de la Introducción.
    $$('.table-wrap, .caption', src).forEach(el => body.appendChild(el.cloneNode(true)));
  }

  function openKModal() {
    const modal = $('#k-modal');
    if (!modal) return;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    const btn = $('#k-modal-close');
    if (btn) btn.focus();
  }

  function closeKModal() {
    const modal = $('#k-modal');
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeKModal(); hideRef(); } });

  // ---------- Bibliografía y fuentes (al final de la página) ----------
  function renderBiblio() {
    const el = $('#bibliografia');
    if (!el) return;
    const entries = Object.entries(REFS);
    const item = ([key, r]) => `<li id="ref-${key}">${linkify(r.html)}</li>`;
    el.innerHTML = `<h2 class="section-title" id="biblio-title">BIBLIOGRAFÍA Y FUENTES</h2>
      <p class="section-hint">Los asteriscos (<span class="ref-demo">*</span>) del manual remiten a estas referencias: pasá el mouse por encima para verlas.</p>
      <ul class="biblio-list">${entries.filter(([, r]) => r.bib).map(item).join('')}</ul>
      <h3 class="biblio-sub">Notas y fuentes complementarias</h3>
      <ul class="biblio-list biblio-notes">${entries.filter(([, r]) => !r.bib).map(item).join('')}</ul>`;
  }

  // ---------- Ventana de referencia al pasar el mouse por un asterisco ----------
  const refPop = document.createElement('div');
  refPop.className = 'ref-pop';
  refPop.id = 'ref-pop';
  refPop.setAttribute('role', 'tooltip');
  refPop.hidden = true;
  document.body.appendChild(refPop);
  let refHideTimer;
  let refAnchor = null;
  let refPinned = false;   // abierta con un clic/toque: no se cierra al sacar el mouse

  function showRef(btn) {
    const key = btn.dataset.ref;
    const r = REFS[key];
    if (!r) return;
    clearTimeout(refHideTimer);
    if (refAnchor !== btn) refPinned = false;
    refAnchor = btn;
    refPop.innerHTML = `<p class="ref-pop-kind">${r.bib ? 'Bibliografía' : 'Nota'}</p>
      <p class="ref-pop-text">${linkify(r.html)}</p>
      <a class="ref-pop-link" href="#ref-${key}">Ver en Bibliografía y fuentes ›</a>`;
    refPop.hidden = false;
    btn.setAttribute('aria-describedby', 'ref-pop');
    // Posición: debajo del asterisco (o arriba si no entra), sin salirse de la pantalla
    const b = btn.getBoundingClientRect();
    const w = refPop.offsetWidth, h = refPop.offsetHeight;
    const left = Math.min(Math.max(12, b.left + b.width / 2 - w / 2), window.innerWidth - w - 12);
    const below = b.bottom + 8 + h < window.innerHeight;
    refPop.style.left = `${left}px`;
    refPop.style.top = `${below ? b.bottom + 8 : b.top - h - 8}px`;
  }

  function hideRef() {
    clearTimeout(refHideTimer);
    refPop.hidden = true;
    if (refAnchor) refAnchor.removeAttribute('aria-describedby');
    refAnchor = null;
    refPinned = false;
  }

  const hideRefSoon = () => {
    if (refPinned) return;
    clearTimeout(refHideTimer);
    refHideTimer = setTimeout(hideRef, 220);
  };

  document.addEventListener('mouseover', e => {
    const btn = e.target.closest('.ref');
    if (btn) showRef(btn);
    else if (e.target.closest('#ref-pop')) clearTimeout(refHideTimer);
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('.ref, #ref-pop')) hideRefSoon();
  });
  document.addEventListener('focusin', e => {
    const btn = e.target.closest('.ref');
    if (btn) showRef(btn);
    else if (!e.target.closest('#ref-pop')) hideRef();
  });
  window.addEventListener('scroll', () => { if (!refPop.hidden) hideRef(); }, { passive: true });

  // ---------- Navegación hacia categorías/subcategorías/estrategias colapsadas ----------
  function openAncestors(el) {
    let node = el;
    while (node) {
      const det = node.closest('details');
      if (!det) break;
      det.open = true;
      node = det.parentElement;
    }
  }

  document.addEventListener('click', e => {
    // Asterisco de referencia: en pantallas táctiles (sin hover) el toque abre/cierra la ventana
    const refBtn = e.target.closest('.ref');
    if (refBtn) {
      e.preventDefault();
      e.stopPropagation();
      if (refAnchor === refBtn && refPinned) hideRef();
      else { showRef(refBtn); refPinned = true; }
      return;
    }
    if (!e.target.closest('#ref-pop')) hideRef();

    // Ventana flotante con la tabla de K admisible
    if (e.target.closest('[data-kmodal]')) {
      e.preventDefault();      // evita que el <summary> se despliegue
      e.stopPropagation();
      openKModal();
      return;
    }
    if (e.target.closest('#k-modal-close') || e.target.id === 'k-modal') {
      closeKModal();
      return;
    }

    // Comparador: pestañas e inversión
    const tab = e.target.closest('.cmp-tab');
    if (tab) {
      const set = tab.dataset.set;
      const d = cmpDefaults(set);
      state.cmp = { set: set, a: d.a, b: d.b };
      refreshComparator();
      return;
    }
    if (e.target.closest('.cmp-swap')) {
      const tmp = state.cmp.a;
      state.cmp.a = state.cmp.b;
      state.cmp.b = tmp;
      refreshComparator();
      return;
    }

    const a = e.target.closest('a[href^="#cat-"], a[href^="#g-"], a[href^="#s-"], a[href^="#cmp-"], a[href^="#intro-"], a[href^="#ref-"]');
    if (!a) return;
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    closeKModal();
    hideRef();
    openAncestors(target.matches('details') ? target.parentElement : target);
    if (target.matches('details')) target.open = true;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (target.classList.contains('st-item') || target.matches('.biblio-list li')) {
      target.classList.remove('flash');
      void target.offsetWidth;
      target.classList.add('flash');
    }
    history.replaceState(null, '', a.getAttribute('href'));
  });

  document.addEventListener('change', e => {
    const sel = e.target.closest('.cmp-select');
    if (!sel) return;
    state.cmp[sel.dataset.side] = sel.value;
    refreshComparator();
  });

  buildNavMenus();
  initKModal();
  renderBiblio();
  render();
})();
