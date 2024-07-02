const express=require("express")
const verifyToken=require("../middlewares/verifyToken.js")
const {paypalPayment,paymentSucess,paymentCanceled}=require("../controllers/payment.controller.js")
const paymentRouter=express.Router()
paymentRouter.post("/pay/",verifyToken,paypalPayment)
paymentRouter.get("/sucess/",paymentSucess)
paymentRouter.get("/cancel/",paymentCanceled)

module.exports=paymentRouter