// this middleware will check token authentication by verifyinh the jwt token .. / 

const jwt = require('jsonwebtoken')
// we wil require the use  for this // 

const User = require('../models/user-model')


const authMiddleware = async (req,res,next) => { 

    const token = req.header('Authorization').replace('Bearer ','')

    // if token is not present
    if(!token){
        return res.status(401).json({message:"no token , authorization denied"})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded.userId
        next();
    }catch(error){
        console.error(error);
        res.status(500).json({ message:"token is not valid"})
    }
}