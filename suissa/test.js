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
      total:'10',
      currency:'USD'
    },
    description:'Pagando o estacionamento.'
  }]
});

paypal.payment.create(payReq, function(error, payment){
  console.log('create', error, payment)
  var links = {};

  if(error){
    console.error(JSON.stringify(error));
  } else {
    // Capture HATEOAS links
    payment.links.forEach(function(linkObj){
      links[linkObj.rel] = {
        href: linkObj.href,
        method: linkObj.method
      };
    })

    // If redirect url present, redirect user
    if (links.hasOwnProperty('approval_url')){
      //REDIRECT USER TO links['approval_url'].href
      console.log('redirect to: ', links['approval_url'].href)
      

    } else {
      console.error('no redirect URI present');
    }
  }
});