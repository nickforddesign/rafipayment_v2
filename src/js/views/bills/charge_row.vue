<template>
  <div class="tr">
    <div class="td">{{ $charge.charge_type | replace | capitalize }} {{ description | limit(100) }}</div>
    <div class="td text-right balance">{{ $charge.amount | currency }}</div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import moment from 'moment'
import Charge from '@/models/lease/charge'

export default {
  name: 'row',
  props: ['model', 'basePath'],
  data() {
    return {
      modal_visible: false
    }
  },
  models: {
    charge() {
      return new Charge(this.model, {
        basePath: this.basePath,
        persist: true
      })
    }
  },
  mounted() {
    console.log(this.$charge)
  },
  computed: {
    date() {
      return this.$charge.date
        ? moment.utc(this.$charge.date).format('M/DD/YYYY')
        : '–'
    },
    description() {
      if (this.$charge.description) {
        return ` - ${this.$charge.description}`
      }
    }
  },
  methods: {
    edit() {
      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
