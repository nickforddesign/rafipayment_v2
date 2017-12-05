require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const mv = require('mv')
const path = require('path')
const webpack = require('webpack')
const chalk = require('chalk')
const config = require('../config')
const webpackConfig = require('./webpack.build.conf')
const mergeDeepRight = require('ramda/src/mergeDeepRight')

const finalPath = path.resolve(__dirname, '../dist')

const spinner = ora('building for production...')
spinner.start()

rm(webpackConfig.output.path, err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
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
    
    rm(finalPath, err => {
      if (err) throw err

      mv(webpackConfig.output.path, finalPath, err => {
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
  })
})
