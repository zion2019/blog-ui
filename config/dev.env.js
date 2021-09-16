'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BACKEND_URL: '"http://42.193.143.15:9302/"',
  PIC_URL: '"http://42.193.143.15/image/"',
})
