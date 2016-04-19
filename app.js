var express        = require('express');
var bodyParser     = require('body-parser');
var app            = express();
var morgan         = require('morgan');
var mongoose       = require('mongoose');
var config         = require('./config/app');
var cors           = require('cors');
var routes 				 = require('./config/routes');

var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/selfless';
mongoose.connect(mongoURI);

// set up static views for index.html
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: config.appUrl,
  credentials: true
}));

// hook up the routes
app.use('/', routes);

app.listen(config.port, function() {
  console.log("Express is listening on port " + config.port);
});

app.listen(process.env.PORT || 3000);