<template>
  <div>
    <h2>What are the terms of this lease?</h2>

    <button @click="previous" class="back-button small">Back</button>

    <div v-if="type" class="content">

      <check-box v-model="multiple_periods">Mutiple Billing Periods</check-box>

      <div v-if="!multiple_periods">
        <div class="grid">
          <div class="grid__col grid__col--1-of-2">
            <field name="start date" :errors="errors">
              <date-picker v-model="periods[0].start_date" v-validate="'required'" name="start date" />
            </field>
          </div>

          <div class="grid__col grid__col--1-of-2">
            <field name="end date" :errors="errors" v-if="type === 'fixed'">
              <date-picker v-model="end_date" v-validate="'required'" name="end date" />
            </field>
          </div>
        </div>

        <field name="rent" :errors="errors">
          <currency v-model="periods[0].amount" v-validate="'required|min_currency:0.01'" name="rent" />
        </field>

      </div>

      <div v-else>

        <div class="periods">
          <legend>Billing Periods</legend>
          
          <transition-group name="fade">
            <div class="box" v-for="(period, index) in periods" :key="index">
              <button class="close small" @click="removePeriod(index)">X</button>
              <div class="grid">
                <div class="grid__col grid__col--1-of-2">
                  <field :name="`start date ${index}`" label="Start Date" :errors="errors">
                    <date-picker v-model="period.start_date" v-validate="'required'" data-vv-as="start date" :name="`start date ${index}`" />
                  </field>
                </div>
                <div class="grid__col grid__col--1-of-2">
                  <field :name="`amount ${index}`" label="Amount" :errors="errors">
                    <currency v-model="period.amount" v-validate="'required|min_currency:0.01'" data-vv-as="amount" :name="`amount ${index}`" />
                  </field>
                </div>
              </div>
            </div>
          </transition-group>

          <button @click="addPeriod">Add Billing Period</button>
        </div>

        <field name="end date" v-if="type === 'fixed'" :errors="errors">
          <date-picker v-model="end_date" v-validate="'required'" name="end date" />
        </field>

      </div>

      <field name="bill due day">
        <number maxlength="2" v-validate="'required|numeric|max_value:28'" v-model="bill_due_day" name="bill due day" />
      </field>

      <button class="primary" @click="validate">Next</button>

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
      multiple_periods: false,
      end_date: moment.utc()
        .startOf('month')
        .startOf('day')
        .add(1, 'months')
        .add(1, 'years')
        .subtract(1, 'days'),
      rent: null,
      periods: [{
        start_date: moment.utc()
          .add(1, 'months')
          .startOf('month')
          .startOf('day'),
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

      data.periods = this.multiple_periods
        ? this.periods
        : this.periods.slice(0, 1)

      this.models.lease.set(data)
      this.next()
    },
    next() {
      this.$emit('next')
    },
    previous() {
      if (this.type) {
        this.type = null
      } else {
        this.$emit('previous')
      }
    },
    addPeriod() {
      const last_period = this.periods[this.periods.length - 1]
      const next_date = moment.utc(last_period.start_date)
        .add(6, 'months')
      this.periods.push({
        start_date: next_date,
        amount: ''
      })
    },
    removePeriod(index) {
      if (this.periods.length > 1) {
        this.periods.splice(index, 1)
      }
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

  .close {
    position: absolute;
    right: 14px;
    top: 6px;
    z-index: 10;
    background: transparent;
    box-shadow: none;
  }
}

.periods {
  margin-bottom: 20px;
}
</style>