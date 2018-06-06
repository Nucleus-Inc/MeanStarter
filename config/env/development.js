module.exports = {
  db: 'mongodb://localhost/meanstarter',
  jwt: {
    jwtSecret: 'meanstarter',
    jwtSession: {
      session: false
    }
  },
  libs: {
    nodeMailer: {
      service: 'Gmail',
      user: '',
      password: '',
      from: ''
    }
  }
}

