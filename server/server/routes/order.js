const router = require("express").Router();
const {verifyTokenAndAuthorize, verifyTokenAndAdmin} = require("../middlewares/authorizeToken");
const Order = require("../models/Order");

router.post("/", async(req, res)=>{
    const newOrder = await new Order(req.body)
 
    try{
       await newOrder.save((err, order)=>{
            if(err){
                res.status(500).json(err);
            }else{
                res.status(200).json(order)
            }
        })
    }catch(err){
        res.status(500).json(err)
    }


})



router.put("/:id",verifyTokenAndAdmin, async (req, res)=>{
  Order.findByIdAndUpdate(req.params.id,
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

router.delete("/:id", verifyTokenAndAdmin, async(req, res)=>{
    const id = req.params.id;
    try{
        await Order.findByIdAndRemove(id)
        res.status(200).json("order has been deleted");
    }catch(err){
        res.json("something wrond happend")
    }

})

router.get("/find/:userId", async(req, res)=>{
    const userId = req.params.userId;
    try{
        const orders = await Order.find({userId})
        return res.status(200).json(orders) 
    }catch(err){
        res.status(500).json("something wrond happend")
    }
})

router.get("/", verifyTokenAndAdmin, async(req, res)=>{
    try{
          const orders = await Order.find();
          res.status(200).json(orders)
    }catch(err){
        res.status(500).json("something wrond happend")
    }
});

//Get Monthly Income

router.get("/income", verifyTokenAndAdmin, async(req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth -1))
    const monthBeforeLastOner = new Date(new Date().setMonth(lastMonth.getMonth -1));

    try{
        const monthlyIncome = Order.aggregate([
        {$match: {createdAt: {$gte : monthBeforeLastOner}}},
        {
            $project:{
              month:{ $month: "$createdAt" },
              sales: "$amount",
            }},
            {
                $group:{
                   _id: "$month",
                   total: {$sum: "$sales"}
                }
            }
        
        ])
        res.status(200).json(monthlyIncome)
    }catch(err){
        res.status(500).json(`something went wrong, ${err}`)
    }
})

module.exports = router