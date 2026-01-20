# 📝 Notes App Full Stack Implementation

## Descripción
Aplicación Web (SPA) para la gestión de notas desarrollada como ejercicio técnico.
Permite crear, editar, archivar y organizar notas por categorías con una interfaz moderna y responsiva.

## ✅ Funcionalidades Implementadas

### Fase 1: Gestión de Notas (Obligatoria)
- ✔️ Crear, editar y eliminar notas
- ✔️ Archivar y desarchivar notas
- ✔️ Ver notas activas vs archivadas
- ✔️ Persistencia en base de datos relacional

### Fase 2: Categorías y Filtros (Puntos Extra)
- ✔️ Crear y eliminar categorías
- ✔️ Asignar múltiples categorías a cada nota
- ✔️ Filtrar notas por categoría
- ✔️ Visualización de tags en las tarjetas

## 🛠️ Stack Tecnológico
| Capa | Tecnología |
|------|------------|
| **Frontend** | React 19 + Vite + TailwindCSS v4 |
| **Backend** | NestJS (Node.js) + TypeORM |
| **Database** | SQLite (archivo `database.sqlite`) |
| **Tipado** | TypeScript |

## 📋 Requisitos Previos
- Node.js **v18.17** o superior
- npm o yarn
- Git

## 🚀 Instrucciones de Inicio

### Linux/macOS
```bash
./run_app.sh
```

### Windows (PowerShell)
```powershell
./start.ps1
```

### Inicio Manual
```bash
# Terminal 1 - Backend
cd backend
npm install
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

**URLs de acceso:**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│  FRONTEND (React SPA)         BACKEND (NestJS REST API) │
│  └── Components               └── Controllers           │
│      └── NoteCard                 └── NotesController   │
│      └── NoteModal                └── CategoriesController│
│  └── Services                 └── Services              │
│      └── api.ts                   └── NotesService      │
│                                   └── CategoriesService │
│                               └── Entities (TypeORM)    │
│                                   └── Note              │
│                                   └── Category          │
└─────────────────────────────────────────────────────────┘
```

## 🔐 Credenciales
No se requiere autenticación para esta versión.

## 📁 Estructura del Proyecto
```
notes-app-exercise/
├── backend/          # API NestJS
│   ├── src/
│   │   ├── notes/    # Módulo de notas
│   │   └── categories/ # Módulo de categorías
│   └── database.sqlite
├── frontend/         # SPA React
│   └── src/
│       ├── components/
│       └── services/
├── run_app.sh        # Script inicio Linux/Mac
├── start.ps1         # Script inicio Windows
└── README.md
```
