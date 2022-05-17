
import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import EventReducer from "./eventReducer";
import EventsReducer from "./eventsReducer";
import modalReducer from "./modelReducer"

const rootReducer = combineReducers({
    event: EventReducer ,
    events: EventsReducer,
    modalStatus: modalReducer,
    error: errorReducer
}) 

export default rootReducer;

