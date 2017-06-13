var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var mongoose = require('mongoose');

module.exports = function() {

    var app = express();

    app.set('port', (process.env.PORT || 5000));

    /* Middlewares */
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(require('method-override')());
    app.use(express.static('./public'));

    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    /* Helmet */
    app.use(helmet.frameguard());
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.hidePoweredBy({
        setTo: 'PHP 5.6.27'
    }));

    load('models', {
            cwd: 'app'
        })
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
}
