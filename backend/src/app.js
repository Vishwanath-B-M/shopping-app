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

// Exact URLs that are allowed
const allowedOrigins = [
  'http://localhost:5173', // local Vite dev
  'https://shopping-app-4.vercel.app',
  'https://shopping-appfresh.vercel.app',
  'https://shopping-appfresh-git-main-t9b66k7jyg-1959s-projects.vercel.app',
  process.env.FRONTEND_URL // optional extra URL set on Render
].filter(Boolean)

// Any Vercel URL of these two projects (main + preview deployments)
// e.g. https://shopping-appfresh-git-main-t9b66k7jyg-1959s-projects.vercel.app
const vercelPattern = /^https:\/\/shopping-app(fresh|-4)[a-z0-9-]*\.vercel\.app$/

app.use(cors({
  origin: (origin, callback) => {
    // no origin = Postman / server-to-server
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin) || vercelPattern.test(origin)) {
      return callback(null, true)
    }
    console.log('CORS blocked origin:', origin)
    return callback(null, false)
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// quick health check: open your Render URL in the browser to test
app.get('/', (req, res) => res.json({ message: 'API is running' }))

app.use('/api/auth', authrouter)
app.use('/api/cart', cartrouter)

module.exports = app