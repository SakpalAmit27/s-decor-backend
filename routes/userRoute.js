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