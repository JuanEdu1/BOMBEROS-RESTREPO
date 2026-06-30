# Contexto de Desarrollo — Landing Page Bomberos Restrepo

> Documento **operativo** para construir la web. Complementa a `PLAN-DE-ACCION.md` (estrategia).
> Aquí está lo que se necesita para escribir código: marca, tokens, URLs de media reales,
> contenido confirmado y decisiones de implementación de la **landing (Inicio)**.

---

## 1. Qué se está construyendo

**Fase actual:** Landing page (página de Inicio) del **Cuerpo de Bomberos Voluntarios de Restrepo (Meta, Colombia)**.

- **Entrega:** sitio estático `web/` (HTML + CSS + JS vanilla), sin build step, listo para abrir en navegador.
- **Portabilidad:** la estructura mapea 1:1 a plantillas Django de la Fase 1 (`base.html` + partials). Los nombres de componentes siguen el catálogo oficial (§5-A del plan): `emergency-bar`, `site-header`, `hero`, `btn`, `card`, `cta-band`, `stats-block`, `site-footer`.
- **Objetivo de conversión:** una sola CTA primaria global → **"Ser voluntario"**. Donaciones se promueve por banda/footer.

### Estructura de archivos
```
web/
├── index.html                 # Landing completa (Inicio)
└── assets/
    ├── css/styles.css         # Tokens + base + componentes + secciones
    ├── js/main.js             # Navbar scroll, menú móvil, contadores, reveal, video, lightbox
    └── img/                    # favicon, logo SVG inline en HTML (media pesada va a Cloudinary)
```

---

## 2. Marca y dirección visual

**Logo:** escudo cruz de Malta roja con escena del paisaje de Restrepo (cerros verdes, río, sol con rostro, cruz en cerro, casco bomberil rojo, laurel dorado, hidrante, hacha/escalera) y banda "2003". Texto "BOMBEROS" arriba / "RESTREPO" abajo.

**Dirección elegida:** **institucional cívico-moderno** (base Opción A) con **hero editorial** (Opción B) porque ya hay foto real del equipo. Confianza + cercanía; rojo aplicado con disciplina como elemento estructural, no tímido.

**Detalles distintivos (anti-"AI slop"), anclados al contexto bomberil:**
- **Galón / chevron** rojo-dorado en diagonal (inspirado en la cinta reflectiva tipo *battenburg* de las máquinas) como acento de secciones y divisores.
- **Cruz de Malta** del logo como motivo gráfico sutil recurrente (marcas de agua decorativas `aria-hidden`, viñetas de sección).
- **Tipografía Archivo 800** en displays con tracking ajustado y *kickers* en mayúscula → autoridad institucional.
- **Año 2003 → 23 años** como cifra-ancla real (coincide con el contenido "23 años de bomberos").

---

## 3. Tokens (FUENTE DE VERDAD — del logo oficial)

> Copiar verbatim en `:root`. No usar HEX crudos en componentes. Detalle completo en `PLAN-DE-ACCION.md` §3.2.

| Token | Valor | Uso |
|---|---|---|
| `--color-primary` | `#E71118` | Rojo bomberil. Botón primario, barra emergencia. |
| `--color-primary-hover` | `#B00D12` | Hover/active + enlaces rojos sobre blanco (AA 7.21:1). |
| `--color-secondary` | `#327D44` | Verde de los cerros. Botón secundario, footer. |
| `--color-secondary-hover` | `#2A6B3A` | Hover secundario. |
| `--color-accent` | `#F2A900` | Dorado del laurel. SOLO acento/destacados (texto oscuro encima). |
| `--color-bg` | `#FFFFFF` | Fondo. |
| `--color-surface` | `#F5F6F7` | Tarjetas, secciones alternas. |
| `--color-surface-2` | `#ECEEF0` | Superficie elevada / inputs. |
| `--color-border` | `#D9DCE0` | Bordes. |
| `--color-text` | `#1A1A1A` | Texto principal (17.4:1). |
| `--color-text-muted` | `#4A4F55` | Secundario/captions (8.27:1). |
| `--color-focus` | `#1B2A4A` | Anillo de foco (navy de los uniformes, NO rojo). |
| `--color-error` | `#B00020` | SOLO validación de formularios. |

