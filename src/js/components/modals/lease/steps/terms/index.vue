<template>
  <div>
    <h2>What are the terms of this lease?</h2>

    <div v-if="type" class="content">
      <button @click="cancel"><</button>

      <div v-if="mode === 'simple'">
        <field name="start date">
          <input type="date" name="start date" v-model="start_date">
        </field>

        <field name="end date" v-if="type === 'fixed'">
          <input type="date" name="end date" v-model="end_date">
        </field>

        <field name="rent" :errors="errors">
          <currency v-model="rent" v-validate="'required'" />
        </field>

        <button class="link" @click="setMode('advanced')">Advanced</button>
      </div>

      <div v-if="mode === 'advanced'">

        <div v-if="periods.length">
          <legend>Billing Periods</legend>
          <div class="box" v-for="(period, index) in periods" :key="index">
            <field name="start" :errors="errors">
              <input type="date" v-model="period.start_date" v-validate="'required'">
            </field>
            <field name="amount" :errors="errors">
              <currency v-model="period.amount" />
            </field>
            <!-- {{ period }} -->
          </div>
        </div>

        <button @click="addPeriod">Add Billing Period</button>

        <field name="end date" v-if="type === 'fixed'">
          <input type="date" name="end date" v-model="end_date">
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
export default {
  name: 'lease-add--type',
  props: {
    models: Object
  },
  data() {
    return {
      type: null,
      mode: 'simple',
      start_date: '2017-09-01',
      end_date: '2018-09-01',
      rent: null,
      periods: [{
        start_date: '2017-09-01',
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
    validate() {
      const passed = this.$validator.validateAll()
      if (passed) {
        this.complete()
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