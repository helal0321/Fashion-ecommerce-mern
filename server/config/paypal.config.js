const paypal=require("paypal-rest-sdk")
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AX5d1pg4NanHkkSTyCOnQ7dI1gbBx4lSsXsLKivEgVdXVgDSHgMFUix2bZzHjKS6HdeXQYZ8dQoq_ytx',
    'client_secret': 'ECzsljw4zaHEeqDlkLZvE3lA7TwY9tMh0htxy4TtKPNR-iJUE6mFQCb6NqggFgDHjb9gH4sRK4gv3Ife'
  });
  module.exports=paypal