<template>
  <div class="text-center">
    <logo />
    <form class="box small" @submit.prevent="validate" v-if="check">
      <field name="password" :errors="errors">
        <password
          v-model="password"
          v-validate="'required|min:8'"
          name="password"
          ref="default"/>
      </field>

      <field name="password confirm" :errors="errors">
        <password
          v-model="password_confirm"
          v-validate="'required|confirmed:password'"
          data-vv-as="password"
          name="password confirm"/>
      </field>

      <button type="submit">Submit</button>
    </form>

    <loading v-else />

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import session from '@/session'

export default {
  name: 'reset-password',
  data() {
    return {
      check: false,
      token: null,
      password: '',
      password_confirm: ''
    }
  },
  created() {
    this.token = this.$route.query.token
    if (this.token) {
      this.sendToken()
    }
  },
  watch: {
    password() {
      const name = 'password'
      if (this.errors.has(name)) {
        this.errors.remove(name)
      }
    },
    password_confirm() {
      const name = 'password_confirm'
      if (this.errors.has(name)) {
        this.errors.remove(name)
      }
    }
  },
  methods: {
    async validate() {
      const passed = await this.$validator.validateAll()
      if (passed) {
        this.sendPassword()
      }
    },
    async sendToken() {
      const body = {
        token: this.token
      }
      const response = await this.$request('account/profile/password/check', {
        body,
        method: 'put'
      })

      this.check = true
      return response
    },
    async sendPassword() {
      const body = {
        token: this.token,
        password: this.password
      }
      const response = await this.$request('account/profile/password', {
        body,
        method: 'put'
      })

      console.log(response)

      session.set_refresh_token(response)
      session.refresh_session(this)
      return response
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
.actions {
  margin-top: 20px;
}
</style>