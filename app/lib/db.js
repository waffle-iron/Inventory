'use strict'

const createKnex = require('knex')
const config = require('../../config')
console.log(config)
// connection: 'postgres://postgres:12345@localhost:5432/inventory'
const knex = createKnex({
  client: config.db.client,
  connection: {
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.pswd,
    database: config.db.name
  }
})

module.exports = knex
