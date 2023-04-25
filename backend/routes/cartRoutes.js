const express = require('express')
const router = express.Router()
const Cart = require('../models/cartModel')
// const verifyToken = require('../middlewares/verifyToken')


router.post('/add', async (req,res) => {
    // console.log(req.body)
    try {
        const cart = new Cart(req.body)
        await cart.save()
        res.send({ message: 'added' })
    } catch (e) {
        res.send({ message: e.message })
    }
})


router.get('/:email', async (req,res) => {
    const email = req.params.email
    // console.log(email)
    try {
        const product = await Cart.find({ email: email })
        res.send(product)
    } catch (error) {
        res.send({ message: error.message })
    }

})

module.exports = router