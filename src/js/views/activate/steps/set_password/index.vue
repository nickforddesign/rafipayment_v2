<template>
  <form @submit.prevent="validate">
    <h2>Welcome {{ $user.first_name }}!</h2>
    Create a password to activate your account.

    <field name="password" :errors="errors">
      <password v-model="password" name="password" v-validate="'required'" />
    </field>

    <field name="password confirm" :errors="errors">
      <password v-model="password_confirm" name="password confirm" data-vv-as="password confirm" v-validate="'required|confirmed:password'" />
    </field>

    <div class="note">
      By continuing, you agree to the Rafi Payment <a href="http://payment.rafiproperties.com/terms" target="_blank">terms of use</a> and <a href="http://payment.rafiproperties.com/privacy">privacy policy</a>
    </div>

    <button class="primary">Next</button>
  </form>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import session from '@/session'

export default {
  name: 'set-password',
  props: ['step'],
  models: {
    user() {
      return session.$user
    }
  },
  data() {
    return {
      password: '',
      password_confirm: ''
    }
  },
  methods: {
    async validate() {
      const passed = await this.$validator.validateAll()
      if (passed) {
        this.save()
      }
    },
    async save() {
      const body = {
        password: this.password
      }

      await session.$user.save(body, { path: 'profile' })
      this.complete()
    },
    complete() {
      this.step.value = true
      this.$parent.next()
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>