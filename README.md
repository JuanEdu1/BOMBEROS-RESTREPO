# Bomberos Voluntarios de Restrepo — Sitio web

Sitio del **Cuerpo de Bomberos Voluntarios de Restrepo (Meta, Colombia)**.
Fase actual: **landing page** estática en [`web/`](web/) (HTML/CSS/JS, sin build), pensada para portarse a Django (ver [`PLAN-DE-ACCION.md`](PLAN-DE-ACCION.md) y [`CONTEXTO-DESARROLLO.md`](CONTEXTO-DESARROLLO.md)).

La media pesada (fotos y videos) se aloja en **Cloudinary**, no en el repositorio.

## Estructura

```
web/                 Sitio estático (lo que se publica)
  index.html
  assets/css|js
  robots.txt · sitemap.xml
scripts/             Subida de media a Cloudinary
design/              Visualizador de paleta
Dockerfile · Caddyfile · railway.json   Despliegue
```

## Desarrollo local

```bash
cd web
python -m http.server 5500
# abrir http://127.0.0.1:5500/
```

## Despliegue en Railway

El repo incluye un **Dockerfile** que sirve `web/` con **Caddy** en el puerto que Railway provee (`$PORT`).

1. En [railway.app](https://railway.app): **New Project → Deploy from GitHub repo** → seleccionar este repositorio.
2. Railway detecta el `Dockerfile` (forzado en `railway.json`) y construye la imagen.
3. Al terminar, **Settings → Networking → Generate Domain** para obtener la URL pública.

No requiere variables de entorno para servir el sitio (la media se sirve desde Cloudinary por URL).
Para volver a subir media a Cloudinary se usan las credenciales del `.env` local (ver `.env.example`); ese `.env` **no** se versiona.

## Build local de la imagen (opcional)

```bash
docker build -t bomberos-restrepo .
docker run --rm -e PORT=8080 -p 8080:8080 bomberos-restrepo
# abrir http://localhost:8080/
```
