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
})