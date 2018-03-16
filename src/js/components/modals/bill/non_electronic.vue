<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Add Non-Electronic Payment</h1>
    <div slot="body">
      <field name="amount" :errors="errors">
        <currency v-model="amount" v-validate="'required'" ref="default" />
      </field>
      <field name="tenant">
        <select-menu :options="tenants" v-model="target" />
      </field>
    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
// import moment from 'moment'
import { path } from 'ramda'
import app from '@/app'
import { parseCurrency, prettyCurrency } from '@/utils'
import Transfer from '@/models/transfer/new'

export default {
  name: 'modal-transfer-add',
  props: {
    model: Object,
    confirm: Function
  },
  data() {
    return {
      amount: null,
      target: null
    }
  },
  models: {
    transfer() {
      return new Transfer(null, {
        basePath: `${this.model.url}/non_electronic`
      })
    }
  },
  created() {
    this.target = this.tenants[0].value
  },
  computed: {
    tenants() {
      return this.model.tenants.map(tenant => {
        return {
          label: tenant.first_name + ' ' + tenant.last_name,
          value: tenant.id
        }
      })
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
        amount: parseCurrency(this.amount, Number),
        tenant: this.target
      }
      const request = this.$transfer.save(body, {
        method: 'post'
      })
      request.then(response => {
        this.confirm()
        app.alert(
          `The non-electronic payment of ${prettyCurrency(this.amount)} has been added to the bill`,
          null,
          'Payment Added',
          'OK',
          'success'
        )
      })
      .catch(error => {
        const message = path(['data', 'description'], error) || 'There was an error adding the transfer'
        app.alert(
          message,
          null,
          'Transfer Error',
          'OK',
          'danger'
        )
      })
      return request
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
