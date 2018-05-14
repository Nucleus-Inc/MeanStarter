var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('app.js')
should = chai.should()

chai.use(chaiHttp)

var userModel = server.models.user

/* Before hooks */

before(function (done) {
    userModel.ensureIndexes(function (err) {
        done()
    })
})

/* After hooks */

after(function (done) {
    userModel.remove({}, function (err, docs) {
        done()
    })
})