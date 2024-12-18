server {
    server_name dinokids.holu.lat www.dinokids.holu.lat;

    # Manejo de archivos estáticos primero
    location /assets/ {
        proxy_pass http://localhost:8080;  # Redirige a los archivos estáticos servidos por el frontend
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        expires max;  # Opcional: cachea los recursos
        access_log off;  # Opcional: reduce los logs para recursos estáticos
    }

    # Configuración del Frontend y rutas SPA
    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        index index.html;
        try_files $uri $uri/ /index.html;  # Redirige al frontend para manejar rutas SPA
    }

    # Configuración del Backend
    location /api/ {
        proxy_pass http://localhost:3002;  # Redirige al backend
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/holu.lat/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/holu.lat/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


}
server {
    if ($host = www.dinokids.holu.lat) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = dinokids.holu.lat) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name dinokids.holu.lat www.dinokids.holu.lat;
    return 404; # managed by Certbot
    
}