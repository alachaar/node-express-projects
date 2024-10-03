const express = require('express')
const Router = express.Router()

const {
    getAllProductsStatic,
    getAllProducts,
} = require('../controllers/Products')

Router.route('/').get(getAllProducts)
Router.route('/static').get(getAllProductsStatic)

module.exports = Router
