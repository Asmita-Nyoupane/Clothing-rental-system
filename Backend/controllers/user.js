 const User = require('../models/User')
 
 const signupUser= async (req,res)=>{
    try {
        const user = req.body;
        const  newUser = new User(user);
        await newUser.save();
        return res.status(200).json({msg: "Signup successfull"})
    } catch (error) {
        return res.status(500).json({msg:"Error while signup the user "})
    }

}
module.exports = signupUser;