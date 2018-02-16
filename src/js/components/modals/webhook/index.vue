<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Add Webhook Subscription</h1>
    <div slot="body">
      <field name="url" label="URL" :errors="errors">
        <input type="text" v-model="url" v-validate="'required|url:require_protocol'" placeholder="https://" name="url" ref="default">
      </field>
    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>

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
      const body = this.$data
      await this.$request('payment/webhook_subscriptions', {
        method: 'post',
        body
      })
      this.confirm()
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>