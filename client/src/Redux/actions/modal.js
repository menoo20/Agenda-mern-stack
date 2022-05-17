
export const closeEvent =()=>{
  console.log("you closed the event and removed event state")
    return {
        type: "CLOSE_EVENT"
    }
}

export const  closeModal = ()=>{
  console.log("modal is closed")
   return {
     type: "CLOSE_MODAL",
     payload: false
   }
}

export const  openModal = ()=>{
  console.log("modal is open")
    return {
      type: "OPEN_MODAL",
      payload: true
    }
 }