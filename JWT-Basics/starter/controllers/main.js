// check username, password in post(login) request
// if exist create new JWT 
// send back to front-end

const { use } = require("express/lib/router")

// setup authenthication so only the request with JWT can access the dashbord 

const CustomAPIError = require('../errors/custom-error')

const login = async(req,res)=>{
    const {username , password} = req.body
    console.log(username,password)
    //mongoose validation
    //Joi
    //check in the controller 

    if(!username || password){
        throw new CustomAPIError('Please provide email and password' , 400)     
    }

    //mongo
    //Joi

    res.send('Fake Login/Register/Signup Route')
}

const dashbord = async(req,res)=>{
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json( { msg : 'Hello ,Alaa' , secret : `Here is your authorized data , your lucky number is ${luckyNumber}`})
}

module.exports = {login , dashbord}