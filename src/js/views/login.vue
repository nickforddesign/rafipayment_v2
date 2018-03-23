<template>
  <div class="text-center">
    <logo />
    <form class="box small invisible" @submit.prevent="submit">
      <field name="email" :errors="errors">
        <input
          v-model="email"
          v-validate="'required'"
          name="email"
          type="email"
          autocomplete="off"
          autocapitalize="off">  
      </field>

      <field name="password" :errors="errors">
        <password
          v-model="password"
          v-validate="'required'"
          name="password">
        </password>
      </field>

      <div class="text-left">
        <input type="checkbox" v-model="remember_me" id="remember_me">
        <label for="remember_me">Remember me</label>
      </div>

      <div class="actions">
        <button class="full primary" type="submit">Login</button>

        <div class="actions">
          <router-link to="/forgot">Forgot password?</router-link>
        </div>
      </div>
    </form>

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import session from '@/session'
import { getStorage, setStorage, clearStorage } from '@/utils'

export default {
  data() {
    return {
      loading: false,
      email: getStorage('previous_login'),
      password: null,
      remember_me: false
    }
  },
  created() {
    const remember_me = JSON.parse(getStorage('remember_me'))
    this.remember_me = remember_me === undefined
      ? true
      : remember_me
  },
  watch: {
    remember_me(val) {
      setStorage('remember_me', val)
      this.manageCredentials()
    }
  },
  methods: {
    async submit() {
      if (!this.loading) {
        const passed = await this.$validator.validateAll()
        if (passed) {
          this.login()
        }
      }
    },
    login() {
      const body = {
        email: this.email,
        password: this.password
      }
      this.$request('session/login', {
        method: 'post',
        body
      })
      .then(response => {
        setStorage('previous_login', this.email)
        this.$store.dispatch('login', response)
        session.fetch_primary(this, response)
      })
      .catch(this.handleError)
    },
    handleError() {
      this.$validator.errors.add(
        'password',
        'Invalid username or password',
        'required'
      )
    },
    manageCredentials() {
      if (this.remember_me) {
        if (this.email) {
          setStorage('previous_login', this.email)
        }
      } else {
        clearStorage('previous_login')
      }
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
  // width: 360px;
// }
.actions {
  margin-top: 20px;
}
</style>