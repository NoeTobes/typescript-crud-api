# TypeScript CRUD API + Lab Activity 2 Frontend

This workspace contains:
- A TypeScript backend CRUD API using Node.js, Express, Sequelize, and MySQL.
- A frontend lab implementation (`frontend/`) with hash routing, auth simulation, role-based UI, and localStorage persistence.

## 1) Backend setup

1. Install dependencies:
   - `npm install`
2. Create MySQL database:
   - `CREATE DATABASE typescript_crud_api;`
3. Update credentials in `config.json` if needed.
4. Start development server:
   - `npm run start:dev`

Server default URL: `http://localhost:4001`

### One-command start (backend + frontend)

- Install deps first: `npm install`
- Run: `npm run start:all`
- Frontend URL: `http://localhost:5500/frontend/`
- Backend URL: `http://localhost:4001`
- Stop both servers: `npm run stop:all`

## 2) Backend API endpoints

- `GET /users` - list users
- `GET /users/:id` - get single user
- `POST /users` - create user
- `PUT /users/:id` - update user
- `DELETE /users/:id` - delete user

Example create payload:

```json
{
  "title": "Mr",
  "firstName": "Juan",
  "lastName": "Dela Cruz",
  "email": "juan@example.com",
  "password": "Password123!",
  "role": "User"
}
```

## 3) Frontend lab activity

Open `frontend/index.html` in a browser.

Implemented lab features:
- Navigation with logged-out, logged-in, and admin-only states.
- Hash-based routing and route protection.
- Registration, simulated email verification, login/logout.
- Profile page rendering from `currentUser`.
- Admin sections for accounts, departments, and employees.
- My Requests page with request creation and status badges.
- Data persistence via localStorage (`ipt_demo_v1`).

## 4) Useful checks

- Type check backend: `npm run typecheck`
- Build backend: `npm run build`
