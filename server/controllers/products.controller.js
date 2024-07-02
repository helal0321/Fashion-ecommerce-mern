const Product=require("../models/product.model.js")
const Error=require("../utils/errorHandler.js")
const uploadCloudinary=require("../utils/uploadToCloudinary.js")
const cloudinaryDelete=require("../utils/deleteFromCloudinary.js")
const cloudinaryUpdate=require("../utils/updateCloudinary.js")


const getProducts=async(req,res,next)=>{
    try{
        const products= await Product.find()
        
        res.status(200).json({status:"sucess",data:products})
    }
    catch(error){
       
    }

}

const getProduct=async(req,res,next)=>{
    try{
        const {productId}=req.params
        const product= await Product.findOne({_id:productId})
        if(!product){
           return next(Error(501,"product not found"))
        }
        res.status(200).json({status:"sucess",data:product})
    }
    catch(error){
        next(Error(501,error.message))
    }
}

const createProduct=async(req,res,next)=>{
    try{
    const {title,description,price,category}=req.body
    
    const images= await uploadCloudinary(req.files)

    const product= await Product.create({
        title,
        description,
        price,
        category,
        images:JSON.stringify(images)

        
    })
    
    res.status(200).json({status:"sucess",data:product})
}
    catch(error){
        next(Error(501,error.message))
    }
}

const updateProduct=async(req,res,next)=>{
    try{
        const {productId}=req.params
        const {title,description,price,category}=req.body
        const prevImages=await Product.findOne({_id:productId},{_id:0,images:1},)
        updatedImages=await cloudinaryUpdate(prevImages.images,req.files)
        const product= await Product.findByIdAndUpdate(productId,{title,description,price,category,images:JSON.stringify(updatedImages)},{new:true})
        if(!product){
            return next(Error(501,"product not found"))
         }
         res.status(200).json({status:"sucess",data:product})
        
    }
    catch(error){
        next(Error(501,error.message))
    }
    

}

const deleteProduct=async(req,res,next)=>{
    try{
    const {productId}=req.params
    const product= await Product.findByIdAndDelete(productId)
    if(!product){
        return next(Error(501,"product not found"))
     }
     cloudinaryDelete(product.images)
     

     res.status(200).json({status:"sucess",data:product})
    }
    catch(error){
        next(Error(501,error.message))
    }
    
}

const searchProducts=async(req,res,next)=>{
    try{
    const searchItem=req.query.q
    const products= await Product.find({title:{$regex:searchItem,$options:'i'}})
    res.status(200).json({status:"sucess",data:products})
    }
    catch(error){
        next(Error(501,error.message))
    }
}

const getCategories=(req,res,next)=>{
    res.status(200).json({status:"sucess",data:{categories:["men","women","acessoires","jewelery"]}})
}

const getProductsOfCategory=async(req,res,next)=>{
    try{
    const {category}=req.params
    const products= await Product.find({category})
    if(!products){
        next(Error(401,"no products found"))
    }
    res.status(200).json({status:"sucess",data:products})
}
catch(error){
    next(Error(501,error.message))
}

}

module.exports={getProducts,createProduct,getProduct,updateProduct,deleteProduct,searchProducts,getCategories,getProductsOfCategory}