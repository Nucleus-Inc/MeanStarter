module.exports = {

    beautify: function(options) {

        var options = options || {};

        return function(err, req, res, next) {
            //Catch JSON error
            if (err instanceof SyntaxError &&
                err.status >= 400 && err.status < 500 &&
                err.message.indexOf('JSON')) {
                options.status ? res.status(options.status) : res.status(400);
                options.res ? res.json(options.res) : res.json({
                    msg: 'Invalid JSON'
                });
            }
        };
    }
}
