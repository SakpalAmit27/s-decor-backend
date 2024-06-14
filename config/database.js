// lets make a db connection . first importing mongoose // 

const mongoose = require('mongoose')

// for adding PORT // 
require('dotenv').config() 



// making a function to establish connection // 

const connectDb = async () => { 
    // await is necessary as it is connecting to db // 

    try{
        await mongoose.connect(process.env.MONGO_URI)
    
    console.log("connected to db")
    }
    catch(err){
        console.log("error while connecting  : ",err)
        // exiting the connection process // s

        process.exit(1)
    }
}
// exporting our db function //
module.exports = connectDb;