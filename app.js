var express        = require('express');
var bodyParser     = require('body-parser');
var app            = express();
var morgan         = require('morgan');
var mongoose       = require('mongoose');
var config         = require('./config/app');
var routes 				 = require('./config/routes');

mongoose.connect(config.databaseUrl);

// set up static views for index.html
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// hook up the routes
app.use('/', routes);

app.listen(config.port, function() {
  console.log("Express is listening on port " + config.port);
});