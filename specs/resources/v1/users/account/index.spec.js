const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')
should = chai.should()

let user = require('specs/resources/v1/schemas/user.js')

chai.use(chaiHttp)

describe('User Account', () => {
  it('should successfully get account info on /api/v1/users/:id/account GET', done => {
    chai
      .request(server)
      .get('/api/v1/users/' + user._id + '/account')
      .set('Authorization', 'JWT ' + user.jwt)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('account')
        res.body.account.should.have.property('local')
        res.body.account.local.should.be.a('object')
        res.body.account.local.should.have.property('name')
        res.body.account.local.name.should.be.eql('New User Name')
        res.body.account.local.should.have.property('email')
        res.body.account.local.email.should.be.eql(user.email)
        res.body.account.local.should.have.property('phoneNumber')
        res.body.account.local.phoneNumber.should.be.eql(user.phoneNumber)
        res.body.account.local.should.have.property('isActive')
        res.body.account.local.isActive.should.be.eql(user.isActive)
        done()
      })
  })
})
