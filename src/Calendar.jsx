import React , { useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
// import DatePicker from "react-datepicker";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "react-datepicker/dist/react-datepicker.css";
import Popping from './Popping'
// import 'react-big-calendar/lib/sass/styles';

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

const myEventsList = [
    {
        title: "go to gym",
        start: new Date(2022,4,14,13,23),
        end: new Date(2022,4,14,14,23),
        describe: "I must play well this time"
    },
    {
        title: "go to a meeting",
        start: new Date(2022,5,0),
        end: new Date(2022,5,0),
        describe: "I must play well this time"
    },
    {
        title: "go to a meeting",
        start: new Date(2022,5,0),
        end: new Date(2022,5,0),
        describe: "I must play well this time"
    },
    {
        title: "go to a meeting",
        start: new Date(2022,5,0),
        end: new Date(2022,5,0),
        describe: "I must play well this time"
    },
    {
        title: "go to a meeting",
        start: new Date(2022,5,0),
        end: new Date(2022,5,0),
        describe: "I must play well this time"
    },
    {
        title: "go to a meeting",
        start: new Date(2022,5,0),
        end: new Date(2022,5,0),
        describe: "I must play well this time"
    },
    {
        title: "go to a meeting",
        start: new Date(2022,5,0),
        end: new Date(2022,5,0),
        describe: "I must play well this time"
    },
    {
        title: "go to a meeting",
        start: new Date(2022,5,0),
        end: new Date(2022,5,0),
        describe: "I must play well this time"
    }
    
]

const handledEvent = (e)=>{
    console.log(e)
     
}

const MyCalendar = props => (
<>
  {/* <DatePick/> */}
  <div>
    
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 , margin: 50 }}
      onSelectEvent={handledEvent}
      views= {{
          month: true,
          day: true,
          agenda: true,
      }}
      messages={{ year: 'year' }}
    />
    
  </div>
</>
)

// const DatePick = ()=>{
//     const [startDate, setStartDate] = useState(new Date());

//     return(
//         <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} />
//     )
// }


export default MyCalendar