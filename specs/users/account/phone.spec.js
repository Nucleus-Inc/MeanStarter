const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')
should = chai.should()
const config = require('config/config.js')
const jwt = require('jsonwebtoken')

let user = {}

chai.use(chaiHttp)

describe('User Phone Number Change Request', () => {
  it('should successfully get a JWT on /users/auth/mobile POST', (done) => {
    chai.request(server)
      .post('/users/auth/mobile')
      .send({
        'email': 'user@email.com',
        'password': 'us3r@recov3r'
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.headers.should.have.property('jwt')
        res.headers.jwt.should.be.a('string')
        user.jwt = res.headers.jwt
        jwt.verify(res.headers.jwt, config.jwt.jwtSecret, (err, decoded) => {
          decoded.should.have.property('_id')
          decoded.should.have.property('isActive')
          decoded.should.have.property('iat')
          decoded.should.have.property('exp')
          user._id = decoded._id
          user.jwt = res.headers.jwt
          done()
        })
      })
  })

  it('should fail to get a code for phone number change with invalid phone number on /users/account/:id/account/phone-number PATCH', (done) => {
    chai.request(server)
      .patch('/users/' + user._id + '/account/phone-number')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'phoneNumber': '5585999'
      })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('object')
        res.body.errors.should.have.property('phoneNumber')
        done()
      })
  })

  it('should successfully get a code for phone number change on /users/:id/account/phone-number PATCH', (done) => {
    chai.request(server)
      .patch('/users/' + user._id + '/account/phone-number')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'phoneNumber': '5585999999995'
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.headers.should.have.property('code')
        res.headers.code.should.be.a('string')
        res.headers.code.length.should.be.eql(4)
        user.phoneChangeCode = res.headers.code
        done()
      })
  })

  it('should fail to change phone number with invalid token on /users/:id/account/phone-number PUT', (done) => {
    chai.request(server)
      .put('/users/' + user._id + '/account/phone-number')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'token': '1234557757'
      })
      .end((err, res) => {
        res.should.have.status(403)
        res.body.should.have.property('errorCode')
        res.body.errorCode.should.be.eql('AUT-004')
        done()
      })
  })

  it('should successfully change phone number on /users/account/:id/account/phone-number PUT', (done) => {
    chai.request(server)
      .put('/users/' + user._id + '/account/phone-number')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'token': user.phoneChangeCode
      })
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })
})
