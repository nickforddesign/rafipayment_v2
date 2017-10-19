<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Add Webhook Subscription</h1>
    <div slot="body">
      <field name="url" label="URL" :errors="errors">
        <input type="text" v-model="url" v-validate="'required|url'" placeholder="https://" name="url" ref="default">
      </field>
    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
// import Company from '@/models/company'
// import { Collection } from 'vue-collections'
import { Deferred } from '@/utils'
// import User from '@/models/user'
// import session from '@/session'

export default {
  name: 'modal-webhook-add',
  props: {
    model: Object,
    confirm: Function
  },
  data() {
    return {
      url: ''
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async validate() {
      const deferred = new Deferred()
      let passed = await this.$validator.validateAll()
      // console.log({passed})
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

      console.log({body})

      const request = this.$request('payment/webhook_subscriptions', {
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

<style scoped lang="scss">
  
</style>