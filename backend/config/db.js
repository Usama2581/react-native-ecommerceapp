const mongoose = require('mongoose')

const mongoURI = 'mongodb+srv://usamahafeez948:jiTNpakIDXGiQ1Mk@cluster0.8r9muqv.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(mongoURI, { useNewUrlParser: true })

module.exports = mongoose

