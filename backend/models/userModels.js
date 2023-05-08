const mongoose = require('mongoose')
const bcryptjs = require("bcryptjs")
const jwt = require('jsonwebtoken')
const config = require('../config/jwt')
const serverSecret = config.secret


const Schema = mongoose.Schema


const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        // required: true,
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        default: 'https://firebasestorage.googleapis.com/v0/b/olxrn-427a6.appspot.com/o/guest.png?alt=media&token=f12a183a-4662-4480-b51b-7886c7887ec2',
        type: String,
    },
    token: {
        type: Array,
        default: []
    }

})


// UserSchema.methods.generateToken = function() {

// }

UserSchema.pre('save', function (next) {
    const user = this

    if (user.isModified('password')) {
        const salt = bcryptjs.genSaltSync(10)
        const hash = bcryptjs.hashSync(user.password, salt)

        user.password = hash
    }

    next()
})



UserSchema.methods.comparePassword = function(password) {
    const user = this

    return bcryptjs.compareSync(password, user.password)
}


UserSchema.methods.generateToken = function() {
    const user = this
    const { _id } = user

    const token = jwt.sign({ _id }, serverSecret)
    console.log(token)
    user.token.push(token)
    return user.save().then(() => token)
}


UserSchema.statics.removeToken = function(token) {
    const Users = this
    

    const decoded = jwt.verify(token, serverSecret)
    console.log(decoded)
    return Users.findOneAndUpdate({ _id: decoded._id }, { $pull: { token: token }})
}

const Users = mongoose.model('Users', UserSchema)

module.exports = Users