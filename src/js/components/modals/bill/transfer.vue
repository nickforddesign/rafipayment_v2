<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Add Transfer</h1>
    <div slot="body">
      <field name="amount" :errors="errors">
        <currency v-model="amount" v-validate="'required'" ref="default" />
      </field>
    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { path } from 'ramda'
import { mapGetters } from 'vuex'
import app from '@/app'
import { parseCurrency, prettyCurrency } from '@/utils'
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
      amount: null
    }
  },
  mounted() {
    if (this.suggestion) {
      this.amount = this.suggestion
    }
  },
  models: {
    transfer() {
      return new Transfer(null, {
        basePath: `${this.model.url}`
      })
    }
  },
  computed: {
    ...mapGetters({
      primary: 'session:primary'
    })
  },
  methods: {
    close() {
      this.$emit('close')
    },
    validate() {
      return new Promise(async (resolve, reject) => {
        const passed = await this.$validator.validateAll()
        if (passed && this.checkPrimary()) {
          await this.confirmChange()
          resolve()
        } else {
          reject()
        }
      })
    },
    checkPrimary() {
      if (this.primary) {
        return true
      } else {
        app.alert(
          `You must add a primary bank account before you can make a payment`,
          null,
          'No Bank Account',
          'danger'
        )
      }
    },
    // validateDate() {
    //   const end_date = path(['$lease', 'end_date'], this.$parent)
    //   const date = moment.utc(this.scheduled_date)
    //   if (date < moment.utc().startOf('day').add('days', 1)) {
    //     this.errors.add(
    //       'schedule payment',
    //       'Transfers must be scheduled at least one day in advance',
    //       'required'
    //     )
    //   } else if (end_date && date > moment.utc(end_date)) {
    //     this.errors.add(
    //       'schedule payment',
    //       'Transfer date is outside of lease range',
    //       'required'
    //     )
    //   }
    // },
    async confirmChange() {
      this.loading = true

      const body = {
        amount: parseCurrency(this.amount, Number)
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
