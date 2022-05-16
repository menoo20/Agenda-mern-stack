import MyCalendar from "./Calendar";
import "./style/global.scss"
import { useEffect, useState } from "react";
import AddEvents from "./AddEvents";
import { connect } from "react-redux";
import {ShowEventsApi} from "./Redux/actions"


function App({ShowEventsApi}) {
 

  useEffect(()=>{
    ShowEventsApi()
  },[])
  
  return (
    <>
      <AddEvents/>
      <MyCalendar/>
    </>
  );
}

function mapStateToProps({event}){
  return{
    event
  }
}

export default connect(mapStateToProps, {ShowEventsApi})(App)