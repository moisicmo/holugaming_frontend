# Usar una imagen base de nginx
FROM nginx:alpine

# Elimina la configuración por defecto de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar los archivos de producción de React al directorio predeterminado de NGINX
COPY dist /usr/share/nginx/html

# Exponer el puerto 80 para acceder a la aplicación
EXPOSE 80

# Comando para ejecutar nginx
CMD ["nginx", "-g", "daemon off;"]
