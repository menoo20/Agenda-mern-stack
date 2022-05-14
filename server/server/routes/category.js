const router = require("express").Router();
const { verifyTokenAndAdmin} = require("../middlewares/authorizeToken");
const Category = require("../models/Category");
const Product = require("../models/Product");

router.post("/", verifyTokenAndAdmin, async(req, res)=>{
    const newCategory = await new Category(req.body)
 
    try{
       await newCategory.save((err, category)=>{
            if(err){
                res.status(500).json(err);
            }else{
                res.status(200).json(category)
            }
        })
    }catch(err){
        res.status(500).json(err)
    }


})



router.put("/:id", verifyTokenAndAdmin, async (req, res)=>{
  Category.findByIdAndUpdate(req.params.id,
        {
        $set: req.body,
    }
    , {new: true}).then((docs)=>{
        if(docs){
            res.status(200).json(docs)
        }else{
            res.status(500).json("Category was not updated")
        }
    })
})

router.delete("/:id", verifyTokenAndAdmin, async(req, res)=>{
    const id = req.params.id;
    try{
        await Category.findByIdAndRemove(id)
        res.status(200).json("product has been deleted");
    }catch(err){
        res.json("something wrond happend")
    }

})

router.get("/find/:id", async(req, res)=>{
    const id = req.params.id;
    try{
        const category = await Category.findById(id)
        return res.status(201).json(category) 
    }catch(err){
        res.json("something wrond happend")
    }
})

router.get("/", async(req, res)=>{
    try{
        if(req.query.featured){
            const categories = await Category.find({featured: true}).limit(3)
            return res.status(200).json(categories);
        }
      
        const categories = await Category.find();
        res.status(200).json(categories)
    }catch(err){
        res.json("something wrond happend")
    }

});




module.exports = router