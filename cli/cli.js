#! /usr/local/bin/node

const program = require('commander')
const log = console.log
const chalk = require('chalk')

program
    .version('0.1.0')
    .command('hi <hello>')
    .description('Hello World')
    .action((command) => {
        log('\n')
        log(chalk.yellow.bold('Hello ...'))
        log('\n')
    })

program.parse(process.argv)