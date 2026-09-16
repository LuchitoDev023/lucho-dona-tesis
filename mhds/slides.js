// MHDS — Modo presentación.
// Versión resumida de la Introducción, pensada para proyectar: poco texto por
// pantalla, tipografía grande y legible desde el fondo de la sala.
// El contenido completo sigue viviendo en index.html; esto es sólo el guión.
(function () {
  'use strict';

  const SLIDES = [
    // ---------- 01 ----------
    { block: '01', kicker: '01 · DEFINICIÓN', title: '¿Qué es el MHDS?',
      lead: 'Un conjunto ordenado de <b>herramientas proyectuales combinables</b> para configurar viviendas unifamiliares accesibles, eficientes y evolutivas, en un contexto situado.',
      note: 'No propone un estándar único: acompaña las decisiones desde el inicio del proyecto.' },

    { block: '01', kicker: '01 · ¿POR QUÉ?', title: 'El problema que aborda',
      lead: 'Las viviendas consumen <b>demasiada energía</b> para acondicionarse.',
      items: [
        { h: 'Disconfort', t: 'Casas frías en invierno y calurosas en verano.' },
        { h: 'Sobrecostos', t: 'Facturas que crecen sin mejorar el confort.' },
        { h: 'Ineficiencia', t: 'Energía que se pierde por la envolvente.' },
      ] },

    { block: '01', kicker: '01 · ¿PARA QUIÉN?', title: 'Un doble público',
      lead: 'Es una <b>herramienta compartida</b>: sirve para explicar y decidir en conjunto.',
      items: [
        { h: 'Profesionales', t: 'Arquitectura y construcción.' },
        { h: 'Clientes y usuarios', t: 'Para participar de manera informada del diseño y la obra.' },
      ] },

    // ---------- 02 ----------
    { block: '02', kicker: '02 · CONCEPTOS CENTRALES', title: 'Tres principios rectores',
      lead: 'Se articulan bajo el paradigma de la <b>sostenibilidad</b>, en diálogo con el contexto local.',
      items: [
        { img: 'assets/intro/conceptos-1.png', h: 'Flexibilidad', t: 'El espacio se adapta a nuevos usos y al clima sin grandes intervenciones.' },
        { img: 'assets/intro/conceptos-2.png', h: 'Habitabilidad', t: 'Confort, ventilación, asoleamiento y relación con el exterior.' },
        { img: 'assets/intro/conceptos-3.png', h: 'Eficiencia energética', t: 'Menos consumo, sin resignar calidad ambiental.' },
      ] },

    // ---------- 03 ----------
    { block: '03', kicker: '03 · DIFUSIÓN Y CONCIENTIZACIÓN', title: 'Difundir es transformar',
      lead: 'Que el conocimiento técnico circule libre es lo que convierte una buena práctica en <b>cambio cultural</b>.',
      badges: [
        { n: '4',  t: 'Educación de calidad',                  slug: 'education' },
        { n: '7',  t: 'Energía asequible y no contaminante',   slug: 'energy' },
        { n: '9',  t: 'Industria, innovación e infraestructura', slug: 'infrastructure' },
        { n: '10', t: 'Reducción de las desigualdades',        slug: 'inequality' },
        { n: '11', t: 'Ciudades y comunidades sostenibles',    slug: 'cities' },
        { n: '12', t: 'Producción y consumo responsables',     slug: 'sustainable-consumption-production' },
      ],
      note: 'Tocá cada objetivo para abrir su página oficial en Naciones Unidas.' },

    // ---------- 04 ----------
    { block: '04', kicker: '04 · CONCEPTOS CLAVES', title: 'Pasivas y activas',
      lead: 'Dos formas de alcanzar el confort. El orden importa.',
      items: [
        { img: 'assets/intro/pasiva-activa-1.png', h: 'PASIVAS', t: 'Sin equipos ni energía exterior: funcionamiento autónomo. Pilar de la arquitectura bioclimática.', tone: 'pasiva' },
        { img: 'assets/intro/pasiva-activa-2.png', h: 'ACTIVAS', t: 'Con dispositivos electromecánicos. Más tecnología y más costo: optimizan lo que ya resolvió lo pasivo.', tone: 'activa' },
      ] },

    // ---------- 05 ----------
    { block: '05', kicker: '05 · PRINCIPIO BÁSICO', title: 'La vivienda es un balde',
      lead: 'Las <b>pérdidas térmicas</b> son los agujeros; la <b>energía</b>, el agua de la canilla.',
      variant: 'balde',
      items: [
        { img: 'assets/intro/balde-1.png', h: 'Con agujeros', t: 'Nunca se llena, por más que abramos la canilla.' },
        { img: 'assets/intro/balde-2.png', h: 'Sano', t: 'Con la envolvente resuelta, cada aporte rinde.' },
      ],
      note: 'Primero tapar los agujeros. Después, abrir la canilla.' },

    { block: '05', kicker: '05 · TRANSFERENCIA DE CALOR', title: '¿Por dónde se escapa el calor?',
      figure: 'assets/intro/transferencia.jpg',
      items: [
        { h: 'Conducción', t: 'A través de los materiales.' },
        { h: 'Convección', t: 'A través del aire y el agua.' },
        { h: 'Radiación', t: 'A través de ondas electromagnéticas.' },
      ] },

    // ---------- 06 ----------
    { block: '06', kicker: '06 · TRANSMITANCIA TÉRMICA', title: '¿Qué es el K?',
      lead: 'La energía que deja pasar <b>1 m² de envolvente</b> por cada grado de diferencia entre interior y exterior.',
      big: 'W/m²K',
      note: 'Cuanto más bajo es el K, más aísla el sistema.' },

    { block: '06', kicker: '06 · TRANSMITANCIA TÉRMICA', title: 'Valores admisibles',
      table: true,
      note: 'Región centro de Santa Fe (Norma IRAM 11.605). Un sistema alcanza un nivel cuando su K es menor o igual al de la fila.' },

    // ---------- 07 ----------
    { block: '07', kicker: '07 · ETIQUETADO DE VIVIENDAS', title: 'PRONEV',
      layout: 'split',
      lead: 'Una <b>escala comparativa</b> del desempeño energético de la vivienda, como la de los electrodomésticos.',
      figure: 'assets/intro/etiqueta.jpg',
      items: [
        { h: 'IRAM 11900', t: 'Define el método de cálculo.' },
        { h: 'Ley 13903/19', t: 'Impulsa la adhesión de los municipios en Santa Fe.' },
        { h: 'Escala A a G', t: 'Según el Índice de Prestaciones Energéticas (IPE).' },
      ],
      note: 'San Carlos Sud fue pionera en adherir a la Ley de Etiquetado en la provincia de Santa Fe.' },
  ];

  const K_ROWS = [
    ['A', '0,33', '0,18', 'lvl-a'],
    ['B1', '0,62', '0,31', 'lvl-b1'],
    ['B', '0,91', '0,45', 'lvl-b'],
    ['C', '1,59', '0,72', 'lvl-c'],
  ];

  let idx = 0;
  let overlay = null;

  // ---------- Armado del visor ----------
  function build() {
    overlay = document.createElement('div');
    overlay.className = 'slides';
    overlay.id = 'slides';
    overlay.hidden = true;
    overlay.innerHTML = `
      <div class="sl-progress"><span id="sl-progress-bar"></span></div>
      <div class="sl-bar">
        <span class="sl-brand">MHDS · Introducción</span>
        <div class="sl-bar-actions">
          <button type="button" class="sl-btn" id="sl-full" title="Pantalla completa" aria-label="Pantalla completa">⛶</button>
          <button type="button" class="sl-btn sl-btn-exit" id="sl-exit" aria-label="Salir de la presentación">Salir ✕</button>
        </div>
      </div>
      <button type="button" class="sl-arrow sl-prev" id="sl-prev" aria-label="Anterior">‹</button>
      <div class="sl-stage" id="sl-stage" aria-live="polite"></div>
      <button type="button" class="sl-arrow sl-next" id="sl-next" aria-label="Siguiente">›</button>
      <div class="sl-dots" id="sl-dots"></div>`;
    document.body.appendChild(overlay);

    overlay.querySelector('#sl-prev').addEventListener('click', () => go(idx - 1));
    overlay.querySelector('#sl-next').addEventListener('click', () => go(idx + 1));
    overlay.querySelector('#sl-exit').addEventListener('click', close);
    overlay.querySelector('#sl-full').addEventListener('click', toggleFull);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

    // Deslizar en pantallas táctiles
    let x0 = null;
    overlay.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    overlay.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 60) go(idx + (dx < 0 ? 1 : -1));
      x0 = null;
    }, { passive: true });
  }

  function slideHTML(s) {
    const split = s.layout === 'split';
    const itemsClass = split ? 'sl-items sl-items-stack'
      : `sl-items sl-items-${s.items ? s.items.length : 0}${s.variant ? ' sl-items-' + s.variant : ''}`;
    const items = s.items ? `<div class="${itemsClass}">${s.items.map(it => `
      <div class="sl-item${it.tone ? ' sl-' + it.tone : ''}">
        ${it.img ? `<img src="${it.img}" alt="" loading="lazy">` : ''}
        <h3>${it.h}</h3>
        <p>${it.t}</p>
      </div>`).join('')}</div>` : '';

    const badges = s.badges ? `<div class="sl-badges">${s.badges.map(b =>
      `<a href="https://www.un.org/sustainabledevelopment/es/${b.slug}/" target="_blank" rel="noopener" title="ODS ${b.n}: ${b.t}">
         <img src="assets/intro/ods-${b.n}.jpg" alt="ODS ${b.n}: ${b.t}" loading="lazy"></a>`).join('')}</div>` : '';
    const figure = s.figure ? `<div class="sl-figure"><img src="${s.figure}" alt="" loading="lazy"></div>` : '';
    const big = s.big ? `<p class="sl-big">${s.big}</p>` : '';
    const table = s.table ? `<table class="sl-table">
      <thead><tr><th>Nivel</th><th>Muro<br><small>condición invierno</small></th><th>Cubierta<br><small>condición verano</small></th></tr></thead>
      <tbody>${K_ROWS.map(r => `<tr class="${r[3]}"><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
    </table>` : '';

    const body = split
      ? `<div class="sl-split">
           <div class="sl-split-main">${s.lead ? `<p class="sl-lead">${s.lead}</p>` : ''}${items}</div>
           <div class="sl-split-aside">${figure}</div>
         </div>`
      : `${s.lead ? `<p class="sl-lead">${s.lead}</p>` : ''}${big}${figure}${badges}${items}${table}`;

    const tight = s.variant === 'balde' || (s.figure && s.items)
      || (s.items && s.items.some(it => it.img));
    return `<article class="sl-card${split ? ' sl-card-split' : ''}${s.variant ? ' sl-card-' + s.variant : ''}${tight ? ' sl-card-tight' : ''}">
      <p class="sl-kicker">${s.kicker}</p>
      <h2 class="sl-title">${s.title}</h2>
      ${body}
      ${s.note ? `<p class="sl-note">${s.note}</p>` : ''}
      <span class="sl-num">${idx + 1} / ${SLIDES.length}</span>
    </article>`;
  }

  function go(n) {
    if (n < 0 || n >= SLIDES.length) return;
    idx = n;
    const stage = overlay.querySelector('#sl-stage');
    stage.innerHTML = slideHTML(SLIDES[idx]);
    stage.firstElementChild.classList.add('is-in');

    overlay.querySelector('#sl-progress-bar').style.width = ((idx + 1) / SLIDES.length * 100) + '%';
    overlay.querySelector('#sl-prev').disabled = idx === 0;
    overlay.querySelector('#sl-next').disabled = idx === SLIDES.length - 1;
    overlay.querySelector('#sl-dots').innerHTML = SLIDES.map((s, i) =>
      `<button type="button" class="sl-dot${i === idx ? ' is-on' : ''}" data-i="${i}" title="${s.kicker}" aria-label="Ir a la diapositiva ${i + 1}"></button>`).join('');
  }

  function open(startBlock) {
    if (!overlay) build();
    const start = startBlock ? SLIDES.findIndex(s => s.block === startBlock) : 0;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    go(start < 0 ? 0 : start);
  }

  function close() {
    if (!overlay || overlay.hidden) return;
    overlay.hidden = true;
    document.body.style.overflow = '';
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen();
  }

  function toggleFull() {
    if (document.fullscreenElement) { if (document.exitFullscreen) document.exitFullscreen(); }
    else if (overlay.requestFullscreen) overlay.requestFullscreen();
  }

  // ---------- Disparadores ----------
  document.addEventListener('click', e => {
    const dot = e.target.closest('.sl-dot');
    if (dot) { go(Number(dot.dataset.i)); return; }
    const trigger = e.target.closest('[data-slides]');
    if (!trigger) return;
    e.preventDefault();
    e.stopPropagation();      // que el <summary> no se despliegue
    open(trigger.dataset.slides || null);
  });

  document.addEventListener('keydown', e => {
    if (!overlay || overlay.hidden) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); go(idx + 1); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(idx - 1); }
    else if (e.key === 'Escape') close();
    else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(SLIDES.length - 1);
  });

  // Botón general + un botón por bloque de la Introducción
  function initTriggers() {
    const hint = document.querySelector('#introduccion .section-hint');
    if (hint) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'present-btn present-btn-main';
      btn.setAttribute('data-slides', '');
      btn.title = 'Modo presentación';
      btn.setAttribute('aria-label', 'Abrir la introducción en modo presentación');
      btn.textContent = '▶';
      hint.appendChild(btn);   // discreto, al final de la línea de ayuda
    }
    document.querySelectorAll('#introduccion .intro-block > summary').forEach(sum => {
      const num = sum.querySelector('.intro-num');
      if (!num || !SLIDES.some(s => s.block === num.textContent.trim())) return;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'present-btn';
      b.setAttribute('data-slides', num.textContent.trim());
      b.title = 'Ver como diapositiva';
      b.setAttribute('aria-label', 'Ver este bloque como diapositiva');
      b.textContent = '▶';
      sum.appendChild(b);
    });
  }

  // El script se carga al final del <body>, así que la Introducción ya está parseada.
  if (document.querySelector('#introduccion')) initTriggers();
  else document.addEventListener('DOMContentLoaded', initTriggers);
})();
