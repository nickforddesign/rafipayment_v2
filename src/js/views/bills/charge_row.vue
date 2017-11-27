<template>
  <div class="tr">
    <div class="td">{{ $charge.type | capitalize}}</div>
    <div class="td">{{ $charge.description | limit }}</div>
    <div class="td text-right">{{ $charge.amount | currency }}</div>
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
  computed: {
    date() {
      return this.$charge.date
        ? moment.utc(this.$charge.date).format('M/DD/YYYY')
        : '–'
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
