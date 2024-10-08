const express = require('express')
const Router = express.Router()

const {login , dashbord} = require('../controllers/main')

const authMiddleware = require('../middleware/auth')


Router.route('/dashbord').get(authMiddleware, dashbord)
Router.route('/login').post(login)

module.exports = Router