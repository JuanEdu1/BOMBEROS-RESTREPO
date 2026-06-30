// Ensambla las páginas internas: envuelve cada fragmento <main> (de scratchpad/_pages)
// en el shell único (head + barra de emergencia + navbar + footer) y escribe web/<slug>.html.
// Uso: node scripts/build_pages.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const WEB = path.join(ROOT, 'web');
const FRAG = 'C:/Users/ardil/AppData/Local/Temp/claude/c--Users-ardil-Documents-Antigravity-BOMBEROS-RESTREPO/6175109b-4f98-4db1-9928-e9041be72f18/scratchpad/_pages';

const SITE = 'https://bomberosrestrepo.org';

const PAGES = [
  { slug: 'quienes-somos', active: 'quienes', title: 'Quiénes somos', desc: 'Conoce al Cuerpo de Bomberos Voluntarios de Restrepo (Meta): entidad sin ánimo de lucro al servicio de la comunidad desde 2003.' },
  { slug: 'servicios', active: 'servicios', title: 'Servicios', desc: 'Atención de emergencias y prevención del riesgo en Restrepo, Meta: incendios, rescate, atención prehospitalaria, capacitación y más.' },
  { slug: 'prevencion', active: 'prevencion', title: 'Prevención', desc: 'Consejos de prevención que salvan vidas: uso del extintor, botiquín, plan de evacuación, incendios forestales y más.' },
  { slug: 'comunidad', active: 'comunidad', title: 'Comunidad y noticias', desc: 'Noticias, eventos y galería del Cuerpo de Bomberos Voluntarios de Restrepo, presentes en la vida del municipio.' },
  { slug: 'contacto', active: 'contacto', title: 'Contacto', desc: 'Comunícate con los Bomberos Voluntarios de Restrepo (Meta). Estación Cl. 10 #250 a 2-56. Emergencias 119 · 123.' },
  { slug: 'voluntariado', active: null, title: 'Ser voluntario', desc: 'Conviértete en bombero voluntario de Restrepo. Sin experiencia previa: te formamos. Postúlate hoy.' },
  { slug: 'donaciones', active: null, title: 'Donaciones', desc: 'Apoya a los Bomberos Voluntarios de Restrepo con recursos, equipos o tu tiempo como voluntario.' },
  { slug: 'politica-de-datos', active: null, title: 'Política de tratamiento de datos', desc: 'Política de tratamiento de datos personales (Ley 1581 de 2012) del Cuerpo de Bomberos Voluntarios de Restrepo.', noindex: true },
];

const ICON_HEART = '<svg class="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>';
const ICON_PHONE = '<svg class="ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>';

function navList(active) {
  const items = [
    ['index.html', 'inicio', 'Inicio'],
    ['quienes-somos.html', 'quienes', 'Quiénes somos'],
    ['servicios.html', 'servicios', 'Servicios'],
    ['prevencion.html', 'prevencion', 'Prevención'],
    ['comunidad.html', 'comunidad', 'Comunidad'],
    ['contacto.html', 'contacto', 'Contacto'],
  ];
  return items.map(([href, key, label]) => {
    const cur = key === active ? ' aria-current="page"' : '';
    return `              <li><a class="nav__link" href="${href}"${cur}>${label}</a></li>`;
  }).join('\n');
}

