const cartmodel = require('../models/usercart.model')

async function cart(req, res) {
  try {
    const userId = req.userId
    const { productId, quantity, Price, Image } = req.body

    if (productId === undefined || productId === null) {
      return res.status(400).json({ message: 'productId is required' })
    }

    const qty = Number(quantity) || 1
    let usercart = await cartmodel.findOne({ user: userId })

    if (usercart) {
      const itemindex = usercart.cartitems.findIndex(
        (item) => String(item.productId) === String(productId)
      )

      if (itemindex > -1) {
        usercart.cartitems[itemindex].quantity += qty
      } else {
        usercart.cartitems.push({ productId, quantity: qty, Price: Number(Price), Image })
      }
      await usercart.save()
    } else {
      usercart = await cartmodel.create({
        user: userId,
        cartitems: [{ productId, quantity: qty, Price: Number(Price), Image }]
      })
    }

    // NOTE: response shape changed: cart is now the cart object itself
    return res.status(200).json({
      message: 'Successfully added to cart',
      cart: usercart
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server error' })
  }
}

async function cartshow(req, res) {
  try {
    const usercart = await cartmodel.findOne({ user: req.userId })

    // no cart yet = empty cart (the old code never replied here)
    return res.status(200).json({
      message: 'cart',
      cart: usercart || { cartitems: [] }
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server error' })
  }
}

async function cartdelete(req, res) {
  try {
    const { productId } = req.body
    const usercart = await cartmodel.findOne({ user: req.userId })

    if (!usercart) {
      return res.status(404).json({ message: 'Cart not found' })
    }

    const itemindex = usercart.cartitems.findIndex(
      (item) => String(item.productId) === String(productId)
    )

    if (itemindex === -1) {
      return res.status(404).json({ message: 'Item not found in cart', productId })
    }

    usercart.cartitems.splice(itemindex, 1)
    await usercart.save()

    return res.status(200).json({
      message: 'Successfully deleted from cart',
      cart: usercart
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { cart, cartshow, cartdelete }