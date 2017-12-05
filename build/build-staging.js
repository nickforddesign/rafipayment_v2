require('./check-versions')()

process.env.NODE_ENV = 'staging'

const ora = require('ora')
const rm = require('rimraf')
const move = require('glob-move')
const path = require('path')
const webpack = require('webpack')
const chalk = require('chalk')
const config = require('../config')
const webpackConfig = require('./webpack.staging.conf')
const mergeDeepRight = require('ramda/src/mergeDeepRight')

const finalPath = path.resolve(__dirname, '../dist')

const spinner = ora('building for staging...')
spinner.start()

rm(webpackConfig.output.path, err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) {
      console.log('WHOA NOW')
      throw err
    } else {
      rm(finalPath + '/*', err => {
        if (err) throw err

        move(webpackConfig.output.path + '/*', finalPath)
          .then(() => {
            rm(webpackConfig.output.path, err => {
              if (err) throw err

              process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
              }) + '\n\n')

              if (stats.hasErrors()) {
                console.log(chalk.red('  Build failed with errors.\n'))
                process.exit(1)
              }

              console.log(chalk.cyan('  Build complete.\n'))
              console.log(chalk.yellow(
                '  Tip: built files are meant to be served over an HTTP server.\n' +
                '  Opening index.html over file:// won\'t work.\n'
              ))
            })
          })
          .catch(err => {
            throw err
          })
      })
    }
  })
})
