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
        }
      }
    },
    google: {
      clientID: '',
      clientSecret: '',
      callbacks: {
        user: {
          callbackURL: 'http://localhost:5000/users/auth/google/oauth2/callback'
        }
      }
    },
    facebook: {
      clientID: '',
      clientSecret: '',
      profileURL:
        'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
      profileFields: ['id', 'displayName', 'photos', 'email'],
      callbacks: {
        user: {
          callbackURL:
            'http://localhost:5000/users/auth/facebook/oauth2/callback'
        }
      }
    }
  },
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
    },
    expires: '7d'
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
