
import { combineReducers } from "redux";
import EventReducer from "./eventReducer";
import EventsReducer from "./eventsReducer";
import modalReducer from "./modelReducer"

const rootReducer = combineReducers({
    event: EventReducer ,
    events: EventsReducer,
    modalStatus: modalReducer
}) 

export default rootReducer;

