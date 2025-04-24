FROM node:18-alpine

WORKDIR /app

# Copiar archivos de configuración primero para aprovechar la caché de Docker
COPY package*.json ./

# Instalar dependencias
RUN npm install && npm install -g nodemon

# Copiar el resto de los archivos
COPY . .

# Exponemos el puerto que usa nuestra aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]
