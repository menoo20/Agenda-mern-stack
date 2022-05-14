const router = require("express").Router();
const {verifyTokenAndAuthorize, verifyTokenAndAdmin} = require("../middlewares/authorizeToken");
const Cart = require("../models/Cart");

router.post("/", async(req, res)=>{
    const newCart = await new Cart(req.body)
 
    try{
       await newCart.save((err, cart)=>{
            if(err){
                res.status(500).json(err);
            }else{
                res.status(200).json(cart)
            }
        })
    }catch(err){
        res.status(500).json(err)
    }


})



router.put("/:id",verifyTokenAndAuthorize, async (req, res)=>{
  Cart.findByIdAndUpdate(req.params.id,
        {
        $set: req.body,
    }
    , {new: true}).then((docs)=>{
        if(docs){
            res.status(200).json(docs)
        }else{
            res.status(500).json("something went wrong")
        }
    })
})

router.delete("/:id", verifyTokenAndAuthorize, async(req, res)=>{
    const id = req.params.id;
    try{
        await Cart.findByIdAndRemove(id)
        res.status(200).json("cart has been deleted");
    }catch(err){
        res.json("something wrond happend")
    }

})

router.get("/find/:userId", async(req, res)=>{
    const userId = req.params.userId;
    try{
        const cart = await Cart.findOne({userId})
        return res.status(200).json(cart) 
    }catch(err){
        res.status(500).json("something wrond happend")
    }
})

router.get("/", async(req, res)=>{
    try{
          const carts = await Cart.find();
          res.status(200).json(carts)
    }catch(err){
        res.status(500).json("something wrond happend")
    }
});

module.exports = router