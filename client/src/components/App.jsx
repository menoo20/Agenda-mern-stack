import {Navigate, Route, Routes} from "react-router-dom"
import MyCalendar from "./Calendar";
import "../style/global.scss"
import { useEffect, useState } from "react";
import AddEvents from "./AddEvents";
import { connect } from "react-redux";
import {ShowEventsApi} from "../Redux/actions"
import UpdateEvent from "./UpdateEvent";


function App({ShowEventsApi, events}) {
 

  useEffect(()=>{
    ShowEventsApi()
  },[])
  
  return (
    <>
    <Routes>
      <Route  path="/" exact element={<MyCalendar/>} />
      <Route path="/events/add" element={<AddEvents/>}/>
      <Route path="/event/:id/update" element={<UpdateEvent/>}/>
    </Routes>
    </>
  );
}

function mapStateToProps({events}){
  return{
    events
  }
}

export default connect(mapStateToProps, {ShowEventsApi})(App)