<template>
  <div>
    <field name="due date" :errors="errors">
      <date-picker v-model="due_date" v-validate="validation" name="due date" format="M/D/YYYY" />
    </field>
    
    <button class="primary" @click="next">Complete</button>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import moment from 'moment'

export default {
  name: 'bill-add--date',
  props: ['models'],
  data() {
    return {
      due_date: null
    }
  },
  computed: {
    start() {
      return `|after:${moment.utc(this.models.lease.start_date).format('M/D/YYYY')},true`
    },
    end() {
      return this.models.lease.end_date
        ? `|before:${moment.utc(this.models.lease.end_date).format('M/D/YYYY')},true`
        : ``
    },
    validation() {
      return `required|date_format:M/D/YYYY${this.start}${this.end}`
    }
  },
  methods: {
    next() {
      this.models.bill.due_date = this.due_date
      this.complete()
    },
    complete() {
      this.$emit('next')
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

</style>