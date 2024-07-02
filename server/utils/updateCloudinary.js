const cloudinaryDelete=require("./deleteFromCloudinary.js")
const uploadCloudinary=require("./uploadToCloudinary.js")

const cloudinaryUpdate=async(prevFiles,currentFilles)=>{
    
         await cloudinaryDelete(prevFiles)
        let files= await uploadCloudinary(currentFilles)
    

   return files

}
module.exports=cloudinaryUpdate