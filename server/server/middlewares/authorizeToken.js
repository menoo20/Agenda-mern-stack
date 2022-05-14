const jwt = require("jsonwebtoken");
var crypto = require('crypto');

// const checkUseronRefresh = (req,res, next)=>{

// } 


const verifyToken = (req,res, next)=>{
    const authHeader = req.headers.token 
    if(authHeader){
        const token = authHeader.split(" ")[1];
       jwt.verify(token, process.env.USER_TOKEN_SECRET, (err, user)=>{
           if(err) res.status(403).json("user is not valid");
               req.user = user;
               next();
       })
       
    }else{
        return res.status(401).json("You are Not Authinticated");
    }
}

const verifyTokenAndAuthorize = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are not allowed to do this")
        }
    })
}

const verifyTokenAndAdmin = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are not allowed to do this")
        }
    })
}

module.exports = {verifyTokenAndAuthorize, verifyTokenAndAdmin}