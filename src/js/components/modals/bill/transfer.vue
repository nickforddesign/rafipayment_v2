<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Add Transfer</h1>
    <div slot="body">
      <!-- <div v-if="mode === 'simple'"> -->
        <field name="amount" :errors="errors">
          <currency v-model="amount" v-validate="'required'" ref="default" />
        </field>

        <!-- <button type="button" class="small" @click="setMode('advanced')">Advanced</button> -->
      <!-- </div>
      <div v-else>
        <field name="amount" :errors="errors">
          <currency v-model="amount" v-validate="'required'" ref="default" />
        </field>

        <field name="schedule payment" :errors="errors">
          <date-picker v-model="scheduled_date" v-validate="'required'" data-vv-as="date" name="schedule payment" />
        </field>

        <button type="button" class="small" @click="setMode('simple')">Simple</button>
      </div> -->
    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import moment from 'moment'
import { path } from 'ramda'
import app from '@/app'
import { Deferred, parseCurrency, prettyCurrency } from '@/utils'
import Transfer from '@/models/transfer/new'

export default {
  name: 'modal-transfer-add',
  props: {
    model: Object,
    confirm: Function,
    suggestion: Number
  },
  data() {
    return {
      amount: null,
      scheduled_date: null,
      mode: 'simple'
    }
  },
  mounted() {
    if (this.suggestion) {
      this.amount = this.suggestion
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
      this.scheduled_date = val === 'simple'
        ? null
        : moment.utc().startOf('day').add('days', 1).toISOString()
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
      await this.$validator.validateAll()
      this.validateDate()
      if (!this.errors.any()) {
        await this.confirmChange()
        deferred.resolve()
      } else {
        deferred.reject()
      }
      return deferred.promise
    },
    validateDate() {
      const end_date = path(['$lease', 'end_date'], this.$parent)
      const date = moment.utc(this.scheduled_date)
      if (date < moment.utc().startOf('day').add('days', 1)) {
        this.errors.add(
          'schedule payment',
          'Transfers must be scheduled at least one day in advance',
          'required'
        )
      } else if (end_date && date > moment.utc(end_date)) {
        this.errors.add(
          'schedule payment',
          'Transfer date is outside of lease range',
          'required'
        )
      }
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
          'Payment Successful',
          'OK',
          'success'
        )
      })
      .catch(error => {
        const message = path(['data', 'description'], error) || 'There was an error making the transfer'
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
