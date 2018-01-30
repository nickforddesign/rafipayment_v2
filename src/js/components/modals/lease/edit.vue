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

      <field name="type">
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
      const data = {
        bill_due_day: this.bill_due_day
      }
      data.end_date = this.is_fixed
        ? this.end_date
        : null
      await this.model.save(data)
      this.confirm()
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

