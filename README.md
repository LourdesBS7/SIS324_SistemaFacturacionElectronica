# Sistema de Facturación

Un sistema de facturación moderno construido con Node.js y Express.

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (gestor de paquetes de Node.js)

## Instalación

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd SistemaFacturacion
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto
   - Agrega las siguientes variables:
   ```
   PORT=3000
   DATABASE_URL=sqlite:./database.sqlite
   JWT_SECRET=tu_clave_secreta
   ```

## Estructura del Proyecto

```
SistemaFacturacion/
├── frontend/
│   ├── css/
│   │   ├── style.css
│   │   └── login.css
├── package.json
├── .env
└── main.js
```

## Tecnologías Utilizadas

- Backend: Node.js con Express
- Base de Datos: SQLite con Sequelize
- Seguridad: bcrypt para hashing de contraseñas
- CORS: Para manejo de peticiones cross-origin

## Ejecución

Para iniciar el servidor:
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## Licencia

ISC License

## Contribución

1. Realiza un fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
