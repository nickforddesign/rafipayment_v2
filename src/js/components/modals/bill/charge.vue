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
        <currency v-model="amount" v-validate="'required|min_currency:0.00'" name="amount" />
      </field>

      <field name="description">
        <input type="text" v-model="description">
      </field>
    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { parseCurrency } from '@/utils'

import Period from '@/models/lease/charge'

export default {
  name: 'modal-bill--charge',
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
