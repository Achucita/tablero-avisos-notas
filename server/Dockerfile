FROM node:18-alpine

WORKDIR /app

# Copiar archivos de configuración primero para aprovechar la caché de Docker
COPY server/package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos
COPY server/ ./

# Exponemos el puerto que usa nuestra aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
