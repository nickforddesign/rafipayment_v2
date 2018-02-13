<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Add Charge</h1>
    <div slot="body">

      <field name="charge type">
        <radio v-model="charge_type" :options="[
          {
            label: 'Fee',
            value: 'fee'
          },
          {
            label: 'Credit',
            value: 'credit'
          }
        ]" />
      </field>

      <field name="amount" :errors="errors">
        <currency v-model="amount" v-validate="'required|min_currency:0.01'" name="amount" />
      </field>

      <field name="type" v-if="!model">
        <radio v-model="type" :options="[
          {
            label: 'Recurring',
            value: 'recurring'
          },
          {
            label: 'Scheduled',
            value: 'scheduled'
          }
        ]" />
      </field>

      <field name="date" :errors="errors" v-if="!model && type === 'scheduled'">
        <date-picker v-model="date" v-validate="'required'" name="date" />
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
  watch: {
    type(val) {
      if (val !== 'scheduled') {
        this.date = null
      }
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
        if (this.confirm) {
          this.confirm()
        }
        this.close()
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
