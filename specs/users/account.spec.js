var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../../app.js')
should = chai.should()
var config = require('../../config/config.js')
var jwt = require('jsonwebtoken')

var userModel = server.models.user

var user = {}

chai.use(chaiHttp)

describe('User Signup', function() {
  it('should successfully add a user on /users/account/signup POST', function(done) {
    chai.request(server)
      .post('/users/account/signup')
      .send({
        'name': 'Jimmy McGuill',
        'email': 'jimmy@wmlaw.com',
        'password': 'upm3@2017',
        'phoneNumber': '5585999999999'
      })
      .end(function(err, res) {
        res.should.have.status(201)
        res.headers.should.have.property('code')
        res.headers.code.should.be.a('string')
        res.headers.code.length.should.be.eql(4)
        jwt.verify(res.headers.jwt, config.jwt.jwtSecret, function(err, decoded) {
          decoded.should.have.property('_id')
          decoded.should.have.property('isActive')
          decoded.should.have.property('iat')
          decoded.should.have.property('exp')
          user._id = decoded._id
          done()
        })
      })
  })

  it('should fail to add a user with invalid fields on /users/account/signup POST', function(done) {
    chai.request(server)
      .post('/users/account/signup')
      .send({
        'name': 'Jimmy McGuill',
        'email': 'jimmywmlaw.com',
        'password': 'upme', // Weak Password
        'phoneNumber': '55859999'
      })
      .end(function(err, res) {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors[0].param.should.be.eql('email')
        res.body.errors[1].param.should.be.eql('phoneNumber')
        res.body.errors[2].param.should.be.eql('password')
        done()
      })
  })

  it('should fail to add a user with duplicate email on /users/account/signup POST', function(done) {
    chai.request(server)
      .post('/users/account/signup')
      .send({
        'name': 'Jimmy McGuill',
        'email': 'jimmy@wmlaw.com',
        'password': 'upm3@2017',
        'phoneNumber': '5585999999999'
      })
      .end(function(err, res) {
        res.should.have.status(422)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4200)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors[0].should.be.eql('email')
        done()
      })
  })

  it('should fail to add a user with duplicate phoneNumber on /users/account/signup POST', function(done) {
    chai.request(server)
      .post('/users/account/signup')
      .send({
        'name': 'Jimmy McGuill',
        'email': 'jimmy2@wmlaw.com',
        'password': 'upm3@2017',
        'phoneNumber': '5585999999999'
      })
      .end(function(err, res) {
        res.should.have.status(422)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4200)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors[0].should.be.eql('phoneNumber')
        done()
      })
  })
})

describe('User SignIn', function() {
  it('should successfully get a JWT on /users/account/signin POST', function(done) {
    chai.request(server)
      .post('/users/account/signin')
      .send({
        'email': 'jimmy@wmlaw.com',
        'password': 'upm3@2017'
      })
      .end(function(err, res) {
        res.should.have.status(200)
        res.headers.should.have.property('jwt')
        res.headers.jwt.should.be.a('string')
        user.jwt = res.headers.jwt
        jwt.verify(res.headers.jwt, config.jwt.jwtSecret, function(err, decoded) {
          decoded.should.have.property('_id')
          decoded.should.have.property('isActive')
          decoded.should.have.property('iat')
          decoded.should.have.property('exp')
          done()
        })
      })
  })

  it('should fail to get a JWT with invalid credentials on /users/account/signin POST', function(done) {
    chai.request(server)
      .post('/users/account/signin')
      .send({
        'email': 'jimmy@wmlaw.com',
        'password': 'upm3@20'
      })
      .end(function(err, res) {
        res.should.have.status(401)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4100)
        done()
      })
  })
})

