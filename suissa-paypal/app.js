const db = require('./config/db');
const express = require('express');
const routes = require('./routes');
const http = require('http');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const errorhandler = require('errorhandler');
const router = express.Router();


const app = express();
try {
    var configJSON = fs.readFileSync(__dirname + "/config.json");
    var config = JSON.parse(configJSON.toString());
} catch (e) {
    console.error("File config.json not found or is invalid: " + e.message);
    process.exit(1);
}
routes.init(config);

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
    app.use(errorhandler());
}

const PayPalRoutes = require('./modules/Paypal/routes');
app.get('/api/paypal', PayPalRoutes.index);
app.post('/api/paypal/create', PayPalRoutes.create);
app.get('/api/paypal/execute', PayPalRoutes.execute);
app.get('/api/paypal/cancel', PayPalRoutes.cancel);
app.get('/api/paypal/xp', PayPalRoutes.xp);



http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});