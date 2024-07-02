const mongoose=require("mongoose")
const productSchema=mongoose.Schema({
    title:{
        type:String,
        required:[true,"title is required"],
    },
    description:{
        type:String,
        required:[true,"description is required"],
        
    },
    price:{
        type:String,
        required:[true,"price is required"]
    },
    category:{
        type:String,
        required:[true,"category is required"]
    },
    images:{
        type:String,
        
    }

},{timestamps:true})

module.exports=mongoose.model("product",productSchema)