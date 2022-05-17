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

router.get("/:id/show", async(req, res)=>{
    const id =   req.params.id
    const event = await Event.findById(id);
 
    try{
       res.status(200).json(event)

      
    }catch(err){
        res.json("couldn't fetch event")
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
                }else{
                    res.status(200).json(event)
                }
            })
        }catch(err){
            handleProductError(err, res)
        }
    }
)



router.put("/:id", async (req, res)=>{
  Event.findByIdAndUpdate(req.params.id,
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

router.delete("/:id/delete", async(req, res)=>{
    const id = req.params.id;
    try{
        await Event.findByIdAndRemove(id)
        res.status(200).json("Event has been deleted");
    }catch(err){
        res.json(err)
    }

})




module.exports = router