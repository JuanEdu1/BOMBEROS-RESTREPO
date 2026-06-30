# Plan de Acción — Sitio Web Cuerpo de Bomberos Voluntarios de Restrepo (Meta)

> Documento maestro de qué se va a construir, cómo se va a ver y cómo se va a ejecutar.
> La **dirección visual final** se afinará con las **imágenes de referencia** que aportará el usuario
> (ver §10). Lo marcado **[DEPENDE DE FOTOS]** / **[DEPENDE DE LOGO]** / **[BORRADOR — validar con la entidad]**
> queda pendiente de confirmación.

---

## 1. Resumen ejecutivo

Construiremos el sitio web propio del **Cuerpo de Bomberos Voluntarios de Restrepo** con **Django**
(monolito "API-ready" + Django Admin como panel de gestión) y frontend de **plantillas HTML/CSS/JS**
con **animaciones de scroll (AOS.js)**. **Fase 1 = sitio informativo** profesional, accesible y rápido;
arquitectura preparada para escalar (panel, formularios en BD, y a futuro API y pagos en línea).

El diseño se fundamenta en la skill **ui-ux-pro-max** (sistema de tokens, accesibilidad AA, mobile-first,
animación con sentido) y la identidad de marca/logo se generará con las skills **design** / **frontend-design**
una vez recibidas las referencias e imágenes del usuario (§8).

**Dirección de diseño recomendada:** estilo **institucional cívico-moderno** (confianza + cercanía),
con la paleta **extraída del logo oficial**: rojo bomberil `#E71118`, verde de los cerros `#327D44`
y dorado del laurel `#F2A900`. Tipografía **Archivo + Inter**.

---

## 2. Contexto, objetivos y datos reales

### 2.1 Por qué
Hoy la entidad solo tiene presencia digital dispersa (Facebook, Instagram, un WordPress antiguo y básico).
No existe un sitio propio que informe a la comunidad, capte voluntarios, facilite donaciones ni publique
prevención. Este proyecto cubre ese vacío con una base escalable.

### 2.2 Objetivos (definidos con el usuario)
1. **Informar** a la comunidad (quiénes somos, servicios, ubicación, contacto).
2. **Captar voluntarios** (requisitos + formulario de inscripción).
3. **Recibir apoyo / donaciones** (información y datos, transparencia).
4. **Noticias y prevención** (blog + consejos de seguridad).

### 2.3 Datos reales recopilados (investigación)
- **Naturaleza:** entidad **sin ánimo de lucro**, conformada por **voluntarios**.
- **Propósito:** servir a la comunidad, hacer presencia en situaciones de riesgo o emergencia para ayudar a las víctimas.
- **Lema:** *"Estuviésemos muertos si solo sirviéramos a nosotros mismos, pero vivimos para servir a los demás"* (reconfirmar redacción/puntuación exacta).
- **Dirección:** Cl. 10 #250 a 2-56, Restrepo, Meta · **Teléfono:** 310 3118280.
- **Redes:** Facebook `bomberos.restrepometa` · Instagram `@bomberosrestrepometa`.
- **Líneas de emergencia (Colombia):** **119** (bomberos), **123** (emergencias) — visibles en todo el sitio.
- **Transparencia local:** Restrepo aplica una **sobretasa bomberil del 7%** al impuesto de industria y comercio para inversión en el cuerpo de bomberos.
- **Material disponible:** el usuario entregó el **logo oficial**, **4 fotos** reales y **2 videos** (ver §2.4). La paleta se deriva del logo; faltan textos definitivos.

### 2.4 Inventario de contenido entregado y mapa de integración

Material en la carpeta `Contenido/` (analizado). El logo confirma el **año de fundación 2003** y aporta la paleta (rojo/verde/dorado del paisaje de Restrepo).

