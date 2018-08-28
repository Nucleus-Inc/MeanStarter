module.exports = {
  skip: function (req, res) {
    return res.statusCode !== 500
  },
  level: function (req, res) {
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
  }
}
