const express = require('express')
const cartController = require('../controller/cart.controller')
const authmiddleware = require('../middlewares/auth.middleware')

const router = express.Router()

router.post('/cart', authmiddleware.userCheck, cartController.cart)
router.get('/cartshow', authmiddleware.userCheck, cartController.cartshow)
router.delete('/cartdelete', authmiddleware.userCheck, cartController.cartdelete)

module.exports = router