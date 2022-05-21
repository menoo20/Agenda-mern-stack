const router = require("express").Router();
const Event = require("../models/Event");
const handleError = require("../utils/eventErrors")


router.get("/", async(req, res)=>{

    const events = await Event.find({});
 
    try{
       
       res.status(200).json(events)

      
    }catch(err){
        handleError(err, res)
    }
});

router.get("/:id/show", async(req, res)=>{
    const id =   req.params.id
    const event = await Event.findById(id);
 
    try{
       res.status(200).json(event)

      
    }catch(err){
        handleError(err, res)
    }
});



router.post("/", async(req, res)=>{
   
        const newEvent = await new Event(req.body)
     
        try{
           await newEvent.save((err, event)=>{
                if(err){
                    handleError(err, res)
                }else{
                    res.status(200).json(event)
                }
            })
        }catch(err){
            handleError(err, res)
        }
    }
)



router.put("/:id/update", async (req, res)=>{
    const id = req.params.id
     try{
        const event = await Event.findOne({_id : id})
        if(event){
            Object.assign(event, req.body);
             event.save((err, event)=>{
                if(err){
                    handleError(err, res)
                }else{
                    res.status(200).json(event)
                }
        })
    }   
        if(!event){
            res.status(404).json({error: "event is not found"})
        }
     }catch (err){
       console.log(err)
       handleError(err,res)
     }
 



//   const result = await Event.findOneAndUpdate(req.params.id,
//         {
//         $set: req.body,
//     }
//     , {new: true, runValidators: true}).clone()

//     try{
//         res.status(200).json(result)
//     }catch(err){
//         // res.status(500).json(Object.keys(result.errors)[0])
//         console.log(err)
//         res.status(400).json(err)
//     }
    // .then((docs, err)=>{
    //     if(docs){
    //         res.status(200).json(docs)
    //     }else{
    //         console.log(err.errors.path)
    //         handleError(err, res)
    //     }
    // })
})

router.delete("/:id/delete", async(req, res)=>{
    const id = req.params.id;
    try{
        await Event.findByIdAndRemove(id)
        res.status(200).json("Event has been deleted");
    }catch(err){
        handleError(err, res)
    }

})




module.exports = router