- **Fuentes:** display `Archivo` (600–800), cuerpo `Inter` (400/500/600). `font-display: swap`.
- **Espaciado:** escala 4/8 (`--space-1..9`). **Radios:** sm4/md8/lg12/xl16/pill999.
- **Motion:** `--ease-out: cubic-bezier(.16,1,.3,1)`; `--dur-fast150 / base220 / slow300`. Reveal de scroll ≤500ms.
- **Contenedor:** `--container-xl: 1200px`. Gutter 16px móvil / 32px ≥1024.
- **Regla crítica:** nunca informar solo por color. Éxito/alerta/error = icono SVG + texto.

---

## 4. Media real (Cloudinary — `cloud_name: dxpt1bcki`)

Todo el material institucional está en Cloudinary (`bomberos-restrepo/`), entregado con `f_auto,q_auto`.
Patrón imagen: `https://res.cloudinary.com/dxpt1bcki/image/upload/f_auto,q_auto,w_{W}/v1/bomberos-restrepo/{slug}`
Patrón video: `https://res.cloudinary.com/dxpt1bcki/video/upload/f_auto,q_auto/v1/bomberos-restrepo/{slug}`

| Slug (`bomberos-restrepo/…`) | Tipo | Uso en la landing |
|---|---|---|
| `foto-grupal` | img | **Hero** (fondo) + teaser Quiénes somos. Equipo uniforme azul frente al cuartel. |
| `loogo-bomberos-sin-fondo` | img | Logo navbar/footer (preferir sin fondo). |
| `logo-bomberos` | img | Logo con fondo blanco / OG / favicon fallback. |
| `23-anos-de-bomberos` | img | Card noticia "23 años" / stats. |
| `acompanamiento-primera-carrera-de-la-mujer-mujer` | img | Card comunidad. |
| `acompanamiento-entrega-de-vehiculos-acompanamiento-grupal` | img | Card institucional. ⚠ marca de agua "Alcalde". |
| `acompanamiento-entrega-de-vehiculos-acompanamiento` | img | Detalle evento. ⚠ marca de agua. |
| `importancia-del-extintor-flayer` | img | Prevención (consejo uso de extintor). |
| `importancia-del-botiquin-flayer` | img | Prevención (botiquín). |
| `campana-certificado-bomberil` | video (5 MB) | **Sección video** (más liviano). `preload="none"` + póster. |
| `actividad-personas-con-discapacidad-en-bomberos` | video (25 MB) | Comunidad/galería. |
| `celebracion-23-anos-de-bomberos` | video (66 MB) | Destacado (solo bajo demanda). |

**Reglas media:** hero `eager` + `fetchpriority="high"` (LCP); resto `loading="lazy"` + `width/height`/`aspect-ratio` (CLS<0.1). Videos `preload="none"`, click-to-play con póster. Hero overlay para legibilidad (velo navy/negro, verificar AA 4.5:1 del texto encima).

---

## 5. Contenido confirmado (datos reales)

- **Nombre:** Cuerpo de Bomberos Voluntarios de Restrepo (Meta). **Naturaleza:** sin ánimo de lucro, voluntarios. **Fundación:** 2003.
- **Lema:** *"Estuviésemos muertos si solo sirviéramos a nosotros mismos, pero vivimos para servir a los demás"* (reconfirmar puntuación con la entidad).
- **Dirección:** Cl. 10 #250 a 2-56, Restrepo, Meta. **Teléfono:** 310 3118280 (`tel:+573103118280`).
- **Emergencias (siempre visibles):** **119** Bomberos · **123** Emergencias.
- **Redes:** Facebook `bomberos.restrepometa` · Instagram `@bomberosrestrepometa`.
- **Transparencia:** sobretasa bomberil del **7%** al impuesto de industria y comercio (recaudo municipal, no donación directa).
- **Cifras (stats) — solo derivables/honestas:** `2003` fundación · `23` años de servicio · `100%` voluntarios · `24/7` disponibilidad. **No inventar** voluntarios activos ni nº de emergencias (marcados `[a confirmar]` en el plan).

**Servicios (BORRADOR — confirmar con la entidad):** incendios estructurales, incendios forestales, atención prehospitalaria/primeros auxilios, rescate vehicular, rescate en alturas/espacios confinados, MatPel, control de enjambres/fauna, prevención y capacitación, inspecciones técnicas.

