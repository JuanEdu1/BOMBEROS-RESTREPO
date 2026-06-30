"""
Sube todo el contenido de la carpeta `Contenido/` a Cloudinary.

- Lee las credenciales desde el archivo .env (en la raíz del proyecto).
- Sube cada imagen/video con un nombre limpio (sin espacios ni tildes).
- Organiza todo dentro de la carpeta CLOUDINARY_FOLDER (por defecto "bomberos-restrepo").
- No comprime nada: sube el original. La optimización (f_auto, q_auto) se aplica
  en la URL de entrega, así que Cloudinary sirve versiones livianas automáticamente.
- Genera `cloudinary-urls.json` con: nombre original, public_id, URL original y URL optimizada.

Uso:
    pip install -r scripts/requirements.txt
    python scripts/subir_a_cloudinary.py            # sube todo
    python scripts/subir_a_cloudinary.py video      # solo videos (los más pesados)
    python scripts/subir_a_cloudinary.py imagen     # solo imágenes
"""

from __future__ import annotations

import json
import sys
import unicodedata
from pathlib import Path

try:
    import cloudinary
    import cloudinary.uploader
    import cloudinary.utils
    from dotenv import load_dotenv
except ImportError:
    sys.exit(
        "Faltan dependencias. Instálalas con:\n"
        "    pip install -r scripts/requirements.txt"
    )

import os

# --- Rutas del proyecto ---
RAIZ = Path(__file__).resolve().parent.parent
CARPETA_CONTENIDO = RAIZ / "Contenido"
ARCHIVO_SALIDA = RAIZ / "cloudinary-urls.json"

# --- Extensiones soportadas ---
EXT_IMAGEN = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".svg", ".bmp", ".tiff"}
EXT_VIDEO = {".mp4", ".mov", ".avi", ".mkv", ".webm", ".m4v", ".wmv", ".flv"}


def slugify(texto: str) -> str:
    """Convierte 'Foto grupal' / 'Acompañamiento' en 'foto-grupal' / 'acompanamiento'."""
    # Quita tildes y la ñ -> n
    normal = unicodedata.normalize("NFKD", texto)
    sin_tildes = "".join(c for c in normal if not unicodedata.combining(c))
    sin_tildes = sin_tildes.replace("ñ", "n").replace("Ñ", "n")
    salida = []
    for c in sin_tildes.lower():
        if c.isalnum():
            salida.append(c)
        elif c in (" ", "_", "-", "."):
            salida.append("-")
    slug = "".join(salida)
    # Colapsa guiones repetidos y limpia los extremos
    while "--" in slug:
        slug = slug.replace("--", "-")
    return slug.strip("-") or "archivo"


def configurar() -> str:
    """Carga el .env, valida credenciales y devuelve la carpeta destino en Cloudinary."""
    load_dotenv(RAIZ / ".env")

    nombre = os.getenv("CLOUDINARY_CLOUD_NAME", "").strip()
    api_key = os.getenv("CLOUDINARY_API_KEY", "").strip()
    api_secret = os.getenv("CLOUDINARY_API_SECRET", "").strip()
    carpeta = os.getenv("CLOUDINARY_FOLDER", "bomberos-restrepo").strip()

    faltantes = [
        n
        for n, v in (
            ("CLOUDINARY_CLOUD_NAME", nombre),
            ("CLOUDINARY_API_KEY", api_key),
            ("CLOUDINARY_API_SECRET", api_secret),
        )
        if not v
    ]
    if faltantes:
        sys.exit(
            "Faltan credenciales en el archivo .env: "
            + ", ".join(faltantes)
            + "\nÁbrelo y pega los valores de tu Dashboard de Cloudinary."
        )

    cloudinary.config(
        cloud_name=nombre,
        api_key=api_key,
        api_secret=api_secret,
        secure=True,
    )
    return carpeta


def tipo_recurso(ext: str) -> str | None:
    if ext in EXT_IMAGEN:
        return "image"
    if ext in EXT_VIDEO:
        return "video"
    return None


