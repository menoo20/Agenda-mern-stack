


export const addError= (error)=>{
    return{
        type: "ADD_ERROR",
        payload: error
    }
}

export const removeError = _=> {return {type:"REMOVE_ERROR"}}