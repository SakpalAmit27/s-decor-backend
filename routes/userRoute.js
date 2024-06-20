const express = require('express')

const router = express.Router()

const {userLogin,registerUser,verifyEmail} = require('../controllers/user-controller')

// adding our authMiddleware // 
const authMiddleware = require('../middlewares/auth-middleware')

const validationMiddleware = require('../middlewares/validation-middleware')
const { check } = require('express-validator')

router.post(
    '/login',[
        check('email','please include a valid email ').isEmail(),
        check('password','password is required').not().isEmpty()
    ],
    validationMiddleware,
    userLogin
);
// router.post('/signup',registerUser)

// adding validation to input fields with made middlewar e// 

router.post(
    // using express-validator to check //
    '/register',[
        check('name','name is required').not().isEmpty(),
        check('email','email is required').isEmail(),
        check('password','password minimum must be 6').isLength({min : 6})
    ],

    // adding our middlwares here //


    validationMiddleware,
    registerUser
)

router.get('/verify/:token',verifyEmail)
module.exports = router

