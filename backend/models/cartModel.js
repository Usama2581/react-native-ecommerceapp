const mongoose = require('mongoose')
// const bcryptjs = require("bcryptjs")
// const jwt = require('jsonwebtoken')
// const config = require('../config/jwt')
// const serverSecret = config.secret


const Schema = mongoose.Schema


const CartSchema = new Schema({
    email: {
        type: String,
        // required: true,
        // unique: true
    },
    brand: {
        type: String,
        // required: true,
        // minlength: 3
    },
    category: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true
    },
    discountPercentage: {
        type: Number,
        // default: [],
    },
    id: {
        type: Number,
        // default: [],
    },
    images: {
        type: Array,
        default: []
    },
    price: {
        type: Number,
        // default: [],
    },
    rating: {
        type: Number,
        // default: [],
    },
    stock: {
        type: Number,
        // default: [],
    },
    thumbnail: {
        type: String,
        // default: [],
    },
    title: {
        type: String,
        // default: [],
    },
    
})

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart