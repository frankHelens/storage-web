var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  URL: '"http://localhost:3000"'
  // URL: '"http://120.78.82.211:3000"'
  // URL: '"http://st56.xicp.net:20081"'
  // URL: '"http://192.168.50.222:30080"'
  // 光胜
  // URL: '"http://192.168.50.224:8080"'
  // 裕丰
  // URL: '"http://192.168.50.235:8080"'
})
