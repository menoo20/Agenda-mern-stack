
import { event } from "../Axios/event"


export const showEvent = (event)=>{
    return{
        type: "SHOW_EVENT",
        payload: event
    }
}

export const showEvents = (events)=>{
    return{
        type: "SHOW_EVENTS",
        payload: events
    }
}

export const ShowEventApi = id => async dispatch => {
     
    //i won't get the event from redux store as it is safer to
    //keep updated with db.
    const result = await event.get(`/${id}/show`);

    try{
        const {title, _id, start, end} = await result.data;
        const convertedEvent = {
            title,
            id: _id,
            start: new Date(start).toLocaleDateString(),
            end: new Date(end).toLocaleDateString()
        }
        console.log("convertedEvent is:" , convertedEvent)
        await dispatch(showEvent(convertedEvent))
    }catch(err){
         const error =await err.data.message;
         return error
    }
}

export const ShowEventsApi = () => async dispatch => {
     
    //i won't get the event from redux store as it is safer to
    //keep updated with db.
    const result = await event.get("/");

    try{
        const convertedDates = await result.data.map(event=>{
            return{
              title: event.title,
              start: new Date(event.start).toLocaleDateString() ,
              end: new Date(event.end).toLocaleDateString() ,
              id: event._id,
              describe: event.describe
            }
          })
        await dispatch(showEvents(convertedDates))
    }catch(err){
         const error =await err.data.message;
         return error
    }
}