| Archivo | Tipo | Qué es | Dónde se integra |
|---|---|---|---|
| `Logo Bomberos.png` (1254²) | Logo | Escudo cruz de Malta, fundado 2003 | Navbar, footer, favicon, imagen OG, sello en secciones. **Pendiente: versión transparente/SVG** (hoy tiene fondo blanco). |
| `Foto grupal.jpg` (1600×1200) | Foto | Equipo en uniforme azul frente al cuartel y máquinas | **Hero de Inicio** y **Quiénes somos** (equipo). |
| `Acompañamiento Primera Carrera de la Mujer mujer.jpg` (1600×1200) | Foto | Apoyo a evento deportivo comunitario | **Noticias/Eventos** y **Galería** (Comunidad). |
| `Acompañamiento entrega de vehiculos ... grupal.jpg` (1332×887) | Foto | Bomberos + alcalde + policía, entrega de vehículos (iglesia de Restrepo) | **Noticias** (institucional) y **Quiénes somos**. ⚠ marca de agua "Alcalde". |
| `Acompañamiento entrega de vehiculos ....jpg` (1332×887) | Foto | Acto protocolario en tarima | **Noticias** (detalle del evento). ⚠ marca de agua. |
| `Video quien es bombero.mp4` (65 MB) | Video | Pieza motivacional/identitaria | **Hero de Inicio** (loop corto) o destacado en **Voluntariado**/**Quiénes somos**. ⚠ comprimir (720p, <10 MB) o YouTube + póster. |
| `Actividad personas con discapacidad en bomberos.mp4` (25 MB) | Video | Actividad inclusiva con la comunidad | **Noticias/Comunidad** y **Galería**. ⚠ comprimir o embeber. |

**Tareas de preparación de assets:** convertir fotos a **WebP** + tamaños responsive (375/768/1024/1440) con lazy-load y dimensiones reservadas (CLS<0.1); generar **logo transparente/SVG**; **comprimir/embeber** los videos; resolver **marcas de agua** (pedir originales o recortar/acreditar). Ver visualizador: `design/paleta-de-colores.html`.

---

## 3. Sistema de diseño y dirección visual

> Pares texto/fondo verificados con WCAG 2.1 (ratios calculados). Umbral objetivo **AA 4.5:1** (texto normal) y **3:1** (texto grande/UI).

### 3.1 Dirección de estilo (3 opciones; A recomendada como base)

**Opción A — Institucional cívico-moderno (RECOMENDADA por defecto).** Superficies blancas/grises muy
claras, tipografía robusta, rojo aplicado con disciplina (botones, acentos, barra superior), iconos SVG,
mucho aire, tarjetas con sombra suave. La foto acompaña; el layout se sostiene solo. Máxima accesibilidad,
tolerante a fotos heterogéneas, rápida de implementar. **Base segura para Fase 1.** Dependencia de fotos: baja.

**Opción B — Editorial con fotografía protagonista [DEPENDE DE FOTOS].** Heros a sangre con foto real del
equipo, overlay de degradado, titulares grandes sobre imagen; el rojo pasa a acento/CTA. Máxima cercanía y
emoción. Exige fotos de alta resolución y homogéneas. Se construye **sobre** A (mismos tokens).

**Opción C — Bold / heroico institucional.** Bloques de rojo extensos, tipografía display, estadísticas
grandes, franjas tipo señalética. Gran fuerza de marca, riesgo de saturación/tono agresivo. Recomendado solo
para campañas/landing puntuales (p. ej. reclutamiento), no como base global.

**Decisión:** construir **A como sistema base** y dejar **B y C como "modos" activables por sección** una vez
existan las fotos. Así nada del trabajo de tokens se rehace.

### 3.2 Tokens — fuente de verdad (autoritativos)

> Este bloque es la **única** referencia de nombres y valores. Cualquier nombre divergente que aparezca en
> secciones posteriores se rige por esta tabla (ver §12, Consolidación).

```css
:root {
  /* ---- Color (modo claro) — EXTRAÍDO DEL LOGO OFICIAL ---- */
  --color-primary:        #E71118; /* rojo bomberil del logo (16%). Botón primario, barra emergencia (blanco encima 4.68:1 AA) */
  --color-primary-hover:  #B00D12; /* hover/active + enlaces/texto rojo sobre blanco (7.21:1 AA) */
  --color-primary-contrast:#FFFFFF;
  --color-secondary:      #327D44; /* verde de los cerros del logo (8%). Botón secundario, footer (blanco encima 5.06:1 AA) */
  --color-secondary-hover:#2A6B3A; /* hover del secundario (6.44:1 AA) */
  --color-accent:         #F2A900; /* dorado del laurel/sol del logo; SOLO acento emergencia/destacados (texto #1A1A1A encima 8.66:1) */
  --color-emergency:      var(--color-primary); /* alias semántico para la barra de emergencia */

  --color-bg:             #FFFFFF;
  --color-surface:        #F5F6F7; /* tarjetas, secciones alternas */
  --color-surface-2:      #ECEEF0; /* superficie elevada / inputs / hover de superficie */
  --color-border:         #D9DCE0;

  --color-text:           #1A1A1A; /* texto principal (17.4:1 s/ blanco) */
  --color-text-muted:     #4A4F55; /* secundario/captions (8.27:1) */

  --color-success:        #1E7B45; /* éxito (con icono+texto) */
  --color-warning:        #9A5B00; /* alerta fill (texto blanco) */
  --color-warning-text:   #8A5200; /* texto de alerta sobre blanco */
  --color-error:          #B00020; /* SOLO validación de formularios (distinto del rojo de marca) */
  --color-focus:          #1B2A4A; /* anillo de foco (navy, NO rojo, para distinguir de la marca) */

  /* ---- Tipografía ---- */
  --font-head: 'Archivo', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;

  /* ---- Espaciado (escala 4/8px) ---- */
  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px;
  --space-5:24px; --space-6:32px; --space-7:48px; --space-8:64px; --space-9:96px;

  /* ---- Radios ---- */
  --radius-sm:4px; --radius-md:8px; --radius-lg:12px; --radius-xl:16px; --radius-pill:999px;

  /* ---- Sombras / elevación ---- */
  --shadow-1: 0 1px 2px rgba(16,24,40,.06), 0 1px 3px rgba(16,24,40,.08);
  --shadow-2: 0 2px 4px rgba(16,24,40,.06), 0 4px 8px rgba(16,24,40,.08);
  --shadow-3: 0 8px 16px rgba(16,24,40,.08), 0 12px 24px rgba(16,24,40,.10);

  /* ---- Contenedores / layout ---- */
  --container-sm:640px; --container-md:768px; --container-lg:1024px; --container-xl:1200px; /* max principal */
  --gutter: var(--space-4);     /* móvil */
  --gutter-lg: var(--space-6);  /* >=1024px */

  /* ---- Z-index ---- */
  --z-base:0; --z-dropdown:10; --z-sticky:20; --z-overlay:40; --z-modal:100; --z-toast:1000;
  /* Orden práctico: emergency-bar/sticky header altos; modales 100; toasts 1000 */

  /* ---- Foco ---- */
  --focus-ring: 0 0 0 3px var(--color-focus); /* usar: outline:3px solid var(--color-focus); outline-offset:2px */

  /* ---- Motion (fuente de verdad) ---- */
  --ease-out: cubic-bezier(.16,1,.3,1);
  --ease-in:  cubic-bezier(.4,0,1,1);
  --dur-fast: 150ms; --dur-base: 220ms; --dur-slow: 300ms;
}

