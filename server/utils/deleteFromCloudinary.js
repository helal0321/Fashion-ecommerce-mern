const cloudinary=require("cloudinary")
const cloudinaryDelete=(images)=>{
    let imagesFileName=[]
    JSON.parse(images).map((image)=>{
       imagesFileName.push(image.displayName)
    })
    cloudinary.api.delete_resources(imagesFileName, 
            { type: 'upload', resource_type: 'image' })
            .then((result)=>{
                console.log(result)
            });
}

module.exports=cloudinaryDelete