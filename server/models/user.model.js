const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    userName:{
        type:String,
        required:[true,"username is required"],
    },
    email:{
        type:String,
        required:[true,"email is required"],
        
        unique: true
        
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minLength:4
    },
    verified:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        required:true,
        enum:["client","admin"],
        default:"client"
    }

},{timestamps:true})

module.exports=mongoose.model("user",userSchema)
