<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Edit Lease</h1>
    <div slot="body">

      <field name="bill due day" :errors="errors">
        <number
          maxlength="2"
          v-validate="'required|numeric|max_value:28'"
          v-model="bill_due_day"
          name="bill due day" />
      </field>

      <field name="type" :errors="errors">
        <check-box v-model="is_fixed">Fixed term</check-box>
      </field>

      <field name="end date" :errors="errors" v-if="is_fixed">
        <date-picker
          v-model="end_date"
          v-validate="`required|date_format:M/D/YYYY|after:${last_period_formatted}`"
          name="end date"
          format="M/D/YYYY" />
      </field>

    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import moment from 'moment'
import Charge from '@/models/lease/charge'
import { Deferred } from '@/utils'

export default {
  name: 'modal-lease--edit',
  props: {
    model: Object,
    confirm: Function,
    account: Boolean
  },
  data() {
    return {
      bill_due_day: this.model.bill_due_day,
      end_date: this.model.end_date,
      is_fixed: !!this.model.end_date
    }
  },
  computed: {
    last_period() {
      return this.model.periods_sorted[this.model.periods_sorted.length - 1]
    },
    last_period_formatted() {
      return moment.utc(this.last_period).format('M/D/YYYY')
    },
    last_month_credit() {
      return this.model.charges.find(charge => charge.type === 'last_month')
    }
  },
  watch: {
    is_fixed(val) {
      if (!val) {
        if (this.last_month_credit) {
          this.errors.add(
            'type',
            'This lease has a last month credit, please remove it before changing to month-to-month',
            'required'
          )
        }
      }
    }
  },
  mounted() {
    console.log(this.model.charges.find(charge => charge.type === 'last_month'))
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async validate() {
      const deferred = new Deferred()
      await this.$validator.validateAll()
      if (!this.errors.any()) {
        await this.confirmChange()
        deferred.resolve()
      } else {
        deferred.reject()
      }
      return deferred.promise
    },
    async confirmChange() {
      this.loading = true
      const data = {
        bill_due_day: this.bill_due_day
      }
      data.end_date = this.is_fixed
        ? this.end_date
        : null
      const original_end_date = this.model.end_date
      await this.model.save(data)

      // if last month was collection
      const last_month = this.last_month_credit
      if (last_month && this.end_date !== original_end_date) {
        const charge = new Charge(last_month, {
          basePath: `${this.model.url}/charges`
        })

        await charge.save({
          date: this.end_date
        })
      }
      this.confirm()
      this.close()
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.number {
  width: 100%;
}
</style>

