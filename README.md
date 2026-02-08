## Project Overview
Online Gadget Shop is a full‑stack demo store for gaming and productivity gear.  
It includes a Node.js/Express API with MongoDB (Mongoose) and a static HTML/CSS/JS frontend.

## Setup and Installation
1. Install dependencies:
```bash
npm install
```

2. Create `.env` in the project root:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

3. (Optional) Generate local placeholder images:
```bash
npm run gen:images
```

4. Seed the database:
```bash
npm run seed
```

5. Run the server:
```bash
npm run start
```

6. Open the frontend:
- Open `frontend/index.html` in your browser (or serve it with any static server).

## API Documentation
Base URL: `http://localhost:5000/api`

### Auth
- `POST /auth/register` — Public  
  Body: `{ "username": "string", "email": "string", "password": "string" }`
- `POST /auth/login` — Public  
  Body: `{ "email": "string", "password": "string" }`  
  Response: `{ "token": "jwt" }`

### Products
- `GET /products` — Public  
  Query (optional): `category`, `brand`, `minPrice`, `maxPrice`
- `GET /products/:id` — Public
- `POST /products` — Protected (Bearer token)
- `PUT /products/:id` — Protected (Bearer token)
- `DELETE /products/:id` — Protected (Bearer token)

### Users
- `GET /users/profile` — Protected (Bearer token)
- `PUT /users/profile` — Protected (Bearer token)
