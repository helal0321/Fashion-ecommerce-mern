const express=require("express")
const verifyToken=require("../middlewares/verifyToken.js")
cartRouter=express.Router()
const {addProductToCart,getAllCart,deleteProductFromCart,updateAmount}=require("../controllers/cart.controller.js")
cartRouter.route("/").post(verifyToken,addProductToCart).get(verifyToken,getAllCart)
cartRouter.route("/:cartId").delete(verifyToken,deleteProductFromCart).put(verifyToken,updateAmount)
module.exports=cartRouter