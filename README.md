# Backend CRUD – Node.js + TypeScript + PostgreSQL + Docker

Módulos: **Students**, **Courses**, **Teachers** (nuevo) y **Classrooms** (nuevo).

## Arquitectura
```
Backend/src
├── config/                 conexión a BD, variables de entorno, swagger
├── database/               init.sql (tablas), seed.sql (datos), consult.sql
├── domain/
│   ├── dtos/               validación de entrada (create / update)
│   ├── errors/             CustomError y HandleError
│   └── interfaces/         tipos de cada entidad
├── presentation/
│   ├── modules/<modulo>/   service + controller + routes
│   └── routes.ts           registro de rutas bajo /api
└── scripts/                init-db.ts y seed-db.ts
```

## Cómo ejecutar
```bash
cd Backend
docker compose up -d     # PostgreSQL (5432) y pgAdmin (8080)
npm install
npm run db:init          # crea las tablas
npm run db:seed          # inserta datos iniciales (se puede repetir sin error)
npm start                # API en http://localhost:3000
```
Swagger: http://localhost:3000/api/docs

## Endpoints
| Método | Ruta                  | Acción         |
|--------|-----------------------|----------------|
| GET    | /api/{recurso}        | Listar todos   |
| GET    | /api/{recurso}/:id    | Obtener por id |
| POST   | /api/{recurso}        | Crear          |
| PUT    | /api/{recurso}/:id    | Actualizar     |
| DELETE | /api/{recurso}/:id    | Eliminar       |

`{recurso}` = `students`, `courses`, `teachers`, `classrooms`.

### Ejemplos de body
Teacher:
```json
{ "name": "Luis Pérez", "email": "luis@uceva.edu.co", "phone": "3161234567", "specialty": "IA", "status": true }
```
Classroom:
```json
{ "code": "D-101", "building": "Edificio D", "capacity": 30, "status": true }
```
