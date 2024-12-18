# Configuración para el dominio principal holu.lat
server {
    server_name holu.lat www.holu.lat;

    # Manejo de archivos estáticos primero
    location /assets/ {
        proxy_pass http://localhost:8081;  # Redirige a los archivos estáticos servidos por el nuevo sistema en 8081
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        expires max;  # Cacheo de los recursos estáticos
        access_log off;  # Reduce los logs para recursos estáticos
    }

    # Configuración del Frontend y rutas SPA
    location / {
        proxy_pass http://localhost:8081;  # Redirige al frontend del nuevo sistema
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        index index.html;
        try_files $uri $uri/ /index.html;  # Redirige al frontend para manejar rutas SPA (React Router u otro)
    }

    # Configuración del Backend (si lo tiene)
    location /api/ {
        proxy_pass http://localhost:3003;  # Si el sistema en 8081 tiene un backend, redirige aquí
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 443 ssl; # Puerto seguro para HTTPS
    ssl_certificate /etc/letsencrypt/live/holu.lat/fullchain.pem; # Certificado SSL
    ssl_certificate_key /etc/letsencrypt/live/holu.lat/privkey.pem; # Clave privada SSL
    include /etc/letsencrypt/options-ssl-nginx.conf; # Configuración SSL por defecto
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # Parámetros SSL recomendados por Let’s Encrypt
}

# Redirección de HTTP a HTTPS
server {
    if ($host = www.holu.lat) {
        return 301 https://$host$request_uri;
    }

    if ($host = holu.lat) {
        return 301 https://$host$request_uri;
    }

    listen 80;
    server_name holu.lat www.holu.lat;
    return 404; # Si no se encuentra, retorna 404
}
