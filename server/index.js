const express=require("express")
const mongoose=require("mongoose")
const app=express()
const authRouter=require("./routes/auth.route.js")
const productsRouter=require("./routes/products.route.js")
cartRouter=require("./routes/cart.route.js")
const paymentRouter=require("./routes/payment.route.js")
const port=3000
app.use(express.json())
mongoose.connect(`mongodb://localhost:27017/ecommerce-mern`).then(()=>{
    console.log("connected to databae sucessfully")
}).catch((error)=>{
    console.log(error)
})

app.use("/api/auth",authRouter)
app.use("/api/products",productsRouter)
app.use("/api/cart",cartRouter)
app.use("/api/payment",paymentRouter)
app.get("/api/test",(req,res)=>{
    res.send("hellow test")
})

app.use((error,req,res,next)=>{
   const status=error.status||"401"
   const  message=error.message
    return res.status(status).json({status:"error",message})
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})