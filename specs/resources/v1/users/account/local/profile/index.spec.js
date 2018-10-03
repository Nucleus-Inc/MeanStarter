const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')
should = chai.should()

let user = require('specs/resources/v1/schemas/user.js')

chai.use(chaiHttp)

describe('User Profile Picture', () => {
  it('should fail to udpate profile picture with invalid url on /api/v1/users/:id/account/local/profile PUT', done => {
    chai
      .request(server)
      .put('/api/v1/users/' + user._id + '/account/local/profile')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        pictureUrl: 'bla'
      })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('object')
        res.body.errors.should.have.property('pictureUrl')
        done()
      })
  })

  it('should successfully update profile picture on /api/v1/users/:id/account/local/profile PUT', done => {
    chai
      .request(server)
      .put('/api/v1/users/' + user._id + '/account/local/profile')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        pictureUrl: 'http://www.bla.com'
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('account')
        res.body.account.should.have.property('local')
        res.body.account.local.should.be.a('object')
        res.body.account.local.should.have.property('displayName')
        res.body.account.local.displayName.should.be.eql(user.displayName)
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
