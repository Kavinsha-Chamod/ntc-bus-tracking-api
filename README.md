## NTC Bus Tracking API
- **Student ID: YR4COBSCCOMP232P-021**

RESTful API for NTC real-time bus tracking. Built with Node.js, Express, and MongoDB (Mongoose). Includes JWT-based authentication and role-based access control.

### Features
- **Authentication**: JWT login, protected routes
- **Resources**: Buses, Locations, Routes, Trips (CRUD)
- **RBAC**: `routes` endpoints restricted to `admin`
- **Health Check**: `/health` with DB ping

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- MongoDB connection URI

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env` file in the project root with:
```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/ntc_bus_tracking
JWT_SECRET=super_secret_jwt_key
JWT_SECRET_EXPIRES_IN=token_expires_time
```

### Scripts
```bash
# Start in development (with nodemon)
npm run dev

# Start in production
npm start

# Seed sample data (if provided in utils/seedData.js)
npm run seed
```

### Run locally
You can run either the classic server or the Vercel-style serverless function locally.

Classic (Node server):
```bash
npm run dev
# Server: http://localhost:3000
```

Vercel (serverless):
```bash
npm i -g vercel
vercel dev
# Server: http://localhost:3000 (proxied to api/index.js)
```

### Run
```bash
npm run dev
# Server: http://localhost:3000
```

### Health Check
```bash
curl -s http://localhost:3000/health | jq
```

---

## Authentication

Most endpoints require a Bearer token. Obtain a token via the login endpoint and include it in the `Authorization` header: `Authorization: Bearer <token>`.

### Login
- **POST** `/api/auth/login`

Request (example):
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "username",
    "password": "password123"
  }'
```

Successful Response (example):
```json
{
  "token": "<jwt>",
  "user": { "id": "...", "role": "admin" }
}
```

---

## Base URL
All resource endpoints are prefixed with `/api`.

When deployed to Vercel, all routes are served via `api/index.js` and keep the same paths (e.g. `/api/buses`).

---

## Endpoints

### Health
- **GET** `/health` — Service status with DB ping

### Buses
Requires Bearer token.
- **GET** `/api/buses` — List buses
- **POST** `/api/buses` — Create bus
- **GET** `/api/buses/:id` — Get bus by ID
- **PUT** `/api/buses/:id` — Update bus
- **DELETE** `/api/buses/:id` — Delete bus

Example:
```bash
curl -X GET http://localhost:3000/api/buses \
  -H 'Authorization: Bearer <token>'
```

### Locations
Requires Bearer token.
- **GET** `/api/locations` — List locations
- **POST** `/api/locations` — Create location
- **GET** `/api/locations/:id` — Get location by ID
- **PUT** `/api/locations/:id` — Update location
- **DELETE** `/api/locations/:id` — Delete location

Example:
```bash
curl -X POST http://localhost:3000/api/locations \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "busId": "<busObjectId>",
    "latitude": 6.9271,
    "longitude": 79.8612,
    "timestamp": "2025-01-01T12:00:00.000Z"
  }'
```

### Routes (Admin only)
Requires Bearer token with role `admin`.
- **GET** `/api/routes` — List routes
- **POST** `/api/routes` — Create route
- **GET** `/api/routes/:id` — Get route by ID
- **PUT** `/api/routes/:id` — Update route
- **DELETE** `/api/routes/:id` — Delete route

Example:
```bash
curl -X POST http://localhost:3000/api/routes \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Route 1",
    "stops": ["Stop A", "Stop B", "Stop C"]
  }'
```

### Trips
Requires Bearer token.
- **GET** `/api/trips` — List trips
- **POST** `/api/trips` — Create trip
- **GET** `/api/trips/:id` — Get trip by ID
- **PUT** `/api/trips/:id` — Update trip
- **DELETE** `/api/trips/:id` — Delete trip

Example:
```bash
curl -X GET http://localhost:3000/api/trips \
  -H 'Authorization: Bearer <token>'
```

---

## Seeding Data
If `utils/seedData.js` is configured, you can seed the database:
```bash
npm run seed
```

---

## Error Handling
- **404**: Unknown route returns JSON `{"message":"Not Found"}` (handler present)
- **401/403**: Missing/invalid token or insufficient permissions
- **500**: Server errors return JSON with an `error` message

---

## Project Structure
```
config/          # DB connection
controllers/     # Route handlers
middleware/      # Auth, error handling
models/          # Mongoose schemas
routes/          # Express routers
utils/           # Utilities (e.g., seeding)
app.js           # Express app (shared by server and serverless)
server.js        # Local/Node entrypoint (not used on Vercel)
api/index.js     # Vercel serverless handler (production entrypoint)
vercel.json      # Vercel configuration
```

---

## Deploy to Vercel

1) Install Vercel CLI and login:
```bash
npm i -g vercel
vercel login
```

2) Create the project (first time):
```bash
vercel
```

3) Set environment variables in Vercel Dashboard or via CLI:
```bash
vercel env add PORT        # optional; Vercel provides port
vercel env add MONGO_URI
vercel env add JWT_SECRET
vercel env add JWT_SECRET_EXPIRES_IN
```

4) Deploy:
```bash
vercel deploy --prod
```

Notes:
- `vercel.json` routes all traffic to `api/index.js` which wraps the Express app.
- Cold starts connect to MongoDB once per runtime; subsequent invocations reuse the connection.
- Keep your allowlist for MongoDB to include Vercel IPs or use MongoDB Atlas with proper Network Access.

## Notes
- Default port is controlled by `PORT` (defaults to 3000)
- CORS is enabled for all origins by default
- Helmet and morgan are enabled for security and logging


