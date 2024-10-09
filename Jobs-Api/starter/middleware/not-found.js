const notFoundMiddleware = (req,res)=>{
    res.status(404).send('not found')
}

module.exports = notFoundMiddleware