<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  data() {
    return {
      email: 'mscott@rafiproperties.com',
      password: 'password',
      email_auth: 'mscott@rafiproperties.com',
      token_auth: ''
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'access'
    ])
  },
  methods: {
    test(method) {
      this.$request('/thing', {
        method
      })
        .then(response => {
          console.log({response})
        })
        .catch(err => {
          console.warn(err)
        })
    },
    async jsfiddle() {
      const response = await this.$request('http://google.com/')
      console.log({response})
    },
    login() {
      const body = {
        email: this.email,
        password: this.password
      }
      console.log({body})
      this.$request('/session/login', {
        method: 'post',
        body
      })
        .then(response => {
          console.log(response)
          this.$store.dispatch('login', response)
        })
        .catch(error => {
          console.warn(error)
        })
    },
    async profile() {
      const response = await this.$request('/account/profile')
      console.log(response)
    },
    authenticate() {
      const body = {
        email: this.email_auth
      }
      this.$request('/session/authenticate', {
        method: 'post',
        body
      })
        .then(response => {
          console.log(response)
          this.token_auth = response.token
          // this.$store.dispatch('login', response)
        })
        .catch(error => {
          console.warn(error)
        })
    },
    send_token() {
      const body = {
        token: this.token_auth
      }
      this.$request('/session/authenticate', {
        method: 'put',
        body
      })
        .then(response => {
          console.log(response)
          // this.token_auth = response.token
          // this.$store.dispatch('login', response)
        })
        .catch(error => {
          console.warn(error)
        })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
