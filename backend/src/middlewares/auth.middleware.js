
const jwt = require('jsonwebtoken')

// Token comes from the Authorization header (works in every browser),
// with the cookie kept as a fallback.
function getToken(req) {
  const header = req.headers.authorization
  if (header && header.startsWith('Bearer ')) {
    return header.slice(7)
  }
  return req.cookies?.token || null
}

async function userCheck(req, res, next) {
  const token = getToken(req)

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized access. Please log in.'
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.jwturl)
    req.userId = decoded.id
    req.userEmail = decoded.email
    next()
  } catch (error) {
    console.log('JWT verification error:', error.message)
    return res.status(401).json({
      message: 'Invalid or expired token. Please log in again.'
    })
  }
}

module.exports = { userCheck }