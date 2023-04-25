const express = require('express')
const router = express.Router()
const Users = require('../models/userModels')
// const verifyToken = require('../middlewares/verifyToken')

router.get('/', async (req, res) => {
    const user = await Users.find()
    res.send(user)
})



router.post('/register', async (req, res) => {
    console.log(req.body)
    try {
        const user = new Users(req.body)
        await user.save()
        res.send({ message: 'registered' })

    } catch (e) {

        console.log('e --->', e)
        res.send({ message: e.message })

    }
})


router.post('/login', async (req, res) => {

    const { email, password } = req.body
    console.log(email, password)


    const user = await Users.findOne({ email })

    if (!user) {
        res.send({ message:'User doesnot exsist' })
    }

    if (user) {
        const isValidPassword = await user.comparePassword(password)

        if (!isValidPassword) {
            return res.send({ message:'Email or password is incorrect' })
        }
        const token = await user.generateToken()
        res.send({ message: "Loggedin" })
    }

})


router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id
        // console.log(id)
        // console.log(req.body)
        await Users.findByIdAndUpdate(id, req.body)
        res.send({ message: 'User updated' })
    } catch (e) {
        res.send({ message: e.message })

    }
})


router.get('/:email', async (req,res) => {
    const email = req.params.email
    console.log(email)
    try {
        const result = await Users.findOne({ email })
        res.send(result)
    } catch (error) {
        res.send({message: error.message })
    }
})


router.delete('/logout/:token', async (req, res) => {
    const token = req.params.token
    console.log(token)
    try {
        await Users.removeToken(token)
        res.send({ message: 'Loggedout' })
    } catch (e) {
        console.log('e--->', e)
        res.send({ message: e })
    }

})

module.exports = router

