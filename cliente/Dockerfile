# Etapa de construcción (build)
FROM node:16-alpine as build

WORKDIR /app

# Copiar los archivos de configuración
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm ci

# Copiar el código fuente
COPY . ./

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar los archivos de construcción a la carpeta de nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiar configuración personalizada de nginx si es necesario
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
