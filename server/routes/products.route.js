const express=require("express")
const {getProducts,createProduct,getProduct,updateProduct,deleteProduct,searchProducts,getCategories,getProductsOfCategory}=require("../controllers/products.controller.js")
const verifyToken=require("../middlewares/verifyToken.js")
const verifyRole=require("../middlewares/verifyRole.js")
const upload=require("../middlewares/fileUpload.js")
const productsRouter=express.Router()
productsRouter.route("/").get(getProducts)
.post(verifyToken,verifyRole("admin"),upload.array("images",4),createProduct)
productsRouter.get("/search",searchProducts)
productsRouter.get("/categories",getCategories)
productsRouter.get("/category/:category",getProductsOfCategory)
productsRouter.route("/:productId").get(getProduct)
.put(verifyToken,verifyRole("admin"),upload.array("images",4),updateProduct)
.delete(verifyToken,verifyRole("admin"),deleteProduct)



module.exports=productsRouter