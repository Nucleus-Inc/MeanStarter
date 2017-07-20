var express = require('express');
var bodyParser = require('body-parser');
var bodyParserError = require('../../index');


var app = express();
var port = process.env.PORT || 5000;
var router = express.Router();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

router.route('/test')

.post(function(req, res) {
    res.json({request_body: req.body});
});

app.use('/', router);

app.listen(port);

//For testing
module.exports = app;
