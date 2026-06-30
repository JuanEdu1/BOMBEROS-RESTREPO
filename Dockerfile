# Sitio estático (web/) servido con Caddy. Railway inyecta $PORT en runtime.
FROM caddy:2-alpine

# Config de Caddy
COPY Caddyfile /etc/caddy/Caddyfile

# Archivos del sitio
COPY web/ /srv/

EXPOSE 8080

# El entrypoint por defecto de la imagen caddy ejecuta:
#   caddy run --config /etc/caddy/Caddyfile --adapter caddyfile
