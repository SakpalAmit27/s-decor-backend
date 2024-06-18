// let make controller to handle request and response of register user , login and token etc // 

const express = require('express')
// using the router  // 

const router = express.Router()
// bycrpt for hashing // 

const bycrpt = require('bcryptjs')

// adding out User model from schema // 

const User = require('../models/user-model')

const crypto = require('crypto')

// jwt //

const jwt = require('jsonwebtoken')

// lets register the user first // 

const registerUser = async (req,res)=>{ 
    // need essentials // 

    const{name,email,password} = req.body

    try{
        // lets find user using email //

        let user = await User.findOne({email})

        if(user){
            return res.status(400).json({message : "user already exists , please login"})
        }

        // if doesnt exist then // 
        // hash the password first // 

        const hashedPassword = await bycrpt.hash(password,10)
        // storing the json web token for user in db with registaration // 

        const verificationToken = crypto.randomBytes(32).toString('hex');

        // create the user then  //

        user = new User({
            name,
            email,
            password:hashedPassword,
            verificationToken:verificationToken,
            isVerified:false
        })

        await user.save() 

        // tkoen// 

        console.log(`verification token : ${verificationToken}`)
        // returning the response // 

        res.status(201).json({message:"user registered successfully"})




        
    }catch(error){
        // handling th error 

        console.error(error.message)
        res.status(500).send('Server error')
    }
}

// login the user // 

const userLogin = async (req,res) => {
    // required essentials // 

    const {email,password} = req.body

    // lets first check if user exists or not //

    // as usual check with email // 

    try{
        let user = await User.findOne({email})

        // if he doesnt exist // 

        if(!user){
            return res.status(400).json({message:"User does not exist , please register first"})
        }

        // if he does lets match the user // 
        // compare with password

        const isMatch = await bycrpt.compare(password,user.password)

        // if it doesnt match // 

        if(!isMatch){
            return res.status(400).json({message:"invalid email or password , please try again"})
        }
        // if it does generate the jwt token for the user // 

        const token = await jwt.sign({userId : user._id} , process.env.JWT_SECRET ,{expiresIn : '1h'})

        // displayin thje token in frontend // 

        res.status(200).json({token})

        // done // 

    }catch(error){
        console.error(error.messages)

        res.status(500).send('Server error')
    }
    
}

// lets verify the user email //

const verifyEmail = async (req,res) => {
    const {token} = req.params

    // finding the user by token /

    try{
        let user = await User.findOne({verificationToken : token})
        console.log(`User found: ${user}`);
        // if the token is not matching .// or doesnt exist // 
        if(!user){
            return res.status(400).json({message:"invalid or expired token"})
        }
        // if the token exist // 
        user.isVerified = true
        user.verificationToken = null 

        // then save the user // 
        await user.save();

        // returning the response // 

        res.status(200).json({message:" email  verfied successfully"})



    }catch(error){
        console.error(error.message)

        res.status(500).send('Server error')
    }
}

module.exports = {
    registerUser,
    userLogin,
    verifyEmail
};