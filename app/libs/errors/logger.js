const chalk = require('chalk')

module.exports = app => {
  const lib = {}
  const log = console.log

  lib.dumpError = err => {
    log(chalk.white(chalk.bgRed.bold('Exception has been caught:')))
    log(chalk.red(err.stack || err))
  }

  return lib
}
