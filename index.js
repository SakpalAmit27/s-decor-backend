// setting up index js main entry point // 


//express / /

const express = require('express')
// env for data hide //
const dotenv = require('dotenv')

// cors for client // 

const cors = require('cors')

// adding our connectdb 

const connectDb = require('./config/database')

// using the env congig 

dotenv.config();

// calling our connectDb to connect to database // 

connectDb();

// intializing express / /

const app = express();

// using cors // 

app.use(cors())

// using express json for frontned outputs // 

app.use(express.json());

// adding our port for server // 

const PORT = process.env.PORT 

app.listen(PORT , ()=> {
    console.log(`server is listening on port : ${PORT}`)
})

