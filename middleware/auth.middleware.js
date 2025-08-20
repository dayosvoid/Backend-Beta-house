const express = require('express')
const jwt = require('jsonwebtoken')

const authMiddleware = async(req,res,next)=>{

    const authHeader = req.headers['authorization']
    // checking for the token
    const token = authHeader && authHeader.split(' ')[1]

    try {
        // if no token
        if(!token){
           return res.status(401).json(
                {success:false,
                message: 'access denied: user is unauthorized'})
        }
        //verifying the token structure
        const decodeToken = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decodeToken
        // console.log('Decoded Token:', req.user)
        next()
    } catch (error) {
        next(error)
        
    }
}
module.exports = authMiddleware