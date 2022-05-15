
import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";

const rootReducer = combineReducers({
    user: AuthReducer ,
}) 

export default rootReducer;

