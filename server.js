const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const {save_user_information} = require('./models/server_db');
const path = require('path');
const publicPath = path.join(__dirname,'./public');
const paypal = require('paypal-rest-sdk');

/* handling all the parsing */
app.use(bodyParser.json());
app.use(express.static(publicPath));

/* paypal configuration */
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AcCKSxA4BKY1tZDEpGtHhEc7CCHZT71mGu7j7qN5CGWxV1zULJLnjuUJ92jLONwhY-zuUgHLQpSUELsW',
  'client_secret': 'EPlZq8vmrQEL1ql6ldKRU323WBvJ838fnN32xUw-597Gs8E6jVrZychx-gBZNEZrB0jund7xlxThrmit'
});

app.post('/post_info', async (req,res)=>{
  var email = req.body.email;
  var amount = req.body.amount;

  if(amount <= 1){
    return_info = {};
    return_info.error = true;
    return_info.message = "The amount should be grater than 1";
    return res.send(return_info);
  }
  var result = await save_user_information({"amount" : amount, "email" : email});
  res.send(result);
});

app.get('/get_total_amount', async (req,res)=>{
  var result = await get_total_amount();
  res.send(result);
})

app.listen(3000,()=>{
  console.log('server is running on port 3000');
});
