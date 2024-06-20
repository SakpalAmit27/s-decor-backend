// a controller for user profile management  eg : getting the user profile //// 

// important things getting the user-model ..//

const User = require('../models/user-model')

const getUserProfile = async (req,res) => {

    // first lets check the user if he is actually existing or not // 

    // this time we are finding with password // 

    try{
        const user = await User.findOne(req.body).select('-password')

        // if he does not exist // 

        if(!user){
            res.status(404).json({message:"user not found"})
        }
        // if he does and validation is success show the user in json for frontend // 

        res.json(user)
    }catch(error){
        console.error(message.error);
        res.status(500).send('Server error')
    }
}
