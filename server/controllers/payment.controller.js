const Cart=require("../models/cart.model.js")
const Error=require("../utils/errorHandler.js")
const pay=require("../utils/payment.js")
const Order=require("../models/order.model.js")
const paypal=require("../config/paypal.config.js")

const paypalPayment=async(req,res,next)=>{
    try{
    const {userId}=req.user
    const{firstName,lastName,email,phoneNumber,city,address}=req.body
    const cartItemsFound= await Cart.find({userId}).populate("product")
    if(!cartItemsFound){
        return  next(Error(501,"products not found"))
    }
    const approvalUrl= await pay(cartItemsFound,{userId,firstName,lastName,email,phoneNumber,city,address})
    console.log(approvalUrl,"kuhujh")
    res.status(200).json({data:{approvalUrl}})
    
}
catch(error){
    next(Error(501,error.message))
}

    
}
const paymentSucess=async(req,res,next)=>{
    const {paymentId,PayerID}=req.query
    console.log(req.query)
    paypal.payment.execute(paymentId,{payer_id:PayerID},async(error,payment)=>{
        if(error){
            console.log(error)
            res.redirect("/canceled")
        }
        else{
            // console.log(payment)
            // console.log(payment.transactions[0].item_list,payment.transactions[0].related_resources)
            console.log(payment.transactions[0].amount,"hellow")
            const {userId,firstName,lastName,email,phoneNumber,city,address}=JSON.parse(payment.transactions[0].custom)
            console.log(userId)

            const products=JSON.stringify(payment.transactions[0].item_list.items)
            const paymentId=payment.id
            const payerInfo=payment.payer.payer_info
            const {total,currency}=payment.transactions[0].amount
            
            const order= await Order.create({userId,firstName,lastName,email,phoneNumber,city,address,products,totalPrice:total,currency,paymentId,payerId:payerInfo.payer_id,paymentEmail:payerInfo.email})
            console.log(order)
            res.redirect("/sucess")
        }
    })
    
}
const paymentCanceled=async(req,res)=>{
    res.redirect("/canceled")
}
module.exports={paypalPayment,paymentSucess,paymentCanceled}