module.exports = {
  db: 'mongodb://localhost/meanstarter',
  mean: {
    errors: {
      logExceptionsOnConsole: true,
      logUncaughtExeceptionsOnly: true
    }
  },
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
