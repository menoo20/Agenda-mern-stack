
import { event } from "../Axios/event"
import * as moment from "moment"

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
        const {title, _id, start, end, describe} = await result.data;
        const convertedEvent = {
            title,
            describe,
            id: _id,
            // start: new Date(start).toLocaleString(),
            start: moment(start).format("ddd MM MMM YY LT"),
            end: moment(end).format("ddd MM MMM YY LT")
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
              start: new Date(event.start) ,
              end: new Date(event.end) ,
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


const deleteEvent = (id)=>{
   return {
       type: "DELETE_EVENT",
   }
}

export const deleteEventApi = (id) =>  async dispatch=> {
    const result = await event.delete("/delete", {id})

    try {
        const deleted = await result.data;
        await dispatch(deleteEvent(deleted))
    }catch(err){
        const message = await result.data.message;
        console.log(message)
        return message
    }
}



const addEvent = (newEvent)=>{
    return{
      type: "ADD_EVENT",
      payload: newEvent
    }
}


export const addEventApi = (values) => async dispatch =>{
    const result = await event.post("http://localhost:8080/api/events", {
         title: values.title,
         start: values.start,
         end: values.end,
         describe: values.describe
       })
       try{
         await dispatch(addEvent(result.data))

        }catch(err){
         console.log(err.data);
         
       }
}