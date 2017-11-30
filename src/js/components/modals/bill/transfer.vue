<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Add Transfer</h1>
    <div slot="body">
      <div v-if="mode === 'simple'">
        <field name="amount" :errors="errors">
          <currency v-model="amount" v-validate="'required'" ref="default" />
        </field>

        <button class="small" @click="setMode('advanced')">Advanced</button>
      </div>
      <div v-else>
        <field name="amount" :errors="errors">
          <currency v-model="amount" v-validate="'required'" ref="default" />
        </field>

        <field name="date" :errors="errors">
          <date-picker v-model="scheduled_date" v-validate="'required'" />
        </field>

        <button class="small" @click="setMode('simple')">Simple</button>
      </div>
    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import app from '@/app'
import { Deferred, parseCurrency, prettyCurrency } from '@/utils'
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
      scheduled_date: null,
      mode: 'simple'
    }
  },
  models: {
    transfer() {
      const self = this
      return new Transfer(null, {
        url() {
          return self.model.url
        }
      })
    }
  },
  watch: {
    mode(val) {
      if (val === 'simple') {
        this.date = null
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    setMode(mode) {
      this.mode = mode
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

      if (this.scheduled_date) {
        body.scheduled_date = this.scheduled_date
      }

      const request = this.$transfer.save(body, {
        method: 'post'
      })
      request.then(response => {
        this.confirm()
        app.alert(
          `Your payment of ${prettyCurrency(this.amount)} has been received and is now processing. Thank you!`,
          null,
          'Payment Successful'
        )
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
