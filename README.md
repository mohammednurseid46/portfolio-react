# Mohammednur Seid Portfolio

Full-stack personal portfolio with a React/Vite frontend and a NestJS, Prisma, and PostgreSQL backend.

## Requirements

- Node.js 20.19+ (Node.js 22 LTS is recommended)
- npm
- PostgreSQL 14+
- Git

## Project structure

```text
.
├── src/                 # React frontend
├── public/              # Frontend images and static assets
├── backend/
│   ├── src/             # NestJS API
│   ├── prisma/          # Prisma schema, migrations, and seed
│   └── test/            # Backend e2e tests
└── package.json
```

## Installation

Clone the repository and install dependencies for both applications:

```bash
git clone <repository-url>
cd portfolio-modern

# Frontend dependencies
npm install

# Backend dependencies
cd backend
npm install
```

Create the PostgreSQL databases before running migrations:

```sql
CREATE DATABASE portfolio;
CREATE DATABASE portfolio_test;
```

## Backend configuration

Copy the example environment file:

```bash
cd backend
cp .env.example .env
```

Update `backend/.env` with your PostgreSQL credentials, JWT secret, admin credentials, and optional SMTP settings:

```dotenv
PORT=3000
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio?schema=public"
DATABASE_URL_TEST="postgresql://username:password@localhost:5432/portfolio_test?schema=public"
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=1d
ADMIN_USERNAME=admin
ADMIN_PASSWORD=replace_with_a_strong_password
HASH_SALT=replace_with_a_random_hash_salt
CORS_ORIGINS=http://localhost:5173
DOCS_ENABLED=true
```

Never commit `.env` or real credentials. If SMTP variables are omitted, contact messages are saved but email delivery is skipped with a warning.

## Database setup

For local development, create and apply a migration:

```bash
cd backend
npx prisma migrate dev --name init
npm run seed
```

The seed creates or synchronizes the single admin account and populates projects, skills, and services.

For an existing production database:

```bash
cd backend
npx prisma migrate deploy
npm run seed
```

Optional Prisma database browser:

```bash
cd backend
npm run prisma:studio
```

## Running in development

Start the backend in one terminal:

```bash
cd backend
npm run start:dev
```

The API is available at:

- Health: <http://localhost:3000/api/health>
- API documentation: <http://localhost:3000/docs>
- OpenAPI JSON: <http://localhost:3000/docs-json>

Start the frontend in a second terminal:

```bash
npm run dev
```

Open the URL printed by Vite, usually <http://localhost:5173>.

The admin login is intentionally not linked from the public site. Open it directly:

<http://localhost:5173/#/admin/login>

Use the `ADMIN_USERNAME` and `ADMIN_PASSWORD` values from `backend/.env`.

## Frontend commands

Run these commands from the repository root:

```bash
npm install       # Install frontend dependencies
npm run dev       # Start Vite development server
npm run build     # Build the frontend into dist/
npm run preview   # Preview the production frontend build
```

The frontend uses `HashRouter`, so it works when hosted as static files.

## Backend commands

Run these commands from `backend/`:

```bash
npm install              # Install backend dependencies
npm run start:dev        # Start NestJS with watch mode
npm run start            # Start NestJS normally
npm run build            # Compile the backend
npm run start:prod       # Run the compiled backend
npm run seed             # Seed content and synchronize the admin password
npm run prisma:migrate   # Create/apply a development migration
npm run prisma:studio    # Open Prisma Studio
npm run lint             # Run the backend linter
```

## Features

### Public frontend

- Responsive portfolio homepage with sections for profile, skills, services, projects, and contact.
- Dark/light theme, four accent colors, and selectable animated backgrounds.
- Command palette with keyboard shortcut `Ctrl/Cmd + K`.
- Framer Motion animations, cursor effects, 3D tilt cards, project filters, and scroll progress.
- Reduced-motion support and responsive mobile navigation.
- Admin routes are lazy-loaded and are not downloaded by normal public visitors.

### Admin frontend

- JWT-only admin login; there is no registration or sign-up UI.
- Session-only token storage using `sessionStorage`.
- Dashboard with views, unique visitors, message counts, daily views, and top pages.
- Message inbox with unread filtering, mark-as-read, delete confirmation, and email reply links.
- CRUD management for projects, skills, and services.
- Responsive sidebar, theme and animated background controls, accessible dialogs, loading/error states, and toast notifications.
- Admin pages send `noindex` metadata to search engines.

### Backend API

- Public profile, project, skill, service, contact, analytics, and health endpoints.
- Bearer JWT authentication for administrator endpoints.
- Global validation with whitelisting and rejection of unknown fields.
- Login and contact rate limiting.
- Helmet security headers, configurable CORS, and generic authentication errors.
- Contact messages store salted IP hashes and optionally send SMTP notifications.
- Page views store salted visitor hashes and provide public and admin analytics.
- Scalar API documentation at `/docs` and raw OpenAPI JSON at `/docs-json`.
- `DOCS_ENABLED=false` disables both documentation routes; use this in production unless documentation is protected.

## API examples

Admin login:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your-admin-password"}'
```

Public project list:

```bash
curl http://localhost:3000/api/projects
```

Contact message:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","message":"I would like to discuss a project."}'
```

## Testing and verification

Prepare the separate test database and seed it:

```bash
cd backend
set -a
. ./.env
set +a
DATABASE_URL="$DATABASE_URL_TEST" npx prisma migrate deploy
DATABASE_URL="$DATABASE_URL_TEST" npm run seed
```

Run the backend e2e tests:

```bash
npm run test:e2e -- --runInBand
```

Build both applications:

```bash
# Repository root
npm run build

# backend/
cd backend
npm run build
```

## Production deployment

1. Configure a production PostgreSQL database and all required backend environment variables.
2. Set a strong `JWT_SECRET`, `HASH_SALT`, and admin password.
3. Set `CORS_ORIGINS` to the real frontend origin.
4. Set `DOCS_ENABLED=false`, or protect the documentation routes before enabling them publicly.
5. Apply migrations with `npx prisma migrate deploy`.
6. Run `npm run seed` once to synchronize the admin account and seed content.
7. Build and run the backend with `npm run build` and `npm run start:prod`.
8. Build the frontend with `npm run build` and deploy the generated `dist/` directory to a static host.

### Render backend

The repository includes [`render.yaml`](./render.yaml) with the backend and frontend
services. Create a Render Blueprint from the repository, then fill in the environment
variables marked `sync: false`. `start:render` applies pending migrations and synchronizes
the admin account before starting the API, so the login credentials on Render always match
`ADMIN_USERNAME` and `ADMIN_PASSWORD`.

The deployed API documentation is available at
[`https://portfolio-react-1q0z.onrender.com/docs`](https://portfolio-react-1q0z.onrender.com/docs),
and the raw OpenAPI document is available at
[`https://portfolio-react-1q0z.onrender.com/docs-json`](https://portfolio-react-1q0z.onrender.com/docs-json).
These routes are enabled in the deployed backend.

### Render frontend

Create a Render Static Site from the repository root with build command `npm install && npm run build`
and publish directory `dist`. Set the build environment variable
`VITE_API_URL=https://your-backend-service.onrender.com/api` using the actual backend URL, then
redeploy the frontend. Also set the backend `CORS_ORIGINS` to the frontend URL. Without
`VITE_API_URL`, the production frontend falls back to `http://localhost:3000/api`, and login
errors can appear as invalid credentials because the deployed site cannot reach that local address.

## Editing content

The original public-site fallback content is in [`src/data.js`](src/data.js). Database-backed projects, skills, and services are managed through the admin page or the authenticated API.
