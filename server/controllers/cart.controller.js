const cartModel=require("../models/cart.model.js")
const addProductToCart=async(req,res,next)=>{
    try{
    let {userId}=req.user
    let {productId,amount}=req.body
    
    let productFound= await cartModel.findOne({product:productId,userId})
    
    if(productFound){
        cartId=productFound._id
        amount=amount+productFound.amount
        productUpdate=await cartModel.findByIdAndUpdate(cartId,{$set:{amount}},{ new: true, runValidators: true })
        return res.status(200).json({"status":"success",data:productUpdate})
    }

    let cartProduct= await cartModel.create({
        userId,
        product:productId,
        amount

    })
    
    res.status(200).json({"status":"success",data:cartProduct})
}
catch(error){
    next(Error(501,error.message))
}
    

}
const getAllCart=async(req,res,next)=>{
    try{
    let {userId}=req.user
    
    let cartData= await cartModel.find({userId}).populate("product")
   
    
    res.status(200).json({"status":"success",data:cartData})
}
catch(error){
    next(Error(501,error.message))
}
}

const deleteProductFromCart=async(req,res,next)=>{
    try{
        
        const {cartId}=req.params
        const cartItem= await cartModel.findByIdAndDelete(cartId)
        if(!cartItem){
            const error={
                status:501,
                message:"cart item not found"
            }
            return next(error)
        }
        res.status(200).json({"status":"success",data:cartItem})
    }
    catch(error){
        next(Error(501,error.message))
    }
}

const updateAmount=async(req,res,next)=>{
    try{
        
        const {cartId}=req.params
        const {amount}=req.body
        const updatedItem= await cartModel.findByIdAndUpdate(cartId,{$set:{amount}},{ new: true, runValidators: true })
        if(!updatedItem){
            const error={
                status:501,
                message:"cart item not found"
            }
            return next(error)
        }
        res.status(200).json({"status":"success",data:updatedItem})
    }
    catch(error){
        next(Error(501,error.message))
    }
}


module.exports={addProductToCart,getAllCart,deleteProductFromCart,updateAmount}