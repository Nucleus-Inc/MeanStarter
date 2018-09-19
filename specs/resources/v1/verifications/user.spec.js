const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')
should = chai.should()

let user = require('specs/resources/v1/schemas/user.js')

chai.use(chaiHttp)

describe('User Account', () => {
  it('should successfully verify existent user by Phone Number on /api/v1/verifications/user GET', done => {
    chai
      .request(server)
      .get('/api/v1/verifications/user')
      .query({
        email: user.email
      })
      .end((err, res) => {
        res.should.have.status(422)
        done()
      })
  })

  it('should successfully verify existent user by Phone Number on on /api/v1/verifications/user GET', done => {
    chai
      .request(server)
      .get('/api/v1/verifications/user')
      .query({
        phoneNumber: user.phoneNumber
      })
      .end((err, res) => {
        res.should.have.status(422)
        done()
      })
  })

  it('should successfully verify non-existent user by Phone Number on /api/v1/verifications/user GET', done => {
    chai
      .request(server)
      .get('/api/v1/verifications/user')
      .query({
        email: 'doesntexist@email.com'
      })
      .end((err, res) => {
        res.should.have.status(404)
        done()
      })
  })

  it('should successfully verify non-existent user by Phone Number on /api/v1/verifications/user GET', done => {
    chai
      .request(server)
      .get('/api/v1/verifications/user')
      .query({
        phoneNumber: '5599999999990'
      })
      .end((err, res) => {
        res.should.have.status(404)
        done()
      })
  })

  it('should fail to verify user with missing query fiels by Phone Number on /api/v1/verifications/user GET', done => {
    chai
      .request(server)
      .get('/api/v1/verifications/user')
      .query({})
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('errors')
        res.body.errors.should.be.a('object')
        done()
      })
  })
})
