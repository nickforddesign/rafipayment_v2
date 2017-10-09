<template>
  <div>
    dash
    {{ $user }}
    <button @click="logout">Logout</button>
    <button @click="test">Test</button>
    <button @click="fetch">Fetch account</button>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import session from '@/session'

export default {
  models: {
    user() {
      return session.$user
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    test() {
      this.$store.dispatch('login', {
        first_name: 'Test',
        last_name: 'Wtf',
        session: {
          access: {},
          refresh: {}
        }
      })
    },
    async fetch() {
      const request = await this.$request('/account/profile')
      console.log(request)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>