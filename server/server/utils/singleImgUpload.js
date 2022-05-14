const Cloudinary = require("./cloudinary")
const handleError = require("./UserErrors")

async function uploadedImg  (avatar, username, res, folder){
  const uploaded =   await Cloudinary.uploader.upload(avatar,{
        upload_preset: 'unsigned_upload',
        public_id: `${username}avatar`,
        folder: folder,
        allowed_formats : ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp']
    },function(error, result){
        if(error){
            handleError(error, res)
        }else{  }
    });

    return uploaded
}

module.exports = uploadedImg;
  
