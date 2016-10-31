var path = require('path'),
    logger = require('morgan'),
    express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    session = require('express-session'),
    flash = require('connect-flash');

var routes = require('./routes');
var links = require('./routes/links');

var app = express();

// setup passport
require('./config/passport');

// configure view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev')); // log all requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(session({
    secret: 'getyourownsecret',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/', links);

app.listen(process.env.PORT || 8080, () => {
    console.log('Server started');
});