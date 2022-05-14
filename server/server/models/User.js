const mongoose = require("mongoose");
var crypto = require('crypto');
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    fName:{type: String,
           required: [true, 'Please enter Your first name']
           },
    lName:{type: String},
    avatar: {type: String},
    username: {type: String,
               required: [true, 'Please Enter Your Username'],
               minlength: 2, 
               unique: [true, 'This username was used before.Please Use a unique username']},
    email: {type: String,
            required: [true, 'Please Enter an Email'],
            unique: [true, 'This email was used before. Please Use a unique email'],
            validate: [validator.isEmail, 'Please Enter a Valid Email With @ and .']
         },
    hash : String, 
    salt : String ,
    isAdmin: {
        type: Boolean, 
        default: false
    }
}, {timestamps: true})


UserSchema.methods.setPassword = function(password) { 

     
    // Creating a unique salt for a particular user 
       this.salt = crypto.randomBytes(16).toString('hex'); 
       // Hashing user's salt and password with 1000 iterations, 
        
       this.hash = crypto.pbkdf2Sync(password, this.salt,  
       1000, 64, `sha512`).toString(`hex`); 
   }; 
     
   // Method to check the entered password is correct or not 
   UserSchema.methods.validPassword = function(password) { 
       var hash = crypto.pbkdf2Sync(password,  
       this.salt, 1000, 64, `sha512`).toString(`hex`); 
       return this.hash === hash; 
   }; 

module.exports = mongoose.model("User", UserSchema)