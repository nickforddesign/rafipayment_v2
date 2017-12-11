<template>
  <div class="date-input">
    <!-- <input type="date" v-model="input_value" :name="name"> -->
    <v-date-picker
      mode='single'
      v-model='input_value' />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import moment from 'moment'

export default {
  name: 'date-picker',
  props: {
    value: [String, Object]
  },
  data() {
    return {
      input_value: null
    }
  },
  created() {
    const value = this.value || undefined
    this.input_value = new Date(moment.utc(value).format('MM/DD/YYYY'))
  },
  watch: {
    value(value) {
      this.input_value = new Date(moment.utc(value).format('MM/DD/YYYY'))
    },
    input_value(val) {
      this.$emit('input', moment.utc(this.input_value).toISOString())
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>