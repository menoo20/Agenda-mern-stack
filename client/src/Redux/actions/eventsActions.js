
import { event } from "../Axios/event"


export const showEvent = (event)=>{
    return{
        type: "SHOW_EVENT",
        payload: event
    }
}

export const ShowEventApi = id => async dispatch => {
     
    //i won't get the event from redux store as it is safer to
    //keep updated with db.
    const result = await event.get("/", {id});

    try{
        await dispatch(showEvent(result.data))
    }catch(err){
         const error =await err.data.message;
         return error
    }
}

