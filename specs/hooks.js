const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')
should = chai.should()

chai.use(chaiHttp)

const userModel = server.models.user

/* Before hooks */
before(done => {
  userModel.ensureIndexes(err => {
    done()
  })
})

/* After hooks */
after(done => {
  userModel.remove({}, (err, docs) => {
    done()
  })
})
