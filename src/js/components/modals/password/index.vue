<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Change Password</h1>
    <div slot="body">
      <form @submit.prevent="validate">
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

      </form>
    </div>
  </modal>
</template>

<script>
import app from '@/app'
import { Deferred } from '@/utils'

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
      const name = 'password_confirm'
      if (this.errors.has(name)) {
        this.errors.remove(name)
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async validate() {
      const deferred = new Deferred()
      const passed = await this.$validator.validateAll()
      if (passed) {
        await this.confirmChange()
        deferred.resolve()
      } else {
        deferred.reject()
      }
      return deferred.promise
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
