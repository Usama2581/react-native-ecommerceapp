const express = require('express')
const router = express.Router()


// router.use('/users', require('./userRoute'))
router.use('/users', require('./userRoutes'))
router.use('/cart', require('./cartRoutes'))

module.exports = router