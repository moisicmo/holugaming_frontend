


# Project DINOKIDS FRONTEND  ReactJS + TypeScript + MUI + Redux + VITE


## Instalación

1. Clonar .env.template a .env y configurar las variables de entorno
2. Ejecutar `yarn` para instalar las dependencias

## Desarrollo
1. Ejecutar `yarn dev` para levantar el proyecto en modo desarrollo`

## Despliegue con docker

1. Ejecutar `yarn build` para generar la carpeta dist
2. Ejecutar `docker build -t holugaming-app .` para construir la imagen
3. Ejecutar `docker save -o ./holugaming-app.tar holugaming-app` para traer la imagen en .tar
3. Ejecutar `scp holugaming-app.tar root@ip:/root/projects/holugaming` para hacer la copia de la imagen al servidor
ahora dentro del servidor:
3. Ejecutar `docker load -i holugaming-app.tar` para cargar la imagen en el docker del servidor
4. Ejecutar `docker run -d -p 8081:80 holugaming-app` levantar en el puerto 80 el contenedor



server {
    listen 80;
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
}


nano /etc/nginx/sites-available/dinokids 
sudo ln -sf /etc/nginx/sites-available/dinokids /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

sudo certbot --nginx -d holu.lat -d www.holu.lat -d dinokids.holu.lat -d www.dinokids.holu.lat
