const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')
should = chai.should()

let user = require('specs/resources/schemas/user.js')

chai.use(chaiHttp)

describe('User Profile', () => {
  it('should successfully get profile info on /users/:id/profile GET', (done) => {
    chai.request(server)
      .get('/users/' + user._id + '/profile')
      .set('Authorization', 'JWT ' + user.jwt)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('profile')
        res.body.profile.should.be.a('object')
        res.body.profile.should.have.property('pictureUrl')
        done()
      })
  })
})
