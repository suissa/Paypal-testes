'use strict';

var paypal = require('paypal-rest-sdk');
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
	var method = req.param('method');

	var payment = {
		"intent": "sale",
	  payer:{
	    payment_method:'paypal'
	  },
		"transactions": [{
			"amount": {
				"currency": req.param('currency'),
				"total": req.param('amount')
			},
			"description": req.param('description')
		}]
	};

	if (method === 'paypal') {
		payment.payer.payment_method = 'paypal';
		payment.redirect_urls = {
			"return_url": "http://localhost:3000/execute",
			"cancel_url": "http://localhost:3000/cancel"
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
			res.render('create', { 'payment': payment });
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
			res.render('execute', { 'payment': payment });
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