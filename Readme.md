# RNM Auth

## Description

This project is a minimal authentication example built with a React + Vite frontend and an Express (Node.js) backend using MySQL. It demonstrates user registration, login with hashed passwords, and JWT-based protected routes.

## Features

- User registration (username, email, password)
- User login (returns JWT)
- Protected route to fetch authenticated user data
- Password hashing with bcrypt
- MySQL-based user storage
- Frontend uses Vite + React and stores JWT in `localStorage`

## Technology Stack

- **React (Vite):** Frontend UI and routing. [https://reactjs.org/](https://reactjs.org/)
- **Express:** Backend REST API framework. [https://expressjs.com/](https://expressjs.com/)
- **MySQL / mysql2:** Relational database and Node.js MySQL client. [https://www.mysql.com/](https://www.mysql.com/) / [https://www.npmjs.com/package/mysql2](https://www.npmjs.com/package/mysql2)
- **bcrypt:** Password hashing library for storing hashed passwords. [https://www.npmjs.com/package/bcrypt](https://www.npmjs.com/package/bcrypt)
- **JSON Web Tokens (jsonwebtoken):** Token-based authentication for protected routes. [https://www.npmjs.com/package/jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- **Axios:** HTTP client used by the frontend to talk to the backend. [https://axios-http.com/](https://axios-http.com/)
- **nodemon:** Development tool to auto-restart the server on file changes. [https://www.npmjs.com/package/nodemon](https://www.npmjs.com/package/nodemon)

## Directory Structure

```
└── rnm-auth/
├── README.md
├── frontend/
│  ├── package.json
│  ├── index.html
│  └── src/
│     ├── main.jsx
│     ├── App.jsx
│     └── pages/
│        ├── Home.jsx
│        ├── Login.jsx
│        └── Register.jsx
└── server/
   ├── package.json
   ├── index.js
   ├── lib/
   │  └── db.js
   └── routes/
      └── authRoutes.js
```

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/NewtonY-dev/react-node-mysql-authentication.git
   cd react-node-mysql-authentication
   ```

   Replace with your actual GitHub repo URL and folder name

2. **Install backend dependencies:**

   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies:**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Create server `.env` file** (see Environment section below), then return to project root.

## Environment

Create a `.env` file inside the `server/` directory with the following variables (example values shown):

```env
PORT=3000
DB_HOST=127.0.0.1
DB_USER=<your_db_user>
DB_PASSWORD=<your_db_password>
DB_NAME=<your_database_name>
JWT_KEY=<your_jwt_secret_here>
```

- Replace `<your_db_user>`, `<your_db_password>`, `<your_database_name>`, and `<your_jwt_secret_here>` with your actual values or instruct users to set their own.

## Database

Create the `users` table (SQL example):

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);
```

Ensure your MySQL server is running and the credentials in `server/.env` match an accessible database.
If your table schema differs, update the SQL example accordingly.

## How to run locally

1. **Start the backend**

   ```bash
   cd server
   npm run start
   ```

   > `npm run start` typically uses `nodemon` in development scripts; for production use `node index.js` or a process manager.

2. **Start the frontend**

   ```bash
   cd ../frontend
   npm run dev
   ```

   The frontend (Vite) will serve the app (commonly at `http://localhost:5173` or as configured). The frontend sends API requests to the backend (default backend base URL is `http://localhost:3000` in code examples).

## Usage

### Register (create user)

**Endpoint**

```
POST /auth/register
Content-Type: application/json
Body: { "username": "alice", "email": "a@example.com", "password": "secret" }
```

**curl example**

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","email":"a@example.com","password":"secret"}'
```

**Expected success**

```json
Status: 201
{
  "message": "User registered successfully"
}
```

### Login (get JWT)

**Endpoint**

```
POST /auth/login
Content-Type: application/json
Body: { "email": "a@example.com", "password": "secret" }
```

**curl example**

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"a@example.com","password":"secret"}'
```

**Expected success**

```json
Status: 201
{
  "token": "<JWT_TOKEN>"
}
```

Store the returned token in `localStorage` (frontend does this) and include it on protected requests via the `Authorization: Bearer <token>` header.

### Protected: Home (get authenticated user)

**Endpoint**

```
GET /auth/home
Headers: Authorization: Bearer <JWT_TOKEN>
```

**curl example**

```bash
curl -X GET http://localhost:3000/auth/home \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

**Expected success**

```json
Status: 201
{
  "user": {
    "id": 1,
    "username": "alice",
    "email": "a@example.com"
  }
}
```

## Tests

There are no automated tests included by default. The `server/package.json` may contain a placeholder `test` script. Recommended additions for future improvements:

- Backend: Jest or Mocha + Chai
- Frontend: Vitest + React Testing Library

## Build & Deployment

- **Frontend build:**

  ```bash
  cd frontend
  npm run build
  ```

  Serve `dist/` using a static host or reverse-proxy to the backend.

- **Backend production:**
  Use `node index.js` or a process manager (PM2, systemd) and ensure environment variables are set. Consider adding Docker and CI for reproducible deployment.

## Contributing

1. Fork the repo and create a feature branch:

   ```bash
   git checkout -b feat/your-feature
   ```

2. Make changes and add tests where applicable.
3. Open a pull request with a clear description of changes.
4. Keep commits focused and atomic.

## API Reference

**Register** — `POST /auth/register`
**Login** — `POST /auth/login`
**Get current user** — `GET /auth/home` (requires `Authorization: Bearer <token>`)

## License

MIT License

Copyright (c) 2025 Newton Yetsedaw

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
