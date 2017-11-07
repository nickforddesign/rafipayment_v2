<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Add Charge</h1>
    <div slot="body">

      <field name="charge type">
        <input type="radio" id="fee" name="charge type" value="fee" v-model="charge_type">
        <label for="fee">Fee</label>
        <input type="radio" id="credit" name="charge type" value="credit" v-model="charge_type">
        <label for="credit">Credit</label>
      </field>

      <field name="amount" :errors="errors">
        <currency v-model="amount" v-validate="'required|min_currency:0.01'" name="amount" />
      </field>

      <field name="type">
        <input type="radio" id="recurring" name="type" value="recurring" v-model="type">
        <label for="recurring">Recurring</label>
        <input type="radio" id="scheduled" name="type" value="scheduled" v-model="type">
        <label for="scheduled">Scheduled</label>
      </field>

      <field name="start date" :errors="errors" v-if="type === 'scheduled'">
        <date-picker v-model="date" v-validate="'required'" />
      </field>

      <field name="description">
        <input type="text" v-model="description">
      </field>
    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Deferred, parseCurrency } from '@/utils'

import Period from '@/models/lease/charge'

export default {
  name: 'modal-lease--charge',
  props: {
    model: Object,
    confirm: Function,
    path: String
  },
  data() {
    return {
      date: null,
      amount: null,
      charge_type: 'fee',
      type: 'recurring',
      description: ''
    }
  },
  models: {
    period() {
      return this.model
        ? this.model
        : new Period(null, {
          basePath: this.path
        })
    }
  },
  created() {
    // if editing an existing charge
    if (this.model) {
      this.amount = this.model.amount
      this.date = this.model.date
      this.description = this.model.description
      this.type = this.model.type
      if (this.amount < 0) {
        this.charge_type = 'credit'
      }
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
        date: this.date,
        amount: this.amount,
        description: this.description
      }

      if (this.charge_type === 'credit') {
        body.amount = -parseCurrency(body.amount)
      }

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
