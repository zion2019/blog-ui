'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BACKEND_URL: '"https://www.zion.hi.cn/api/"',
  PIC_URL: '"https://www.zion.hi.cn/image/"',
})

