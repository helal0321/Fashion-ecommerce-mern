const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const Error=require("../utils/errorHandler.js")
const User=require("../models/user.model.js")
const sendEmail=require("../utils/sendEmail.js")
const generateEmailHtml=require("../utils/emailHtml.js")
const generateResetHtml=require("../utils/resetHtml.js")

 const register=async(req,res,next)=>{
    try{
    const{userName,email,password}=req.body
    let userFound= await User.findOne({email})
    if(userFound){
        return next(Error(401,"email already exists"))
    }
    const emailToken=await jwt.sign({email},"1234mm",{expiresIn: '10m'})
    await sendEmail(email,generateEmailHtml(emailToken),"verify email")
    const hashedPassword= await bcrypt.hash(password,10)
    const newUser = await User.create({
        userName,
        email,
        password:hashedPassword,
        
    
      })
    res.status(200).json({status:"sucess",data:newUser})
    }catch(error){
        res.status(401).json({status:"error",message:error.message})
    }
 
}

const login=async(req,res,next)=>{
    try{

    
   const {email,password}=req.body
    const user= await User.findOne({email})
    if(!user){
        return next(Error(401,"user not found"))
    }
    if(!user.verified){
        return next(Error(401,"user acount is not verified"))
    }
    const checkPassword= await bcrypt.compare(password,user.password)
    if(!checkPassword){
        return next(Error(401,"wrong password"))
    }
    const token= await jwt.sign({userId:user._id,role:user.role},"1234mm")
    delete user._doc.password
    console.log(token)
    
    res.status(200).json({status:"sucess",data:{token,user:user._doc}})

}catch(error){
    next(error(401,error.message))
}

}

const verifyEmail=async(req,res,next)=>{
    
    try{
        const {token}=req.query
        const verify= await jwt.verify(token,"1234mm")

        if(!verify){
            return next(Error(501,"invalid token"))
        }
        const {email}=verify
        userFound= await User.findOne({email})
        if(!userFound){
            return next(Error(501,"user not found"))
        }
        if(userFound.verified){
            return res.status(200).json({status:"sucess",message:"user account is already verified"})
        }
        userFound.verified=true
        await userFound.save()
        res.status(200).json({status:"sucess",message:"user account has been verified sucessfully"})
        }
        catch(error){
            
            next(Error(501,error.message))
            
        }

}

const forgotPassword=async(req,res,next)=>{
    try{
    const {email}=req.body
    const userFound= await User.findOne({email})
    if(!userFound){
        return next(Error(501,"user not found"))
    }
    const resetToken=await jwt.sign({email},"1234mm",{expiresIn: '10m'})
    await sendEmail(email,generateResetHtml(resetToken),"reset password")
    res.status(200).json({status:"sucess",message:"email message has been sent sucessfully"})
}
catch(error){
            
    next(Error(501,error.message))
    
}
}
const resetPassword=async(req,res,next)=>{
    try{
    const {token}=req.query
    const {password}=req.body
    const verify= await jwt.verify(token,"1234mm")
    if(!verify){
        return next(Error(501,"invalid token"))
    }
    const {email}=verify
    let foundUser= await User.findOne({email})
    if(!foundUser){
        return next(Error(501,"user not found"))
    }
    const hashedPassword= await bcrypt.hash(password,10)
    foundUser.password=hashedPassword
    await foundUser.save()
    res.status(200).json({status:"sucess",message:"user password has been changed sucessfully"})}
    catch(error){
            
        next(Error(501,error.message))
        
    }
    
}

module.exports={register,login,verifyEmail,forgotPassword,resetPassword}