
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
   
    default:
        return state
}
}

export default EventReducer