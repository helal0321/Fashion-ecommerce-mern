const paypal=require("../config/paypal.config.js")
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.CLIENT_SECRET
  });
  const pay=async(cartItems,paymentInfo)=>{
    const itemsData=cartItems.map((item)=>{
        return{
        "name":item.product.title,
        "sku":item.product._id,
        "price":item.product.price,
        "currency":"USD",
        "quantity":item.amount}

    })
    let totalPrice=0
    cartItems.map((item)=>{
        totalPrice+=item.product.price*item.amount
    })
    console.log(JSON.stringify({userInfo:paymentInfo,productsInfo:itemsData}))
    const paymentJson = {
        "intent": "sale",
        "payer": {
          "payment_method": "paypal"
        },
        "redirect_urls": {
          "return_url": "http://localhost:3000/api/payment/sucess/",
          "cancel_url": "http://localhost:3000/api/payment/cancel/"
        },
        "transactions": [{
          "item_list": {
            "items": itemsData
          },
          "amount": {
            "currency": "USD",
            "total": totalPrice.toString()
          },
          "description": "Payment for products.",
          "custom":JSON.stringify(paymentInfo)
        }]
        
      };
      return new Promise((resolve,reject)=>{
         paypal.payment.create(paymentJson,(error,payment)=>{
            if(error){
                    reject(error)
                }
                else{
                    let approvalUrl=payment.links.find((link)=>(link.rel=="approval_url")).href
                    console.log(approvalUrl)
                    resolve(approvalUrl)
                }
         })
          
        
      })

        // 

      }
    


  
module.exports=pay  
