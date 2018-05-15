const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')
should = chai.should()

chai.use(chaiHttp)

const userModel = server.models.user

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
