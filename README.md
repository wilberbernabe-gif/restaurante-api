# 🍽️ API REST Restaurante

Usamos el API REST profesional para la gestión de reservaciones de un restaurante virtual.

El sistema permite que los clientes puedan registrarse, iniciar sesión, consultar mesas disponibles y realizar reservaciones. Los administradores pueden gestionar mesas y tambien controlar el estado de las reservaciones.

---

## 🚀 Las tecnologias utilizadas

- Node.js
- Express.js
- PostgreSQL
- JWT (JSON Web Token)
- bcrypt
- Swagger UI
- Postman

---

## 📌 Funcionalidades del proyecto

### Autenticación

- Registro de usuarios.
- Inicio de sesión.
- Generación de tokens JWT.
- Protección de rutas mediante middleware.
- Control de acceso por roles.

### Clientes

- Crear reservaciones.
- Consultar sus propias reservaciones.
- Cancelar reservaciones.

### Administradores

- Consultar todas las reservaciones.
- Cambiar estado de reservaciones.
- Crear, actualizar y desactivar mesas.

---

## 📂 Estructura del proyecto
restaurante-api │ ├── database │   └── schema.sql │ ├── src │   ├── config │   │   ├── database.js │   │   ├── jwt.js │   │   └── swagger.js │   │ │   ├── controllers │   ├── middlewares │   ├── routes │   └── index.js │ ├── .env.example ├── package.json └── README.md

---

## ⚙️ Instalación

Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

Entrar a la carpeta:
```bash
cd restaurante-api
```

Instalar dependencias:
```bash
npm install
```

## ⚙️ Configuracion de variables de entorno

Crea un archivo llamado:
```bash
.env
```
basado en el ejemplo anexado:
```bash
.env.example
```
## Base de datos
Crea la base de datos en PostgreSQL (Si ya lo tienes instalado) y ejecuta:

```bash
database/schema.sql
```
Este archivo tiene:
-Tablas de usuarios
-Tablas de mesas
-Tablas de reservaciones
-Datos iniciales

## Ejecutarlo
Inicia el servidor en el terminal
```bash
node src/index.js
```
La API estará disponible en:
```bash
http://localhost:3000
```
## Documentacion Swagger 
La documentacion interactiva esta disponible en: 
```bash
http://localhost:3000/api-docs
```
Desde Swagger UI se pueden probar los endpoints de la API.

## 🔑 Endpoints principales
### Auth
| Método | Endpoint | Descripción |
|---|---|---|
| POST | /api/auth/register | Registro de usuario |
| POST | /api/auth/login | Inicio de sesión y JWT |
| GET | /api/auth/perfil | Perfil del usuario autenticado |

---
 
### Mesas
| Método | Endpoint | Descripción |
|---|---|---|
| GET | /api/mesas | Listar mesas |
| GET | /api/mesas/:id | Obtener mesa |
| POST | /api/mesas | Crear mesa (Admin) |
| PUT | /api/mesas/:id | Actualizar mesa (Admin) |
| DELETE | /api/mesas/:id | Desactivar mesa (Admin) |

---

### Reservaciones
| Método | Endpoint | Descripción |
|---|---|---|
| POST | /api/reservaciones | Crear reservación |
| GET | /api/reservaciones/mis | Ver mis reservaciones |
| GET | /api/reservaciones | Ver todas las reservas (Admin) |
| PUT | /api/reservaciones/:id/estado | Cambiar estado (Admin) |
| DELETE | /api/reservaciones/:id | Cancelar reservación |

---


## 🔒 Seguridad

El sistema implementa las siguientes medidas:

- Autenticación mediante JWT.
- Contraseñas protegidas con bcrypt.
- Middleware de autenticación.
- Control de permisos por roles.
- Protección de rutas administrativas.

---

## 👥 Roles del proyecto

### Cliente

Puede:

- Registrarse.
- Iniciar sesión.
- Crear reservaciones.
- Consultar sus reservas.
- Cancelar reservas.

### Administrador

Puede:

- Gestionar mesas.
- Consultar todas las reservas.
- Cambiar estados de reservaciones.

---

## 📁 Estructura del proyecto


restaurante-api
│
├── database
│   └── schema.sql
│
├── src
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── routes
│   └── index.js
│
├── .env.example
├── package.json
└── README.md


---

## 👨‍💻 Autor

Proyecto desarrollado como actividad evaluada de Backend y API REST por Wilber Alexander Bernabe Martinez.