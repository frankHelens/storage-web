require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
var spinner = ora('building for production...')
const low = require('lowdb')
// const db = low('package.json')
  // const { exec, execFileSync } = require('child_process')
const moment = require('moment')

// const newSubversion = config.build.env.SUBVERSION + 1
// const newVersion = 'V' + config.build.env.VERSION.substr(1, config.build.env.VERSION.length - 2) + '.' + newSubversion
// db.set('subversion', newSubversion)
//   .write()
spinner.start()
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if(err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if(err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')
      // exec('cp -R dist/dist dist/' + newVersion, function (error, stdout, stderr) {
      //   if (error) {
      //     throw error
      //   }
      // })
      // execFileSync('build/sftp.sh', {}, (error, stdout, stderr) => {
      //   if (error) {
      //     throw error
      //   }
      // })
    console.log('现在是：' + moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
    console.log(chalk.cyan('  打包成功，辛苦了。\n'))
  })
})