describe('User Account Activation', function() {
  it('should successfully get a activation code on /users/account/activation/:id GET', function(done) {
    chai.request(server)
      .get('/users/' + user._id + '/account/activation')
      .set('Authorization', 'JWT ' + user.jwt)
      .end(function(err, res) {
        res.should.have.status(200)
        res.headers.should.have.property('code')
        res.headers.code.should.be.a('string')
        res.headers.code.length.should.be.eql(4)
        user.activationCode = res.headers.code
        done()
      })
  })

  it('should fail to get a activation code with invalid _id on /users/account/activation/:id GET', function(done) {
    chai.request(server)
      .get('/users/5931972a29/account/activation')
      .set('Authorization', 'JWT ' + user.jwt)
      .end(function(err, res) {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors[0].param.should.be.eql('id')
        done()
      })
  })

  it('should fail to get an activation code with valid but non-existent _id on /users/account/activation/:id GET', function(done) {
    chai.request(server)
      .get('/users/59397de5f3700d641faaab09/account/activation')
      .set('Authorization', 'JWT ' + user.jwt)
      .end(function(err, res) {
        res.should.have.status(404)
        done()
      })
  })

  it('should fail to activate an account with an invalid token on /users/account/activation/:id PUT', function(done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/activation')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'token': '1234557757'
      })
      .end(function(err, res) {
        res.should.have.status(403)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4301)
        done()
      })
  })

  it('should fail to activate an account with an invalid id on /users/account/activation/:id PUT', function(done) {
    chai.request(server)
      .put('/users/5931972a29/account/activation')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'token': user.activationCode
      })
      .end(function(err, res) {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors[0].param.should.be.eql('id')
        done()
      })
  })

  it('should fail to activate an account with a valid id and a missing token on /users/account/activation/:id PUT', function(done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/activation')
      .set('Authorization', 'JWT ' + user.jwt)
      .send()
      .end(function(err, res) {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors[0].param.should.be.eql('token')
        done()
      })
  })

  it('should fail to activate an account with valid but non-existent _id on /users/account/activation/:id PUT', function(done) {
    chai.request(server)
      .put('/users/59397de5f3700d641faaab09/account/activation')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'token': user.activationCode
      })
      .end(function(err, res) {
        res.should.have.status(404)
        done()
      })
  })

  it('should successfully activate an account on /users/account/activation/:id PUT', function(done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/activation')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'token': user.activationCode
      })
      .end(function(err, res) {
        res.should.have.status(200)
        jwt.verify(res.headers.jwt, config.jwt.jwtSecret, function(err, decoded) {
          decoded.should.have.property('_id')
          decoded.should.have.property('isActive')
          decoded.should.have.property('iat')
          decoded.should.have.property('exp')
          done()
        })
      })
  })

  it('should fail to get an activation code for an account that is already active on /users/account/activation/:id GET', function(done) {
    chai.request(server)
      .get('/users/' + user._id + '/account/activation')
      .set('Authorization', 'JWT ' + user.jwt)
      .end(function(err, res) {
        res.should.have.status(422)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4201)
        done()
      })
  })

  it('should fail to activate an account that is already active on /users/account/activation/:id PUT', function(done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/activation')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'token': user.activationCode
      })
      .end(function(err, res) {
        res.should.have.status(422)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4201)
        done()
      })
  })
})

