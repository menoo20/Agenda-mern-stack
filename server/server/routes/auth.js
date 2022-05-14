const router = require("express").Router();
const User = require("../models/User");
const uploadedImg = require("../utils/singleImgUpload")
const handleError = require("../utils/UserErrors");
const createToken = require("../utils/createJwtToken")
const validate = require("validator")
const {verifyTokenAndAuthorize} = require("../middlewares/authorizeToken");
const { findOne } = require("../models/User");

//registering a new user
router.post("/register", async (req,res)=>{
    
    const {fName, lName, password, email, avatar, username} = req.body.data;
    let uploadedImage
    try{   
         if(avatar){
         uploadedImage = await uploadedImg(avatar, username, res, folder="User_Avatar")
         }
     
        //creating a new user to save in the mongodb
        const newUser = new User({
            username: username,
            avatar :  uploadedImage? uploadedImage.public_id : "",
            fName: fName,
            lName: lName,
            email: email,
            password: password
        })

           //handlePassword
           if(!password){
            const invalidPassword = {
                password: "Please Enter your Password"
            }  
            handleError(invalidPassword, res)
            return;
          }
          if(password){
            
            const validPassword =  validate.isStrongPassword(password, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})
            if(validPassword){
  
            }else{
              
              const invalidPassword = {
                  password: "Password must be 8 charts min length, 1 symbols, 1 uppercase, lowercase and 1 numbers"
              }
              handleError(invalidPassword, res)
              return
            }
          }

        


        // Call setPassword function to hash password 
        newUser.setPassword(password); 


        //save the user to the mongodb
        const savedUser = await newUser.save((err, user)=>{
            if(err){
                handleError(err, res, password)
            }else{

                const accessToken = createToken(user._id, user.isAdmin)
                return  res.status(200).json({
                    user :{
                        avatar :user.avatar,
                        username: user.username,
                        isAdmin: user.isAdmin,
                        email: user.email,
                        id: user._id
                    },
                    accessToken,
                    successfulRegister: `Congratulations. You are now Logged In as ${user.username}`
                })
            }
            });
        
        
    }catch(err){
            // handleError(err, res)
            console.log(err)

    }
})


// User login api 
router.post('/login', async(req, res) => { 
    const {email, password} = req.body.data;
    if(!password){
       return res.status(500).json({
            message: "please enter the password"
        })
    }
    // Find user with requested email 
    const user = await User.findOne({email}, function(err, user){
        if(user === null){
            return res.status(400).json({
                message: "User was not found. Please enter a valid email"
            })
        }

    }).clone()

    const checkPass = await user.validPassword(password);
    if(checkPass){
       const  {hash, salt, fName, lName,createdAt, updatedAt, isAdmin, ...others} = user._doc;
       const accessToken = createToken(user._id, user.isAdmin)
       return res.status(200).json({
           ...others,
           accessToken
       })
    }else{
        return res.status(500).json({
            message: "wrong email or passowrd. Please Try again"
        })
    }
}); 



module.exports = router;


