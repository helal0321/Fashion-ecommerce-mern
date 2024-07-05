const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage=multer.diskStorage({
  filename:function(req,file,cb){
    cb(null,file.originalname)
  }
})
const upload = multer({ storage });
module.exports=upload
