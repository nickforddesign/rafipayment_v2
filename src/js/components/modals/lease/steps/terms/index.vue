<template>
  <div>
    <h2>What are the terms of this lease?</h2>

    <button @click="previous" class="back-button">Back</button>

    <div v-if="type" class="content">

      <div v-if="mode === 'simple'">
        <div class="grid">
          <div class="grid__col grid__col--1-of-2">
            <field name="start date" :errors="errors">
              <date-picker v-model="start_date" v-validate="'required'" name="start date" />
            </field>
          </div>

          <div class="grid__col grid__col--1-of-2">
            <field name="end date" :errors="errors" v-if="type === 'fixed'">
              <date-picker v-model="end_date" v-validate="'required'" name="end date" />
            </field>
          </div>
        </div>

        <field name="rent" :errors="errors">
          <currency v-model="rent" v-validate="'required|min_currency:0.01'" name="rent" />
        </field>

        <button class="link" @click="setMode('advanced')">Advanced</button>
      </div>

      <div v-if="mode === 'advanced'">

        <div v-if="periods.length">
          <legend>Billing Periods</legend>
          <div class="box" v-for="(period, index) in periods" :key="index">
            <field :name="`start date ${index}`" label="Start Date" :errors="errors">
              <date-picker v-model="period.start_date" v-validate="'required'" data-vv-as="start date" :name="`start date ${index}`" />
            </field>
            <field :name="`amount ${index}`" label="Amount" :errors="errors">
              <currency v-model="period.amount" v-validate="'required|min_currency:0.01'" data-vv-as="amount" :name="`amount ${index}`" />
            </field>
          </div>
        </div>

        <button @click="addPeriod">Add Billing Period</button>

        <field name="end date" v-if="type === 'fixed'" :errors="errors">
          <date-picker v-model="end_date" v-validate="'required'" name="end date" />
        </field>

        <button class="link" @click="setMode('simple')">Simple</button>
      </div>

      <field name="bill due day">
        <number maxlength="2" v-validate="'required|numeric|max_value:28'" v-model="bill_due_day" name="bill due day" />
      </field>

      <button @click="validate">Next</button>

    </div>

    <div class="grid" v-else>

      <div class="grid__col grid__col--1-of-2">
        <div class="box" @click="setType('fixed')">
          Fixed term
        </div>
      </div>

      <div class="grid__col grid__col--1-of-2">
        <div class="box"  @click="setType('m2m')">
          Month to month
        </div>
      </div>

    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import moment from 'moment'

export default {
  name: 'lease-add--type',
  props: {
    models: Object
  },
  data() {
    return {
      type: null,
      mode: 'simple',
      start_date: moment.utc().add(1, 'months').startOf('month').startOf('day'),
      end_date: moment.utc().add(1, 'months').startOf('month').startOf('day').add(1, 'years').subtract(1, 'days'),
      rent: null,
      periods: [{
        start_date: moment.utc().add(1, 'months').startOf('month').startOf('day'),
        amount: ''
      }],
      bill_due_day: '1'
    }
  },
  methods: {
    cancel() {
      this.type = null
    },
    setType(type) {
      this.type = type
    },
    setMode(mode) {
      this.mode = mode
    },
    async validate() {
      await this.$validator.validateAll()
      await this.validateDates()
      // console.log(dates_passed)
      if (!this.errors.any()) {
        this.complete()
      }
    },
    async validateDates() {
      if (this.mode === 'simple') {
        this.validateStart()
      } else {
        this.validatePeriods()
      }
      if (this.type === 'fixed') {
        this.validateEnd()
      }
    },
    validateStart() {
      return true
    },
    validatePeriods() {
      this.periods.map((period, index) => {
        const next = this.periods[index + 1]
        if (next && period.start_date > next.start_date) {
          this.errors.add(`start date ${index + 1}`, 'Date cannot precede the date before it')
        }
      })
    },
    validateEnd() {
      const previous_date = this.mode === 'simple'
        ? this.start_date
        : this.periods[this.periods.length - 1].start_date
      if (previous_date >= this.end_date) {
        this.errors.add('end date', 'End date cannot precede start date', 'invalid date')
      }
    },
    complete(model) {
      let data = {
        end_date: this.end_date,
        bill_due_day: this.bill_due_day
      }
      if (this.mode === 'simple') {
        data.periods = [{
          start_date: this.start_date,
          amount: this.rent
        }]
      } else {
        data.periods = this.periods
      }
      this.models.lease.set(data)
      this.next()
    },
    next() {
      this.$emit('next')
    },
    previous() {
      this.$emit('previous')
    },
    addPeriod() {
      this.periods.push({
        start_date: '2017-09-01',
        amount: ''
      })
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.box {
  &:hover {
    cursor: pointer;
  }
}
</style>