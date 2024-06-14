// creating a user-schema model which will be used for validation , verification etc purposes // 

const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')
const { default: isEmail } = require('validator/lib/isEmail')

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
        unique:true,
        // validating the email // 
        validate:{
            validator:validator.isEmail,
            message:"please enter an valid email"
        }
        
        
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    // adding is user verified or not // 
    isVerified:{
        type:boolean,
        default:false,

    },
    // a token for each user // 
    isVerfiedToken:{
        type:String
    }

},{
    Timestamp:true
})
// lets create our schema model 

const Usermodel = mongoose.model('Usermodel',UserSchema);

// exporting our Usermodel // 
module.exports = Usermodel

// adding route after this // 