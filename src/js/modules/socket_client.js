import engine from 'engine.io-client'
import config from '@/config'
import { sleep } from '@/utils'

export default class SocketClient {
  constructor(vm) {
    this.vm = vm
    this.initSockets()
  }
  async initSockets() {
    if (!this.socket) {
      console.log('Attempting to connect to websockets server...')
      this.socket = engine(config.socket)

      this.socket.on('open', () => {
        this.initSocketEventHandlers()
      })
      this.socket.on('error', async () => {
        if (typeof config.socket_reconnect === 'number') {
          await sleep(config.socket_reconnect)
          this.socket = null
          this.initSockets()
        }
      })
    }
  }

  initSocketEventHandlers() {
    console.log(`Connected to websockets server at ${config.socket}`)
    this.socket.on('message', message => {
      const data = JSON.parse(message)
      console.log(data)
      if (data.deployment && data.deployment.refresh) {
        this.vm.requires_refresh = true
      }
    })
    this.socket.on('close', () => {
      console.log('Closed socket connection')
      this.socket = null
      this.initSockets()
    })
  }
}
