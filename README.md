# Weading Ebram Full-Stack Next.js Application

A unified full-stack application built using **Next.js (App Router)** and **MongoDB**, featuring a clean separation of concerns. Both the frontend web interface and the backend API routes run simultaneously on the same Node.js server.

---

## 📁 Project Architecture

The codebase separates the presentation layer (frontend) from the business logic and infrastructure (backend) as follows:

```
weading-ebram/
├── src/
│   ├── app/
│   │   ├── api/                     # Backend Endpoints
│   │   │   ├── health/route.ts      # Health check and DB check route
│   │   │   └── todos/               # CRUD endpoints for Todos
│   │   ├── globals.css              # Custom Vanilla CSS styling system
│   │   ├── layout.tsx               # Main HTML wrap and configuration
│   │   └── page.tsx                 # Dashboard container (Client Entrypoint)
│   │
│   ├── frontend_lib/                # Frontend Modules
│   │   ├── components/              # UI Components (ConnectionStatus, TodoForm, etc.)
│   │   ├── hooks/                   # Custom Hooks (useTodos state hooks)
│   │   └── types/                   # Frontend typings and interfaces
│   │
│   ├── backend_lib/                 # Backend Modules
│   │   ├── infrastructure/          # Database pools (mongodb connection cache)
│   │   ├── services/                # Business logic services (TodoService CRUD)
│   │   └── types/                   # Backend type definitions
│   │
│   └── lib/                         # Shared utilities and helpers
```

---

## 🛠️ Path Aliases

To keep imports clean and prevent deep relative pathing (e.g. `../../../../components`), custom path aliases are defined in `tsconfig.json`:

* `@/frontend_lib/*` maps to `src/frontend_lib/*`
* `@/backend_lib/*` maps to `src/backend_lib/*`
* `@/app/*` maps to `src/app/*`
* `@/lib/*` maps to `src/lib/*`

Example:
```typescript
import { TodoService } from '@/backend_lib/services/todoService';
```

---

## ⚙️ Environment Variables

The project loads variables from `.env.local`. Create or edit `.env.local` in the root folder with:

```env
DEBUG="true"
NEXT_PUBLIC_DEBUG="true"

# MongoDB connection configurations
MONGODB_USERNAME="pepocristano_db_user"
MONGODB_PASSWORD="NiFCaXTrjPCS3rnq"
MONGODB_URI="mongodb+srv://pepocristano_db_user:NiFCaXTrjPCS3rnq@youssab.qh"
```

> [!NOTE]
> Ensure the MongoDB Atlas cluster network settings allow connections from your current development IP address.

---

## 🚀 Getting Started

### 1. Installation
Install all dependencies using npm:
```bash
npm install
```

### 2. Run the Development Server
Run the unified command to launch the hot-reloaded local web server and API layer:
```bash
npm run dev
```

The application will be running at [http://localhost:3000](http://localhost:3000).

---

## 📜 Available Scripts

In the project root, you can run:

* `npm run dev` - Runs the app in development mode on `localhost:3000`.
* `npm run build` - Builds the application for production usage into `.next/`.
* `npm run start` - Runs the built production server.
* `npm run lint` - Performs code analysis using ESLint rules.