describe('User Account Password Update', function() {
  it('should fail to update account new password with current password on /users/account/:id/account/password PUT', function(done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/password')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'currentPassword': 'upm3@2017',
        'newPassword': 'upm3@2017'
      })
      .end(function(err, res) {
        res.should.have.status(422)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4200)
        done()
      })
  })

  it('should fail to update account password with invalid current password on /users/account/:id/account/password PUT', function(done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/password')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'currentPassword': 'upm3@201',
        'newPassword': 'upm3@NeW'
      })
      .end(function(err, res) {
        res.should.have.status(401)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4100)
        done()
      })
  })

  it('should fail to update account new password with weak password on /users/account/:id/account/password PUT', function(done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/password')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'currentPassword': 'upm3@2017',
        'newPassword': 'weak'
      })
      .end(function(err, res) {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors[0].param.should.be.eql('newPassword')
        done()
      })
  })

  it('should successfully update account password on /users/account/:id/account/password PUT', function(done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/password')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'currentPassword': 'upm3@2017',
        'newPassword': 'upm3@NeW'
      })
      .end(function(err, res) {
        res.should.have.status(200)
        done()
      })
  })

  it('should successfully get a JWT with new password on /users/account/signin POST', function(done) {
    chai.request(server)
      .post('/users/account/signin')
      .send({
        'email': 'jimmy@wmlaw.com',
        'password': 'upm3@NeW'
      })
      .end(function(err, res) {
        res.should.have.status(200)
        res.headers.should.have.property('jwt')
        user.jwt = res.headers.jwt
        res.headers.jwt.should.be.a('string')
        jwt.verify(res.headers.jwt, config.jwt.jwtSecret, function(err, decoded) {
          decoded.should.have.property('_id')
          decoded.should.have.property('iat')
          decoded.should.have.property('exp')
          done()
        })
      })
  })
})

describe('User Account Recovery', function() {
  it('should successfully get a recovery code on /users/account/recovery/:phoneNumber GET', function(done) {
    chai.request(server)
      .get('/users/account/recovery/5585999999999')
      .end(function(err, res) {
        res.should.have.status(200)
        res.headers.should.have.property('code')
        res.headers.code.should.be.a('string')
        res.headers.code.length.should.be.eql(4)
        user.recoveryCode = res.headers.code
        done()
      })
  })

  it('should fail to get a recovery code with invalid phoneNumber on /users/account/activation/:phoneNumber GET', function(done) {
    chai.request(server)
      .get('/users/account/recovery/55859999')
      .end(function(err, res) {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors[0].param.should.be.eql('phoneNumber')
        done()
      })
  })

  it('should still get a recovery code with valid but non-existent phoneNumber on /users/account/activation/:phoneNumber GET', function(done) {
    chai.request(server)
      .get('/users/account/recovery/5585999999990')
      .end(function(err, res) {
        res.should.have.status(200)
        res.headers.should.have.property('code')
        res.headers.code.should.be.a('string')
        res.headers.code.length.should.be.eql(4)
        done()
      })
  })

  it('should fail to recover an account with an invalid token and valid phoneNumber on /users/account/recovery/:phoneNumber PUT', function(done) {
    chai.request(server)
      .put('/users/account/recovery/5585999999999')
      .send({
        'token': '1234567890',
        'newPassword': 'upm3@n3w2018'
      })
      .end(function(err, res) {
        res.should.have.status(403)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4301)
        done()
      })
  })

  it('should fail to recover an account with a valid but non-existent phoneNumber and an invalid token on /users/account/recovery/:phoneNumber PUT', function(done) {
    chai.request(server)
      .put('/users/account/recovery/5585999999990')
      .send({
        'token': '1234567890',
        'newPassword': 'upm3@n3w2018'
      })
      .end(function(err, res) {
        res.should.have.status(403)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4301)
        done()
      })
  })

  it('should fail to recover an account with invalid phoneNumber and token on /users/account/recovery/:phoneNumber PUT', function(done) {
    chai.request(server)
      .put('/users/account/recovery/55859999')
      .send({
        'token': '',
        'newPassword': 'upm3@n3w2018'
      })
      .end(function(err, res) {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors[0].param.should.be.eql('phoneNumber')
        res.body.errors[1].param.should.be.eql('token')
        done()
      })
  })

  it('should fail to recover an account with valid phoneNumber and token but weak password on /users/account/recovery/:phoneNumber PUT', function(done) {
    chai.request(server)
      .put('/users/account/recovery/5585999999999')
      .send({
        'token': user.recoveryCode,
        'newPassword': '1234'
      })
      .end(function(err, res) {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors[0].param.should.be.eql('newPassword')
        done()
      })
  })

  it('should successfully recover an account on /users/account/recovery/:phoneNumber PUT', function(done) {
    chai.request(server)
      .put('/users/account/recovery/5585999999999')
      .send({
        'token': user.recoveryCode,
        'newPassword': 'upm3@n3w2018'
      })
      .end(function(err, res) {
        res.should.have.status(200)
        done()
      })
  })

  it('should successfully get a JWT with the new credentials on /users/account/signin POST', function(done) {
    chai.request(server)
      .post('/users/account/signin')
      .send({
        'email': 'jimmy@wmlaw.com',
        'password': 'upm3@n3w2018'
      })
      .end(function(err, res) {
        res.should.have.status(200)
        res.headers.should.have.property('jwt')
        res.headers.jwt.should.be.a('string')
        jwt.verify(res.headers.jwt, config.jwt.jwtSecret, function(err, decoded) {
          decoded.should.have.property('_id')
          decoded.should.have.property('isActive')
          decoded.should.have.property('iat')
          decoded.should.have.property('exp')
          done()
        })
      })
  })
})

