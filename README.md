# Shopping App

A full-stack e-commerce web app built with the MERN stack. Users can browse products, search, filter by category, sign up / log in, and manage a cart that is saved in the database.

**Live demo:** https://shopping-appfresh.vercel.app

> The backend runs on Render's free tier, so the first request after a period of inactivity can take about 30 seconds.

## Screenshots

<!-- Add screenshots here: home page, category page, cart page, login page -->

## Features

**Shopping**
- Browse products with images, price and stock status
- Live search on the home page
- Browse by category, with a page for each category
- Add to cart and remove from cart on every product card
- Cart page with item images, quantity, price, total items and total price
- Adding the same product again increases its quantity

**Authentication**
- Sign up and log in with email and password
- JWT authentication with a 1-day token expiry
- Token sent as a `Bearer` header, which works in all browsers including Safari
- Cookie (httpOnly, secure, SameSite=None) kept as a fallback
- Navbar switches between Login and Logout
- Session restored on page reload, expired tokens are logged out automatically
- Protected cart API routes through auth middleware

**State and UI**
- Redux Toolkit for auth and cart state
- Cart reloaded from the database when the app opens, so buttons stay correct
- Responsive layout built with Tailwind CSS
- Loading spinner, empty-cart screen and clear error messages

**Deployment**
- Frontend on Vercel, backend on Render
- CORS configured for the Vercel domains and local development
- Environment-based configuration

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React, Vite, Redux Toolkit, React Router, Tailwind CSS |
| Backend | Node.js, Express.js, JWT, cookie-parser, cors |
| Database | MongoDB, Mongoose |
| Product data | [DummyJSON](https://dummyjson.com) API |
| Hosting | Vercel (frontend), Render (backend) |

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/singup` | No | Create an account and return a token |
| POST | `/api/auth/login` | No | Log in and return a token |
| GET | `/api/auth/logout` | No | Clear the auth cookie |
| GET | `/api/auth/me` | Yes | Return the logged-in user |
| POST | `/api/cart/cart` | Yes | Add an item (or increase its quantity) |
| GET | `/api/cart/cartshow` | Yes | Get the user's cart |
| DELETE | `/api/cart/cartdelete` | Yes | Remove an item from the cart |

## Project Structure

```
shopping-app/
├── backend/
│   ├── app.js
│   ├── controller/      auth.controller.js, cart.controller.js
│   ├── middlewares/     auth.middleware.js
│   ├── models/          singup.model.js, usercart.model.js
│   └── routers/         auth.router.js, cart.router.js
└── frontend/
    └── src/
        ├── component/   header, products, cartTile, categoryTile
        ├── pages/       home, category, singlecategory, cart, login
        ├── store/       Redux slices (auth, cart)
        └── utils/       api.js (fetch helper with Bearer token)
```

## Run Locally

**Prerequisites:** Node.js and a MongoDB database (local or Atlas).

**1. Clone the repo**
```bash
git clone https://github.com/Vishwanath-B-M/shopping-app.git
cd shopping-app
```

**2. Backend**
```bash
cd backend
npm install
```
Create a `.env` file in `backend/`:
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
jwturl=your_long_random_secret
FRONTEND_URL=http://localhost:5173
```
Use the same variable names your server file reads. Then start it:
```bash
npm start
```

**3. Frontend**
```bash
cd frontend
npm install
```
Create a `.env` file in `frontend/`:
```
VITE_API_URL=http://localhost:3000
```
Then start it:
```bash
npm run dev
```
Open http://localhost:5173.

## Deployment

- **Backend (Render):** root directory `backend`, add the environment variables above, set `FRONTEND_URL` to your Vercel URL.
- **Frontend (Vercel):** root directory `frontend`, add `VITE_API_URL` pointing to your Render URL.

## Possible Improvements

- Quantity controls (+ / −) in the cart
- Checkout and order history
- Protected frontend routes
- Forgot / reset password
- Product pages with details and reviews

## Author

**Vishwanath Basavaraj Mirji**
[GitHub](https://github.com/Vishwanath-B-M)
