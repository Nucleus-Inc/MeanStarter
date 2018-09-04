const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')
should = chai.should()

chai.use(chaiHttp)

describe('User Account', () => {
  it('should successfully verify password on /api/v1/verifications/password POST', done => {
    chai
      .request(server)
      .post('/api/v1/verifications/password')
      .send({
        password: 'lame'
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('score')
        res.body.score.should.be.a('number')
        done()
      })
  })
})
