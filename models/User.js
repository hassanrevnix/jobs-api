const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Please Provide Name'],
        minlength: 3,
        maxlength: 50,
    },
    email:{
        type: String,
        required: [true,'Please Provide Email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please Provide Valid Email'],
        unique: true,
    },
    password:{
        type: String,
        required: [true,'Please Provide Password'],
        minlength: 6,
    },
})

UserSchema.pre('save', async function () {
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password,salt)   
})

UserSchema.methods.comparePassword = async function(providePassword) {
    return await bcryptjs.compare(providePassword, this.password)
}

UserSchema.methods.createJWT = function () {
    return jwt.sign({userId: this._id, name: this.name}, process.env.JWT_SECRET,{ expiresIn: process.env.JWT_LIFETIME})
}
module.exports = mongoose.model('User', UserSchema )