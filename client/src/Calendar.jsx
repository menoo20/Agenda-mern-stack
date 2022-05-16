import React , { useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Popping from './Popping';
import {ShowEventApi} from "./Redux/actions"
import { connect } from 'react-redux'

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





const MyCalendar = ({events, ShowEventApi}) => {
    const [open, setOpen] = useState(false);

    const handledEvent = (e, event)=>{
         setOpen(!open)
         ShowEventApi( event.id);
         return;
    }
    return (
    <div>
        <Popping open={open} handleClick={handledEvent}/>
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 , margin: 50, fontFamily: 'Patrick Hand' }}
            onSelectEvent={handledEvent}
        />
    </div>
        
    )
}

function mapStateToProps({event, events}){
  return{
    event,
    events
  }
}

export default connect(mapStateToProps, {ShowEventApi})(MyCalendar)