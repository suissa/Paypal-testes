config = require( "../../lib/config" )
request = require( "request" )
_ = require( "lodash" )

module.exports = class PayPalRest extends require( "../_base/main" )	
	payment: require( "./payment" )

	initialize: =>
		@initIPN()
		return

	initIPN: =>
		require( "../paypal/ipn" ).init( @main )
		return