/* Modo oscuro: variantes tonales (NO invertir). Activable con prefers-color-scheme + [data-theme="dark"] */
:root[data-theme="dark"], /* o @media (prefers-color-scheme: dark) */ {
  --color-bg:#121417; --color-surface:#1C2024; --color-surface-2:#242A30;
  --color-text:#ECEDEE; --color-text-muted:#A8AEB5;
  --color-primary:#FF5A5F; --color-primary-hover:#FF7A7E;
  --color-secondary:#5BC27C; /* verde aclarado para fondo oscuro */
  --color-success:#4ADE80; --color-error:#FF6B6B;
  --color-border:#2A2F35;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration:.01ms!important; transition-duration:.01ms!important; scroll-behavior:auto!important;
  }
}
```

**Regla crítica:** nunca transmitir información **solo por color**. Éxito/alerta/error siempre con **icono SVG + texto**.
El ámbar de emergencia se usa con etiqueta textual ("Emergencia 119"), nunca como único indicador.

### 3.3 Tipografía

- **Par 1 (RECOMENDADO):** Encabezados **`Archivo`** (grotesca robusta, aire institucional; pesos 600–800) + Cuerpo **`Inter`** (legibilidad en pantalla; 400/500/600).
- **Par 2 (alternativa cálida):** **`Libre Franklin`** (cívico/periodístico) + **`Source Sans 3`** (humanista, amable).
- Comunes: cuerpo **16px**, `line-height` **1.6**, medida **60–75 car** (`max-width: ~70ch`), `font-display: swap`, `tabular-nums` en datos/teléfonos. Fuentes **auto-alojadas** en `/static/fonts/` (no Google Fonts en runtime).

| Rol | px (móvil → desktop) | Weight | line-height |
|---|---|---|---|
| display (hero h1) | 36 → 48 | 800 | 1.1 |
| h1 | 30 → 40 | 700 | 1.15 |
| h2 | 24 → 32 | 700 | 1.2 |
| h3 | 20 → 24 | 600 | 1.25 |
| h4 | 18 → 20 | 600 | 1.3 |
| body-lg | 18 | 400 | 1.6 |
| body | 16 | 400 | 1.6 |
| small | 14 | 400 | 1.5 |
| caption | 12 | 500 | 1.4 |

Un solo `h1` por página; secuencia h1→h6 sin saltos.

### 3.4 Iconografía e imágenes

- **Iconos:** set único **Lucide** (SVG, trazo 2px, `currentColor`). Alternativa: Heroicons. Una sola familia y grosor por capa; tamaños token (`--icon-sm:20`, `--icon-md:24`, `--icon-lg:32`); `aria-label` en botones solo-icono; **nunca emojis** como iconos.
- **Fotografía [DEPENDE DE FOTOS]:** relaciones de aspecto fijas para evitar CLS (hero `16:9` / móvil `4:3`; noticias `3:2`; retratos `4:5`; galería `1:1` o `4:3`). **WebP**, `loading="lazy"` (salvo hero), `srcset/sizes`. Overlay para legibilidad: `linear-gradient(180deg, transparent 30%, rgba(0,0,0,.65))` o velo navy `rgba(27,42,74,.55)`; verificar 4.5:1. Placeholders de marca mientras llegan fotos reales (nunca stock genérico).
- **Logo [DEPENDE DE LOGO]:** respetar proporciones y clear-space; versión monocromática para footer/dark; inyectado desde `SiteConfig` (editable sin tocar plantillas).

---

## 4. Arquitectura de información y UX por sección

### 4.0 Sitemap
```
/ (Inicio)
├── /quienes-somos/
├── /servicios/                     └── /servicios/<slug>/
├── /voluntariado/                  └── /voluntariado/gracias/
├── /donaciones/
├── /noticias/   ├── /noticias/<slug>/   └── /noticias/categoria/<cat>/
├── /galeria/
├── /contacto/                      └── /contacto/gracias/
└── /politica-de-datos/             (Ley 1581/2012 — ver §7)
```
Profundidad máx. 2–3 niveles. Breadcrumbs solo en detalle de Noticias y Servicios. URLs en español, deep-linkables, con trailing slash. `SiteConfig` se inyecta vía context_processor a navbar, barra de emergencia y footer (nunca hardcodeado).

### 4.1 Navegación global (en todas las páginas)

- **`emergency-bar`** (fija arriba): fondo `--color-emergency`, texto blanco AA. `119 Bomberos` · `123 Emergencias` · `310 3118280`, cada uno `tel:` con touch ≥44px y `aria-label` ("Llamar a bomberos, línea 119"). Icono + texto (no solo color). Móvil: compacta a `119 · 123 · [llamar]`.
- **`site-header` (navbar sticky):** logo + nombre → `/`. Items: Inicio · Quiénes somos · Servicios · Voluntariado · Donaciones · Noticias · Galería · Contacto. **Una sola CTA primaria global: "Ser voluntario"** (Donaciones se promueve por banda/footer, no como segunda CTA del header). Estado activo con `aria-current="page"` + peso 600 + indicador rojo (no solo color). Móvil: hamburguesa ≥44px, panel full-width, foco al primer item al abrir, `Esc`/tap-fuera cierran, scrim de fondo, transición 200ms. El header reserva su altura (sin CLS).
- **`site-footer`** (4 columnas → apiladas): (1) identidad + lema + naturaleza; (2) contacto (dirección, `tel:`, 119/123); (3) enlaces rápidos + Voluntariado/Donaciones; (4) redes (Facebook/Instagram con `aria-label`). Franja inferior: © + nota de sobretasa bomberil 7% (transparencia).

### 4.2 Flujos clave
- **Voluntario (conversión principal):** Inicio/navbar/footer → `/voluntariado/` → formulario (validación on-blur) → submit con carga → `/voluntariado/gracias/` → guarda en BD + email → gestión en Admin.
- **Donante:** navbar/banner/footer → `/donaciones/` (por qué + transparencia + cómo donar) → datos de consignación / contacto. Fase 1 **sin pasarela**.

### 4.3 Inicio (`/`)
**Objetivo:** confianza + orientar a voluntariado/donación/emergencias. **CTA primaria:** "Ser voluntario".
**Wireframe:** 1) **Hero** (foto real + overlay, `h1` nombre + lema, 1 CTA primaria + 1 secundaria); 2) franja de lema/cifras (`stats-block` x3–4 **[cifras a confirmar]**); 3) **Qué hacemos** (grid de `card--service`); 4) teaser Quiénes somos; 5) **`cta-band`** voluntariado (rojo); 6) Noticias recientes (3 `card--post`); 7) **`cta-band`** donaciones; 8) mapa/ubicación + contacto rápido. Bandas alternan fondo para ritmo. **Responsive:** hero apila; grids → 1 col; CTAs full-width.

### 4.4 Quiénes somos (`/quienes-somos/`)
**Objetivo:** legitimidad. **Wireframe:** hero compacto; misión/propósito; **lema** destacado (blockquote); naturaleza jurídica + sobretasa 7%; historia/timeline **[a recopilar]**; equipo (`card--member`, placeholder si falta foto); valores (grid iconos); `cta-band` voluntariado.

### 4.5 Servicios (`/servicios/` + detalle)
**Lista:** hero compacto + grid `card--service` + banda "En emergencia, llama al 119" + CTA contacto.
**Detalle:** breadcrumb + hero + descripción + "¿Cuándo solicitarlo?" + recomendaciones + relacionados + 1 CTA contacto/emergencia. Paridad visual entre cards (mismo alto, icono consistente).

### 4.6 Voluntariado (`/voluntariado/`) — página de conversión
**Wireframe:** hero motivacional (CTA ancla al form); por qué ser voluntario; **requisitos [BORRADOR]**; proceso (timeline 3–4 pasos); **formulario** (ver campos §5-B.4) con label visible, requeridos marcados, validación on-blur, error bajo el campo con `aria-live`, autofocus al primer inválido, submit con estado de carga; → `/voluntariado/gracias/`. Formulario siempre 1 columna, inputs ≥44px, base 16px (evita auto-zoom iOS).

### 4.7 Donaciones (`/donaciones/`)
**Wireframe:** hero ("Apoya a tus bomberos"); por qué importa; en qué se invierte (grid); transparencia (sobretasa 7%); **"Cómo donar"** (datos editables en `SiteConfig`, botón "copiar", `tabular-nums`) **[datos bancarios a confirmar]**; `cta-band` donación en especie → contacto.

### 4.8 Noticias y Prevención (`/noticias/`, detalle, categoría)
**Lista:** hero + filtro por categoría (chips, activo no-solo-color) + destacado + grid `card--post` (imagen WebP lazy, badge, fecha `tabular-nums`, extracto) + paginación (≥44px). **Detalle:** breadcrumb + hero (badge/fecha/autor) + imagen + cuerpo (h2/h3 secuencial, 60–75 car) + compartir (FB/WhatsApp con `aria-label`) + relacionados + CTA contextual. Estado vacío "Aún no hay publicaciones".

### 4.9 Galería (`/galeria/`)
**Wireframe:** hero + filtros por álbum (opcional) + grid (WebP, lazy, dimensiones reservadas, `alt` real por imagen) + **lightbox** (`role="dialog"`, `aria-modal`, foco atrapado, flechas+`Esc`, scrim 40–60%, cierre claro, transición desde origen) + `cta-band` voluntariado. Móvil: lightbox full-screen con swipe (affordance visible).

### 4.10 Contacto (`/contacto/`)
**Wireframe:** hero + **aviso de emergencia destacado** (banda roja: "¿Es una emergencia? Llama al 119/123", `tel:` ≥44px) + 2 columnas (datos: dirección/`tel:`/redes/horario **[confirmar]** | formulario) + mapa (lazy) → `/contacto/gracias/`. Distinción inequívoca entre canal urgente y no urgente.

### 4.11 Reglas transversales
Mobile-first (375/768/1024/1440), `max-width` consistente, sin scroll horizontal. Jerarquía por tamaño/espacio/contraste. Una CTA primaria por pantalla. Iconos SVG de una familia, ≥44px. Tokens semánticos (no hex crudo). Tipografía 16px / lh 1.5–1.75 / 60–75 car. AOS 150–500ms (ver §6), `prefers-reduced-motion`. Imágenes WebP + lazy + dimensiones (CLS<0.1). Formularios con label visible, error bajo el campo, página de éxito.

---

## 5. Inventario de componentes y plan de contenido

### Parte A — Catálogo de componentes (nomenclatura oficial)

> Convención unificada (ver §12). Todos respetan ≥44px, foco visible (`outline:3px solid var(--color-focus); outline-offset:2px`), contraste AA y `prefers-reduced-motion`.

| Componente | Variantes | Notas clave de estado/accesibilidad |
|---|---|---|
| `emergency-bar` | completa / condensada | blanco sobre `--color-emergency` AA; `aria-label` por número; no intercepta `h1`. |
| `site-header` | transparente-sobre-hero / sólida `.is-scrolled` | `<nav aria-label="Principal">`; activo `aria-current`; menú móvil `aria-expanded`, `Esc` cierra, foco gestionado. |
| `btn` | `btn--primary`, `btn--secondary`, `btn--ghost` | ≥44px; hover `translateY(-1px)`+`--color-primary-hover`; active `scale(.98)`; **disabled** opacidad .5; **loading** spinner+`aria-busy`, ancho reservado. |
| `hero` | `hero--full`, `hero--compact` | `h1` único; texto **no** incrustado en imagen; overlay AA; imagen `eager`+`fetchpriority=high` (LCP), sin AOS. |
| `card` | `card--service`, `card--post`, `card--member`, `card--donation` | enlace real (no `div`); `:focus-within` replica hover; hover `translateY(-2/-4px)`+elevación; título `h3`; icono decorativo `aria-hidden`. |
| `stats-block` / `stat` | sobre claro / sobre banda roja | cifra real en el DOM (`data-target`); conteo solo visual; `tabular-nums`; reduced-motion → valor final directo. |
| `cta-band` | voluntariado / donación | 1 sola CTA; contraste AA sobre fondo/overlay; encabezado en jerarquía. |
| `form` + `field-*` | input/email/tel, textarea, select, checkbox | label visible; requerido `*`+texto+`aria-required`; `type` semántico; error bajo campo `aria-describedby`+`aria-invalid`+`role="alert"`; on-blur; éxito con `aria-live`. |
| `gallery` + `lightbox` | con/sin filtros | diálogo accesible; foco atrapado; teclado; thumbnails lazy; CLS reservado. |
| `badge` / `tag` | categoría / estado | nunca solo color para significado. |
| `breadcrumbs` | — | `<nav aria-label="Ruta">`+lista; actual `aria-current`; separadores `aria-hidden`. |
| `pagination` | — | `<nav aria-label="Paginación">`; ≥44px; disabled real en extremos. |
| `media-figure` | — | WebP+lazy+`width/height`/`aspect-ratio`; `alt` significativo o `alt=""` decorativo. |
| `section-heading` | kicker + h2 + subtítulo | jerarquía correcta. |

### Parte B — Plan de contenido

> **[BORRADOR — validar con la entidad]**: cifras, servicios reales, datos bancarios, requisitos oficiales, historia, horario, coordenadas. Lema/naturaleza/propósito/dirección/teléfonos/redes/sobretasa 7% provienen de la investigación.

**B.1 Inicio** — Hero: "Voluntarios al servicio de Restrepo" + lema; CTA "Ser voluntario". Franja de lema. Resumen Quiénes somos. Servicios destacados (4–6). Estadísticas **[cifras a confirmar]**. `cta-band` voluntariado. 3 noticias. `cta-band` donaciones.

**B.2 Quiénes somos** — Misión [BORRADOR], lema + valores [BORRADOR: servicio, vocación, solidaridad, disciplina, compromiso], historia [BORRADOR], misión/visión [BORRADOR], equipo (`card--member`), "cómo nos financiamos" (sobretasa 7% + donaciones + voluntariado), `cta-band`.

**B.3 Servicios [BORRADOR — confirmar cuáles presta la entidad]:**

| Servicio | Descripción breve |
|---|---|
| Extinción de incendios estructurales | Viviendas, comercios e infraestructura. |
| Extinción de incendios forestales | Conatos e incendios de cobertura vegetal rural/ladera. |
| Atención prehospitalaria y primeros auxilios | Estabilización inicial de lesionados. |
| Rescate vehicular | Personas atrapadas en accidentes de tránsito. |
| Rescate en alturas / espacios confinados | Acceso y evacuación en sitios difíciles. |
| Materiales peligrosos (MatPel) | Contención de incidentes con sustancias peligrosas. |
| Control de enjambres / manejo de animales | Reubicación de enjambres, fauna en zonas pobladas. |
| Prevención y capacitación comunitaria | Charlas, simulacros, formación (comunidad/colegios/empresas). |
| Inspecciones técnicas de seguridad | Revisión de condiciones y prevención de incendios. |

**B.4 Voluntariado — Requisitos [BORRADOR — confirmar oficiales]:** mayor de edad; documento vigente; buen estado de salud (certificado); disponibilidad para capacitación/turnos; sin antecedentes; residir en Restrepo o cercanías; compromiso con valores/reglamento; disposición para el curso básico bomberil. **Proceso:** postulación → entrevista → valoración → formación → aspirante.
**Campos del formulario:** nombre completo*, documento*, fecha de nacimiento*, teléfono* (`tel`), correo* (`email`), dirección/barrio, ocupación, disponibilidad (select), motivación* (textarea), experiencia previa (textarea), **aceptación de tratamiento de datos*** (checkbox — Ley 1581/2012). Éxito: "Gracias por postularte. Te contactaremos pronto."

**B.5 Donaciones** — Intro; cómo se financia (sobretasa 7% explicada como recaudo municipal, no donación directa); formas de apoyar (`card--donation`: económica **[datos bancarios a suministrar]**, en especie, ser voluntario); transparencia de uso; CTA contacto. *Fase 1 sin pasarela.*

**B.6 Noticias/Prevención** — Categorías [BORRADOR: Prevención, Noticias, Capacitación, Comunidad]. **Temas de prevención iniciales:** (1) prevención de incendios en el hogar; (2) plan de evacuación familiar; (3) incendios forestales en temporada seca; (4) primeros auxilios básicos; (5) uso del extintor; (6) seguridad eléctrica; (7) qué hacer ante un enjambre (no intervenir, llamar 119).

**B.7 Galería** — Intro; grid de fotos reales con lightbox; filtros (Operativos/Capacitaciones/Equipo/Comunidad) según volumen. Placeholders/CLS reservado mientras llegan imágenes.

**B.8 Contacto** — Datos (de `SiteConfig`): dirección, 310 3118280, 119/123, redes, horario **[confirmar]**. Bloque de emergencias. Mapa **[coordenadas a confirmar]**. **Campos:** nombre*, correo* (`email`), teléfono (`tel`), asunto (select: información/voluntariado/donaciones/prevención/otro), mensaje* (textarea), **consentimiento de datos*** (checkbox). Éxito: "Gracias por escribirnos. Responderemos lo antes posible."

---

## 6. Interacción, animación, accesibilidad y rendimiento

### 6.1 Animaciones de scroll (AOS, local)
AOS servido **localmente** (`/static/vendor/aos/`), init en `main.js` con `defer`. **Dos presupuestos de movimiento:** micro-interacción **150–300ms** y reveal de scroll **≤500ms** (no son contradictorios).

```js
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
AOS.init({ duration: 500, easing: 'ease-out', once: true, offset: 80, disable: reduce });
if (reduce) document.documentElement.classList.add('reduce-motion');
```

| Bloque | `data-aos` | duración | delay/stagger | Nota |
|---|---|---|---|---|
| Hero | `fade-up` solo subtítulo+CTA | 400 | CTA 150 | h1 + imagen **sin AOS** (LCP/CLS) |
| Cards en grid | `fade-up` | 450 | stagger 40ms (máx 240) | |
| Estadísticas | `fade-up` contenedor | 400 | 0 | número se anima aparte (IntersectionObserver) |
| Secciones texto/lema | `fade-up` | 500 | 0 | 1 elemento por sección |
| Imagen+texto alternado | `fade-right`/`fade-left` | 450 | 0 | en móvil caen a `fade-up` |
| CTA intermedias | `fade-up` | 400 | 0 | |
| Footer/emergencia | `fade-up` | 350 | 0 | nunca retrasar 119/123 |

Solo `fade-up/left/right`. Prohibidos zoom/flip/slide largos. `once:true`. Stagger ≤240ms acumulados.

### 6.2 Micro-interacciones
Transiciones de `transform`/`opacity`/`box-shadow`/`background-color` en 150–250ms `ease-out`.
- **Botones:** hover `translateY(-1px)`+`--color-primary-hover`; active `scale(.98)`; foco `outline:3px solid var(--color-focus); outline-offset:2px`; loading disabled+spinner+ancho reservado.
- **Cards:** hover `translateY(-4px)`+elevación; toda enlazable con `<a>` real; `:focus-within` replica hover.
- **Navbar:** `.is-scrolled` tras ~64px (fondo sólido+sombra), transición sobre `background-color`/`box-shadow` (nunca `height`); listener `{passive:true}`+`rAF`.
- **Contadores:** `IntersectionObserver` una vez; valor final en HTML (progressive enhancement); reduced-motion → directo; `tabular-nums`.

### 6.3 Checklist de Accesibilidad
- [ ] Contraste AA (texto 4.5:1, grande/UI 3:1); error/éxito con icono+texto (no solo color). Verificar con axe/Lighthouse por plantilla.
- [ ] Foco visible (`:focus-visible`, 3px navy, offset 2px); orden de tab = visual; sin trampas salvo modales (con `Esc`).
- [ ] Skip-link `#main` como primer elemento; landmarks `<header>/<nav>/<main id="main">/<footer>`.
- [ ] 1 `<h1>` por página; jerarquía secuencial.
- [ ] `alt` descriptivo gestionado desde Admin; logo con `alt`.
- [ ] Iconos decorativos `aria-hidden`+`focusable=false`; botones solo-icono con `aria-label`; redes con `aria-label`.
- [ ] Formularios: label visible, requeridos marcados, `type` semántico, validación on-blur, error con `aria-describedby`/`role=alert`, `aria-invalid`, foco al primer inválido, éxito con `aria-live`, inputs ≥44px, anti-spam accesible (honeypot).
- [ ] `prefers-reduced-motion` desactiva AOS/conteos/micro-animaciones.
- [ ] `lang="es-CO"`; sin desactivar zoom; validación con teclado y lector (NVDA/VoiceOver) en Inicio + 1 formulario + galería.

