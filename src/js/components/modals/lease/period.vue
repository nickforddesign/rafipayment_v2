<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Add Period</h1>
    <div slot="body">

      <field name="start date" :errors="errors">
        <date-picker v-model="start_date" name="start date" ref="default" />
      </field>

      <field name="amount" :errors="errors">
        <currency v-model="amount" v-validate="'required'" name="amount" />
      </field>

    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Deferred } from '@/utils'

import Period from '@/models/lease/period'

export default {
  name: 'modal-lease--period',
  props: {
    model: Object,
    confirm: Function,
    path: String
  },
  data() {
    return {
      start_date: null,
      amount: this.amount
    }
  },
  models: {
    period() {
      return new Period(null, {
        basePath: this.path
      })
    }
  },
  created() {
    if (this.model) {
      this.$period = this.model.$data
      this.start_date = this.model.start_date
      this.amount = this.model.amount
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
        start_date: this.start_date,
        amount: this.amount
      }

      console.log(this.$period)

      const request = this.$period.save(body)
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
