const router = require("express").Router();
const Event = require("../models/Event");



router.get("/", async(req, res)=>{

    const events = await Event.find({});
 
    try{
       
       res.status(200).json(events)

      
    }catch(err){
        res.json("something wrond happend")
    }
});



router.post("/", async(req, res)=>{
        console.log(req.body)
   
        const newEvent = await new Event(req.body)
     
        try{
           await newEvent.save((err, event)=>{
                if(err){
                    console.log(err)
                    res.json(err)
                    // handleProductError(err, res)
                }else{
                    res.status(200).json(event)
                }
            })
        }catch(err){
            handleProductError(err, res)
        }
    }
)



// router.put("/:id", async (req, res)=>{
//   Product.findByIdAndUpdate(req.params.id,
//         {
//         $set: req.body,
//     }
//     , {new: true}).then((docs)=>{
//         if(docs){
//             res.status(200).json(docs)
//         }else{
//             res.status(500).json("something went wrong")
//         }
//     })
// })

// router.delete("/:id", async(req, res)=>{
//     const id = req.params.id;
//     try{
//         await Product.findByIdAndRemove(id)
//         res.status(200).json("product has been deleted");
//     }catch(err){
//         res.json("something wrond happend")
//     }

// })

// router.get("/find/:id", async(req, res)=>{
//     const id = req.params.id;
//     try{
//         const product = await Product.findById(id)
//         return res.status(201).json(product) 
//     }catch(err){
//         res.json("something wrond happend")
//     }




module.exports = router