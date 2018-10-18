const fs = require('fs')

module.exports = {
  createLogDir: () => {
    if (!fs.existsSync('logs')) {
      /* Create logs directory if it does not exist */
      fs.mkdirSync('logs')
    }
  },
  skip: (req, res) => {
    return !!(res.statusCode !== 500)
  },
  getStatusLevel: function (req, res) {
    let level = ''

    if (res.statusCode >= 100) {
      level = 'info'
    }
    if (res.statusCode >= 400) {
      level = 'warn'
    }
    if (res.statusCode >= 500) {
      level = 'error'
    }
    return level
  },
  formatParams: info => {
    let msg

    if (info.meta && Object.keys(info.meta).length === 0) {
      msg = `[${info.timestamp}] ${info.level}: ${info.message}`
    } else if (info.meta && Object.keys(info.meta).length !== 0) {
      msg = `[${info.timestamp}] ${info.level}: ${
        info.message
      } ${JSON.stringify(info.meta)}`
    } else {
      msg = `[${info.timestamp}] ${info.level}: ${info.message}`
    }

    return msg
  }
}
