# Notes App Full Stack Implementation

## Descripción
Esta es una aplicación Web (SPA) para la gestión de notas, desarrollada como ejercicio técnico.
Permite crear, editar, archivar y organizar notas por categorías.

## Stack Tecnológico
- **Frontend**: React (Vite) + TailwindCSS
- **Backend**: NestJS (Node.js) + TypeORM + SQLite
- **Database**: SQLite (archivo local `database.sqlite`)

## Requisitos Previos
- Node.js (v18.17 o superior)
- Git

## Instrucciones de Inicio (Rápido)

### Linux/macOS
Ejecuta el siguiente comando en la raíz del proyecto:
```bash
./run_app.sh
```

### Windows (PowerShell)
Ejecuta el script de inicio:
```powershell
./start.ps1
```

## Credenciales
No se requiere autenticación para esta versión del ejercicio.

## Arquitectura
El backend sigue una arquitectura en capas estricta:
- **Controllers**: Manejan las peticiones HTTP.
- **Services**: Contienen la lógica de negocio.
- **Repositories (TypeORM)**: Abstracción de acceso a datos.
