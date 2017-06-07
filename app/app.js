'use strict'

const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const app = express() // Create express app

// const routes = require('./routes')

app
  .set('trust proxy', true)
  .set('trust proxy', 'loopback')

// ==== MIDDLEWARES ====
  .use(morgan('dev'))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(cors())
  .use(helmet())

// ==== MOUNT ROUTES ====
  // .use('/v1', routes)

module.exports = app // export app module
