'use strict'

const environment = require('./components/environment')
const server = require('./components/server')
const db = require('./components/db')
const secret = require('./components/secret')

module.exports = Object.assign({}, environment, server, db, secret)
