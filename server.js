var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var ejs = require('ejs');
var handlebars = require('express-handlebars');
var session = require('express-session');
var logger = require('morgan');
var MongoDBStore = require('connect-mongodb-session')(session);
var port = process.env.PORT || 3000;

// Connect to MongoDB
var dbURI = 'mongodb://localhost:27017/oauthdb';
mongoose.connect(dbURI);

// Define express app
var app = express();

app.use(logger('dev'));

// Configure view template engine
app.engine('.hbs', handlebars({ 
  layoutsDir: './views/layouts/',
  defaultLayout: 'application',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Configure bodyParser to accept x-www.form-urlencoded and json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET || 'C00k13-S3cR3T'));

// Configure sessions and store them in database
var sessionStore = new MongoDBStore({ uri: dbURI, collection: 'sessions' });
app.use(session({
  key: 'simple-api-oauth2.session',
  secret: process.env.SESSION_SECRET || 'S3ss10N-S3cR3T',
  store: sessionStore,
  saveUninitialized: true, // saved new sessions
  resave: false, // do not automatically write to the session store
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // expire after 1 week
  }
}));

// Init authentication engine
app.use(passport.initialize());
app.use(passport.session());

// Use /public as a directory for static assets.
app.use(express.static('public'));

// Load routes
app.use('/', require('./routes/session_routes'));
app.use('/admin', require('./routes/admin_routes'));
app.use('/api', require('./routes/api_routes'));

// Start the server
app.listen(port);
console.log('Server started on port ' + port);
