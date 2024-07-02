const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');


cloudinary.config({
  cloud_name: 'dz955gebg',
  api_key: '732733618789238',
  api_secret: 'ocJaA29aDC86lNzRdu8rAtp89lo'
});

// const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: 'products_upload',
//         allowedFormats: ['jpeg', 'png', 'jpg'],
//     }                                                              
// }); 
const storage=multer.diskStorage({
  filename:function(req,file,cb){
    cb(null,file.originalname)
  }
})
const upload = multer({ storage });
module.exports=upload