
import { combineReducers } from "redux";
import EventReducer from "./eventReducer";
import EventsReducer from "./eventsReducer";

const rootReducer = combineReducers({
    event: EventReducer ,
    events: EventsReducer
}) 

export default rootReducer;

