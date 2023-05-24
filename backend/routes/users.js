const express = require('express')
const router = express.Router()
const userController = require('../controllers/users') 

const { protect } = require('../middleware/auth')
router.post('/login', userController.login)
router.post('/signup', userController.signup)
router.get('/authchecker', protect, userController.authCheck)
module.exports = router