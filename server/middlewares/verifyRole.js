const Error=require("../utils/errorHandler.js")
const verifyRole=(role)=>{
    return (req,res,next)=>{
        if(role!==req.user.role){
            return next(Error(501,"unauthorized access"))
        }
  
    
        next()
    }

}
module.exports=verifyRole