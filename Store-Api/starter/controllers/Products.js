const Product = require('../models/Product')

const getAllProductsStatic = async (req,res)=>{
    const products = await Product.find( {price:{ $gt: 30 } })
    .sort('price')
    .select('price')
    res.status(200).json( {products , nbhits:products.length} )
        
}

const getAllProducts = async (req,res)=>{
    const {featured , company , name , sort , fields , numericFilters}=req.query
    const queryObject={}
    if(featured){
        queryObject.featured = featured === 'true' ? true : false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex:name , $options:'i'}
    }
    if(numericFilters){
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '<':'$lt',
            '<=':'$lte',
            '=':'$eq',
        }
        const regEx = /\b(<|>|>=|<=|=)\b/g
        let filters = numericFilters.replace(regEx , (match) => `-${operatorMap[match]}-`)
        // console.log(filters)
        const options = ['price' , 'rating']
        filters = filters.split(',').forEach((item) => {
            const [field , operator , Value] = item.split('-')
            if (options.includes(field)){
                queryObject[field] = { [operator] : Number(Value) }
            }
        });

    }

    console.log(queryObject)
    let result = Product.find(queryObject)
    //sort
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    else{
        result = result.sort('createdAt')
    }

    if(fields){
        const fieldsList = fields.split(',').join(' ')
        result=result.select(fieldsList)
    }
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const skip = (page -1) * limit
    
    result=result.skip(skip).limit(limit)

    const products = await result 
    res.status(200).json( {products , nbhits:products.length} )
}

module.exports = {
    getAllProductsStatic,
    getAllProducts,
}