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

      <field name="tenant" v-if="this.tenants">
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
  name: 'modal-bill--charge',
  props: {
    bill: Object,
    confirm: Function
  },
  data() {
    return {
      amount: null,
      charge_type: 'fee',
      description: '',
      target: null
    }
  },
  models: {
    charge() {
      return new Charge(null, {
        basePath: this.bill.url
      })
    }
  },
  created() {
    if (this.bill.type === 'automatic') {
      this.target = this.tenants[0].value
    }
  },
  computed: {
    tenants() {
      if (this.bill.type === 'automatic') {
        const array = []
        this.bill.tenants.map(tenant => {
          array.push({
            label: tenant.first_name + ' ' + tenant.last_name,
            value: tenant.id
          })
        })
        return array
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
        amount: this.amount,
        description: this.description
      }

      if (this.charge_type === 'credit') {
        body.amount = -parseCurrency(body.amount)
      }

      const path = this.tenants && this.target !== 'All'
        ? `tenants/${this.target}/charges`
        : `charges`

      const request = this.$charge.save(body, { path })
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
