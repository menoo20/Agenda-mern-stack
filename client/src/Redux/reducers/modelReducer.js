const initialValue = false


const modalReducer = (state=initialValue, action)=>{

    switch (action.type) {
    
    case "OPEN_MODAL":
        console.log("action status in the reducer",action.payload)
    return action.payload
    
    case "CLOSE_MODAL":
        console.log("action status in the reducer",action.payload)
    return action.payload

    default:
        return state
}
}

export default modalReducer