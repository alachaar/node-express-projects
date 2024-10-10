const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')



const register = async(req,res)=>{
    // handle errors through controller
    // const {name,email,password}=req.body
    // if(!name || !email || !password){
    //     throw new BadRequestError('Please provide name , email , password')
    // }
    
    const user = await User.create({...req.body})
    const token = user.createJwt()
    res.status(StatusCodes.CREATED).json({user:{name: user.name} ,token }) // i need the name for the frontend 
}

const login = async(req,res)=>{
    const {email , password} = req.body

    if(!email || !password){
        throw new BadRequestError('Please provide email and password')
    }

    const user = await User.findOne({email})
    
    if(!user){
        throw new UnauthenticatedError('email does not exist')
    }

    //email exists now we will compare password
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('wrong password')
    }
    

    const token = user.createJwt()
    res.status(StatusCodes.OK).json( {user :{name:user.name} , token} )
}

module.exports = {
    register,
    login,
}