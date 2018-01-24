const crypto = require('crypto')
const client = require('engine.io-client')
const url = require('../src/js/config').socket
const version = require('../package.json').version
const secret = require('./deployment_secret.json').key

const key = crypto.createHmac('sha256', secret).digest('hex')

const socket = client(url)

socket.on('open', () => {
  console.log(`Connected to socket server at: ${url}`)

  socket.on('message', data => {
    console.log(data)
  })

  socket.on('close', () => {
    console.log('Closed connection')
  })
})

socket.send(JSON.stringify({
  key,
  deployment: {
    refresh: true,
    timestamp: new Date(),
    version
  }
}))

socket.close()
