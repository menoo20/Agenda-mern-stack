//handle errors function
const handleError = (error, res, )=> {
    //Errors Schema
    const SchemaErrors = {fName: '', username: '', email: '', password: '', image: ''}
    //passwordError
    if(error.password){
        console.log(error)
        SchemaErrors.password = (error.password)
        return res.status(500).json(SchemaErrors);
    }
    // Image Upload Failure
    if (error.message.includes("Image") || error.message.includes("An unknown file format")){
        SchemaErrors.image = ("Please Insert a supported Image format")
    }

 
    // schema validation errors
    if(error.errors){
        Object.values(error.errors).forEach(error=>{
            SchemaErrors[error.properties.path] = error.properties.message
        })
        return res.status(500).json(SchemaErrors);
    }

    //Duplicate Errors
    if(error.code === 11000){
      console.log(error)
      SchemaErrors[Object.keys(error.keyPattern)[0]] = `This is a duplicate ${Object.keys(error.keyPattern)[0]}. please enter a new one`
      return res.status(500).json(SchemaErrors);
    }
    return res.status(500).json({
        SchemaErrors,
        error
    })
   }


 module.exports = handleError;