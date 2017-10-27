<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Edit Email</h1>
    <div slot="body">

      <field name="email" :errors="errors">
        <input type="text" v-model="email" v-validate="'required|email'" name="email" ref="default">
      </field>

    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Deferred } from '@/utils'

export default {
  name: 'modal-user-email',
  props: {
    model: Object,
    confirm: Function
  },
  data() {
    return {
      email: this.model.email
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async validate() {
      const deferred = new Deferred()
      let passed = await this.$validator.validateAll()
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

      const body = this.$data
      const request = this.$request('account/profile/email', {
        method: 'post',
        body
      })
      request.then(response => {
        this.confirm()
      })
      .catch(error => {
        console.log({error})
      })
      return request
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
