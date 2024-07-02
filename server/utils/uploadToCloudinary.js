const cloudinary=require("cloudinary").v2
const uploadCloudinary=async(files)=>{
    
    let images=[]
     await Promise.all(files.map(async(image)=>{
        let result=await cloudinary.uploader
        .upload(image.path, {
           asset_folder: 'products_upload',
           resource_type: 'image'})
           images.push({url:result.secure_url,displayName:result.display_name} )
         
         }))
     return images
     
}
module.exports=uploadCloudinary