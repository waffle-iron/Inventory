const config = require('../config')

const winston = require('winston')
winston.level = config.level

module.exports = Object.assign({}, winston)
