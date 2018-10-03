const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')
should = chai.should()
const config = require('config/config.js')
const jwt = require('jsonwebtoken')

let user = require('specs/resources/v1/schemas/user.js')

chai.use(chaiHttp)

describe('User Signup', () => {
  it('should successfully add a user on /api/v1/users/account/local/signup POST', done => {
    chai
      .request(server)
      .post('/api/v1/users/account/local/signup')
      .send({
        displayName: user.displayName,
        email: user.email,
        password: user.password,
        phoneNumber: user.phoneNumber
      })
      .end((err, res) => {
        res.should.have.status(201)
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
        res.body.account.local.isActive.should.be.eql(false)
        /* JWT */
        res.headers.should.have.property('code')
        res.headers.code.should.be.a('string')
        res.headers.code.length.should.be.eql(4)
        jwt.verify(
          res.headers.jwt,
          config.auth.local.jwt.jwtSecret,
          (err, decoded) => {
            decoded.should.have.property('_id')
            decoded.should.have.property('isActive')
            decoded.should.have.property('iat')
            decoded.should.have.property('exp')
            user._id = res.body._id
            done()
          }
        )
      })
  })

  it('should fail to add a user with invalid fields on /api/v1/users/account/local/signup POST', done => {
    chai
      .request(server)
      .post('/api/v1/users/account/local/signup')
      .send({
        email: 'user@',
        password: 'lame',
        phoneNumber: '55859999999'
      })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('object')
        res.body.errors.should.have.property('displayName')
        res.body.errors.should.have.property('email')
        res.body.errors.should.have.property('phoneNumber')
        res.body.errors.should.have.property('password')
        done()
      })
  })

  it('should fail to add a user with duplicate email on /api/v1/users/account/local/signup POST', done => {
    chai
      .request(server)
      .post('/api/v1/users/account/local/signup')
      .send({
        displayName: user.displayName,
        email: user.email,
        password: user.password,
        phoneNumber: user.phoneNumber
      })
      .end((err, res) => {
        res.should.have.status(422)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4200)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors[0].should.be.eql('account.local.email')
        done()
      })
  })

  it('should fail to add a user with duplicate phoneNumber on /api/v1/users/account/local/signup POST', done => {
    chai
      .request(server)
      .post('/api/v1/users/account/local/signup')
      .send({
        displayName: user.displayName,
        email: 'user2@email.com',
        password: user.password,
        phoneNumber: user.phoneNumber
      })
      .end((err, res) => {
        res.should.have.status(422)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4200)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors[0].should.be.eql('account.local.phoneNumber')
        done()
      })
  })
})
