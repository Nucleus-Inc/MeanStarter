module.exports = {
  db: 'mongodb://localhost/meanstarter',
  mean: {
    errors: {
      dumpExceptions: true,
      dumpUnkownExeceptionsOnly: true
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
    },
    winston: {
      transports: {
        console: {
          colorize: true,
          json: true,
          statusLevels: false
        }
      }
    }
  }
}
