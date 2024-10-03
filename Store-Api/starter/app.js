const express = require ('express')
const app = express()

require('express-async-errors')
const errorMiddleware = require('./midlleware/error-handler')
app.use(errorMiddleware)

const connectDB = require ('./db/connect')
const ProductsRouter = require('./routes/Products')


require('dotenv').config()

//async errors


//middlewares call
const notFoundMiddleware = require('./midlleware/notFound')


//middlewares use
app.use(express.json())
// app.use(notFoundMiddleware)


// rootes
app.get('/',(req,res)=>{
    res.send('<h1>Store Api</h1><a href="/api/v1/products">products route</a>')
})



app.use('/api/v1/products', ProductsRouter)
//products route 

const port = process.env.port || 5000

const start = async (req,res)=>{
    try{
        //DB
        await connectDB(process.env.MONGO_URI)
        app.listen(port , console.log(`listening on port ${port}`))
    }
    catch(err){
        console.log(err)
    }
}

start()