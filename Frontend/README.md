# Frontend – Angular 20

Interfaz web que consume la API REST del Backend (Node.js + PostgreSQL + Docker).

Módulos: **Students**, **Teachers** y **Classrooms**.

## Arquitectura

```
src/app
├── app.config.ts / app.routes.ts / app.ts
└── modules
    ├── shared/                  navbar, botón, back, AlertService (SweetAlert2)
    ├── students/
    ├── teachers/
    └── classrooms/
        ├── interfaces/          modelo y tipos de request
        ├── services/            HttpClient: getAll, getById, create, update, delete
        ├── components/          tabla del listado
        └── pages/               list, detail, create, update
```

## Rutas

| Ruta                          | Pantalla      |
|-------------------------------|---------------|
| `/teachers/list`              | Listado       |
| `/teachers/detail/:id`        | Detalle       |
| `/teachers/create`            | Creación      |
| `/teachers/update/:id`        | Actualización |
| `/classrooms/...` y `/students/...` | Igual que arriba |

La eliminación se hace desde el listado, con confirmación.

## Ejecutar

1. Levantar el backend (carpeta `Backend`): `docker compose up -d`, `npm install`, `npm run db:init`, `npm run db:seed`, `npm start` (API en `http://localhost:3000`).
2. En la carpeta `Frontend`:
```bash
npm install
npm start        # http://localhost:4200
```
Requiere Node.js 20.19+ (o 22.12+).
