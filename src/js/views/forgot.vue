<template>
  <div class="text-center">
    <logo />
    <form class="box small invisible" @submit.prevent="validate">
      <field name="email" :errors="errors">
        <input type="text" v-model="email" name="email" v-validate="'required|email'" autocomplete="off">
      </field>

      <div class="actions">
        <button class="full primary" type="submit">Submit</button>
        <div class="actions">
          <router-link to="/">Cancel</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import app from '@/app'

export default {
  name: 'forgot-password',
  data() {
    return {
      email: ''
      // submitted: false
    }
  },
  methods: {
    async validate() {
      const passed = await this.$validator.validateAll()
      if (passed) {
        this.submit()
      }
    },
    async submit() {
      await this.request()
      // this.submitted = true
    },
    async request() {
      const body = {
        email: this.email
      }
      const response = this.$request('account/profile/password', {
        body,
        method: 'post'
      })

      response
      .then(() => {
        app.alert(
          `Thank you, a password reset email has been sent to ${this.email}`,
          null,
          'Email Sent',
          'OK',
          'success'
        )
      })
      .catch((error) => {
        app.alert(
          `Sorry, we couldn't find a user with that email address`,
          null,
          error.message,
          'OK',
          'danger'
        )
      })

      return response
    },
    async send() {
      const body = {
        email: this.email,
        code: this.code
      }
      const response = await this.$request('account/profile/password', {
        body,
        method: 'put'
      })
      return response
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.logo {
  width: 180px;
  margin: 0 auto;
}
// .box {
//   width: 360px;
// }
.actions {
  margin-top: 20px;
}
</style>