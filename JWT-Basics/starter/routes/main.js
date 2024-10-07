const express = require('express')
const Router = express.Router()

const {login , dashbord} = require('../controllers/main')

Router.route('/dashbord').get(dashbord)
Router.route('/login').post(login)

module.exports = Router