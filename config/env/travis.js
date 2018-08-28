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
    expressSession: {
      name: 'default.sid',
      secret: 'default',
      resave: false,
      saveUninitialized: false,
      mongoStore: {
        collection: 'localsessions'
      }
    },
    helmet: {
      poweredBy: 'PHP 5.6.27'
    },
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
