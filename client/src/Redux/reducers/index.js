
import { combineReducers } from "redux";
import EventReducer from "./eventReducer";

const rootReducer = combineReducers({
    event: EventReducer ,
}) 

export default rootReducer;

