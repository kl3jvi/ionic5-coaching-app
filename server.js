var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Orgin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested_With, COntent-type, Accept');
    next();
});

app.use(express.static('www'));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/www/index.html'));
});
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});