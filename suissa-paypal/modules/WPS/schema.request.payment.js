{
  "id": "PAY-8ME76764AG798342RLBNORZI",
  "intent": "sale",
  "state": "created",
  "payer": {
    "payment_method": "paypal",
    "use_vendor_currency_conversion": false
  },
  "transactions": [
    {
      "amount": {
        "total": "66.00",
        "currency": "BRL"
      },
      "description": "VAI Q VAIII!!!",
      "related_resources": []
    }
  ],
  "create_time": "2016-12-21T20:41:08Z",
  "links": [
    {
      "href": "https://api.sandbox.paypal.com/v1/payments/payment/PAY-8ME76764AG798342RLBNORZI",
      "rel": "self",
      "method": "GET"
    },
    {
      "href": "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-9BV56964BM8769526",
      "rel": "approval_url",
      "method": "REDIRECT"
    },
    {
      "href": "https://api.sandbox.paypal.com/v1/payments/payment/PAY-8ME76764AG798342RLBNORZI/execute",
      "rel": "execute",
      "method": "POST"
    }
  ],
  "httpStatusCode": 201
}