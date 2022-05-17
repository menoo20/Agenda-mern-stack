
const initialValue = {
    id: "",
    start: "",
    end: "",
    describe: ""
}


const EventReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_EVENT":
    console.log("event as appearing in the reduce: ", action.payload)
    return action.payload
    
    // case "UPDATE_EVENT":
    // return action.payload

    case "DELETE_EVENT":
        return initialValue
    case "CLOSE_EVENT":
        console.log("event is closed")
        return initialValue
    default:
        return state
}
}

export default EventReducer