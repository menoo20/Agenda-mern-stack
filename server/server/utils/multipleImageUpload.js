const Cloudinary = require("./cloudinary");
const handleProductError = require("./productErrors");



// error handling memo
// if (error.message?.includes("Image") || error.message?.includes("An unknown file format")){
//     SchemaErrors.image = ("Please Insert a supported Image format")
// }
/////////////////

async function uploadedImgs  (images, title,  res){
if(!images){
    Error("please insert at least 1 image")
  //  handleProductError(Failure, res)
}else{
const uploadedImgs = images.map(async image=>{
 const upload =  await Cloudinary.uploader.upload(image,
      { 
        upload_preset: 'unsigned_upload',
        folder: "prodcuts",
        allowed_formats : ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
    }, 
      function(error, result) {
          if(error){
              console.log(error)
              // res.status(500).json("no such file or directory exists")
              handleProductError(error,res)
              return;
          }else{
            return result
          }
           });
           return upload
})

try{
  if(uploadedImgs){
    const fulfilled = await Promise.all(uploadedImgs).then(values=> {return values})
    const publicIds =  fulfilled.map(image=>{
        return image.public_id
    })
    console.log(publicIds)
    return publicIds
  }
}catch(err){
  // handleProductError(err, res)
}}
}

module.exports = uploadedImgs