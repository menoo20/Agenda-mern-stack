



const initialValue = null


const AuthReducer = (state=initialValue, action)=>{

    switch (action.type) {
    case "LOGIN":

    return action.payload
    case "REGISTER":
    return action.payload

    case "LOGOUT": 
    return initialValue
    default:
        return state
}
}

export default AuthReducer