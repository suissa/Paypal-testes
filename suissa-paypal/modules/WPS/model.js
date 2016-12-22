const mongoose = require('mongoose')
const SCHEMA = require('./schema')

const NAME = 'PaypalPayment'
const COLLECTION = 'paypalpayments'
const Model = mongoose.model(NAME, SCHEMA, COLLECTION)

module.exports = Model