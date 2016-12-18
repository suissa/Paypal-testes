const express = require('express')
const router = express.Router()

var paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox', // Sandbox or live
  client_id: 'Aa9rd9vRzn2zCkigJjNDq0wmybvWK1FLtIpP2zlCpbSTo5tGMVWMxFObZ2sMgc8A5Gwg_d-RIQwDaUbt',
  client_secret: 'EBW7A9RA4JSRjjXK1Mlf7yz-cAndCvG7aQf4v-6TMDORo5Q5SV8OGOzvugLcZW3nwnFFwQ2I_8P5qQq6'});


// Build PayPal payment request
var payReq = JSON.stringify({
  intent:'sale',
  redirect_urls:{
    return_url:'http://localhost:3000/process',
    cancel_url:'http://localhost:3000/cancel'
  },
  payer:{
    payment_method:'paypal'
  },
  transactions:[{
    amount:{
      total:'13',
      currency:'BRL'
    },
    description:'Pagando o estacionamento do XOPISS. \nValor: R$ 666'
  }]
});

/* GET home page. */
router.get('/', (req, res, next) => {
  


  var card_data = {
    "type": "visa",
    "number": "4417119669820331",
    "expire_month": "11",
    "expire_year": "2018",
    "cvv2": "123",
    "first_name": "Joe",
    "last_name": "Shopper"
  };

  paypal.creditCard.create(card_data, function(error, credit_card){
    if (error) {
      console.log(error);
      throw error;
    } else {
      console.log("Create Credit-Card Response");
      console.log(credit_card);
    }
  })

  // var create_web_profile_json = {
  //     "name": "Webschool",
  //     "presentation": {
  //         "brand_name": "Suissao",
  //         "logo_image": "http://webschool.io/bemean/assets/images/logo-webschool.png",
  //         "locale_code": "BR"
  //     },
  //     "input_fields": {
  //         "allow_note": true,
  //         "no_shipping": 1,
  //         "address_override": 1
  //     },
  //     "flow_config": {
  //         "landing_page_type": "billing",
  //         "bank_txn_pending_url": "http://www.yeowza.com"
  //     }
  // };

  // var create_payment_json = {
  //     "intent": "sale",
  //     "payer": {
  //         "payment_method": "paypal"
  //     },
  //     "redirect_urls": {
  //         "return_url": "http://localhost:3000/process",
  //         "cancel_url": "http://localhost:3000/cancel"
  //     },
  //     "transactions": [{
  //         "item_list": {
  //             "items": [{
  //                 "name": "Estacionamento",
  //                 "sku": "item",
  //                 "price": "1.00",
  //                 "currency": "BRL",
  //                 "quantity": 1
  //             }]
  //         },
  //         "amount": {
  //             "currency": "BRL",
  //             "total": "1.00"
  //         },
  //         "description": "SUCK MY DICKOOOOOO!!"
  //     }]
  // };

  // paypal.webProfile.create(create_web_profile_json, function (error, web_profile) {
  //     if (error) {
  //         throw error;
  //     } else {

  //         //Set the id of the created payment experience in payment json
  //         var experience_profile_id = web_profile.id;
  //         create_payment_json.experience_profile_id = experience_profile_id;

          paypal.payment.create(payReq, function (error, payment) {
              if (error) {
                  throw error;
              } else {
                  console.log("Create Payment Response");
                  console.log(payment);
                  res.redirect(payment.links[1]['href'])
              }
          });
  //     }// });

})

router.get('/process', (req, res, next) => {
  res.render('index', { title: 'Be MEAN' })
})
router.get('/cancel', (req, res, next) => {
  res.render('index', { title: 'Be MEAN' })
})

module.exports = router
