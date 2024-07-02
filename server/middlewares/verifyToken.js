const jwt=require("jsonwebtoken")
const Error=require("../utils/errorHandler")
const verifyToken=async(req,res,next)=>{
    try{
    const {authorization}=req.headers
   
    const verify= await jwt.verify(authorization,"1234mm")
    req.user=verify

    
    if(!verify){
        return next(Error(501,"invalid token"))
    }
    next()
    }
    catch(error){
        
        next(Error(501,error.message))
        
    }
}
module.exports=verifyToken