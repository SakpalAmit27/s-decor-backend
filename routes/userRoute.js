const express = require('express')

const router = express.Router()

const {userLogin,registerUser,verifyEmail} = require('../controllers/user-controller')

router.post('/login',userLogin)
router.post('/signup',registerUser)
router.get('/verify/:token',verifyEmail)
module.exports = router

