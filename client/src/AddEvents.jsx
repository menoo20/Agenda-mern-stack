import React from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import axios from "axios"
import "react-datepicker/dist/react-datepicker.css";


const AddEvents = () => {
    const { register, handleSubmit, formState: {errors}, control } = useForm();
   
     const onSubmit = async(values)=>{
       const result = await axios.post("http://localhost:8080/api/events", {
         title: values.title,
         start: values.start,
         end: values.end,
         
       })
       try{
         console.log(result);
       }catch(err){
         console.log(err.data);
       }
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" align-content-center m-5">
    <div className="mb-3">
      <label htmlFor="title" className="form-label">Event Title</label>
      <input {...register("title")}  type="text" placeholder="title" className="form-control" id="title" aria-describedby="title" />
    </div>
    <div className="mb-3" style={{zIndex: "100"}}>
      <label htmlFor="start" className="form-label">Start Date</label>
      <Controller
    control={control}
    name="start"
    render={({ field }) => (
      <DatePicker
        placeholderText="Select date"
        onChange={(date) => field.onChange(date)}
        selected={field.value}
        showTimeSelect
        timeFormat="HH:mm"
        dateFormat="MMMM d, yyyy h:mm aa"
        className="form-control"
        id="start"
      />
    )}
  />
    </div>
    <div className="mb-3" style={{zIndex: "100"}}>
      <label htmlFor="end" className="form-label">End Date</label>
      <Controller
    control={control}
    name="end"
    render={({ field }) => (
      <DatePicker
        placeholderText="Select end date"
        onChange={(date) => field.onChange(date)}
        selected={field.value}
        timeFormat="HH:mm"
        dateFormat="MMMM d, yyyy h:mm aa"
        showTimeSelect
        className="form-control"
        id="end"
        
      />
    )}
  />
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
  )
}

export default AddEvents