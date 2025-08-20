const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

// user schema
const userSchema = new Schema({
    firstName:{
        type:String,
        required:[true, "first name is required"],
        trim:true
    },
    lastName:{
        type:String,
        required:[true, "last name is required"],
        trim:true
    },
    email:{
        type:String,
        required:[true, "email is required"],
        trim:true,
        unique:true,
        match:[/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 'invalid email'],
        lowercase: true
    },
    password:{
        type:String,
        trim:true,
        minlength: [8, "password must be at least 8 characters"],
        required:[true,"password is required"],
    }
},{timestamps:true})


// hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password, salt);
    next()
});
// create token
userSchema.methods.createJwt = function() {
    return jwt.sign({userId:this._id, name:this.firstName}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFESPAN});
};

// Compare password method for login
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
};

module.exports = mongoose.model('user', userSchema);