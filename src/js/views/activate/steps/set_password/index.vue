<template>
  <form @submit.prevent="validate">
    <h2>Welcome {{ $user.first_name }}!</h2>
    
    <div class="message">
      Create a password to activate your account.
    </div>

    <field name="password" :errors="errors">
      <password v-model="password" name="password" v-validate.disable="'required|min:8'" />
    </field>

    <field name="confirm" :errors="errors">
      <password v-model="password_confirm" name="confirm" data-vv-as="password confirmation" v-validate.disable="{ required: true, is: password }" />
    </field>

    <div class="note">
      By continuing, you agree to the Rafi Payment <a href="http://payment.rafiproperties.com/terms" target="_blank">terms of use</a> and <a href="http://payment.rafiproperties.com/privacy">privacy policy</a>
    </div>

    <div class="actions">
      <button class="primary">Next</button>
    </div>
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