**Prevención (temas iniciales):** uso del extintor, importancia del botiquín, plan de evacuación, incendios forestales temporada seca, seguridad eléctrica, qué hacer ante un enjambre (no intervenir, llamar 119).

---

## 6. Estructura de la landing (orden de secciones)

1. `emergency-bar` — fija arriba: `119` · `123` · `310 3118280` (cada uno `tel:`, ≥44px, icono+texto, `aria-label`).
2. `site-header` — logo + nombre → `#inicio`; nav (Inicio · Quiénes somos · Servicios · Prevención · Comunidad · Contacto); CTA "Ser voluntario". Sticky, `.is-scrolled` tras ~64px. Menú móvil accesible (`aria-expanded`, `Esc`, foco).
3. **Hero** (`hero--full`) — foto `foto-grupal` + overlay; kicker + `h1` "Voluntarios al servicio de Restrepo" + lema; CTA primaria "Ser voluntario" + secundaria "Conócenos"; nota emergencia 119.
4. **Stats band** (`stats-block`) — 2003 / 23 años / 100% voluntarios / 24/7 (contador accesible).
5. **Servicios** ("Qué hacemos") — grid `card--service` con iconos Lucide SVG inline (6 destacados).
6. **Quiénes somos** (teaser) — imagen + texto, lema en blockquote, naturaleza + sobretasa 7%, CTA "Conoce más".
7. **Video destacado** — `campana-certificado-bomberil` póster + play (click-to-play).
8. `cta-band` voluntariado (rojo) — "Únete como voluntario".
9. **Comunidad / Noticias** — 3 `card--post` con fotos reales (Carrera de la Mujer, Entrega de vehículos, 23 años / actividad inclusiva) + badge categoría (no solo color) + fecha `tabular-nums`.
10. **Prevención** — 2–3 consejos (extintor, botiquín, enjambres) con flyers reales.
11. `cta-band` donaciones/apoyo — transparencia 7% → contacto.
12. **Ubicación + contacto rápido** — dirección, `tel:`, redes, mapa (iframe lazy).
13. `site-footer` — 4 columnas (identidad+lema / contacto / enlaces / redes) + franja © + nota sobretasa 7%.

---

## 7. Reglas de implementación (no negociables)

- **Accesibilidad AA:** skip-link `#main`; landmarks `header/nav/main/footer`; un solo `h1`; jerarquía secuencial; foco visible `outline:3px solid var(--color-focus); outline-offset:2px`; iconos decorativos `aria-hidden`; botones solo-icono y redes con `aria-label`; `lang="es-CO"`; nunca desactivar zoom.
- **Performance:** imágenes Cloudinary `f_auto,q_auto` + `srcset/sizes` + `loading="lazy"` (hero eager `fetchpriority=high`) + `width/height`/`aspect-ratio` (CLS<0.1). Videos `preload="none"`. JS vanilla mínimo con `defer`. Fuentes `swap`. Objetivo Lighthouse: Perf ≥90 móvil, A11y 100.
- **Motion:** reveal on-scroll vanilla (IntersectionObserver, `once`, ≤500ms) en vez de AOS para cero dependencias; `prefers-reduced-motion` desactiva animaciones/contadores. Solo `transform`/`opacity`. Hero sin animación (LCP/CLS).
- **Responsive:** mobile-first 375/768/1024/1440, `max-width` consistente, sin scroll horizontal, CTAs full-width en móvil, touch ≥44px.
- **SEO:** `<title>`/`description` únicos; Open Graph (`og:image` 1200×630, `og:locale=es_CO`); JSON-LD `Organization`/`LocalBusiness` con datos reales (`+57 310 3118280`, dirección, `sameAs` redes, `slogan`, `nonprofitStatus`).
- **Sin emojis como iconos.** Una sola familia (Lucide SVG, trazo 2px, `currentColor`).

---

## 8. Pendientes / a confirmar con la entidad

Cifras de impacto reales · lista oficial de servicios · requisitos y proceso de voluntariado · datos bancarios de donación · horario y coordenadas exactas · correo y dominio · redacción exacta del lema, misión/visión, historia · versión SVG/transparente del logo · originales sin marca de agua de las fotos de entrega de vehículos.
