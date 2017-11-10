<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Edit Split</h1>
    <div slot="body">

      <field name="split" :errors="errors">
        <currency v-model="split_amount" v-validate="'required'" name="split" ref="default" />
      </field>

    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Deferred, parseCurrency } from '@/utils'

export default {
  name: 'modal-lease-split',
  props: {
    confirm: Function,
    path: String,
    amount: {
      type: [Number, String]
    }
  },
  data() {
    return {
      split_amount: this.amount
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
        amount: parseCurrency(this.split_amount, Number)
      }
      const request = this.$request(this.path, {
        method: 'put',
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
