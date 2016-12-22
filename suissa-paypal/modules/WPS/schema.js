const mongoose = require('mongoose')
const Schema = mongoose.Schema

const structureLink = {
  "href": {
    type: String
  },
  "rel": {
    type: String
  },
  "method": {
    type: String,
    enum: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'REDIRECT']
  }
}

const payer = {
  "payment_method": {
    type: String,
    enum: ['paypal', 'credit_card']
  },
  "payer_info": {
    type: Schema.Types.Mixed
  },
  "use_vendor_currency_conversion": {
    type: Boolean,
    default: false
  }
}

const structureTransaction = {
  "amount": {
    "total": {
      type: Number
    },
    "currency": {
      type: String,
      enum: ['BRL', 'USD']
    }
  },
  "description": {
    type: String
  },
  "related_resources": [{
    type: Schema.Types.Mixed
  }]
}

const structure = {
  "id": {
    type: String
  },
  "intent": {
    type: String
  },
  "cart": {
    type: String
  },
  "state": {
    type: String
  },
  payer,
  "transactions": [ structureTransaction ],
  "create_time": {
    type: Date
  },
  "links": [ structureLink ],
  "httpStatusCode": {
    type: Number
  }
}

const schema = new Schema(structure)


module.exports = schema
/*
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
*/