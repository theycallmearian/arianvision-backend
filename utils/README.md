# ArianVision Backend

## Descripción del proyecto

ArianVision Backend es la API REST de la plataforma ArianVision. Gestiona usuarios, eventos y autenticación con JWT sobre una base MongoDB, soportando subida de imágenes a Cloudinary y diferentes roles.

## Tecnologías utilizadas

- Node.js & Express
- MongoDB (Mongoose)
- JWT, bcryptjs
- Cloudinary (multer-storage-cloudinary)
- dotenv, cors, nodemon

## Instalación local

1. Clona el repo:
   ```bash
   git clone https://github.com/theycallmearian/arianvision-backend.git
   cd arianvision-backend
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Crea el archivo `.env` con:
   ```env
   MONGO_URI=<URL_MongoDB>
   JWT_SECRET=<secreto>
   CLOUDINARY_CLOUD_NAME=<tu_cloud_name>
   CLOUDINARY_API_KEY=<tu_api_key>
   CLOUDINARY_API_SECRET=<tu_api_secret>
   PORT=3000
   ```
4. (Opcional) Siembra la base de datos con usuarios y eventos demo:
   ```bash
   node seed/index-seed.js
   ```

## Ejecución local

- Modo desarrollo:
  ```bash
  npm run dev
  ```
- Modo producción:
  ```bash
  node server.js
  ```
- API por defecto en `http://localhost:3000/api/`

## Despliegue en producción

- Railway/Render/Heroku: conecta GitHub, define variables de entorno en el panel (ver arriba), deploy automático.
- MongoDB Atlas recomendado para producción.
- Configura CORS restrictivo en producción (`origin` de tu frontend).

## Comandos útiles

- `npm run dev`: modo dev con nodemon
- `node server.js`: producción
- `node seed/index-seed.js`: poblar datos demo
- (Añade test/lint según necesidades)
