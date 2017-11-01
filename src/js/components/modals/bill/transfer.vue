<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Add Transfer</h1>
    <div slot="body">
      <field name="amount" :errors="errors">
        <currency v-model="amount" v-validate="'required'" ref="default" />
      </field>
    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
// import Transfer from '@/models/transfer/new'
import { Deferred, parseCurrency } from '@/utils'

export default {
  name: 'modal-transfer-add',
  props: {
    model: Object,
    confirm: Function
  },
  data() {
    return {
      amount: null
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

      const body = {
        amount: parseCurrency(this.amount, Number)
      }

      const request = this.$request(this.model.url, {
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
