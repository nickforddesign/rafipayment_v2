<template>
  <div>
    <logo />
    <form class="box small" @submit.prevent="submit">
      <div class="field-group">
        <legend>Email</legend>
        <input
          v-model="email"
          v-validate="'required'"
          name="email"
          type="email"
          autocomplete="off"
          autocapitalize="off">
        <validation name="email" :errors="errors"></validation>
      </div>
      <div class="field-group">
        <legend>Password</legend>
        <password
          v-model="password"
          v-validate="'required'"
          name="password">
        </password>
        <validation name="password" :errors="errors"></validation>
      </div>
      <button type="submit">Login</button>
    </form>
    <router-link to="/forgot">Forgot password?</router-link>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  data() {
    return {
      loading: false,
      email: 'dwallace@rafiproperties.com',
      password: 'password'
    }
  },
  methods: {
    async submit() {
      if (this.loading) {
        return false
      }
      const passed = await this.$validator.validateAll()
      if (passed) {
        this.login()
      }
    },
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
      .catch(this.handleError)
    },
    handleError() {
      this.$validator.errors.add(
        'password',
        'Invalid username or password',
        'required'
      )
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.logo {
  width: 200px;
  margin: 0 auto;
}
.box {
  width: 360px;
}
</style>