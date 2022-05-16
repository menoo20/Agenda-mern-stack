import {Navigate, Route, Routes} from "react-router-dom"
import MyCalendar from "./Calendar";
import "../style/global.scss"
import { useEffect, useState } from "react";
import AddEvents from "./AddEvents";
import { connect } from "react-redux";
import {ShowEventsApi} from "../Redux/actions"


function App({ShowEventsApi}) {
 

  useEffect(()=>{
    ShowEventsApi()
  },[])
  
  return (
    <>
    <Routes>
      <Route  path="/" exact element={<MyCalendar/>} />
      {/* <Route path="/event/:id/update" element={<ProductDetails/>}/> */}
      <Route path="/events/add" element={<AddEvents/>}/>
    </Routes>
    </>
  );
}

function mapStateToProps({event}){
  return{
    event
  }
}

export default connect(mapStateToProps, {ShowEventsApi})(App)