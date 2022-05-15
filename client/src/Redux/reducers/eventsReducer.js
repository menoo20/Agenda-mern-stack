



const initialValue = {
    id: "",
    start: "",
    end: "",
    describe: ""
}


const EventReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_EVENT":

    return action.payload
   
    default:
        return state
}
}

export default EventReducer