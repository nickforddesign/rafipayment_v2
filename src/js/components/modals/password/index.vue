<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Change Password</h1>
    <div slot="body">
      <field name="password" :errors="errors">
        <password
          v-model="password"
          v-validate.disable="'required|min:8'"
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
    </div>
  </modal>
</template>

<script>
import app from '@/app'

export default {
  name: 'modal-password',
  props: {
    model: Object,
    confirm: Function
  },
  data() {
    return {
      loading: false,
      password: '',
      password_confirm: ''
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
      const name = 'confirm'
      if (this.errors.has(name)) {
        this.errors.remove(name)
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    validate() {
      return new Promise(async (resolve, reject) => {
        const passed = await this.$validator.validateAll()
        if (passed) {
          await this.confirmChange()
          resolve()
        } else {
          reject()
        }
      })
    },
    async confirmChange() {
      this.loading = true

      const data = {
        password: this.password
      }
      return this.model.save(data)
        .then((response) => {
          this.loading = true
          app.alert(
            'Your new password has been saved',
            this.confirm,
            'Password Updated',
            'OK',
            'success'
          )
        })
    }
  }
}
</script>
