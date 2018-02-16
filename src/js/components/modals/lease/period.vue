<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">{{ model ? 'Edit' : 'Add' }} Period</h1>
    <div slot="body">

      <field name="amount" :errors="errors">
        <currency v-model="amount" v-validate.disable="'required'" name="amount" ref="default" />
      </field>

      <field name="start date" :errors="errors">
        <date-picker v-model="start_date" name="start date" v-validate.disable="`required|date_format:M/D/YYYY|before:${end_date}`" format="M/D/YYYY" />
      </field>

    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import moment from 'moment'
import Period from '@/models/lease/period'

export default {
  name: 'modal-lease--period',
  props: {
    model: Object,
    confirm: Function,
    path: String,
    lease: Object
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
      this.start_date = moment.utc(this.model.start_date).format('M/D/YYYY')
      this.amount = this.model.amount
    }
  },
  computed: {
    end_date() {
      return moment.utc(this.lease.end_date).format('M/D/YYYY')
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
        start_date: this.start_date,
        amount: this.amount
      }

      await this.$period.save(body)
      this.confirm()
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
