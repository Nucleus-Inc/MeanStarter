const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')
should = chai.should()

let user = require('specs/resources/schemas/user.js')

chai.use(chaiHttp)

describe('User Account name', () => {
  it('should fail to update account name with missing field on /users/:id/account/name PUT', (done) => {
    chai.request(server)
      .put('/users/' + user._id + '/account/name')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({

      })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('object')
        res.body.errors.should.have.property('name')
        done()
      })
  })

  it('should successfully update account name on /users/:id/account/name PUT', (done) => {
    chai.request(server)
      .put('/users/' + user._id + '/account/name')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'name': 'New User Name'
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('account')
        res.body.account.should.be.a('object')
        res.body.account.should.have.property('name')
        res.body.account.name.should.be.eql('New User Name')
        res.body.account.should.have.property('email')
        res.body.account.email.should.be.eql(user.email)
        res.body.account.should.have.property('phoneNumber')
        res.body.account.phoneNumber.should.be.eql(user.phoneNumber)
        res.body.account.should.have.property('isActive')
        res.body.account.isActive.should.be.eql(user.isActive)
        user.name = res.body.account.name
        done()
      })
  })
})
