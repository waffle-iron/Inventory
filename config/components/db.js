'use strict'

const joi = require('joi')

const envVarsSchema = joi.object({
  DB_CLIENT: joi.string().required(),
  DB_HOST: joi.string().required(),
  DB_PORT: joi.number().required(),
  DB_USER: joi.string().required(),
  DB_PSWD: joi.string().required(),
  DB_NAME: joi.string().required()
}).unknown()
  .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  db: {
    client: envVars.DB_CLIENT,
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    user: envVars.DB_USER,
    pswd: envVars.DB_PSWD,
    name: envVars.DB_NAME
  }
}

module.exports = config
