const { ObjectId } = require("mongodb")
const mongoose=require("mongoose")
const cartSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true
    },
    amount:{
        type:Number,
        required:true,
        default:1



    }

},{timestamps:true})

module.exports=mongoose.model("cart",cartSchema)