describe('User Phone Number Change Request', function() {
  it('should fail to get a code for phone number change with invalid phone number on /users/account/:id/account/phone-number PATCH', function(done) {
    chai.request(server)
      .patch('/users/' + user._id + '/account/phone-number')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'phoneNumber': '5585999'
      })
      .end(function(err, res) {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors[0].param.should.be.eql('phoneNumber')
        done()
      })
  })

  it('should successfully get a code for phone number change on /users/:id/account/phone-number PATCH', function(done) {
    chai.request(server)
      .patch('/users/' + user._id + '/account/phone-number')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'phoneNumber': '5585999999995'
      })
      .end(function(err, res) {
        res.should.have.status(200)
        res.headers.should.have.property('code')
        res.headers.code.should.be.a('string')
        res.headers.code.length.should.be.eql(4)
        user.phoneChangeCode = res.headers.code
        done()
      })
  })

  it('should fail to change phone number with invalid token on /users/:id/account/phone-number PUT', function(done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/phone-number')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'token': '1234557757'
      })
      .end(function(err, res) {
        res.should.have.status(403)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4301)
        done()
      })
  })

  it('should successfully change phone number on /users/account/:id/account/phone-number PUT', function(done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/phone-number')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'token': user.phoneChangeCode
      })
      .end(function(err, res) {
        res.should.have.status(200)
        done()
      })
  })
})

describe('User Email Change Request', function() {
  it('should fail to get a code for email change with invalid email on /users/account/:id/email PATCH', function(done) {
    chai.request(server)
      .patch('/users/' + user._id + '/account/email')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'email': 'jimmy'
      })
      .end(function(err, res) {
        res.should.have.status(400)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4000)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('array')
        res.body.errors[0].param.should.be.eql('email')
        done()
      })
  })

  it('should successfully get a code for email change on /users/account/:id/account/email PATCH', function(done) {
    chai.request(server)
      .patch('/users/' + user._id + '/account/email')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'email': 'jimmy@nucleus.eti.br'
      })
      .end(function(err, res) {
        res.should.have.status(200)
        res.headers.should.have.property('code')
        res.headers.code.should.be.a('string')
        res.headers.code.length.should.be.eql(4)
        user.emailChangeCode = res.headers.code
        done()
      })
  })

  it('should fail to change email with invalid token on /users/account/:id/account/email PUT', function(done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/email')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'token': '1234557757'
      })
      .end(function(err, res) {
        res.should.have.status(403)
        res.body.should.have.property('code')
        res.body.code.should.be.eql(4301)
        done()
      })
  })

  it('should successfully change email on /users/account/:id/account/email PUT', function(done) {
    chai.request(server)
      .put('/users/' + user._id + '/account/email')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        'token': user.emailChangeCode
      })
      .end(function(err, res) {
        res.should.have.status(200)
        done()
      })
  })
})

after(function(done) {
  userModel.remove({}, function(err, docs) {
    done()
  })
})
