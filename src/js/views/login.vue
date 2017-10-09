<template>
  <div>
    <form @submit.prevent="login">
      <input type="text" v-model="email">
      <input type="password" v-model="password">
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  data() {
    return {
      email: 'mscott@rafiproperties.com',
      password: 'password'
    }
  },
  methods: {
    login() {
      const body = {
        email: this.email,
        password: this.password
      }
      this.$request('/session/login', {
        method: 'post',
        body
      })
        .then(response => {
          this.$store.dispatch('login', response)
        })
        .catch(error => {
          console.warn(error)
        })
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>