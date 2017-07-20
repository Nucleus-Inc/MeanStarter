var chai = require('chai');
var chaiHttp = require('chai-http');
var bodyParserError = require('../index');
var server = require('./app/app');
var should = chai.should();

chai.use(chaiHttp);

server.use(bodyParserError.beautify({
    status: 500,
    res: {
        msg: 'Custom response'
    }
}));

describe('Custom Body Parser Error Response', function() {
    it('should be a successful request on /test POST', function(done) {
        chai.request(server)
            .post('/test')
            .send({
                "test": "This is a test !"
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('request_body');
                res.body.request_body.should.be.a('object');
                res.body.request_body.should.have.property('test');
                res.body.request_body.test.should.be.equal('This is a test !');
                done();
            });
    });
    it('should be an invalid request with JSON syntax error on /test POST', function(done) {
        chai.request(server)
            .post('/test')
            .send('{"invalid"}')
            .type('json')
            .end(function(err, res) {
                res.should.have.status(500);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('msg');
                res.body.msg.should.be.equal('Custom response');
                done();
            });
    });
});
