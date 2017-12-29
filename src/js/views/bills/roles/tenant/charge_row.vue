<template>
  <div class="row">
    {{ $charge.charge_type | replace | capitalize }}
    {{ $charge.description | limit(30) }}
    <!-- <user-card :model="$user" :email="false" /> -->
    <div class="actions">
      <div>{{ $charge.amount | currency }}</div>
    </div>
  </div>
  <!-- <div class="tr">
    <div class="td">{{ $charge.charge_type | replace | capitalize }}</div>
    <div class="td">{{ $charge.description | limit(30) }}</div>
    <div class="td text-right">{{ $charge.amount | currency }}</div>
  </div> -->
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

<style scoped lang="scss">
@import '~%/colors';

.row {
  display: flex;
  align-items: center;
  background: $color-box-background;
  text-align: left;
  padding: 10px 0;

  .actions {
    flex: 2 0 0;
    text-align: right;
    margin: 0;
    // padding-right: 20px;
  }
}
</style>
