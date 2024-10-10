const jwt = require('jsonwebtoken')
const UnauthenticatedError = require('../errors')
const User = require('../models/User')

const authenticationMiddleware = async (req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Aunthentication invalid')
    }

    const token = authHeader.split(' ')[1]
    try{
        const payload = jwt.verify(token , process.env.JWT_SECRET)
        //attach the user to the jobs routes
        req.user = {userId:payload.userId , name:payload.name }
        next()
    }
    catch(error){
        throw new UnauthenticatedError('Aunthentication invalid')
    }
}

module.exports = authenticationMiddleware