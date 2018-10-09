module.exports = {
  db: 'mongodb://localhost/meanstarter',
  auth: {
    local: {
      tokens: {
        recovery: {
          expires: '1d'
        },
        activation: {
          expires: '1d'
        },
        confirmation: {
          expires: '1d'
        }
      },
      jwt: {
        jwtSecret: 'meanstarter',
        jwtSession: {
          session: false
        },
        expires: '7d'
      }
    },
    google: {
      clientID:
        '962854434183-e7r3pbj2fs580ni04oq0c96bld5neubj.apps.googleusercontent.com',
      clientSecret: 'fEzeOabyCvded3R96iebQkRK',
      callbacks: {
        user: {
          callbackURL: 'http://localhost:5000/users/auth/google/oauth2/callback'
        }
      }
    },
    facebook: {
      clientID: '2202473779971326',
      clientSecret: 'd05a4f99f8618085c39ed8108a653eb1',
      profileFields: ['id', 'displayName', 'photos', 'email'],
      callbacks: {
        user: {
          callbackURL:
            'http://localhost:5000/users/auth/facebook/oauth2/callback'
        }
      }
    }
  },
  errors: {
    dumpExceptions: true,
    dumpUnkownExeceptionsOnly: true
  },
  modules: {
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
