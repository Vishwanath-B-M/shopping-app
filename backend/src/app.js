const express = require('express')
const cookieparser = require('cookie-parser')
const cors = require('cors')
const authrouter = require('./routers/auth.router')
const cartrouter = require('./routers/cart.router')

const app = express()

// Render runs behind a proxy
app.set('trust proxy', 1)

app.use(express.json())
app.use(cookieparser())

const allowedOrigins = [
  'https://shopping-app-4.vercel.app',
  'https://shopping-app-4-git-main-t9b66k7jyg-1959s-projects.vercel.app',
  process.env.FRONTEND_URL // optional: set on Render if your Vercel URL changes
].filter(Boolean)

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// quick health check: open your Render URL in the browser to test
app.get('/', (req, res) => res.json({ message: 'API is running' }))

app.use('/api/auth', authrouter)
app.use('/api/cart', cartrouter)

module.exports = app