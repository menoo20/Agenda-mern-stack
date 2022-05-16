



const initialValue = []


const EventsReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_EVENTS":
    return action.payload
   
    default:
        return state
}
}

export default EventsReducer