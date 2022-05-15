import MyCalendar from "./Calendar";
import "./style/global.scss"
import axios from "axios"
import { useEffect, useState } from "react";
import AddEvents from "./AddEvents";



function App() {
  const [events, getEvents] = useState([]);
 

  useEffect(()=>{
    axios.get("http://localhost:8080/api/events")
    .then(res =>{
      const convertedDates = res.data.map(event=>{
        return{
          title: event.title,
          start: new Date(event.start) ,
          end: new Date(event.end) ,
          id: event._id,
          describe: event.describe
        }
      })
      return convertedDates
    }).then(dates=>{
      getEvents(dates);
    })
  },[])
  
  return (
    <>
      <AddEvents/>
      <MyCalendar events={events}/>
    </>
  );
}

export default App;
