const mongoose = require('mongoose')
const Schema = mongoose.Schema


const payment_method = {
  type: String,
  enum: ['paypal', 'credit_card']
}
const payer_info = { type: Schema.Types.Mixed }
const use_vendor_currency_conversion = {
  type: Boolean,
  default: false
}
const payer = {
  payment_method,
  payer_info,
  use_vendor_currency_conversion
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
const transactions = [ structureTransaction ]
const links = [ structureLink ]
const httpStatusCode = { type: Number }
const id = { type: String }
const intent = { type: String }
const cart = { type: String }
const state = { type: String }

const structure = {
  id,
  intent,
  cart,
  state,
  payer,
  transactions,
  links,
  httpStatusCode,
  "create_time": {
    type: Date
  }
}

const schema = new Schema(structure)


module.exports = schema
/*
{
  "_id": ObjectId("585b0ea640360352d00c1a1c"),
  "id": "PAY-6YP57425M8039293ALBNQ4GA",
  "intent": "sale",
  "state": "approved",
  "cart": "27C81488T9241911K",
  "create_time": ISODate("2016-12-21T23:22:14Z"),
  "httpStatusCode": 200,
  "links": [
    {
      "href": "https://api.sandbox.paypal.com/v1/payments/payment/PAY-6YP57425M8039293ALBNQ4GA",
      "rel": "self",
      "method": "GET",
      "_id": ObjectId("585b0ea640360352d00c1a1d")
    }
  ],
  "transactions": [
    {
      "description": "VAI Q VAI",
      "_id": ObjectId("585b0ea640360352d00c1a1e"),
      "related_resources": [
        {
          "sale": {
            "soft_descriptor": "PAYPAL *TESTFACILIT",
            "links": [
              {
                "method": "GET",
                "rel": "self",
                "href": "https://api.sandbox.paypal.com/v1/payments/sale/7FK19954G6177271H"
              },
              {
                "method": "POST",
                "rel": "refund",
                "href": "https://api.sandbox.paypal.com/v1/payments/sale/7FK19954G6177271H/refund"
              },
              {
                "method": "GET",
                "rel": "parent_payment",
                "href": "https://api.sandbox.paypal.com/v1/payments/payment/PAY-6YP57425M8039293ALBNQ4GA"
              }
            ],
            "update_time": "2016-12-21T23:22:14Z",
            "create_time": "2016-12-21T23:22:14Z",
            "parent_payment": "PAY-6YP57425M8039293ALBNQ4GA",
            "transaction_fee": {
              "currency": "BRL",
              "value": "1.52"
            },
            "protection_eligibility_type": "ITEM_NOT_RECEIVED_ELIGIBLE,UNAUTHORIZED_PAYMENT_ELIGIBLE",
            "protection_eligibility": "ELIGIBLE",
            "payment_mode": "INSTANT_TRANSFER",
            "amount": {
              "currency": "BRL",
              "total": "33.00"
            },
            "state": "completed",
            "id": "7FK19954G6177271H"
          }
        }
      ],
      "amount": {
        "total": 33,
        "currency": "BRL"
      }
    }
  ],
  "payer": {
    "payment_method": "paypal",
    "payer_info": {
      "billing_address": {
        "country_code": "BR",
        "postal_code": "22021-001",
        "state": "RJ",
        "city": "Rio De Janeiro",
        "line2": "",
        "line1": "1234 Rua Main"
      },
      "country_code": "BR",
      "tax_id": "30949017787",
      "tax_id_type": "BR_CPF",
      "shipping_address": {
        "normalization_status": "UNNORMALIZED",
        "country_code": "BR",
        "postal_code": "22021-001",
        "state": "RJ",
        "city": "Rio De Janeiro",
        "line1": "1234 Rua Main",
        "recipient_name": "Jean Carlo Nascimento"
      },
      "payer_id": "KWSBK84W3DWAS",
      "last_name": "Carlo Nascimento",
      "first_name": "Jean",
      "email": "jnascimento@gmail.com"
    },
    "use_vendor_currency_conversion": false
  },
  "__v": 0
}

*/