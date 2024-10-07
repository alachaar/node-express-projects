const login = async(req,res)=>{
    res.send('Fake Login/Register/Signup Route')
}

const dashbord = async(req,res)=>{
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json( { msg : 'Hello ,Alaa' , secret : `Here is your authorized data , your lucky number is ${luckyNumber}`})
}

module.exports = {login , dashbord}