const router = require("express").Router();
const { verifyTokenAndAdmin, verifyTokenAndAuthorize} = require("../middlewares/authorizeToken");
const review = require("../models/Review");
const Product = require("../models/Product");


router.post("/:userId/:productId/addReview", (req,res) =>{
    const {userId, productId} = req.params;
    console.log(userId, productId)


})

router.post("/", verifyTokenAndAuthorize, async(req, res)=>{
    
    const newreview = await new review(req.body)
 
    try{
       await newreview.save((err, review)=>{
            if(err){
                res.status(500).json(err);
            }else{
                res.status(200).json(review)
            }
        })
    }catch(err){
        res.status(500).json(err)
    }


})



router.put("/:id", verifyTokenAndAdmin, async (req, res)=>{
  review.findByIdAndUpdate(req.params.id,
        {
        $set: req.body,
    }
    , {new: true}).then((docs)=>{
        if(docs){
            res.status(200).json(docs)
        }else{
            res.status(500).json("review was not updated")
        }
    })
})

router.delete("/:id", verifyTokenAndAdmin, async(req, res)=>{
    const id = req.params.id;
    try{
        await review.findByIdAndRemove(id)
        res.status(200).json("product has been deleted");
    }catch(err){
        res.json("something wrond happend")
    }

})

router.get("/find/:id", async(req, res)=>{
    const id = req.params.id;
    try{
        const review = await review.findById(id)
        return res.status(201).json(review) 
    }catch(err){
        res.json("something wrond happend")
    }
})

router.get("/", async(req, res)=>{
    try{
        if(req.query.featured){
            const reviews = await review.find({featured: true}).limit(3)
            return res.status(200).json(reviews);
        }
      
        const reviews = await review.find();
        console.log(reviews);
        res.status(200).json(reviews)
    }catch(err){
        res.json("something wrond happend")
    }

});




module.exports = router