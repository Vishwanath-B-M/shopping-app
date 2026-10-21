
const jwt = require("jsonwebtoken");

async function userCheck(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access. Please log in."
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwturl);

    console.log("Decoded Token:", decoded);

    req.userId = decoded.id;

    next();
  } catch (error) {
    console.log("JWT verification error:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token. Please log in again."
    });
  }
}

module.exports = { userCheck };
