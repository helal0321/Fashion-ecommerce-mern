const express=require("express")
const {register,login,verifyEmail,forgotPassword,resetPassword}=require("../controllers/auth.controller.js")

 const authRouter=express.Router()

authRouter.post("/register",register)
authRouter.post("/login",login)
authRouter.post("/verifyEmail",verifyEmail)
authRouter.post("/forgotPassword",forgotPassword)
authRouter.post("/resetPassword",resetPassword)

module.exports=authRouter