const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')
should = chai.should()

let user = require('specs/resources/v1/schemas/user.js')

chai.use(chaiHttp)

describe('User Email Change Request', () => {
  it('should fail to get a code for email change with invalid email on /api/v1/users/account/local/:id/email PATCH', done => {
    chai
      .request(server)
      .patch('/api/v1/users/' + user._id + '/account/local/email')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        email: 'user@'
      })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('errorCode')
        res.body.errorCode.should.be.eql('REQ-001')
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('object')
        res.body.errors.should.have.property('email')
        done()
      })
  })

  it('should successfully get a code for email change on /api/v1/users/account/local/:id/account/local/email PATCH', done => {
    chai
      .request(server)
      .patch('/api/v1/users/' + user._id + '/account/local/email')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        email: user.email
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.headers.should.have.property('code')
        res.headers.code.should.be.a('string')
        res.headers.code.length.should.be.eql(4)
        user.emailChangeCode = res.headers.code
        done()
      })
  })

  it('should fail to change email with invalid token on /api/v1/users/account/local/:id/account/local/email PUT', done => {
    chai
      .request(server)
      .put('/api/v1/users/' + user._id + '/account/local/email')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        token: '1234557757'
      })
      .end((err, res) => {
        res.should.have.status(403)
        res.body.should.have.property('errorCode')
        res.body.errorCode.should.be.eql('AUT-004')
        done()
      })
  })

  it('should successfully change email on /api/v1/users/account/local/:id/account/local/email PUT', done => {
    chai
      .request(server)
      .put('/api/v1/users/' + user._id + '/account/local/email')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        token: user.emailChangeCode
      })
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })
})
