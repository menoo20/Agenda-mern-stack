//handle errors function
const handleProductError = (error, res, )=> {
    //Errors Schema
    const SchemaErrors = {title: '', desc: '', categories: '', price: '', unit: '', images: ''}

    // Image Upload Failure
    if (error.message?.includes("Image") || error.message?.includes("An unknown file format")){
        SchemaErrors.images = ("Please Insert a supported Image format/source")
    }
    if (error.message?.includes("Resource")){
        SchemaErrors.images = ("Resource not found")
        return res.status(500).json(SchemaErrors);
    }
    // schema validation errors
    if(error.errors){
        Object.values(error.errors).forEach(error=>{
            SchemaErrors[error.properties.path] = error.properties.message
        })
        return res.status(500).json(SchemaErrors);
    }

    //Duplicate Errors
    else if(error.code == 11000){
      console.log(error)
      SchemaErrors[Object.keys(error.keyPattern)[0]] = `This is a duplicate ${Object.keys(error.keyPattern)[0]}. please enter a new one`
      return res.status(500).json(SchemaErrors);
    }else{
        // return res.status(500).json("make sure your image format and source are correct")
    }
   }


 module.exports = handleProductError;