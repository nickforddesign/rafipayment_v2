<template>
  <div class="text-center">
    <logo />
    <form class="box small invisible" @submit.prevent="validate" v-if="check">
      <field name="password" :errors="errors">
        <password
          v-model="password"
          v-validate="'required|min:8'"
          name="password"
          ref="default"/>
      </field>

      <field name="confirm" :errors="errors">
        <password
          v-model="password_confirm"
          v-validate.disable="{ required: true, is: password }"
          data-vv-as="password confirmation"
          name="confirm"/>
      </field>

      <div class="actions">
        <button type="submit">Submit</button>
      </div>
    </form>

    <loading v-else />

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import app from '@/app'
import session from '@/session'
import { sleep } from '@/utils'

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
    } else {
      this.showError()
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
    sendToken() {
      const body = {
        token: this.token
      }
      this.$request('account/profile/password/check', {
        body,
        method: 'put'
      })
      .then(() => {
        this.check = true
      })
      .catch(() => {
        this.showError()
      })
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

      session.set_refresh_token(response)
      session.refresh_session(this)

      this.showSuccess()

      return response
    },
    showError() {
      app.alert(
        'It looks like the password reset link you used is no longer valid.',
        this.$router.push('/'),
        'Invalid link',
        'OK',
        'danger'
      )
    },
    async showSuccess() {
      await sleep(600)
      app.alert(
        'Your password has been reset successfully!',
        null,
        'Password Updated',
        'OK',
        'success'
      )
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