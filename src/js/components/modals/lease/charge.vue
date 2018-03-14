<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">{{ this.model ? 'Edit' : 'Add' }} Charge</h1>
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

      <field name="tenant" v-if="!this.model">
        <select-menu :options="tenants" v-model="target" />
      </field>

    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { parseCurrency } from '@/utils'

import Charge from '@/models/lease/charge'

export default {
  name: 'modal-lease--charge',
  props: {
    model: Object,
    // tenant: Object,
    confirm: Function,
    lease: Object,
    basePath: String
  },
  data() {
    return {
      date: null,
      amount: null,
      target: 'All',
      charge_type: 'fee',
      type: 'recurring',
      description: ''
    }
  },
  models: {
    charge() {
      return this.model
        ? this.model
        : new Charge(null, {
          basePath: `${this.lease.url}`
        })
    }
  },
  computed: {
    tenants() {
      const array = ['All']
      this.lease.tenants.map(tenant => {
        array.push({
          label: tenant.first_name + ' ' + tenant.last_name,
          value: tenant.id
        })
      })
      return array
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
    // console.log(this.lease.url)
    // if editing an existing charge
    if (this.model) {
      this.amount = this.model.amount
      this.date = this.model.date
      this.description = this.model.description
      this.type = this.model.type
      if (this.amount < 0) {
        this.charge_type = 'credit'
      }
      // if (this.tenant) {
      //   this.$charge.$options.basePath = `${this.lease.url}/tenants/${this.tenant}/charges`
      // }
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

      const path = !this.model && this.target !== 'All'
        ? `tenants/${this.target}/charges`
        : !this.model
          ? `charges`
          : ``

      const request = this.$charge.save(body, { path })
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
