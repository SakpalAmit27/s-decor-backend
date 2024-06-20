//  a middleware for validating and handling the request // 

// using express validator for this ..  // 

const {validationResult} = require('express-validator')

// validationresult extracts the validation error while making an request  //

const validationMiddleware = async (req,res,next) => {

    const errors = validationResult(req)

    if(!errors.isEmpty){
        return res.status(400).json({errors : errors.array()})
    }

    next();
}

module.exports = validationMiddleware
