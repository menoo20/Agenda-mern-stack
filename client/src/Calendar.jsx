import React , { useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "react-datepicker/dist/react-datepicker.css";
import Popping from './Popping'
import myEventsList from "./api/Events"
import showEventApi from "./Redux/actions"

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})





const MyCalendar = props => {
    const [open, setOpen] = useState(false);

    const handledEvent = (e)=>{
        console.log(e)
         setOpen(!open)
    }
    return (
    <div>
        <Popping open={open} handleClick={handledEvent}/>
        <Calendar
            localizer={localizer}
            events={props.events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 , margin: 50, fontFamily: 'Patrick Hand' }}
            onSelectEvent={handledEvent}
        />
    </div>
        
    )
}



export default MyCalendar