function shell(p, main) {
  const canonical = `${SITE}/${p.slug}.html`;
  const fullTitle = `${p.title} — Bomberos Voluntarios de Restrepo (Meta)`;
  const robots = p.noindex ? '\n  <meta name="robots" content="noindex" />' : '';
  return `<!DOCTYPE html>
<html lang="es-CO">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#E71118" />${robots}

  <title>${fullTitle}</title>
  <meta name="description" content="${p.desc}" />
  <link rel="canonical" href="${canonical}" />

  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:locale" content="es_CO" />
  <meta property="og:site_name" content="Bomberos Voluntarios de Restrepo" />
  <meta property="og:title" content="${p.title} — Bomberos Voluntarios de Restrepo" />
  <meta property="og:description" content="${p.desc}" />
  <meta property="og:image" content="https://res.cloudinary.com/dxpt1bcki/image/upload/f_auto,q_auto,w_1200,h_630,c_fill,g_auto/v1/bomberos-restrepo/foto-grupal" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Equipo de bomberos voluntarios de Restrepo frente a la estación y sus máquinas." />
  <meta name="twitter:card" content="summary_large_image" />

  <link rel="icon" type="image/png" href="https://res.cloudinary.com/dxpt1bcki/image/upload/f_auto,q_auto,w_64,h_64,c_fit/v1/bomberos-restrepo/loogo-bomberos-sin-fondo" />
  <link rel="apple-touch-icon" href="https://res.cloudinary.com/dxpt1bcki/image/upload/f_auto,q_auto,w_180,h_180,c_fit,b_white/v1/bomberos-restrepo/loogo-bomberos-sin-fondo" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" />
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" media="print" onload="this.media='all'" />
  <noscript><link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" /></noscript>

  <script>document.documentElement.classList.add('js');</script>
  <link rel="stylesheet" href="assets/css/styles.css" />

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": ["NGO", "FireStation", "LocalBusiness"],
    "name": "Cuerpo de Bomberos Voluntarios de Restrepo",
    "alternateName": "Bomberos Restrepo Meta",
    "url": "${SITE}/",
    "logo": "https://res.cloudinary.com/dxpt1bcki/image/upload/f_auto,q_auto,w_512/v1/bomberos-restrepo/logo-bomberos",
    "telephone": "+573103118280",
    "address": { "@type": "PostalAddress", "streetAddress": "Cl. 10 #250 a 2-56", "addressLocality": "Restrepo", "addressRegion": "Meta", "addressCountry": "CO" },
    "geo": { "@type": "GeoCoordinates", "latitude": 4.256225, "longitude": -73.571052 },
    "sameAs": ["https://www.facebook.com/bomberos.restrepometa", "https://www.instagram.com/bomberosrestrepometa"]
  }
  </script>
</head>

<body>
  <a class="skip-link" href="#main">Saltar al contenido principal</a>

  <div class="topbar" id="topbar">
    <div class="emergency-bar">
      <div class="container emergency-bar__inner">
        <span class="emergency-bar__label">
          <svg class="ico" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 10 8 2h8l-2 8 8-2v8l-8-2 2 8H8l2-8-8 2V8z"/></svg>
          <span class="u-hide-mobile">Líneas de emergencia 24/7:</span>
        </span>
        <a class="emergency-bar__line" href="tel:119" aria-label="Llamar a Bomberos, línea de emergencia 119">
          ${ICON_PHONE}
          <strong>119</strong> <span class="u-hide-mobile">Bomberos</span>
        </a>
        <span class="emergency-bar__sep" aria-hidden="true">·</span>
        <a class="emergency-bar__line" href="tel:123" aria-label="Llamar a la línea única de emergencias 123">
          <strong>123</strong> <span class="u-hide-mobile">Emergencias</span>
        </a>
        <span class="emergency-bar__sep" aria-hidden="true">·</span>
        <a class="emergency-bar__line emergency-bar__line--phone" href="tel:+573103118280" aria-label="Llamar a la estación, 310 311 8280">
          ${ICON_PHONE}
          <span class="u-hide-mobile">Estación </span><strong>310 311 8280</strong>
        </a>
      </div>
    </div>

    <header class="site-header" id="site-header">
      <div class="container site-header__inner">
        <a class="brand" href="index.html" aria-label="Inicio — Bomberos Voluntarios de Restrepo">
          <img class="brand__logo" src="https://res.cloudinary.com/dxpt1bcki/image/upload/f_auto,q_auto,w_120,c_fit/v1/bomberos-restrepo/loogo-bomberos-sin-fondo" alt="" width="56" height="56" decoding="async" aria-hidden="true" />
          <span class="brand__text">
            <span class="brand__name">Bomberos Voluntarios</span>
            <span class="brand__place">Restrepo · Meta</span>
          </span>
        </a>

        <nav class="nav" aria-label="Navegación principal">
          <button class="nav__toggle" id="navToggle" aria-expanded="false" aria-controls="navMenu" aria-label="Abrir menú de navegación">
            <svg class="nav__toggle-open" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            <svg class="nav__toggle-close" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>

          <div class="nav__menu" id="navMenu">
            <button class="nav__close" id="navClose" type="button" aria-label="Cerrar menú de navegación">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
            <ul class="nav__list">
${navList(p.active)}
            </ul>
            <a class="btn btn--primary nav__cta" href="voluntariado.html">
              ${ICON_HEART}
            Ser voluntario</a>
          </div>
        </nav>
      </div>
    </header>
  </div>
  <div class="nav__scrim" id="navScrim" hidden></div>

  <main id="main">
${main.trimEnd()}
  </main>

  <footer class="site-footer">
    <div class="site-footer__chevrons" aria-hidden="true"></div>
    <div class="container site-footer__grid">
      <div class="site-footer__col site-footer__brand">
        <div class="footer-brand">
          <img src="https://res.cloudinary.com/dxpt1bcki/image/upload/f_auto,q_auto,w_120,c_fit/v1/bomberos-restrepo/loogo-bomberos-sin-fondo" alt="" width="60" height="60" loading="lazy" decoding="async" aria-hidden="true" />
          <div>
            <strong>Bomberos Voluntarios</strong>
            <span>Restrepo · Meta</span>
          </div>
        </div>
        <p class="site-footer__motto">«Vivimos para servir a los demás.»</p>
        <p class="site-footer__nature">Entidad sin ánimo de lucro conformada por voluntarios. Al servicio de la comunidad desde 2003.</p>
      </div>

      <nav class="site-footer__col" aria-label="Enlaces del sitio">
        <h2 class="site-footer__title">Navegación</h2>
        <ul>
          <li><a href="index.html">Inicio</a></li>
          <li><a href="quienes-somos.html">Quiénes somos</a></li>
          <li><a href="servicios.html">Servicios</a></li>
          <li><a href="prevencion.html">Prevención</a></li>
          <li><a href="comunidad.html">Comunidad</a></li>
          <li><a href="voluntariado.html">Ser voluntario</a></li>
          <li><a href="donaciones.html">Donaciones</a></li>
        </ul>
      </nav>

      <div class="site-footer__col">
        <h2 class="site-footer__title">Contacto</h2>
        <ul class="site-footer__contact">
          <li>Cl. 10 #250 a 2-56<br>Restrepo, Meta</li>
          <li><a href="tel:+573103118280">310 311 8280</a></li>
          <li>Emergencias: <a href="tel:119">119</a> · <a href="tel:123">123</a></li>
          <li><a href="politica-de-datos.html">Política de datos</a></li>
        </ul>
      </div>

      <div class="site-footer__col">
        <h2 class="site-footer__title">Síguenos</h2>
        <div class="site-footer__social">
          <a href="https://www.facebook.com/bomberos.restrepometa" aria-label="Facebook" rel="noopener" target="_blank">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/></svg>
          </a>
          <a href="https://www.instagram.com/bomberosrestrepometa" aria-label="Instagram" rel="noopener" target="_blank">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
        </div>
        <a class="btn btn--primary btn--block" href="voluntariado.html">Ser voluntario</a>
      </div>
    </div>

    <div class="site-footer__bar">
      <div class="container site-footer__bar-inner">
        <p>© <span id="year">2026</span> Cuerpo de Bomberos Voluntarios de Restrepo, Meta.</p>
        <p class="site-footer__transparency">Entidad sin ánimo de lucro al servicio de la comunidad.</p>
      </div>
    </div>
  </footer>

  <script src="assets/js/main.js" defer></script>
</body>
</html>
`;
}

let built = 0, missing = [];
for (const p of PAGES) {
  const fragPath = path.join(FRAG, `${p.slug}.main.html`);
  if (!fs.existsSync(fragPath)) { missing.push(p.slug); continue; }
  const main = fs.readFileSync(fragPath, 'utf8');
  const html = shell(p, main);
  fs.writeFileSync(path.join(WEB, `${p.slug}.html`), html, 'utf8');
  built++;
  console.log('OK ->', `web/${p.slug}.html`, `(${main.length} chars main)`);
}
if (missing.length) console.log('FALTAN fragmentos:', missing.join(', '));
console.log(`Listo: ${built}/${PAGES.length} páginas.`);
