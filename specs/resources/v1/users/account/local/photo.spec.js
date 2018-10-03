const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')
should = chai.should()

let user = require('specs/resources/v1/schemas/user.js')

chai.use(chaiHttp)

describe('User Profile Picture', () => {
  it('should fail to udpate photo with invalid url on /api/v1/users/:id/account/local/photo PUT', done => {
    chai
      .request(server)
      .put('/api/v1/users/' + user._id + '/account/local/photo')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        photo: 'bla'
      })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('object')
        res.body.errors.should.have.property('photo')
        done()
      })
  })

  it('should successfully update photo on /api/v1/users/:id/account/local/photo PUT', done => {
    chai
      .request(server)
      .put('/api/v1/users/' + user._id + '/account/local/photo')
      .set('Authorization', 'JWT ' + user.jwt)
      .send({
        photo: 'http://www.newpicture.com'
      })
      .end((err, res) => {
        console.log('################')
        console.log(res.body)
        res.should.have.status(200)
        res.body.should.have.property('account')
        res.body.account.should.have.property('local')
        res.body.account.local.should.be.a('object')
        res.body.account.local.should.have.property('displayName')
        res.body.account.local.displayName.should.be.eql(user.displayName)
        res.body.account.local.should.have.property('photo')
        res.body.account.local.photo.should.be.eql('http://www.newpicture.com')
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
