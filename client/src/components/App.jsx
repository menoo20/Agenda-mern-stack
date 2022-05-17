import React from "react";
import { Route, Routes, Link} from "react-router-dom"
import MyCalendar from "./Calendar";
import "../style/global.scss"
import AddEvents from "./AddEvents";
import UpdateEvent from "./UpdateEvent";

function App() {


  return (
    <>
    <nav className="navbar navbar-light bg-light">
     
      <div className="container-fluid align-items-center">
        <Link className="navbar-brand ms-2" to="/">
          <h3>Agenda</h3>
        </Link>
        <span className="navbar-brand mb-0 h2 "><Link className="nav-link pe-0 " to={"/events/add"}>Add Event</Link></span>
      </div>

    </nav>
    <Routes>
      <Route  path="/" exact element={<MyCalendar/>} />
      <Route path="/events/add" element={<AddEvents/>}/>
      <Route path="/event/:id/update" element={<UpdateEvent/>}/>
    </Routes>
    </>
  );
}



export default (App)