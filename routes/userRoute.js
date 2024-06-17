// lets create route for user signup login , verification etc / 

const express = require('express')


// intializing the router with express // 

const router = express.Router();

// importing our usermodel // 

const User = require('../config/database')

// bcrypt for hashing // 

const bcrypt = require('bcryptjs')

// jsonwebtoken // 

const jwt = require('jsonwebtoken')

// lets first register the user // 

router.post('/register',async(req,res) => {
    // the validate it takes
    // the req body retrives the data from user and requests //
    const {name , email , password} = req.body

    // first lets check if user exits or not 

    try{
        // lets intialize the user 
        // we will check with email if user is already registered or not //
        let user = User.findOne({email})

        if(user){
            return res.status(400).json({message:"User already exists , please login"})
        }

        // and he is new , for registering hash the password

        // lets store it in variable 

        const hashedPassword = await bcrypt.hash(password,10);
        

        // after the following create the user // 

        user = new User({
            name,
            email,
            password:hashedPassword
        })

        await user.save()

        res.status(200).json({message:"User registered succesfully"})

    }catch(error){
        // if something happens then // 
        console.log(error.message)
        res.status(500).send('server error')
    }
});

// after register we will go for login //

router.post('/login', async(req,res) => {
    // for login ..// 
    const {email,password} = req.body

    // check if user exists // 

    try{
        let user = await User.findOne({email})
        // if there is an error in password or email , no user //

        if(!user){
            return res.status(400).json({message : "invalid email or password please try again"})
        }

        // matching the password , if it doesnt match pass error 

        const isMatch = bcrypt.compare(password,user.password)

        // if isMatch fails pass error // 

        if(!isMatch){
            return res.status(400).json({message:"invalid email or password please try again"})
        }
        // then if correct else generate the jwt token // 

        const token = jwt.sign({userId:user._id},

            process.env.JWT_SECRET ,{expiresIn:'1h'})

            res.status(200).json({token})
    }
    catch(error){
        console.error(error.message)

        res.status(500).send('Server error');
    }


})

// verifiying the email 

