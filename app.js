var path = require('path'),
    logger = require('morgan'),
    express = require('express'),
    bodyParser = require('body-parser');

var routes = require('./routes');

var app = express();

// configure view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev')); // log all requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.listen(process.env.PORT || 8080, () => {
    console.log('Server started');
});