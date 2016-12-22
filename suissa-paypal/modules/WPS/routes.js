const paypal = require('paypal-rest-sdk');
const Model = require('./model')

// var config = {
// 	"port" : 3000,
// 	"api" : {
// 		"host" : "api.sandbox.paypal.com",
// 		"port" : "",
// 		"client_id" : "Aa9rd9vRzn2zCkigJjNDq0wmybvWK1FLtIpP2zlCpbSTo5tGMVWMxFObZ2sMgc8A5Gwg_d-RIQwDaUbt",
// 		"client_secret" : "6TMDORo5Q5SV8OGOzvugLcZW3nwnFFwQ2I_8P5qQq6"
// 	}
// };

paypal.configure({
  mode: 'sandbox', // Sandbox or live
  client_id: 'Aa9rd9vRzn2zCkigJjNDq0wmybvWK1FLtIpP2zlCpbSTo5tGMVWMxFObZ2sMgc8A5Gwg_d-RIQwDaUbt',
  client_secret: 'EBW7A9RA4JSRjjXK1Mlf7yz-cAndCvG7aQf4v-6TMDORo5Q5SV8OGOzvugLcZW3nwnFFwQ2I_8P5qQq6'
});

// Routes

exports.index = function (req, res) {
  res.render('index');
};

exports.create = function (req, res) {
	var method = req.body.method

	console.log('body', req.body)
	var payment = {
		"intent": "sale",
	  payer:{
	    payment_method:'paypal'
	  },
		"transactions": [{
			"amount": {
				"currency": req.body.currency,
				"total": req.body.amount
			},
			"description": 'Valor: R$' + req.body.amount
		}]
	};

	if (method === 'paypal') {
		payment.payer.payment_method = 'paypal';
		payment.redirect_urls = {
			"return_url": "http://localhost:3000/api/paypal/execute",
			"cancel_url": "http://localhost:3000/api/paypal/cancel"
		};
	} else if (method === 'credit_card') {
		var funding_instruments = [
			{
				"credit_card": {
					"type": req.param('type').toLowerCase(),
					"number": req.param('number'),
					"expire_month": req.param('expire_month'),
					"expire_year": req.param('expire_year'),
					"first_name": req.param('first_name'),
					"last_name": req.param('last_name')
				}
			}
		];
		payment.payer.payment_method = 'credit_card';
		payment.payer.funding_instruments = funding_instruments;
	}

	paypal.payment.create(payment, function (error, payment) {
		if (error) {
			console.log(error);
			res.render('error', { 'error': error });
		} else {
			req.session.paymentId = payment.id;
			console.log('create')
			Model.create(payment)
				.then((data) => {
          console.log('create', data)
          const details = { payment_method: 'paypal',
                            use_vendor_currency_conversion: false }
          var _payment = paypal.payment.execute(payment.id, function (error, pay) {
            if (error) {
              console.log(error);
              res.render('error', { 'error': error });
            } else {
              console.log('elseeee', pay)
              Model.create(pay)
               .then((dataExecuted) => res.render('execute', { 'payment': dataExecuted }))
               .catch((errExecuted) => res.render('error', { 'error': errExecuted }))
            }
          });
          // res.render('create', { 'payment': payment })
        })
				.catch((err) => res.render('error', { 'error': err }))
			// res.render('create', { 'payment': payment });
		}
	});
};

exports.execute = function (req, res) {
	var paymentId = req.session.paymentId;
	var payerId = req.param('PayerID');
	console.log('paymentId', paymentId)
	console.log('payerId', payerId)
	var details = { "payer_id": payerId };
	var payment = paypal.payment.execute(paymentId, details, function (error, payment) {
		if (error) {
			console.log(error);
			res.render('error', { 'error': error });
		} else {
			// Model.create(payment)
			// 	.then((data) => res.render('execute', { 'payment': data }))
			// 	.catch((err) => res.render('error', { 'error': err }))
			console.log('elseeee', payment)
		}
	});
};

exports.cancel = function (req, res) {
  res.render('cancel');
};

// Configuration

exports.init = function (c) {
	// config = c;
	// paypal.configure(c.api);
};



  // var card_data = {
  //   "type": "visa",
  //   "number": "4417119669820331",
  //   "expire_month": "11",
  //   "expire_year": "2018",
  //   "cvv2": "123",
  //   "first_name": "Joe",
  //   "last_name": "Shopper"
  // };

  // paypal.creditCard.create(card_data, function(error, credit_card){
  //   if (error) {
  //     console.log(error);
  //     throw error;
  //   } else {
  //     console.log("Create Credit-Card Response");
  //     console.log(credit_card);
  //   }
  // })