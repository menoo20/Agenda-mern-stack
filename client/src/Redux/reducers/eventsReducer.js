const initialValue = []


const EventsReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "SHOW_EVENTS":
    return action.payload
    case "ADD_EVENT":
    return [
        ...state,
        action.payload
    ]
    default:
        return state
}
}

export default EventsReducer