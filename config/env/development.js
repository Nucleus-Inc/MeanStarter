module.exports = {
  db: {
    mongo: {
      uri: 'mongodb://localhost/meanstarter'
    },
    redis: {
      host: 'localhost',
      port: 6379
    }
  },
  ssl: {
    enforce: false
  },
  proxy: {
    setTrustProxy: false
  },
  csrfProtection: {
    enable: false
  },
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
  modules: {
    sslify: {
      trustProtoHeader: false
    },
    expressSession: {
      name: 'default.sid',
      secret: 'default',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: false,
        path: '/',
        maxAge: 60 * 60 * 1000
      },
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
    sendgrid: {
      apiKey: 'API_KEY',
      templateId: 'TEMPLATE_ID',
      senderName: 'SENDER_NAME',
      senderMail: 'SENDER_MAIL'
    },
    winston: {
      transports: {
        file: {
          level: 'error',
          silent: false,
          filename: '/app.log',
          maxsize: 5242880,
          maxFiles: 5
        },
        console: {
          level: 'info',
          silent: false
        }
      }
    },
    expressWinston: {
      transports: {
        file: {
          level: 'error',
          silent: false,
          filename: '/app.log',
          maxsize: 5242880,
          maxFiles: 5
        },
        console: {
          level: 'info',
          silent: false
        }
      },
      meta: false,
      expressFormat: true
    },
    rateLimiter: {
      points: 1000,
      duration: 1
    }
  }
}