### 6.4 Checklist de Rendimiento
- [ ] **WebP** (`<picture>`+fallback), `srcset/sizes` (375/768/1024/1440), `loading="lazy"` salvo hero (`fetchpriority="high"`), `decoding="async"`, `width/height`/`aspect-ratio` → CLS<0.1.
- [ ] Fuentes auto-alojadas, `font-display:swap`, `preload` solo la crítica, subconjunto latino.
- [ ] AOS+`main.js` locales con `defer`; JS vanilla mínimo (navbar, menú, contadores, validación, lightbox); sin jQuery.
- [ ] CSS crítico above-the-fold; WhiteNoise + `ManifestStaticFilesStorage` (hashing/cache).
- [ ] Sin scroll horizontal en cada breakpoint. **Lighthouse objetivo:** Perf ≥90 móvil, A11y 100, Best Practices ≥95, LCP <2.5s.

### 6.5 SEO
- [ ] `<title>`/`description` únicos por página (bloque `{% block meta %}`, default desde `SiteConfig`); `canonical`; páginas "/gracias/" → `noindex`.
- [ ] Open Graph + Twitter Card (`og:image` 1200×630, `og:locale="es_CO"`); imagen OG por defecto en `SiteConfig`, por-artículo en Noticias.
- [ ] `sitemap.xml` (`django.contrib.sitemaps`: estáticas + Noticias + categorías) y `robots.txt` (con `Sitemap:`, `Disallow` admin/gracias).
- [ ] **JSON-LD** `Organization` global + `LocalBusiness` en Inicio/Contacto con datos reales (teléfono `+57 310 3118280`, dirección Cl. 10 #250 a 2-56, `sameAs` redes, `slogan`, `nonprofitStatus`); `NewsArticle` en noticias. Validar en Rich Results Test. `geo` cuando se confirmen coordenadas.

---

## 7. Arquitectura técnica (Django) y cobertura de vacíos

Resumen de la arquitectura aprobada (detalle completo en el plan técnico previo) + los vacíos detectados por la revisión.

### 7.1 Estructura
Proyecto `config/` (settings divididos `base/dev/prod`), apps bajo `apps/`: `accounts` (CustomUser vacío desde el día 1), `core` (home, quiénes somos, contacto, **SiteConfig**, política de datos, 404/500), `services`, `team`, `news`, `volunteers`, `donations`, `gallery`. `templates/` global + por app; `static/` (css/js/img/vendor/fonts); `media/` (uploads). WhiteNoise para estáticos. SQLite (Fase 1) → Postgres (`dj-database-url`).

### 7.2 Modelos y Admin (vacío #1 cubierto)
- `core.SiteConfig` (singleton `pk=1`, `load()`), `core.ContactMessage`, `core.LegalPage` (política de datos).
- `services.Service`; `team.Member`; `news.Category` + `news.Post` (manager `published`); `volunteers.Requirement` + `volunteers.VolunteerApplication` (con `estado`); `donations.DonationInfo`; `gallery.Album` + `gallery.Photo` (campo `alt` por imagen).
- Base abstracta `TimeStampedModel`; `slug`, `is_active/is_published`, `order`, `Meta.ordering`.
- `ModelAdmin` con `list_display`, `list_filter` (por `estado`/`is_read`/categoría), `search_fields` y acciones masivas para gestionar voluntarios y mensajes.

### 7.3 SiteConfig: contrato de campos y tokens editables (vacío #2)
Campos: nombre, eslogan/lema, dirección, teléfono, teléfono_emergencia, email_contacto, email_notificaciones, whatsapp, facebook_url, instagram_url, youtube_url, horario, latitud, longitud, logo, `color_primario`, `color_secundario`, og_image, historia, misión, visión, datos de donación.
**Tokens de color editables:** `base.html` emite un `<style>` con `:root{ --color-primary: {{ site.color_primario }}; ... }` para sobrescribir los defaults sin tocar CSS. Inyección global vía `core/context_processors.py` (`site`).

### 7.4 Email y anti-spam (vacío #3)
ModelForms `VolunteerApplicationForm` y `ContactForm`. **Siempre guardan en BD** y luego intentan email (`send_mail` a `email_notificaciones`) en `try/except` (si el correo falla, el dato ya está en BD). Dev: backend consola. Prod: SMTP (Gmail App Password / Brevo). Anti-spam: **honeypot** oculto (Fase 1) → Turnstile/reCAPTCHA (Fase 2). Plantillas de email simples (texto + HTML).

### 7.5 Política de datos (vacío #4)
Página `/politica-de-datos/` (modelo `LegalPage`, editable en Admin) con el aviso de tratamiento de datos personales (Ley 1581/2012). El checkbox de consentimiento de ambos formularios enlaza aquí. En sitemap; `noindex` opcional.

### 7.6 `base.html` y bloques (vacío #6)
Bloques: `title`, `meta` (description/canonical), `og` (Open Graph/Twitter), `extra_css`, `breadcrumb`, `content`, `extra_js`. Incluye skip-link, landmarks, JSON-LD, `<style>` de tokens desde `SiteConfig`, carga de AOS local. Partials: `_emergency_bar.html`, `_navbar.html`, `_footer.html`, `_messages.html`.

### 7.7 Estados de error/vacío (vacío #8)
Páginas **404/500** con identidad visual (logo + enlace a inicio + líneas de emergencia). **Empty-states** en Galería, Servicios y Noticias para lanzar sin contenido definitivo.

### 7.8 Plan de ejecución técnica (vacío #5) → ver §11.

### 7.9 Gestión de medios en la nube (Cloudinary)

Los medios pesados (fotos y videos institucionales) **no se versionan en el repo ni se sirven desde Django**: se alojan en **Cloudinary**, que además entrega versiones optimizadas automáticamente (formato y compresión por URL). Esto **adelanta a la base inicial** parte del "media en la nube" previsto para Fase 2 (§11).

**Configuración**
- **Cloud name:** `dxpt1bcki`. ⚠️ En el panel de Cloudinary, el *Key Name* (`Root`) **NO** es el cloud name (confundirlos produce el error `Invalid cloud_name`).
- **Carpeta destino en Cloudinary:** `bomberos-restrepo/`.
- **Credenciales:** en `.env` de la raíz (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `CLOUDINARY_FOLDER`). El `.env` está en `.gitignore` — **el API Secret nunca se sube al repo**. `.env.example` documenta la estructura sin secretos.
- **Dependencias del script:** `scripts/requirements.txt` (`cloudinary`, `python-dotenv`).

**Script de subida — `scripts/subir_a_cloudinary.py`**
- Recorre la carpeta local `Contenido/` y sube cada archivo a Cloudinary.
- Normaliza nombres a *slug* (sin tildes/ñ/espacios): p. ej. `Logo Bomberos.png` → `bomberos-restrepo/logo-bomberos`.
- Detecta tipo (imagen/video) por extensión y acepta filtro: `python scripts/subir_a_cloudinary.py [video|imagen]` (sin argumento = sube todo).
- Sube el **original** (sin comprimir localmente) con `overwrite=True`; la optimización se aplica en la URL de entrega.
- Genera/acumula `cloudinary-urls.json` (gitignored) con `public_id`, `url_original` y `url_optimizada` por archivo.
- En este equipo, ejecutar con `python` (Python 3.13), **no** con `py` (apunta a un 3.14 con pip roto).

**Entrega optimizada (consumo en plantillas)** — alineado con §3.4 y §6.4, las URLs usan `f_auto,q_auto` para servir el mejor formato y calidad por dispositivo:
- Imagen: `https://res.cloudinary.com/dxpt1bcki/image/upload/f_auto,q_auto,w_1200/bomberos-restrepo/<slug>`
- Video: `https://res.cloudinary.com/dxpt1bcki/video/upload/f_auto,q_auto/bomberos-restrepo/<slug>`

**Estado (2026-06-29)**
- ✅ **Videos subidos (3):** `actividad-personas-con-discapacidad-en-bomberos` (25 MB), `campana-certificado-bomberil` (4.9 MB), `celebracion-23-anos-de-bomberos` (66 MB).
- ⏳ **Imágenes pendientes:** logo y variante sin fondo, fotos de eventos y flyers de prevención → `python scripts/subir_a_cloudinary.py imagen`.

> **Fase 2:** integrar `django-cloudinary-storage` para que los uploads del Admin (noticias, galería, equipo) vayan directo a Cloudinary, reemplazando el `media/` local. La base (cuenta, credenciales, convención de carpeta y URLs optimizadas) ya queda montada aquí.

---

## 8. Skills de diseño y su uso en el proyecto

| Skill | Para qué se usa | Cuándo |
|---|---|---|
| **ui-ux-pro-max** | Sistema de tokens, reglas de accesibilidad AA, mobile-first, animación con sentido, especificación de componentes y QA de UX (checklists §6). | Ya aplicada en este plan; y como control de calidad antes de entregar cada página. |
| **design** / **frontend-design** | Generación de **identidad de marca**: logo (si no hay vector oficial), refinamiento de paleta a partir de las imágenes/logo, design tokens, y construcción de UI de alta calidad (heros, secciones distintivas). | Al recibir las imágenes de referencia (§10) y el logo. |
| **banner-design** | Banners de hero, piezas para redes y campañas (p. ej. reclutamiento de voluntarios). | Fase 1 (hero/OG image) y campañas. |

> Nota operativa: los `scripts/` y `data/` de ui-ux-pro-max son symlinks no materializados en este equipo (Windows), pero el `SKILL.md` carga el catálogo completo de reglas, que es lo aplicado aquí.

---

## 9. Assets que debe entregar el usuario (vacío #7 — checklist único)

- [x] **Logo** entregado (`Logo Bomberos.png`, 1254²). ⏳ Falta **versión vectorial/transparente (SVG)** y monocromática para footer/dark; se puede vectorizar con la skill `design`.
- [x] **Color oficial** resuelto: extraído del logo → rojo `#E71118`, verde `#327D44`, dorado `#F2A900`.
- [~] **Fotos/videos:** 4 fotos + 2 videos entregados (§2.4). Bienvenidas más: retratos del equipo, operativos/acción, cuartel por dentro. Indicar autorización de uso de imagen y pedir versiones **sin marca de agua** de las fotos de entrega de vehículos.
- [ ] **Cifras de impacto** (años de servicio, voluntarios activos, emergencias/año).
- [ ] **Lista oficial de servicios** que presta la entidad.
- [ ] **Requisitos oficiales** de voluntariado y pasos del proceso.
- [ ] **Datos de donación** (entidad bancaria, tipo/número de cuenta, titular, NIT; medios como Nequi/Daviplata; QR si aplica).
- [ ] **Horario de atención** y **coordenadas** exactas del cuartel.
- [ ] **Correo oficial** y **dominio** deseado.
- [ ] Confirmar **redacción exacta del lema**, misión/visión e historia.

---

## 10. Preguntas de dirección visual (a resolver con tus imágenes)

1. **Mood / nivel de "heroísmo":** ¿Opción A (institucional-sobrio), B (foto protagonista) o C (bold/heroico)? Puedes elegir distinta intensidad para Inicio vs. el resto.
2. **Tono del rojo:** ¿confirmas `#C1121F` o aportas el HEX/imagen con el rojo oficial?
3. **Fotografía:** ¿cuántas fotos tienes, de qué y en qué calidad/orientación? ¿Personas identificables con autorización?
4. **Hero de Inicio:** ¿foto fija, mosaico o video corto? ¿Texto sobre foto (overlay) o foto al lado del texto?
5. **Logo y nombre:** ¿tienes vector? ¿Nombre completo o forma corta/sigla?
6. **Modo oscuro y carácter:** ¿incluimos modo oscuro en Fase 1? En escala sobrio-institucional ↔ enérgico-emocional, ¿dónde te ubicas?

---

## 11. Hoja de ruta y plan de ejecución

**Paso 0 (ahora):** este plan + recibir imágenes/respuestas (§9, §10) → fijar dirección visual y generar identidad de marca (skill `design`).

**Fase 1 — MVP informativo (orden de construcción):**
1. Scaffold Django (`config`, apps, settings divididos, `.env`, `requirements.txt`).
2. Modelos núcleo + Admin + `SiteConfig` + context_processor + migraciones.
3. Sistema de diseño en código: `base.html` + tokens CSS (desde SiteConfig) + partials + AOS local + fuentes.
4. Componentes UI (catálogo §5-A) y layout responsive.
5. Páginas/vistas/URLs (§4) + formularios (voluntariado/contacto) con BD + email consola + páginas de éxito.
6. Política de datos, 404/500, empty-states, SEO (sitemap/robots/OG/JSON-LD).
7. Carga de contenido real (textos, fotos, datos) y QA (checklists §6) → deploy en Render + Postgres.

**Definition of Done por página:** responsive 375/768/1024/1440 sin scroll horizontal; A11y (foco/contraste/labels/`alt`); CLS<2.5s/0.1; AOS con reduced-motion; meta/OG/JSON-LD; contenido real o empty-state.

**Fase 2 — dinámico/gestión:** editor enriquecido en posts, miniaturas, flujo de estados de voluntarios + SMTP asíncrono, **media en la nube** (base de Cloudinary ya montada — §7.9; falta integrar `django-cloudinary-storage` para los uploads del Admin), Turnstile, Maps/Analytics, RSS, modo oscuro si no entró en F1.

**Fase 3 — avanzado:** API REST (DRF), donaciones en línea (Wompi/PayU/Mercado Pago), área privada de voluntarios, turnos/reportes, estadísticas.

---

## 12. Apéndice — Decisiones de consolidación (resolución de inconsistencias)

Unificaciones aplicadas tras la revisión de completitud, para que el sistema sea coherente:

- **Paleta extraída del logo (actualización):** la paleta inicial propuesta (rojo `#C1121F` + navy) se **reemplaza** por los colores reales del escudo: rojo `#E71118`, verde `#327D44` (secundario, antes era navy), dorado `#F2A900`. El navy `#1B2A4A` se conserva solo como `--color-focus` (es el color de los uniformes).
- **Rojo de marca:** único token `--color-primary` `#E71118` (+ `--color-primary-hover` `#B00D12`). Se eliminan `--color-danger` y `--color-emergency` como nombres de marca; `--color-emergency` queda como **alias** (`var(--color-primary)`) solo para la barra de emergencia.
- **Error de formulario ≠ rojo de marca:** la validación usa `--color-error` `#B00020` (distinto del primario).
- **Hover:** se usa `--color-primary-hover` (no escala `-600/-700`).
- **Foco:** `outline: 3px solid var(--color-focus)` (navy `#1B2A4A`) + `outline-offset: 2px` (3px, no 2px).
- **Superficies:** `--color-surface` / `--color-surface-2`; se elimina `--color-surface-hover` (usar `--color-surface-2`) y `--color-on-surface` (usar `--color-text`).
- **Motion:** fuente de verdad = `--dur-fast/base/slow` + `--ease-out/in` (§3.2). Se eliminan los `--t-*` duplicados. Dos presupuestos explícitos: micro-interacción 150–300ms, reveal de scroll ≤500ms.
- **Componentes:** nombres oficiales = `btn`, `card` (con `card--*`), `cta-band`, `stats-block`/`stat`, `form`/`field-*`, `emergency-bar`, `site-header`, `site-footer`, `badge`, `media-figure` (§5-A).
- **CTA primaria global:** una sola en el navbar — **"Ser voluntario"**. Donaciones se promueve por banda/footer.
- **Código AOS:** `disable: reduce` (se corrige la expresión inválida original).