def url_optimizada(public_id: str, resource_type: str) -> str:
    """Construye la URL de entrega con formato y calidad automáticos."""
    url, _ = cloudinary.utils.cloudinary_url(
        public_id,
        resource_type=resource_type,
        fetch_format="auto",  # f_auto -> WebP/AVIF en imágenes; mejor códec en video
        quality="auto",       # q_auto -> comprime sin pérdida visible
        secure=True,
    )
    return url


def leer_filtro() -> str | None:
    """Devuelve 'image', 'video' o None (todo) según el argumento de la línea de comandos."""
    if len(sys.argv) < 2:
        return None
    arg = sys.argv[1].strip().lower()
    if arg in ("video", "videos"):
        return "video"
    if arg in ("imagen", "imagenes", "imágenes", "image", "images"):
        return "image"
    sys.exit(f"Argumento no reconocido: '{sys.argv[1]}'. Usa 'video', 'imagen' o nada.")


def main() -> None:
    filtro = leer_filtro()
    carpeta_destino = configurar()

    if not CARPETA_CONTENIDO.is_dir():
        sys.exit(f"No se encontró la carpeta: {CARPETA_CONTENIDO}")

    archivos = sorted(p for p in CARPETA_CONTENIDO.iterdir() if p.is_file())
    if not archivos:
        sys.exit(f"La carpeta {CARPETA_CONTENIDO} está vacía.")

    etiqueta = {"video": "solo videos", "image": "solo imágenes", None: "todo"}[filtro]
    print(f"Subiendo ({etiqueta}) a Cloudinary -> carpeta '{carpeta_destino}'\n")

    resultados = []
    usados: set[str] = set()

    for ruta in archivos:
        ext = ruta.suffix.lower()
        rtype = tipo_recurso(ext)
        if rtype is None:
            print(f"  [omitido] {ruta.name} (extensión no soportada)")
            continue
        if filtro is not None and rtype != filtro:
            continue

        # public_id único y limpio
        base = slugify(ruta.stem)
        public_id = base
        i = 2
        while public_id in usados:
            public_id = f"{base}-{i}"
            i += 1
        usados.add(public_id)

        print(f"  [{rtype:5}] {ruta.name}  ->  {carpeta_destino}/{public_id} ...", end=" ", flush=True)
        try:
            resp = cloudinary.uploader.upload(
                str(ruta),
                folder=carpeta_destino,
                public_id=public_id,
                resource_type=rtype,
                overwrite=True,
                unique_filename=False,
                use_filename=False,
            )
        except Exception as e:  # noqa: BLE001
            print(f"ERROR: {e}")
            resultados.append({"archivo": ruta.name, "error": str(e)})
            continue

        full_id = resp["public_id"]
        resultados.append(
            {
                "archivo": ruta.name,
                "tipo": rtype,
                "public_id": full_id,
                "url_original": resp["secure_url"],
                "url_optimizada": url_optimizada(full_id, rtype),
                "bytes": resp.get("bytes"),
                "formato": resp.get("format"),
            }
        )
        print("OK")

    # Fusiona con resultados previos (para no perder URLs de corridas anteriores)
    previos = {}
    if ARCHIVO_SALIDA.exists():
        try:
            for item in json.loads(ARCHIVO_SALIDA.read_text(encoding="utf-8")):
                previos[item["archivo"]] = item
        except (json.JSONDecodeError, KeyError):
            pass
    for r in resultados:
        previos[r["archivo"]] = r
    salida = sorted(previos.values(), key=lambda x: x["archivo"])

    ARCHIVO_SALIDA.write_text(
        json.dumps(salida, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    ok = sum(1 for r in resultados if "error" not in r)
    err = len(resultados) - ok
    print(f"\nListo: {ok} subido(s)" + (f", {err} con error" if err else ""))
    print(f"URLs guardadas en: {ARCHIVO_SALIDA}")


if __name__ == "__main__":
    main()
