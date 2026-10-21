const express = require('express')
const authController = require('../controller/auth.controller')
const middleware = require('../middlewares/auth.middleware')

const router = express.Router()

router.post('/singup', authController.singup)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.get('/me', middleware.userCheck, authController.me)

module.exports = router