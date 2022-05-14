const router = require("express").Router();
const {verifyTokenAndAuthorize, verifyTokenAndAdmin} = require("../middlewares/authorizeToken");
const User = require("../models/User");

router.put("/:id", verifyTokenAndAuthorize, async (req, res)=>{
    // const user = await User.findById(req.params.id)
    
    const updatedUser  = await User.findByIdAndUpdate(req.params.id,{
        $set: req.body
    }, {new: true})

    try{
         if(req.body.password && !updatedUser.validPassword(req.body.password)){
            await updatedUser.setPassword(req.body.password);
            updatedUser.save((err,user)=>{
                if(err) res.status(500).json(err);
                res.status(200).json(user)
            });
        }else{
            res.status(200).json(updatedUser);
        }
       
    }catch{
        res.status(500).json("")
    }
})

router.delete("/:id", verifyTokenAndAuthorize, async(req, res)=>{
    const id = req.params.id;
    try{
        await User.findByIdAndRemove(id)
        res.status(200).json("user has been deleted");
    }catch(err){
        res.json("something wrond happend")
    }

})

router.get("/find/:id", verifyTokenAndAdmin, async(req, res)=>{
    const id = req.params.id;
    try{
        const user = await User.findById(id)
        const {hash, salt, ...others} = user._doc;
        return res.status(201).json({
            ...others,
        }) 
    }catch(err){
        res.json("something wrond happend")
    }
})

router.get("/", verifyTokenAndAdmin, async(req, res)=>{
    try{
        const recentUsers = req.query.new
        const users = recentUsers? await User.find().sort({_id: -1}).limit(2): await User.find()
        return res.status(201).json(users) 
    }catch(err){
        res.json("something wrond happend")
    }

});

router.get("/stats", verifyTokenAndAdmin, async(req, res)=>{
    const date = new Date;
    const lastYear = new Date(date.setFullYear(date.getFullYear() -1 )) ;
    try{
       const userStats = await User.aggregate([
           {$match: {createdAt: { $gte: lastYear}}},
           {
               $project: {
                   month: {$month: "$createdAt"},
                   year: {$year: "$createdAt"},
                   username : "$username"
               }
           },
           {
               $group: {
                   _id: "$month",
                   total: {$sum: 1},
                

               }
           }
       ])
       res.status(200).json(userStats);
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = router