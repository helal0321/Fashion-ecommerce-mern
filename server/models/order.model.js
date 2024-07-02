const mongoose=require("mongoose")
const orderSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        
    },
    firstName:{
        type:String,
      
    },
    lastName:{
        type:String,
        
    },
    email:{
        type:String,
        
    },
    phoneNumber:{
        type:String,
        
    },

    city:{
        type:String,
        
    },
    address:{
        type:String,
        
    },
    products:{
        type:String,
        
        
    },
    totalPrice:{
        type:String,
        
        
    },
    currency:{
        type:String,
        
        
    },
    
    paymentId:{
        type:String,
       
    },
    payerId:{
        type:String,
        
    },
    paymentEmail:{
        type:String,
        
    }

},{timestamps:true})

module.exports=mongoose.model("order",orderSchema)