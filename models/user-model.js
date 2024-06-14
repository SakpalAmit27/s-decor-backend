// creating a user-schema model which will be used for validation , verification etc purposes // 

const mongoose = require('mongoose')

// creating the schema model // 

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String, 
        // to add with message // 
        required:[true,"email is required"],
        unique:true
        
    }
})